import React from "react";
import { AbsoluteFill, Img, Sequence, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Video } from "@remotion/media";
import type { IGeneratedMedia, IGeneratedThumbnail, IImageScene, IStoryboard, IStoryboardScene, IThumbnailScene, IVideoScene } from "./IStoryboard";

export const REEL_FPS = 30;
export const REEL_WIDTH = 1080;
export const REEL_HEIGHT = 1920;
const DEFAULT_SCENE_SECONDS = 3;
const FADE_FRAMES = 8;
const SLIDE_FRAMES = 10;
const ZOOM_AMOUNT = 1.15;
const PAN_PERCENT = 3;
const FONT = "system-ui, -apple-system, 'Segoe UI', sans-serif";

// A type alias (not an interface) so it satisfies Record<string, unknown> for Player and the web renderer.
export type IReelCompositionProps = {
    storyboard: IStoryboard;
    mediaUrls: Record<string, string>;
    media: IGeneratedMedia[];
    thumbnails: IGeneratedThumbnail[];
};

export const sceneSeconds = (scene: IStoryboardScene): number => {
    if (scene.type === "video") return Math.max(scene.trimEnd - scene.trimStart, 0.5);
    return scene.duration ?? DEFAULT_SCENE_SECONDS;
};

const sceneFrames = (scene: IStoryboardScene): number => Math.max(Math.round(sceneSeconds(scene) * REEL_FPS), 1);

export const totalReelFrames = (storyboard: IStoryboard): number =>
    Math.max(storyboard.scenes.reduce((sum, scene) => sum + sceneFrames(scene), 0), 1);

// thumbnail_id is expected to look like "t1", "t2" ... and point at thumbnails[n - 1].
export const resolveThumbnail = (id: string, thumbnails: IGeneratedThumbnail[]): IGeneratedThumbnail | undefined => {
    const n = Number(String(id).replace(/\D/g, ""));
    if (n >= 1 && thumbnails[n - 1]) return thumbnails[n - 1];
    return thumbnails.length === 1 ? thumbnails[0] : undefined;
};

const SceneFrame: React.FC<{ transition: IStoryboardScene["transition"]; isFirst: boolean; children: React.ReactNode }> = ({ transition, isFirst, children }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();
    const canFade = transition !== "none" && durationInFrames > FADE_FRAMES * 2;

    const fadeOut = canFade
        ? interpolate(frame, [durationInFrames - FADE_FRAMES, durationInFrames], [1, 0], { extrapolateLeft: "clamp" })
        : 1;
    // The opening scene shows immediately so the paused preview isn't a black frame.
    const fadeIn = canFade && transition !== "slide" && !isFirst
        ? interpolate(frame, [0, FADE_FRAMES], [0, 1], { extrapolateRight: "clamp" })
        : 1;
    const slideX = transition === "slide" && !isFirst
        ? interpolate(frame, [0, SLIDE_FRAMES], [100, 0], { extrapolateRight: "clamp" })
        : 0;

    return (
        <AbsoluteFill style={{ opacity: Math.min(fadeIn, fadeOut), transform: `translateX(${slideX}%)`, backgroundColor: "#000" }}>
            {children}
        </AbsoluteFill>
    );
};

const Caption: React.FC<{ text?: string }> = ({ text }) => {
    if (!text) return null;
    return (
        <AbsoluteFill style={{ justifyContent: "flex-end", alignItems: "center", paddingBottom: 220 }}>
            <p
                style={{
                    margin: 0,
                    maxWidth: "85%",
                    padding: "20px 36px",
                    borderRadius: 24,
                    backgroundColor: "rgba(0,0,0,0.55)",
                    color: "#fff",
                    fontFamily: FONT,
                    fontSize: 64,
                    fontWeight: 700,
                    textAlign: "center",
                }}
            >
                {text}
            </p>
        </AbsoluteFill>
    );
};

const RouteStops: React.FC<{ current?: number; total: number }> = ({ current, total }) => {
    if (!current || total < 2) return null;
    return (
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 90 }}>
            <div style={{ display: "flex", gap: 12 }}>
                {Array.from({ length: total }, (_, i) => (
                    <div
                        key={i}
                        style={{
                            width: i + 1 === current ? 72 : 28,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: i + 1 <= current ? "#ffffff" : "rgba(255,255,255,0.35)",
                        }}
                    />
                ))}
            </div>
        </AbsoluteFill>
    );
};

const ImageSceneView: React.FC<{ scene: IImageScene; src: string | undefined }> = ({ scene, src }) => {
    const frame = useCurrentFrame();
    const { durationInFrames } = useVideoConfig();
    const progress = interpolate(frame, [0, Math.max(durationInFrames - 1, 1)], [0, 1]);
    const focus = scene.focus ?? { x: 0.5, y: 0.5 };

    let scale = ZOOM_AMOUNT;
    let translateX = 0;
    switch (scene.motion) {
        case "none":
            scale = 1;
            break;
        case "zoom_out":
            scale = interpolate(progress, [0, 1], [ZOOM_AMOUNT, 1]);
            break;
        case "pan_left":
            translateX = interpolate(progress, [0, 1], [PAN_PERCENT, -PAN_PERCENT]);
            break;
        case "pan_right":
            translateX = interpolate(progress, [0, 1], [-PAN_PERCENT, PAN_PERCENT]);
            break;
        default:
            scale = interpolate(progress, [0, 1], [1, ZOOM_AMOUNT]);
    }

    return src ? (
        <Img
            src={src}
            style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transformOrigin: `${focus.x * 100}% ${focus.y * 100}%`,
                transform: `translateX(${translateX}%) scale(${scale})`,
            }}
        />
    ) : null;
};

const VideoSceneView: React.FC<{ scene: IVideoScene; src: string | undefined }> = ({ scene, src }) =>
    src ? (
        <Video
            src={src}
            trimBefore={Math.round(scene.trimStart * REEL_FPS)}
            volume={scene.keepAudio ? 1 : 0}
            muted={!scene.keepAudio}
            objectFit="cover"
            style={{ width: "100%", height: "100%" }}
        />
    ) : null;

const ThumbnailBackground: React.FC<{ ids: string[]; mediaUrls: Record<string, string>; media: IGeneratedMedia[] }> = ({ ids, mediaUrls, media }) => {
    const tiles = ids.filter((id) => mediaUrls[id]);
    if (tiles.length === 0) {
        return <AbsoluteFill style={{ backgroundImage: "linear-gradient(160deg, #4c1d95, #111827)" }} />;
    }
    return (
        <AbsoluteFill style={{ display: "flex", flexDirection: "column" }}>
            {tiles.map((id) => {
                const isVideo = media.find((m) => m.media_id === id)?.type === "video";
                return (
                    <div key={id} style={{ flex: 1, position: "relative", overflow: "hidden" }}>
                        {isVideo ? (
                            <Video src={mediaUrls[id]} muted volume={0} objectFit="cover" style={{ width: "100%", height: "100%" }} />
                        ) : (
                            <Img src={mediaUrls[id]} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        )}
                    </div>
                );
            })}
            <AbsoluteFill style={{ backgroundColor: "rgba(0,0,0,0.55)" }} />
        </AbsoluteFill>
    );
};

const textShadow = "0 6px 24px rgba(0,0,0,0.6)";

const ThumbnailText: React.FC<{ style: IThumbnailScene["style"]; text: string }> = ({ style, text }) => {
    const base: React.CSSProperties = { margin: 0, color: "#fff", fontFamily: FONT, textAlign: "center", textShadow };

    switch (style) {
        case "question":
            return (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
                    <div style={{ width: 170, height: 170, borderRadius: 85, backgroundColor: "#8b5cf6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: FONT, fontSize: 130, fontWeight: 900 }}>
                        ?
                    </div>
                    <p style={{ ...base, fontSize: 96, fontWeight: 800, lineHeight: 1.15 }}>{text}</p>
                </div>
            );
        case "stat":
            return (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
                    <p style={{ ...base, color: "#facc15", fontSize: 190, fontWeight: 900, lineHeight: 1.05 }}>{text}</p>
                    <div style={{ width: 280, height: 12, borderRadius: 6, backgroundColor: "#facc15" }} />
                </div>
            );
        case "quote":
            return (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
                    <p style={{ ...base, fontFamily: "Georgia, serif", fontSize: 260, lineHeight: 0.8, color: "#c4b5fd" }}>“</p>
                    <p style={{ ...base, fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: 88, fontWeight: 600, lineHeight: 1.25 }}>{text}</p>
                </div>
            );
        case "versus": {
            const parts = text.split(/\s+(?:vs\.?|v\/s)\s+/i);
            if (parts.length === 2) {
                return (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
                        <p style={{ ...base, fontSize: 110, fontWeight: 900, textTransform: "uppercase" }}>{parts[0]}</p>
                        <div style={{ width: 130, height: 130, borderRadius: 65, backgroundColor: "#ef4444", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: FONT, fontSize: 56, fontWeight: 900 }}>
                            VS
                        </div>
                        <p style={{ ...base, fontSize: 110, fontWeight: 900, textTransform: "uppercase" }}>{parts[1]}</p>
                    </div>
                );
            }
            return <p style={{ ...base, fontSize: 120, fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1 }}>{text}</p>;
        }
        case "action":
            return (
                <div style={{ transform: "rotate(-4deg)", backgroundColor: "#ef4444", padding: "28px 56px", borderRadius: 16 }}>
                    <p style={{ ...base, textShadow: "none", fontSize: 112, fontWeight: 900, fontStyle: "italic", textTransform: "uppercase", lineHeight: 1.1 }}>{text}</p>
                </div>
            );
        default:
            return <p style={{ ...base, fontSize: 124, fontWeight: 900, textTransform: "uppercase", lineHeight: 1.1 }}>{text}</p>;
    }
};

const ThumbnailSceneView: React.FC<{ scene: IThumbnailScene; props: IReelCompositionProps }> = ({ scene, props }) => {
    const frame = useCurrentFrame();
    const thumbnail = resolveThumbnail(scene.thumbnail_id, props.thumbnails);
    const enter = interpolate(frame, [0, 14], [0.7, 1], { extrapolateRight: "clamp" });
    const position = scene.text_position ?? "center";

    return (
        <>
            <ThumbnailBackground ids={scene.background_media_ids ?? []} mediaUrls={props.mediaUrls} media={props.media} />
            {thumbnail?.text && (
                <AbsoluteFill
                    style={{
                        alignItems: "center",
                        justifyContent: position === "top" ? "flex-start" : position === "bottom" ? "flex-end" : "center",
                        padding: position === "top" ? "240px 80px 0" : position === "bottom" ? "0 80px 260px" : "0 80px",
                        opacity: enter,
                        transform: `translateY(${interpolate(enter, [0.7, 1], [30, 0])}px)`,
                    }}
                >
                    <ThumbnailText style={scene.style} text={thumbnail.text} />
                </AbsoluteFill>
            )}
        </>
    );
};

const ReelComposition: React.FC<IReelCompositionProps> = (props) => {
    const { storyboard, mediaUrls } = props;
    const totalStops = storyboard.scenes.reduce((max, scene) => Math.max(max, scene.route_stop ?? 0), 0);
    const starts = storyboard.scenes.map((_, i) => storyboard.scenes.slice(0, i).reduce((sum, s) => sum + sceneFrames(s), 0));

    return (
        <AbsoluteFill style={{ backgroundColor: "#000" }}>
            {storyboard.scenes.map((scene, index) => {
                const frames = sceneFrames(scene);
                const start = starts[index];
                const key = `${scene.type === "thumbnail" ? scene.thumbnail_id : scene.media_id}-${index}`;

                return (
                    <Sequence key={key} from={start} durationInFrames={frames}>
                        <SceneFrame transition={scene.transition} isFirst={index === 0}>
                            {scene.type === "image" && <ImageSceneView scene={scene} src={mediaUrls[scene.media_id]} />}
                            {scene.type === "video" && <VideoSceneView scene={scene} src={mediaUrls[scene.media_id]} />}
                            {scene.type === "thumbnail" && <ThumbnailSceneView scene={scene} props={props} />}
                            {scene.type !== "thumbnail" && <Caption text={scene.caption} />}
                            <RouteStops current={scene.route_stop} total={totalStops} />
                        </SceneFrame>
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    );
};

export default ReelComposition;
