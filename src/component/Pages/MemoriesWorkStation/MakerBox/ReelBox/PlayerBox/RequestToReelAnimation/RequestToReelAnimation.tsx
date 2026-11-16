import React from "react";
import type IRequestToReelAnimation from "./IRequestToReelAnimation";
import { FaPaperPlane, FaUser } from "react-icons/fa";
import { FaRobot } from "react-icons/fa6";

const RequestToReelAnimation: React.FC<IRequestToReelAnimation> = ({ delivery, replyOpacity, messageOpacity , opacity }) => {
    return (
        <section className="relative h-full w-full overflow-hidden bg-zinc-950 text-zinc-100" style={{ opacity }}>
            <div className="absolute inset-x-0 top-24 px-7">
            </div>

            <div className="absolute inset-x-6 top-[43%] flex h-20 items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-zinc-600 bg-zinc-950 text-zinc-200 shadow-lg shadow-black/50">
                    <FaUser aria-hidden="true" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-zinc-600 bg-zinc-950 text-zinc-200 shadow-lg shadow-black/50">
                    <FaRobot aria-hidden="true" className="text-xl" />
                </div>
            </div>
            <div className="absolute inset-x-8 top-[56%] flex justify-between text-[9px] font-semibold uppercase tracking-wider text-zinc-400">
                <span>You</span>
                <span className="mr-2">AI</span>
            </div>

            <div
                className="absolute top-[43%] flex h-20 -translate-x-1/2 items-center"
                style={{ left: `${20 + delivery * 60}%`, opacity: messageOpacity }}
            >
                <span className="flex items-center gap-1.5 rounded-full border border-zinc bg-[#495057] px-3 py-1.5 text-[10px] font-semibold text-white shadow-lg shadow-black/40">
                    <FaPaperPlane aria-hidden="true" className="text-[7px]" />
                    Request Reel
                </span>
            </div>

            <div className="absolute right-6 top-[60%] w-60 max-w-[calc(100%-3rem)]" style={{ opacity: replyOpacity }}>
                <div className="rounded-2xl text-[10px] rounded-tr-sm border border-zinc-400/20 bg-zinc-900 px-4 py-3 leading-6 text-zinc-100">
                    Sit back and relax! I'm reviewing your photos and putting together your reel.
                </div>
            </div>
        </section>
    )
}

export default RequestToReelAnimation;