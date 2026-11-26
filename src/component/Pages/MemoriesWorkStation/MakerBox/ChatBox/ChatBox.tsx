import React from "react";
import type IChatBox from "./IChatBox";
import { useGetMemoriesWorkStationContext } from "../../MemoriesWorkStation";
import AnalysicMessage from "./AnalysicMessage/AnalysicMessage";
import Template from "./Template/Template";
import ProgressPage from "./ProgressPage/ProgressPage";
import Script from "./Script/Script";
import { SlSettings } from "react-icons/sl";

const ChatBox: React.FC<IChatBox> = () => {
    const { isAnalyzingCompleted, roomChats, activtyRoom, memoriesData, isReelGenerating } = useGetMemoriesWorkStationContext();
    const { isAllAnalysisCompleted } = memoriesData || {};


    return (
        <section className="w-full min-w-0 p-2 sm:p-3">
            {(!activtyRoom && !isAllAnalysisCompleted && !isAnalyzingCompleted) && (
                <AnalysicMessage />
            )}

            {(!activtyRoom && (isAllAnalysisCompleted || isAnalyzingCompleted)) && (
                <ProgressPage />
            )}

            {(activtyRoom && roomChats?.length === 0) && (
                <section className="min-w-0 lg:h-[800px] lg:overflow-y-auto">
                    <Template />
                    {isReelGenerating && (
                        <div role="status" className="my-3 flex items-center justify-center gap-2 text-zinc-300">
                            <SlSettings aria-hidden="true" className="animate-rotate-360 text-base motion-reduce:animate-none" />
                            <p className="text-xs">Generating Reel...</p>
                        </div>
                    )}
                    <Script />
                </section>
            )}
        </section>
    )
}

export default ChatBox;