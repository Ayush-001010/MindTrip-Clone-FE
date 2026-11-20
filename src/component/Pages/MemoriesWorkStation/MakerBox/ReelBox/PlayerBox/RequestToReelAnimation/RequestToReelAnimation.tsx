import React from "react";
import type IRequestToReelAnimation from "./IRequestToReelAnimation";
import { FaPaperPlane, FaUser } from "react-icons/fa";
import { FaCheck, FaGear, FaImage, FaLayerGroup, FaRobot, FaVideo, FaXmark } from "react-icons/fa6";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { useGetMemoriesWorkStationContext } from "../../../../MemoriesWorkStation";

const RequestToReelAnimation: React.FC<IRequestToReelAnimation> = ({ delivery, processingProgress, transferProgress, replyOpacity, messageOpacity , opacity }) => {
    const { batchDetails } = useGetMemoriesWorkStationContext();
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const batchCount = batchDetails?.length ?? 0;
    const processing = batchCount > 0 ? processingProgress : 0;
    const userOpacity = 1 - processing;
    const userX = 48 - processing * 20;
    const aiX = 296 - processing * 184;
    const showBatchTransfer = batchCount > 0 && transferProgress > 0;
    const gearRotation = (frame * 360 / fps) % 360;
    const graphHeight = Math.max(288, batchCount * 96);
    const centerY = graphHeight / 2;
    const getBatchProgress = (index: number) => Math.min(Math.max(transferProgress * batchCount - index, 0), 1);

    return (
        <section className="relative h-full w-full overflow-hidden bg-zinc-950 text-zinc-100" style={{ opacity }}>
            <div className="absolute inset-x-4 top-[18%] text-center">
                <p className="text-[11px] font-semibold text-zinc-200">
                    {processing > 0 ? "AI is organizing your memories" : replyOpacity > 0 ? "Your request has arrived" : "Send your memories to AI"}
                </p>
                <p className="mt-1 text-[9px] text-zinc-500">
                    {processing > 0 ? "Photos and videos grouped by tag" : replyOpacity > 0 ? "Let AI take it from here" : "Your reel starts with a request"}
                </p>
            </div>
            <div
                role="region"
                aria-label="Request to AI and batch creation flow"
                tabIndex={0}
                className="absolute inset-x-0 bottom-[16%] top-[28%] overflow-y-auto focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400"
            >
                <div className="relative w-full" style={{ height: graphHeight }}>
                    <svg
                        aria-hidden="true"
                        viewBox={`0 0 344 ${graphHeight}`}
                        preserveAspectRatio="none"
                        className="pointer-events-none absolute inset-0 h-full w-full fill-none"
                    >
                        <g opacity={userOpacity}>
                            <path d={`M ${userX + 20} ${centerY} H ${aiX - 20}`} className="stroke-zinc-700" strokeWidth="1.5" />
                            <path
                                d={`M ${userX + 20} ${centerY} H ${aiX - 20}`}
                                className="stroke-violet-400"
                                strokeWidth="1.5"
                                pathLength={1}
                                strokeDasharray={1}
                                strokeDashoffset={1 - delivery}
                            />
                        </g>
                        {showBatchTransfer && batchDetails?.map((batch, index) => {
                            const targetY = (graphHeight - batchCount * 96) / 2 + index * 96 + 48;

                            return (
                                <path
                                    key={`${batch.tagName}-${index}`}
                                    d={`M 132 ${centerY} H 174 V ${targetY} H 218`}
                                    className="stroke-violet-400/70"
                                    strokeWidth="1.5"
                                    strokeLinejoin="round"
                                    pathLength={1}
                                    strokeDasharray={1}
                                    strokeDashoffset={1 - getBatchProgress(index)}
                                />
                            );
                        })}
                    </svg>

                    <div
                        aria-hidden={userOpacity === 0}
                        className="absolute top-1/2 flex -translate-x-1/2 -translate-y-5 flex-col items-center gap-2"
                        style={{ left: `${userX / 344 * 100}%`, opacity: userOpacity }}
                    >
                        <div className="flex size-10 items-center justify-center rounded-full border border-zinc-600 bg-zinc-950 text-zinc-200">
                            <FaUser aria-hidden="true" />
                        </div>
                        <span className="text-[9px] font-semibold uppercase text-zinc-400">You</span>
                    </div>

                    <div
                        className="absolute top-1/2 flex -translate-x-1/2 -translate-y-5 flex-col items-center gap-2"
                        style={{ left: `${aiX / 344 * 100}%` }}
                    >
                        <div className="flex size-10 items-center justify-center rounded-full border border-violet-400/60 bg-zinc-950 text-violet-200 shadow-md shadow-violet-500/10">
                            <FaRobot aria-hidden="true" className="text-xl" />
                        </div>
                        <span className="text-[9px] font-semibold uppercase text-violet-300">AI</span>
                    </div>

                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-zinc-600 bg-zinc-900 p-1.5 text-[10px] text-zinc-100"
                        style={{ left: `${(userX + delivery * (aiX - userX)) / 344 * 100}%`, opacity: messageOpacity * userOpacity }}
                    >
                        <FaPaperPlane />
                    </div>
                    <span
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-12 whitespace-nowrap text-[8px] text-zinc-400"
                        style={{ opacity: messageOpacity * userOpacity }}
                    >
                        Request Reel
                    </span>

                    {showBatchTransfer && (
                        <div
                            aria-label="AI batch analysis status"
                            className="absolute left-[63.37%] top-1/2 flex w-[33.72%] -translate-y-1/2 flex-col gap-4"
                        >
                            {batchDetails?.map((batch, index) => {
                                const itemProgress = getBatchProgress(index);
                                const cardOpacity = Math.min(Math.max((itemProgress - 0.65) / 0.35, 0), 1);
                                const StatusIcon = batch.status === "pending" ? FaGear : batch.status === "completed" ? FaCheck : FaXmark;

                                return (
                                    <div
                                        key={`${batch.tagName}-${index}`}
                                        aria-hidden={cardOpacity === 0}
                                        className="flex h-20 shrink-0 flex-col justify-center gap-1 rounded-lg border border-zinc-700 bg-zinc-900 px-2 shadow-md shadow-black/30"
                                        style={{ opacity: cardOpacity }}
                                    >
                                        <span className="flex items-center gap-1 text-[8px] font-semibold uppercase tracking-wide text-violet-300">
                                            <FaLayerGroup aria-hidden="true" />
                                            Batch {index + 1}
                                        </span>
                                        <span title={batch.tagName} className="line-clamp-2 break-words text-[9px] font-medium leading-3 text-zinc-100">
                                            {batch.tagName}
                                        </span>
                                        <span className="flex items-center gap-1 text-[8px] capitalize text-zinc-400">
                                            <StatusIcon
                                                aria-hidden="true"
                                                className="shrink-0"
                                                style={batch.status === "pending" ? { transform: `rotate(${gearRotation}deg)` } : undefined}
                                            />
                                            {batch.status}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {showBatchTransfer && batchDetails?.map((batch, index) => {
                        const itemProgress = getBatchProgress(index);
                        if (itemProgress <= 0 || itemProgress >= 1) return null;

                        const targetY = (graphHeight - batchCount * 96) / 2 + index * 96 + 48;
                        const verticalDistance = Math.abs(targetY - centerY);
                        const distance = itemProgress * (42 + verticalDistance + 44);
                        const packetX = distance <= 42 ? 132 + distance : distance <= 42 + verticalDistance ? 174 : 174 + distance - 42 - verticalDistance;
                        const packetY = distance <= 42 ? centerY : distance <= 42 + verticalDistance ? centerY + Math.sign(targetY - centerY) * (distance - 42) : targetY;

                        return (
                            <div
                                key={`transfer-${batch.tagName}-${index}`}
                                aria-hidden="true"
                                className="pointer-events-none absolute z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 rounded-full border border-violet-400/40 bg-zinc-900 p-1.5 text-[9px] text-violet-200 shadow-lg shadow-black/40"
                                style={{
                                    left: `${packetX / 344 * 100}%`,
                                    top: packetY,
                                    opacity: Math.min(itemProgress * 8, (1 - itemProgress) * 8, 1),
                                }}
                            >
                                <FaImage />
                                <FaVideo />
                            </div>
                        );
                    })}
                </div>
            </div>
            {!showBatchTransfer && (
                <div
                    aria-hidden={replyOpacity * userOpacity === 0}
                    className="absolute inset-x-6 bottom-[8%] rounded-xl rounded-tr-sm border border-zinc-800 bg-zinc-900 px-3 py-2 text-[10px] leading-5 text-zinc-300"
                    style={{ opacity: replyOpacity * userOpacity }}
                >
                    <span className="mb-1 flex items-center gap-1.5 text-[9px] font-semibold text-violet-300">
                        <FaRobot aria-hidden="true" />
                        AI
                    </span>
                    Sit back and relax! I'm reviewing your photos and putting together your reel.
                </div>
            )}
        </section>
    )
}

export default RequestToReelAnimation;