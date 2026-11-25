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
        <section className="w-full p-3">
            {(!activtyRoom && !isAllAnalysisCompleted && !isAnalyzingCompleted) && (
                <AnalysicMessage />
            )}

            {(!activtyRoom && (isAllAnalysisCompleted || isAnalyzingCompleted)) && (
                <ProgressPage />
            )}

            {(activtyRoom && roomChats?.length === 0) && (
                <section className="overflow-y-auto h-[800px]">
                    <Template />
                    <div className="flex h-[120px] w-full flex-col items-center justify-center">
                        <div className="mt-1 h-[40px] w-5"></div>
                        <div className="my-2 rounded-lg border border-[#ced4da] p-2">
                            <SlSettings className={`text-lg text-[#ced4da] ${isReelGenerating ? "animate-rotate-360" : ""}`} />
                        </div>
                        <p className="text-sm text-[#ced4da]">{isReelGenerating ? "Generating Reel..." : ""}</p>
                        <div className="mb-1 h-[40px] w-5"></div>
                    </div>
                    <Script />
                </section>
            )}
        </section>
    )
}

export default ChatBox;