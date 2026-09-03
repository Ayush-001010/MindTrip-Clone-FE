import React from "react";
import type IChatBox from "./IChatBox";
import InputBox from "./InputBox/InputBox";

const ChatBox: React.FC<IChatBox> = () => {
    return (
        <div className="w-1/2 flex flex-col justify-between h-185">
            <div className="h-3/4">
                {/* Chat messages will be displayed here */}
            </div>
            <InputBox />
        </div>
    );
};

export default ChatBox;