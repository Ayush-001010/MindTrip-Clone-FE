import React from "react";
import { Audio, Video } from "@remotion/media";
import type IPlayerBox from "./IPlayerBox";
import { AbsoluteFill, Easing, Freeze, Img, Sequence, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
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
        const delivery = interpolate(progress, [0.08, 0.28], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });
        const processingProgress = interpolate(progress, [0.52, 0.65], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });
        const transferProgress = interpolate(progress, [0.65, 0.94], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });
        const replyOpacity = interpolate(progress, [0.32, 0.38], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });
        const messageOpacity = interpolate(progress, [0.28, 0.32], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
        });

        return (
            <RequestToReelAnimation delivery={delivery} processingProgress={processingProgress} transferProgress={transferProgress} replyOpacity={replyOpacity} messageOpacity={messageOpacity} opacity={opacity}/>
        );
    }
    return null;
};

type GeneratedScene = NonNullable<IPlayerBox["generatedReel"]>["script"]["scenes"][number];

const GeneratedSceneContent: React.FC<{ scene: GeneratedScene }> = ({ scene }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const progress = interpolate(frame, [0, Math.max(scene.durationInFrames - 1, 1)], [0, 1], {
        extrapolateRight: "clamp",
    });
    const focalPoint = scene.focalPoint ?? { x: 0.5, y: 0.5 };
    const scale = scene.motion === "zoom-out"
        ? interpolate(progress, [0, 1], [1.12, 1])
        : interpolate(progress, [0, 1], [1, 1.12]);

    return (
        <AbsoluteFill>
            {scene.type === "photo" ? (
                <Img
                    src={scene.src}
                    className="h-full w-full object-cover"
                    style={{
                        transformOrigin: `${focalPoint.x * 100}% ${focalPoint.y * 100}%`,
                        transform: `scale(${scale})`,
                    }}
                />
            ) : (
                <Video
                    src={scene.src}
                    trimBefore={Math.round((scene.trimStartSec ?? 0) * fps)}
                    playbackRate={scene.playbackRate ?? 1}
                    muted
                    volume={0}
                    objectFit="cover"
                    style={{ width: "100%", height: "100%" }}
                />
            )}
            {scene.caption && (
                <AbsoluteFill className="items-center justify-end px-5 pb-12">
                    <span className="rounded-full bg-black/55 px-4 py-2 text-center text-xl font-semibold text-white shadow-lg">
                        {scene.caption}
                    </span>
                </AbsoluteFill>
            )}
        </AbsoluteFill>
    );
};

const GeneratedSceneTransition: React.FC<{
    scene: GeneratedScene;
    transitionFrames: number;
    index: number;
}> = ({ scene, transitionFrames, index }) => {
    const frame = useCurrentFrame();
    const entrance = transitionFrames > 1
        ? interpolate(frame, [0, transitionFrames - 1], [0, 1], {
            easing: Easing.out(Easing.cubic),
            extrapolateRight: "clamp",
        })
        : 1;
    const offset = (1 - entrance) * (index % 2 === 0 ? -4 : 4);

    return (
        <AbsoluteFill
            className="overflow-hidden"
            style={{ opacity: entrance, transform: `translateX(${offset}%) scale(${1 + (1 - entrance) * 0.04})` }}
        >
            <Freeze frame={scene.durationInFrames - 1} active={frame >= scene.durationInFrames}>
                <GeneratedSceneContent scene={scene} />
            </Freeze>
        </AbsoluteFill>
    );
};

const PlayerBox: React.FC<IPlayerBox> = ({ storyBoard, audioUrl, generatedReel }) => {
    const { fps } = useVideoConfig();
    if (!generatedReel && !storyBoard) return null;

    const sceneSeconds = (scene: IStoryBoardScene): number => {
        return scene.duration ?? 3;
    };
    const sceneFrames = (scene: IStoryBoardScene): number => Math.max(Math.round(sceneSeconds(scene) * fps), 1);
    const storyboardScenes = storyBoard?.scenes ?? [];
    const storyboardStarts = storyboardScenes.map((_, i) => storyboardScenes.slice(0, i).reduce((sum, scene) => sum + sceneFrames(scene), 0));
    const reelScenes = generatedReel?.script.scenes ?? [];
    const reelStarts = reelScenes.map((_, i) => reelScenes.slice(0, i).reduce((sum, scene) => sum + scene.durationInFrames, 0));
    const transitions = reelScenes.map((scene, index) => index === 0 ? 0 : Math.min(
        Math.round(fps * 0.45),
        Math.floor(reelScenes[index - 1].durationInFrames / 2),
        Math.floor(scene.durationInFrames / 2),
    ));

    return (
        <AbsoluteFill className="flex items-center justify-center bg-black">
            {generatedReel ? (
                <Audio
                    src={generatedReel.script.audio.src}
                    trimBefore={Math.round((generatedReel.script.audio.startFromSec ?? 0) * generatedReel.script.fps)}
                    volume={0.5}
                />
            ) : (
                audioUrl && <Audio src={audioUrl} trimBefore={115} volume={0.5} />
            )}
            {generatedReel
                ? reelScenes.map((scene, index) => (
                    <Sequence
                        key={`${scene.clipId}-${index}`}
                        from={reelStarts[index]}
                        durationInFrames={scene.durationInFrames + (transitions[index + 1] ?? 0)}
                    >
                        <GeneratedSceneTransition scene={scene} transitionFrames={transitions[index]} index={index} />
                    </Sequence>
                ))
                : storyboardScenes.map((scene, index) => (
                    <Sequence key={index} from={storyboardStarts[index]} durationInFrames={sceneFrames(scene)}>
                        <SceneContent scene={scene} durationInFrames={sceneFrames(scene)} />
                    </Sequence>
                ))}
        </AbsoluteFill>
    )
};

export default PlayerBox;