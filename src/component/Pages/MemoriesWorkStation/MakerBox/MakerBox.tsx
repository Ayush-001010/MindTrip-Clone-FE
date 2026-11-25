import React from "react";
import type IMakerBox from "./IMakerBox";
import ReelBox from "./ReelBox/ReelBox";
import ChatBox from "./ChatBox/ChatBox";
import RoomBox from "./RoomBox/RoomBox";

const MakerBox: React.FC<IMakerBox> = () => {
    return (
        <section className="flex bg-[#161a1d] rounded-4xl ring ring-[#343a40]">
            <ReelBox />
            <ChatBox />
            <RoomBox />
        </section>
    )
}

export default MakerBox;