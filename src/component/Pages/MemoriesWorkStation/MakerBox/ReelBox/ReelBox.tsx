import React, { useEffect, useRef, useState } from "react";
import { useGetMemoriesWorkStationContext } from "../../MemoriesWorkStation";
import MakerBoxConfig from "../../../../../config/component/MakerBoxConfig";
import { motion, useReducedMotion } from "framer-motion";
import type IReelBox from "./IReelBox";
import { Player } from "@remotion/player";
import type { PlayerRef } from "@remotion/player";
import { FaPlay } from "react-icons/fa";
import PlayerBox from "./PlayerBox/PlayerBox";
import { getGeneratedReelDurationInFrames } from "./PlayerBox/reelTransitions";
import useCommonAction from "../../../../../CustomHooks/useCommonAction";
import MusicEditor from "../ChatBox/Script/MusicEditor";

export const REEL_COMPOSITION_WIDTH = 344;
export const REEL_COMPOSITION_HEIGHT = 685;

export interface IAnimationScene {
    duration : number;
    type : "play" | "1" | "2" | "3" | "message-to-server",
} 

export type IStoryBoardScene = IAnimationScene

export interface IStoryBoard {
    duration : number;
    scenes : IStoryBoardScene[];
}

const ReelBox: React.FC<IReelBox> = () => {
    const { sendCommentToAI, batchDetails, selectedAudioUrl, generatedReel, memoriesData, setNotifyConfig, isAnalyzingCompleted, reelAudioEdit } = useGetMemoriesWorkStationContext();
    const reduceMotion = useReducedMotion();
    const playerRef = useRef<PlayerRef>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [oldFashionPlayAudio, setOldFashionPlayAudio] = useState<string | null>(null);
    const { getImages } = useCommonAction();
    const [storyBoard, setStoryBoard] = useState<IStoryBoard | null>(null);

    useEffect(() => {
        getImages("Audio/freesound_community-8mm-film-camera-6446.mp3").then((images : any) => {
           setOldFashionPlayAudio(images?.data || null);
        });
        setStoryBoard({
            duration: 5,
            scenes: MakerBoxConfig.defaultReelConfig
        });
    },[]);

    useEffect(() => {
        if(batchDetails && batchDetails.length > 0) {
            setStoryBoard(prev => {
                if (!prev || prev.scenes.length === 0) return prev;
                const scenes = [...prev.scenes];
                const lastSceneIndex = scenes.length - 1;
                scenes[lastSceneIndex] = {
                    ...scenes[lastSceneIndex],
                    duration: 20
                };
                return { ...prev, scenes };
            })
        }
    }, [batchDetails]);


    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;

        const onPlay = () => {
            if(!memoriesData  || !memoriesData.isTripPhotoAndVideoUpload && !memoriesData.isTripAudioUpload) {
                player.pause();
                setNotifyConfig({
                    type: "error",
                    message: "Please upload trip photos, videos, and audio before playing the reel.",
                    duration: 1000,
                    open: true
                });
                return;
            }
            if (!generatedReel) {
                sendCommentToAI("Start Genrating Reel...");
            }
            setIsPlaying(true);
        };
        const onPause = () => setIsPlaying(false);

        setIsPlaying(player.isPlaying());
        player.addEventListener("play", onPlay);
        player.addEventListener("pause", onPause);

        return () => {
            player.removeEventListener("play", onPlay);
            player.removeEventListener("pause", onPause);
        };
    }, [generatedReel, memoriesData, sendCommentToAI, setNotifyConfig]);

    const sceneSeconds = (scene: IStoryBoardScene): number => {
        // if (scene.type === "video") return Math.max(scene.trimEnd - scene.trimStart, 0.5);
        return scene.duration ?? 3;
    };
    const sceneFrames = (scene: IStoryBoardScene): number => Math.max(Math.round(sceneSeconds(scene) * 30), 1);
    
    const totalReelFrames = (storyboard: IStoryBoard): number =>
        Math.max(storyboard.scenes.reduce((sum, scene) => sum + sceneFrames(scene), 0), 1);
    
    const durationInFrames = generatedReel
        ? getGeneratedReelDurationInFrames(generatedReel)
        : totalReelFrames(storyBoard || { scenes: [], duration: 0 });


    return (
        <motion.section
            className="mx-auto my-3 flex w-[calc(100%_-_1.5rem)] min-w-0 max-w-[360px] shrink-0 flex-col items-center gap-2.5 lg:m-4 lg:w-[360px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
        >
            <section className="relative aspect-[360/700] w-full max-w-[260px] p-2 shadow-md shadow-[#343a40] rounded-4xl ring-1 ring-[#343a40] bg-[#0b090a] sm:max-w-[360px]">
                <section className="relative h-full w-full rounded-4xl bg-[#242423]">
                    <div
                        aria-hidden="true"
                        className="absolute left-1/2 top-3 z-10 flex h-8 w-28 -translate-x-1/2 items-center justify-end rounded-full border border-zinc-800 bg-black px-2.5 shadow-inner shadow-zinc-900"
                    >
                        <span className="h-3.5 w-3.5 rounded-full border border-zinc-700 bg-[#10141b] shadow-[inset_0_0_4px_2px_rgba(70,90,130,0.35)]" />
                    </div>
                    <Player
                        key={generatedReel ? `${generatedReel.script.audio.src}-${generatedReel.script.audio.startFromSec}-${generatedReel.script.audio.endAtSec}-${generatedReel.script.audio.volume}` : "storyboard"}
                        ref={playerRef}
                        component={PlayerBox}
                        inputProps={{
                            storyBoard,
                            audioUrl: selectedAudioUrl ?? oldFashionPlayAudio,
                            generatedReel,
                            audioEdit: reelAudioEdit,
                        }}
                        durationInFrames={durationInFrames}
                        fps={generatedReel?.script?.fps || 30}
                        compositionWidth={REEL_COMPOSITION_WIDTH}
                        compositionHeight={REEL_COMPOSITION_HEIGHT}
                        controls
                        clickToPlay={false}
                        loop
                        className="h-full w-full overflow-hidden rounded-4xl"
                    />
                    {!isPlaying && (
                        <button
                            type="button"
                            aria-label="Play reel"
                            onClick={(event) => playerRef.current?.play(event)}
                            className="absolute left-1/2 top-1/2 z-20 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/70 text-white shadow-lg transition hover:scale-105 hover:bg-black/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                        >
                            <FaPlay aria-hidden="true" className="ml-1 h-6 w-6" />
                        </button>
                    )}
                    <div className="absolute left-1/2 bottom-7 z-10 flex h-2 w-20 -translate-x-1/2 items-center justify-end rounded-full border border-zinc-800 bg-black px-2.5 shadow-inner shadow-zinc-900">
                    </div>
                </section>
            </section>
            {generatedReel && <MusicEditor />}
            {!isAnalyzingCompleted && !memoriesData?.isAllAnalysisCompleted && memoriesData?.isTripPhotoAndVideoUpload && (
                <div
                    role="status"
                    aria-live="polite"
                    className="flex w-full max-w-[360px] items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 text-zinc-200 shadow-md shadow-black/30"
                >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-violet-400/40 bg-violet-500/15 text-violet-300">
                        <FaPlay aria-hidden="true" className="ml-0.5 h-3.5 w-3.5" />
                    </span>
                    <p className="text-sm leading-relaxed">
                        <span className="block font-semibold text-white">Ready to create your reel?</span>
                        Click Play to start the analysis.
                    </p>
                </div>
            )}
        </motion.section>
    )
}

export default ReelBox;