import React from "react";
import type IMessageBox from "./IMessageBox";
import Message from "../../../../Common/Message/Message";

const MessageBox : React.FC<IMessageBox> = ({messages}) => {
    return (
        <div>
            {messages.map((message, index) => <Message key={index} data={message}/>)}
        </div>
    )
};

export default MessageBox;