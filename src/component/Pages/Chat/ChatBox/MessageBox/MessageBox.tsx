import React from "react";
import type IMessageBox from "./IMessageBox";
import Message from "../../../../Common/Message/Message";
import { useChatContext } from "../../Chat";
import Loader from "./Loader/Loader";

const MessageBox : React.FC<IMessageBox> = ({messages}) => {
    const {isLoading} = useChatContext();

    return (
        <div>
            {messages.map((message, index) => <Message key={index} data={message}/>)}
            {isLoading && (
                <Loader />
            )}
        </div>
    )
};

export default MessageBox;