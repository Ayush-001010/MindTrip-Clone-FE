import React, { useRef } from "react";
import type IMemoriesCard from "./IMemoriesCard";
import { Progress } from "antd";
import { FaCameraRetro, FaMapMarkerAlt, FaPlay } from "react-icons/fa";

const MemoriesCard: React.FC<IMemoriesCard> = ({ data , imageUrl, clickHandler }) => {
    const { uiType, name, numberOfPeopleWorkingCurrently, place, progress } = data;
    const isPolygon = uiType === "type2";
    const Icon = isPolygon ? FaPlay : FaCameraRetro;
    const pausedSwords = useRef<HTMLCanvasElement>(null);
    const isPaused = numberOfPeopleWorkingCurrently === 0;

    return (
        <section onClick={() => clickHandler(data)} aria-label={`${name} memory`} className="group cursor-pointer relative isolate h-64 w-full min-w-0 max-w-96 text-[#ced4da]">
            <svg viewBox="0 0 320 240" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 size-full text-[#495057] transition-colors duration-300 group-hover:text-[#868e96]" fill="none" aria-hidden="true">
                {isPolygon ? (
                    <polygon points="4,120 48,4 272,4 316,120 272,236 48,236" fill="#161a1d" fillOpacity="0.6" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                ) : (
                    <rect x="4" y="4" width="312" height="232" rx={8} fill="#161a1d" fillOpacity="0.6" stroke="currentColor" strokeWidth="2" />
                )}
            </svg>
            <div className={`relative flex h-full min-w-0 flex-col py-5 ${isPolygon ? "px-[17%]" : "px-6"}`}>
                <div className="flex h-11 shrink-0 items-center justify-between gap-2">
                    <p className="min-w-0 text-[10px] font-medium leading-4 text-zinc-400">
                        Total users live: <span className="font-semibold text-[#ced4da]">{numberOfPeopleWorkingCurrently}</span>
                    </p>
                    {imageUrl && (
                        <div key={imageUrl} className="size-11 shrink-0 rounded-lg border border-[#343a40] bg-[#161a1d] p-1">
                            <img
                                src={imageUrl}
                                alt="Clashing swords"
                                className={`${isPaused ? "hidden" : "block"} size-full object-contain`}
                                onLoad={(event) => {
                                    const canvas = pausedSwords.current;
                                    if (!canvas) return;
                                    const image = event.currentTarget;
                                    canvas.width = image.naturalWidth;
                                    canvas.height = image.naturalHeight;
                                    const context = canvas.getContext("2d");
                                    if (!context) {
                                        console.error("Unable to render the paused sword GIF.");
                                        return;
                                    }
                                    // GIFs cannot be paused directly; retain a static frame for idle cards.
                                    context.drawImage(image, 0, 0);
                                }}
                            />
                            <canvas
                                ref={pausedSwords}
                                role="img"
                                aria-label="Clashing swords paused — no live users"
                                className={`${isPaused ? "block" : "hidden"} size-full object-contain`}
                            />
                        </div>
                    )}
                </div>
                <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-2 py-2 text-center">
                    <Icon aria-hidden="true" className="size-12 shrink-0" />
                    <h2 title={name} className="line-clamp-2 w-full text-sm font-medium leading-5 wrap-anywhere text-zinc-200">{name}</h2>
                </div>
                <div className="flex shrink-0 items-center justify-between gap-3">
                    <p title={place || "No place added"} className="flex min-w-0 flex-1 items-center gap-1.5 text-xs text-zinc-400">
                        <FaMapMarkerAlt aria-hidden="true" className="size-3 shrink-0" />
                        <span className="truncate">{place || "No place added"}</span>
                    </p>
                    <div className="shrink-0">
                        <Progress
                            aria-label={`${name} progress`}
                            type="circle"
                            percent={progress}
                            size={40}
                            strokeWidth={8}
                            format={(percent) => <span className="text-[10px] font-semibold text-zinc-200">{percent}%</span>}
                            strokeColor="#ced4da"
                            railColor="#343a40"
                            className="block leading-none"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
};

export default MemoriesCard;