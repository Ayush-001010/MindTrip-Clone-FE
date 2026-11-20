import React from "react";
import type IChatBox from "./IChatBox";
import { useGetMemoriesWorkStationContext } from "../../MemoriesWorkStation";
import AnalysicMessage from "./AnalysicMessage/AnalysicMessage";
import Template from "./Template/Template";

const ChatBox: React.FC<IChatBox> = () => {
    const { isAnalyzingCompleted  , roomChats , activtyRoom } = useGetMemoriesWorkStationContext();

    return (
        <section className="w-full p-3">
            {!activtyRoom && (
                <AnalysicMessage isAnalyzingCompleted={isAnalyzingCompleted} />
            )}
            {( activtyRoom && roomChats?.length === 0) && (
                <Template />
            )}
        </section>
    )
}

export default ChatBox;