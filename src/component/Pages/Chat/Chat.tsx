import React from 'react';
import type IChat from './IChat';
import Header from './Header/Header';
import JourneyPannel from './JourneyPannel/JourneyPannel';
import ChatBox from './ChatBox/ChatBox';

const Chat : React.FC<IChat> = () => {
    return (
        <div className="w-full ">
            <Header/>
            <div className="flex w-full">
                <ChatBox/>
                <JourneyPannel/>
            </div>
        </div>
    );
};

export default Chat;