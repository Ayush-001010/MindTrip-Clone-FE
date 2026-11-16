import React from "react";
import type IMakerBox from "./IMakerBox";
import ReelBox from "./ReelBox/ReelBox";
import ChatBox from "./ChatBox/ChatBox";

const MakerBox: React.FC<IMakerBox> = () => {
    return (
        <section className="flex">
            <ReelBox />
            <ChatBox />
        </section>
    )
}

export default MakerBox;