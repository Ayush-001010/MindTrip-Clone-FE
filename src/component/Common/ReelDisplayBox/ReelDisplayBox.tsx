import React, { useEffect, useState } from "react";
import type IReelDisplayBox from "./IReelDisplayBox";
import useReelAction from "../../../CustomHooks/useReelAction";
import type IReelData from "../../../Interface/DataInterface/IReelData";
import ReelByScript from "./ReelByScript/ReelByScript";
import type { IMemoriesGeneratedReel } from "../../../Interface/DataInterface/IMemoriesData";
import { IoLocationOutline, IoPersonOutline } from "react-icons/io5";

const ReelDisplayBox: React.FC<IReelDisplayBox> = ({ selectedPlace }) => {
    const { fetchReel } = useReelAction();
    const [reelDetails, setReelDetails] = useState<IReelData[]>([]);
    useEffect(() => {
        if (selectedPlace.placeName) {
            fetchReel(selectedPlace.placeName.split(",")[0]).then((response: { success: boolean, data?: IReelData[] }) => {
                console.log("Reel Response:", response);
                setReelDetails(response?.data || []);
            });
        }
    }, [selectedPlace])
    return (
        <section aria-label={`Reels for ${selectedPlace.placeName}`} className="max-h-[calc(100dvh-96px)] w-[min(300px,calc(100vw-2rem),calc(50dvh-56px))] space-y-3 overflow-y-auto rounded-2xl">
            {reelDetails.map((reel) => {
                if (!reel.script) return null;
                const creators = reel.userName.split("|").map(name => name.trim()).filter(Boolean).join(" · ");

                return (
                    <article key={reel.id} className="relative overflow-hidden rounded-2xl border border-white/15 bg-black shadow-xl shadow-black/50">
                        <ReelByScript storyBoard={JSON.parse(reel.script) as IMemoriesGeneratedReel} />
                        <div className="opacity-50 pointer-events-none absolute bottom-10 left-3 right-3 z-10 flex flex-col items-start gap-2 text-white [text-shadow:0_1px_4px_rgba(0,0,0,1)]">
                            <div className="flex max-w-full items-center gap-2">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white bg-[#000814]/80 shadow-md shadow-black/50">
                                    <IoPersonOutline aria-hidden="true" className="h-4 w-4" />
                                </span>
                                <p className="m-0 line-clamp-2 text-sm font-semibold leading-tight" title={creators}>
                                    {creators || "Unknown creator"}
                                </p>
                            </div>
                            <p className="m-0 flex max-w-full items-center gap-1 text-xs font-medium text-white">
                                <IoLocationOutline aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
                                <span className="truncate">{selectedPlace.placeName}</span>
                            </p>
                        </div>
                    </article>
                );
            })}
        </section>
    )
};

export default ReelDisplayBox;