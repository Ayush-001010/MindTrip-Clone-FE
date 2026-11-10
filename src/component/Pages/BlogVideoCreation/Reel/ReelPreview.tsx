import React, { useEffect, useRef, useState } from "react";
import { Player } from "@remotion/player";
import { canRenderMediaOnWeb, renderMediaOnWeb } from "@remotion/web-renderer";
import ReelComposition, { REEL_FPS, REEL_HEIGHT, REEL_WIDTH, totalReelFrames } from "./ReelComposition";
import type { IReelCompositionProps } from "./ReelComposition";
import type { IGenerateVideoResponse } from "./IStoryboard";
import { downloadBlob, safeFileName } from "./downloadFile";

interface IReelPreview {
    result: IGenerateVideoResponse;
    mediaUrls: Record<string, string>;
}

const buttonClass = "rounded-lg bg-violet-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-violet-400 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 disabled:cursor-not-allowed disabled:opacity-60";

const ReelPreview: React.FC<IReelPreview> = ({ result, mediaUrls }) => {
    const [progress, setProgress] = useState<number | null>(null);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const abortRef = useRef<AbortController | null>(null);

    // Cancel an in-flight export if the preview goes away.
    useEffect(() => () => abortRef.current?.abort(), []);

    const inputProps: IReelCompositionProps = {
        storyboard: result.storyboard,
        mediaUrls,
        media: result.media,
        thumbnails: result.thumbnails ?? [],
    };
    const durationInFrames = totalReelFrames(result.storyboard);
    const title = result.storyboard.title || result.tripTitle;
    const isRendering = progress !== null;

    const renderMp4 = async (props: IReelCompositionProps, muted: boolean, signal: AbortSignal): Promise<Blob> => {
        const { getBlob } = await renderMediaOnWeb({
            composition: { id: "reel", component: ReelComposition, durationInFrames, fps: REEL_FPS, width: REEL_WIDTH, height: REEL_HEIGHT, defaultProps: props },
            inputProps: props,
            container: "mp4",
            muted,
            signal,
            onProgress: ({ progress: value }) => setProgress(value),
        });
        return getBlob();
    };

    const handleDownload = async () => {
        if (isRendering) return;
        setError("");
        setNotice("");
        setProgress(0);
        const controller = new AbortController();
        abortRef.current = controller;
        const fileName = `${safeFileName(title)}.mp4`;

        try {
            const support = await canRenderMediaOnWeb({ container: "mp4", width: REEL_WIDTH, height: REEL_HEIGHT });
            if (!support.canRender) {
                setError(support.issues.find((issue) => issue.severity === "error")?.message ?? "This browser can't export MP4 videos. Try the latest Chrome.");
                return;
            }

            try {
                downloadBlob(await renderMp4(inputProps, false, controller.signal), fileName);
            } catch (firstError) {
                if (controller.signal.aborted) throw firstError;
                // Some browsers can't decode a clip's audio track; retry once without the original clip sound.
                console.warn("Reel export with sound failed, retrying without clip audio:", firstError);
                setProgress(0);
                const silentProps: IReelCompositionProps = {
                    ...inputProps,
                    storyboard: {
                        ...result.storyboard,
                        scenes: result.storyboard.scenes.map((scene) => (scene.type === "video" ? { ...scene, keepAudio: false } : scene)),
                    },
                };
                downloadBlob(await renderMp4(silentProps, true, controller.signal), fileName);
                setNotice("Downloaded without the original clip sound, because this browser couldn't decode it.");
            }
        } catch (err) {
            if (!controller.signal.aborted) {
                console.error("Reel export failed:", err);
                setError("Could not export the video. A clip may use a format this browser can't decode.");
            }
        } finally {
            abortRef.current = null;
            setProgress(null);
        }
    };

    return (
        <section className="flex flex-col items-center gap-3">
            <p className="text-sm font-semibold text-zinc-200">{title}</p>
            <section className="w-full max-w-xs overflow-hidden rounded-xl border border-zinc-800 bg-black shadow-md shadow-black/30">
                <Player
                    component={ReelComposition}
                    inputProps={inputProps}
                    durationInFrames={durationInFrames}
                    fps={REEL_FPS}
                    compositionWidth={REEL_WIDTH}
                    compositionHeight={REEL_HEIGHT}
                    controls
                    loop
                    style={{ width: "100%" }}
                />
            </section>
            {result.storyboard.music_mood && (
                <p className="text-xs text-zinc-500">Music mood: {result.storyboard.music_mood}</p>
            )}
            <section className="flex items-center gap-3">
                <button type="button" className={buttonClass} disabled={isRendering} onClick={handleDownload}>
                    {isRendering ? `Rendering ${Math.round((progress ?? 0) * 100)}%` : "⬇ Download MP4"}
                </button>
                {isRendering && (
                    <button type="button" className="text-xs text-zinc-400 underline hover:text-zinc-200" onClick={() => abortRef.current?.abort()}>
                        Cancel
                    </button>
                )}
            </section>
            {notice && <p className="max-w-xs text-center text-xs text-amber-300">{notice}</p>}
            {error && <p className="max-w-xs text-center text-xs text-red-400">{error}</p>}
        </section>
    );
};

export default ReelPreview;
