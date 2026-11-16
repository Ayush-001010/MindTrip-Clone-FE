import React from "react";
import { Audio } from "@remotion/media";
import type IPlayerBox from "./IPlayerBox";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { IStoryBoardScene } from "../ReelBox";
import { FaPlay } from "react-icons/fa";
import RequestToReelAnimation from "./RequestToReelAnimation/RequestToReelAnimation";

const SceneContent: React.FC<{ scene: IStoryBoardScene; durationInFrames: number }> = ({ scene, durationInFrames }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const fadeFrames = Math.min(Math.round(fps * 0.4), Math.floor((durationInFrames - 1) / 2));

    if (scene.type === "play" || scene.type === "1" || scene.type === "2" || scene.type === "3") {
        const opacity = fadeFrames > 0
            ? Math.min(
                interpolate(frame, [0, fadeFrames], [0, 1], { extrapolateRight: "clamp" }),
                interpolate(frame, [durationInFrames - 1 - fadeFrames, durationInFrames - 1], [1, 0], { extrapolateLeft: "clamp" }),
            )
            : 1;

        return (
            <section className="flex h-full w-full items-center justify-center" style={{ opacity }}>
                {scene.type === "play"
                    ? <FaPlay className="text-white text-6xl" />
                    : <span className="text-8xl text-[#ced4da]">{scene.type}</span>}
            </section>
        );
    } else if (scene.type === "message-to-server") {
        const opacity = fadeFrames > 0 ? interpolate(frame, [0, fadeFrames], [0, 1], { extrapolateRight: "clamp" }) : 1;
        const progress = frame / Math.max(durationInFrames - 1, 1);
        const delivery = interpolate(progress, [0.18, 0.62], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });
        const replyOpacity = interpolate(progress, [0.68, 0.76], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });
        const messageOpacity = interpolate(progress, [0.58, 0.65], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });

        return (
            <RequestToReelAnimation delivery={delivery} replyOpacity={replyOpacity} messageOpacity={messageOpacity} opacity={opacity}/>
        );
    }
    return null;
};

const PlayerBox: React.FC<IPlayerBox> = ({ storyBoard, audioUrl }) => {
    const { fps } = useVideoConfig();
    if (!storyBoard) return null;

    const sceneSeconds = (scene: IStoryBoardScene): number => {
        return scene.duration ?? 3;
    };
    const sceneFrames = (scene: IStoryBoardScene): number => Math.max(Math.round(sceneSeconds(scene) * fps), 1);
    const starts = storyBoard.scenes.map((_, i) => storyBoard.scenes.slice(0, i).reduce((sum, s) => sum + sceneFrames(s), 0));

    return (
        <AbsoluteFill className="flex items-center justify-center bg-black">
            {audioUrl && <Audio src={audioUrl} trimBefore={115} volume={0.5} />}
            {storyBoard.scenes.map((scene, i) => (
                <Sequence key={i} from={starts[i]} durationInFrames={sceneFrames(scene)}>
                    <SceneContent scene={scene} durationInFrames={sceneFrames(scene)} />
                </Sequence>
            ))}
        </AbsoluteFill>
    )
};

export default PlayerBox;