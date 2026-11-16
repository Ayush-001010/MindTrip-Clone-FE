import React, { useEffect, useRef, useState } from "react";
import MakerBoxConfig from "../../../../../config/component/MakerBoxConfig";
import { motion, useReducedMotion } from "framer-motion";
import type IReelBox from "./IReelBox";
import { Player } from "@remotion/player";
import type { PlayerRef } from "@remotion/player";
import { FaPlay } from "react-icons/fa";
import PlayerBox from "./PlayerBox/PlayerBox";
import useCommonAction from "../../../../../CustomHooks/useCommonAction";


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
    const reduceMotion = useReducedMotion();
    const playerRef = useRef<PlayerRef>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [oldFashionPlayAudio, setOldFashionPlayAudio] = useState<string | null>(null);
    const { getImages } = useCommonAction();
    const [storyBoard, setStoryBoard] = useState<IStoryBoard | null>(null);

    const playHandler = () => {
        setIsPlaying(true);
    }

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
        const player = playerRef.current;
        if (!player) return;

        const onPlay = playHandler;
        const onPause = () => setIsPlaying(false);

        setIsPlaying(player.isPlaying());
        player.addEventListener("play", onPlay);
        player.addEventListener("pause", onPause);

        return () => {
            player.removeEventListener("play", onPlay);
            player.removeEventListener("pause", onPause);
        };
    }, []);

    const sceneSeconds = (scene: IStoryBoardScene): number => {
        // if (scene.type === "video") return Math.max(scene.trimEnd - scene.trimStart, 0.5);
        return scene.duration ?? 3;
    };
    const sceneFrames = (scene: IStoryBoardScene): number => Math.max(Math.round(sceneSeconds(scene) * 30), 1);
    
    const totalReelFrames = (storyboard: IStoryBoard): number =>
        Math.max(storyboard.scenes.reduce((sum, scene) => sum + sceneFrames(scene), 0), 1);
    
    const durationInFrames = totalReelFrames(storyBoard || { scenes: [] , duration: 0 });

    return (
        <motion.section
            className="p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
        >
            <section className="relative h-[700px] p-2 shadow-md shadow-[#343a40] rounded-4xl ring-1 ring-[#343a40] w-[360px] bg-[#0b090a]">
                <section className="relative h-full w-full rounded-4xl bg-[#242423]">
                    <div
                        aria-hidden="true"
                        className="absolute left-1/2 top-3 z-10 flex h-8 w-28 -translate-x-1/2 items-center justify-end rounded-full border border-zinc-800 bg-black px-2.5 shadow-inner shadow-zinc-900"
                    >
                        <span className="h-3.5 w-3.5 rounded-full border border-zinc-700 bg-[#10141b] shadow-[inset_0_0_4px_2px_rgba(70,90,130,0.35)]" />
                    </div>
                    <Player
                        ref={playerRef}
                        component={PlayerBox}
                        inputProps={{storyBoard , audioUrl : oldFashionPlayAudio}}
                        durationInFrames={durationInFrames}
                        fps={30}
                        compositionWidth={344}
                        compositionHeight={685}
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
        </motion.section>
    )
}

export default ReelBox;

{/* <Player
                // component={ReelComposition}
                // inputProps={inputProps}
                // durationInFrames={durationInFrames}
                // fps={REEL_FPS}
                // compositionWidth={REEL_WIDTH}
                // compositionHeight={REEL_HEIGHT}
                controls
                loop
                style={{ width: "100%" }}
            /> */}