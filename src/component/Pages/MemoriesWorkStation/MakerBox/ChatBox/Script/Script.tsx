import React, { useEffect, useRef, useState } from "react";
import { canRenderMediaOnWeb, renderMediaOnWeb } from "@remotion/web-renderer";
import type IScript from "./IScript";
import { useGetMemoriesWorkStationContext } from "../../../MemoriesWorkStation";
import { downloadBlob, safeFileName } from "../../../../BlogVideoCreation/Reel/downloadFile";
import { REEL_COMPOSITION_HEIGHT, REEL_COMPOSITION_WIDTH } from "../../ReelBox/ReelBox";
import PlayerBox from "../../ReelBox/PlayerBox/PlayerBox";
import type IPlayerBox from "../../ReelBox/PlayerBox/IPlayerBox";
import { getGeneratedReelDurationInFrames } from "../../ReelBox/PlayerBox/reelTransitions";
import { applyReelAudioEdit } from "../../ReelBox/PlayerBox/reelAudio";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";

const placeholderScenes = [
    { src: null, reason: null, type: null },
    { src: null, reason: null, type: null },
    { src: null, reason: null, type: null },
    { src: null, reason: null, type: null },
];

const Script: React.FC<IScript> = () => {
    const { generatedReel, saveRoomScript, memoriesData, reelAudioEdit, activtyRoom } = useGetMemoriesWorkStationContext();
    const [scene, setScene] = useState<{ src: string | null, reason: string | null, type: "photo" | "video" | null }[]>([]);
    const [exportProgress, setExportProgress] = useState<number | null>(null);
    const [exportError, setExportError] = useState("");
    const exportRef = useRef<AbortController | null>(null);
    const exportReelRef = useRef<IPlayerBox["generatedReel"]>(null);
    const { userID, userName } = useSelector((state: any) => state.userDetails)

    useEffect(() => {
        setScene(
            generatedReel
                ? generatedReel.script?.scenes.map((item) => ({
                    src: item.src,
                    reason: item.reason ?? item.caption ?? null,
                    type: item.type,
                }))
                : placeholderScenes,
        );
    }, [generatedReel]);

    useEffect(() => {
        if (exportRef.current && generatedReel === exportReelRef.current) return;
        exportRef.current?.abort();
        exportRef.current = null;
        exportReelRef.current = null;
        setExportProgress(null);
        setExportError("");
    }, [generatedReel]);

    useEffect(() => {
        return () => {
            exportRef.current?.abort();
            exportRef.current = null;
            exportReelRef.current = null;
        };
    }, [activtyRoom]);

    const handleDownload = async () => {
        if (!generatedReel || exportRef.current) return;

        const controller = new AbortController();
        exportRef.current = controller;
        setExportProgress(0);
        setExportError("");

        try {
            const reelWithMusic = applyReelAudioEdit(generatedReel, reelAudioEdit);
            exportReelRef.current = reelWithMusic;
            const saved = await saveRoomScript(userID, userName, memoriesData?.place || "", reelWithMusic);
            if (controller.signal.aborted) return;
            if (!saved) {
                throw new Error("Could not save the reel before export. Please try again.");
            }
            const support = await canRenderMediaOnWeb({
                container: "mp4",
                width: REEL_COMPOSITION_WIDTH,
                height: REEL_COMPOSITION_HEIGHT,
                scale: 2,
            });
            if (controller.signal.aborted) return;
            if (!support.canRender) {
                throw new Error(support.issues.find((issue) => issue.severity === "error")?.message ?? "This browser cannot export MP4 videos.");
            }

            const inputProps: IPlayerBox = {
                storyBoard: null,
                audioUrl: null,
                generatedReel: reelWithMusic,
                audioEdit: reelAudioEdit,
                forExport: true,
            };
            const renderProps: Record<string, unknown> = { ...inputProps };
            const ExportPlayer: React.FC<Record<string, unknown>> = () => <PlayerBox {...inputProps} />;
            const { getBlob } = await renderMediaOnWeb({
                composition: {
                    id: "memories-reel",
                    component: ExportPlayer,
                    durationInFrames: getGeneratedReelDurationInFrames(reelWithMusic),
                    fps: reelWithMusic.script.fps,
                    width: REEL_COMPOSITION_WIDTH,
                    height: REEL_COMPOSITION_HEIGHT,
                    defaultProps: renderProps,
                },
                inputProps: renderProps,
                container: "mp4",
                scale: 2,
                signal: controller.signal,
                onProgress: ({ progress }) => {
                    if (!controller.signal.aborted) setExportProgress(progress);
                },
            });
            const blob = await getBlob();
            if (!controller.signal.aborted) {
                downloadBlob(blob, `${safeFileName(generatedReel.script.title)}.mp4`);
            }
        } catch (error) {
            if (!controller.signal.aborted) {
                console.error("Reel export failed:", error);
                const message = error instanceof Error ? error.message : "Could not export the reel. Please try again.";
                setExportError(
                    /error loading image with src|tainted due to cors|failed to fetch/i.test(message)
                        ? "Could not load reel media for export. Check the media URLs and allow this site's origin in the storage or CDN CORS settings."
                        : message,
                );
            }
        } finally {
            if (exportRef.current === controller) {
                exportRef.current = null;
                exportReelRef.current = null;
                setExportProgress(null);
            }
        }
    };

    return (
        <section className="mt-3 w-full rounded-xl border border-zinc-800 bg-zinc-950/80 p-3 shadow-md shadow-black/20">
            <header className="flex items-center justify-between gap-3">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-400">
                        Storyboard
                    </p>
                    <h2 className="mt-0.5 text-sm font-semibold text-zinc-100">
                        Reel Narrative
                    </h2>
                </div>
                {generatedReel && (
                    <span className="shrink-0 rounded-full border border-violet-400/20 bg-violet-500/10 px-2 py-1 text-[10px] font-medium text-violet-300">
                        {scene?.length} scenes
                    </span>
                )}
            </header>

            <section className="mt-3">
                {/* Not Working Yet */}
                <div className="flex w-full min-w-0 gap-2 overflow-x-auto pb-2" aria-label="Reel scenes">
                    {scene?.map((item, index) => (
                        <React.Fragment key={`${item.src ?? "placeholder"}-${index}`}>
                            <article className="group flex w-28 shrink-0 flex-col overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/70 transition hover:border-zinc-700">
                                <div className="relative h-16 w-full overflow-hidden border-b border-zinc-800 bg-zinc-950">
                                    {item.src && item.type === "video" ? (
                                        <video
                                            src={item.src}
                                            aria-label={item.reason || `Reel scene ${index + 1}`}
                                            muted
                                            playsInline
                                            preload="metadata"
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                                        />
                                    ) : item.src ? (
                                        <img
                                            src={item.src}
                                            alt={item.reason || `Reel scene ${index + 1}`}
                                            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                                        />
                                    ) : (
                                        <div className="flex h-full items-center justify-center">
                                            <span className="h-7 w-7 rounded-full border border-dashed border-zinc-700 bg-zinc-900" />
                                        </div>
                                    )}
                                    <span className="absolute left-1.5 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-950/80 px-1 text-[10px] font-semibold text-zinc-300 backdrop-blur-sm">
                                        {index + 1}
                                    </span>
                                </div>
                                <div className="min-h-10 px-2 py-2">
                                    <Tooltip title={item.reason || "Scene pending"}>
                                        <p className="line-clamp-2 text-[11px] leading-4 text-zinc-400">
                                            {item.reason || "Scene pending"}
                                        </p>
                                    </Tooltip>
                                </div>
                            </article>
                            {index + 1 < scene.length && (
                                <span aria-hidden="true" className="w-px shrink-0 self-stretch bg-violet-400/50" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </section>
            {!generatedReel && (
                <p className="mt-1 text-xs text-zinc-500" role="status">
                    Reel is not generated yet.
                </p>
            )}
            {exportError && <p role="alert" className="mt-2 text-xs text-zinc-300">{exportError}</p>}
            <section className="flex items-center justify-end gap-3">
                {exportProgress !== null && (
                    <button
                        type="button"
                        onClick={() => exportRef.current?.abort()}
                        className="text-xs text-zinc-400 underline transition hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-violet-400"
                    >
                        Cancel
                    </button>
                )}
                <button type="button" onClick={handleDownload} disabled={!generatedReel || exportProgress !== null} className="ml-auto cursor-pointer rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-400 disabled:active:scale-100">
                    {exportProgress !== null ? `Rendering ${Math.round(exportProgress * 100)}%` : "Download Reel"}
                </button>
            </section>
        </section>
    );
};

export default Script;