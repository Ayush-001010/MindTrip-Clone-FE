import React from "react";
import { AbsoluteFill, Html5Video, Img, Sequence, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import type { IStoryboard, IStoryboardScene } from "./IStoryboard";

export const REEL_FPS = 30;
export const REEL_WIDTH = 1080;
export const REEL_HEIGHT = 1920;
const DEFAULT_SCENE_SECONDS = 3;
const FADE_FRAMES = 8;
const SLIDE_FRAMES = 10;

export interface IReelCompositionProps {
    storyboard: IStoryboard;
    mediaUrls: Record<string, string>;
}

export const sceneSeconds = (scene: IStoryboardScene): number => {
    if (scene.type === "video" && scene.trimStart !== undefined && scene.trimEnd !== undefined) {
        return Math.max(scene.trimEnd - scene.trimStart, 0.5);
    }
    return scene.duration ?? DEFAULT_SCENE_SECONDS;
};

export const totalReelFrames = (storyboard: IStoryboard): number =>
    Math.max(storyboard.scenes.reduce((sum, scene) => sum + Math.max(Math.round(sceneSeconds(scene) * REEL_FPS), 1), 0), 1);

const Scene: React.FC<{ scene: IStoryboardScene; src: string | undefined }> = ({ scene, src }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();

    const fade = scene.transition === "none" || durationInFrames <= FADE_FRAMES * 2
        ? 1
        : Math.min(
            interpolate(frame, [0, FADE_FRAMES], [0, 1], { extrapolateRight: "clamp" }),
            interpolate(frame, [durationInFrames - FADE_FRAMES, durationInFrames], [1, 0], { extrapolateLeft: "clamp" }),
        );
    // "slide" enters from the right instead of fading in.
    const isSlide = scene.transition === "slide";
    const slideX = isSlide ? interpolate(frame, [0, SLIDE_FRAMES], [100, 0], { extrapolateRight: "clamp" }) : 0;
    const opacity = isSlide ? (durationInFrames <= FADE_FRAMES * 2 ? 1 : interpolate(frame, [durationInFrames - FADE_FRAMES, durationInFrames], [1, 0], { extrapolateLeft: "clamp" })) : fade;
    const zoom = interpolate(frame, [0, durationInFrames], [1, 1.12]);

    return (
        <AbsoluteFill style={{ opacity, transform: `translateX(${slideX}%)`, backgroundColor: "#000" }}>
            {src && scene.type === "image" && (
                <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${zoom})` }} />
            )}
            {src && scene.type === "video" && (
                <Html5Video
                    src={src}
                    trimBefore={Math.round((scene.trimStart ?? 0) * REEL_FPS)}
                    volume={scene.keepAudio ? 1 : 0}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            )}
            {scene.caption && (
                <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 220 }}>
                    <p
                        style={{
                            margin: 0,
                            maxWidth: "85%",
                            padding: "20px 36px",
                            borderRadius: 24,
                            backgroundColor: "rgba(0,0,0,0.55)",
                            color: "#fff",
                            fontFamily: "system-ui, sans-serif",
                            fontSize: 64,
                            fontWeight: 700,
                            textAlign: "center",
                        }}
                    >
                        {scene.caption}
                    </p>
                </AbsoluteFill>
            )}
        </AbsoluteFill>
    );
};

const ReelComposition: React.FC<IReelCompositionProps> = ({ storyboard, mediaUrls }) => {
    let from = 0;
    return (
        <AbsoluteFill style={{ backgroundColor: "#000" }}>
            {storyboard.scenes.map((scene, index) => {
                const frames = Math.max(Math.round(sceneSeconds(scene) * REEL_FPS), 1);
                const start = from;
                from += frames;
                return (
                    <Sequence key={`${scene.media_id}-${index}`} from={start} durationInFrames={frames}>
                        <Scene scene={scene} src={mediaUrls[scene.media_id]} />
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    );
};

export default ReelComposition;
