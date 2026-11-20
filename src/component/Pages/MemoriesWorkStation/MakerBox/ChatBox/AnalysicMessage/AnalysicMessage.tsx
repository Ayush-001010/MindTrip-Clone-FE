import React from "react";
import type { IAnalysicMessage } from "./IAnalysicMessage";

const AnalysicMessage: React.FC<IAnalysicMessage> = ({ isAnalyzingCompleted }) => {
    return (
        <section className="flex flex-col items-center justify-center w-full h-180">
            {!isAnalyzingCompleted && (
                <p className="text-sm text-center text-zinc-400">
                    Kindly sit back and relax while we analyse your photos and videos. Once it's done, you'll be ready to create amazing reels!
                </p>
            )}
            {isAnalyzingCompleted && (
                <p className="text-sm text-center text-zinc-400">
                    Analysis complete! Create a room and start transforming your photos and videos into amazing reels filled with unforgettable memories.
                </p>
            )}
        </section>
    )
};

export default AnalysicMessage;