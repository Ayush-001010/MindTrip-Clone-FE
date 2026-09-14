import React, { useState } from "react";
import type IChatBox from "./IChatBox";
import { useChatContext } from "../Chat";
import InputBox from "./InputBox/InputBox";
import MessageBox from "./MessageBox/MessageBox";
import EmptyBox from "./EmptyBox/EmptyBox";

const ChatBox: React.FC<IChatBox> = () => {
    const [value, setValue] = useState<string>("");
    const { sendMessageHandler , messages } = useChatContext();
    
    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }
    const sendHandler = () => {
        sendMessageHandler(value);
        setValue("");
    }
    return (
        <div className="w-1/2 flex flex-col justify-between h-185">
            { messages.length !== 0 && (
            <div className="h-full mb-4 scrollbar-thin scrollbar-thumb-slate-900/60 scrollbar-track-slate-900/10  overflow-auto">
                <MessageBox messages={messages} />
            </div>
            )}
            {messages.length === 0 && <EmptyBox/>}
            <InputBox value={value} changeHandler={changeHandler} sendHandler={sendHandler} />
        </div>
    );
};

export default ChatBox;