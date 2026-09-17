import React, { createContext, useContext, useState } from 'react';
import useTripSocketAction from '../../../customHooks/useTripSocketAction';
import type IChat from './IChat';
import Header from './Header/Header';
import JourneyPannel from './JourneyPannel/JourneyPannel';
import ChatBox from './ChatBox/ChatBox';
import type { ISuggestedDestination } from '../../../Interface/DataInterface/ITripAPIResponse';
import useNotification from '../../../customHookWithUI/useNotification';
import type IMessageTrip from '../../../Interface/DataInterface/IMessageTrip';
import type { IItineraryPlan } from '../../../Interface/DataInterface/IItineraryOptions';

export interface IChatContext {
    isSelectedLocation: boolean;
    locationLongitude: number;
    locationLatitude: number;
    setIsSelectedLocation?: React.Dispatch<React.SetStateAction<boolean>>;
    setLocationLongitude?: React.Dispatch<React.SetStateAction<number>>;
    setLocationLatitude?: React.Dispatch<React.SetStateAction<number>>;
    destination:ISuggestedDestination | null;
    setDestination?: React.Dispatch<React.SetStateAction<ISuggestedDestination | null>>;
    sendMessageHandler : (message: string) => Promise<void>;
    messages:Array<IMessageTrip>
    itineraryPlan: IItineraryPlan | null;
    setItineraryPlan?: React.Dispatch<React.SetStateAction<IItineraryPlan | null>>;
    isSelectedItineraryPlan: boolean;
    setIsSelectedItineraryPlan?: React.Dispatch<React.SetStateAction<boolean>>;
    isLoading: boolean;
}

const ChatContext = createContext<IChatContext>({
    isSelectedLocation: false,
    locationLongitude: 0,
    locationLatitude: 0,
    destination:null,
    sendMessageHandler: async (_: string) => {},
    messages: [],
    itineraryPlan: null,
    isSelectedItineraryPlan: false,
    isLoading: false,
});

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatContextProvider');
    }
    return context;
}

const Chat : React.FC<IChat> = () => {
    const { notificationConfig, sendMessageHandler, messages , isLoading } = useTripSocketAction();
    const [isSelectedLocation, setIsSelectedLocation] = useState<boolean>(false);
    const [locationLongitude, setLocationLongitude] = useState<number>(0);
    const [locationLatitude, setLocationLatitude] = useState<number>(0);
    const [destination, setDestination] = useState<ISuggestedDestination | null>(null);
    const [itineraryPlan , setItineraryPlan] = useState<IItineraryPlan | null>(null);
    const [isSelectedItineraryPlan, setIsSelectedItineraryPlan] = useState<boolean>(false);
    const notification = useNotification(notificationConfig.type, notificationConfig.message, notificationConfig.open, notificationConfig.duration);

    return (
        <ChatContext.Provider value={{isSelectedLocation,locationLongitude,locationLatitude,setIsSelectedLocation,setLocationLongitude,setLocationLatitude,destination,setDestination,sendMessageHandler,messages,itineraryPlan,setItineraryPlan,isSelectedItineraryPlan,setIsSelectedItineraryPlan , isLoading }}>
            <div className="w-full ">
                {notification}
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