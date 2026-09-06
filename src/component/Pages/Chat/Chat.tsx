import React, { createContext, useContext, useState } from 'react';
import type IChat from './IChat';
import Header from './Header/Header';
import JourneyPannel from './JourneyPannel/JourneyPannel';
import ChatBox from './ChatBox/ChatBox';
import type ITripAPIResponse from '../../../Interface/DataInterface/ITripAPIResponse';

export interface IChatContext {
    isSelectedLocation: boolean;
    locationLongitude: number;
    locationLatitude: number;
    setIsSelectedLocation?: React.Dispatch<React.SetStateAction<boolean>>;
    setLocationLongitude?: React.Dispatch<React.SetStateAction<number>>;
    setLocationLatitude?: React.Dispatch<React.SetStateAction<number>>;
    destination:ITripAPIResponse | null;
    setDestination?: React.Dispatch<React.SetStateAction<ITripAPIResponse | null>>;
}

const ChatContext = createContext<IChatContext>({
    isSelectedLocation: false,
    locationLongitude: 0,
    locationLatitude: 0,
    destination:null
});

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatContextProvider');
    }
    return context;
}

const Chat : React.FC<IChat> = () => {
    const [isSelectedLocation, setIsSelectedLocation] = useState<boolean>(false);
    const [locationLongitude, setLocationLongitude] = useState<number>(0);
    const [locationLatitude, setLocationLatitude] = useState<number>(0);
    const [destination, setDestination] = useState<ITripAPIResponse | null>(null);

    return (
        <ChatContext.Provider value={{
            isSelectedLocation,
            locationLongitude,
            locationLatitude,
            setIsSelectedLocation,
            setLocationLongitude,
            setLocationLatitude,
            destination,
            setDestination
        }}>
            <div className="w-full ">
                <Header/>
                <div className="flex w-full">
                    <ChatBox/>
                    <JourneyPannel/>
                </div>
            </div>
        </ChatContext.Provider>
    );
};

export default Chat;