import React, { createContext, useContext, useEffect, useState } from 'react';
import type IFinalItineraryResponse from '../../../Interface/DataInterface/IFinalItineraryResponse';
import type IChat from './IChat';
import Header from './Header/Header';
import JourneyPannel from './JourneyPannel/JourneyPannel';
import ChatBox from './ChatBox/ChatBox';
import type { ISuggestedDestination } from '../../../Interface/DataInterface/ITripAPIResponse';
import useNotification from '../../../customHookWithUI/useNotification';
import type IMessageTrip from '../../../Interface/DataInterface/IMessageTrip';
import type { IItineraryPlan } from '../../../Interface/DataInterface/IItineraryOptions';
import useTripSocketAction from '../../../customHooks/useTripSocketAction';
import type { IHotelDetail } from '../../../Interface/DataInterface/IHotelSearchResponse';
import type ITripHotelData from '../../../Interface/DataInterface/ITripHotel';

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
    finalItinerary: IFinalItineraryResponse | null;
    setTripDate?: (startDate: Date, endDate: Date) => void;
    setTripBudget?: (budget: number) => void;
    addExpense?: (paidBy :{userId: number, userName: string} , totalAmount:number, title : string , category : string, spendAt: Date, splitMethod: "equal" | "percentage" | "custom" | "ratio",   splitAmong: {userId : number , userName : string , amount : number}[] ,  notes?: string) => void;
    searchHotelHandler?: () => void;
    showHotelInLocationPannel: boolean;
    setShowHotelInLocationPannel?: React.Dispatch<React.SetStateAction<boolean>>;
    showHotelDetails: IHotelDetail | null;
    setShowHotelDetails?: React.Dispatch<React.SetStateAction<IHotelDetail | null>>;
    addHotelToWishList?: (hotel : ITripHotelData) => void;
    bookHotelHandler?: (hotel : ITripHotelData) => void;
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
    finalItinerary: null,
    addExpense: (_paidBy :{userId: number, userName: string} , _totalAmount:number, _title : string , _category : string, _spendAt: Date, _splitMethod: "equal" | "percentage" | "custom" | "ratio",   _splitAmong: {userId : number , userName : string , amount : number}[] ,  _notes?: string) => {},
    showHotelInLocationPannel: false,
    showHotelDetails: null
});

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatContextProvider');
    }
    return context;
}

const Chat : React.FC<IChat> = () => {
    const { notificationConfig, sendMessageHandler, messages , isLoading, finalItinerary , setTripDate, setTripBudget, addExpense, searchHotelHandler , addHotelToWishList, bookHotelHandler } = useTripSocketAction();
    const [isSelectedLocation, setIsSelectedLocation] = useState<boolean>(false);
    const [locationLongitude, setLocationLongitude] = useState<number>(0);
    const [locationLatitude, setLocationLatitude] = useState<number>(0);
    const [showHotelInLocationPannel, setShowHotelInLocationPannel] = useState<boolean>(false);
    const [showHotelDetails , setShowHotelDetails] = useState<IHotelDetail | null>(null);
    const [destination, setDestination] = useState<ISuggestedDestination | null>(null);
    const [itineraryPlan , setItineraryPlan] = useState<IItineraryPlan | null>(null);
    const [isSelectedItineraryPlan, setIsSelectedItineraryPlan] = useState<boolean>(false);
    const notification = useNotification(notificationConfig.type, notificationConfig.message, notificationConfig.open, notificationConfig.duration);

    useEffect(() => {
        const aiMessage = localStorage.getItem("aiMessage");
        if (aiMessage) {
            const obj = JSON.parse(aiMessage);
            console.log("Object from localStorage:", obj);
            if(obj.createdAt ) {
                // Please check createdAt much be lessthan 1 minute from the current time
                const date = new Date(obj.createdAt);
                const now = new Date();
                const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);
                if(diffInMinutes < 1) {
                    console.log("AI message is less than 1 minute old:", obj);
                    sendMessageHandler(obj.text);
                }
            }
        }
    }, []);

    return (
        <ChatContext.Provider value={{isSelectedLocation,locationLongitude,locationLatitude,setIsSelectedLocation,setLocationLongitude,setLocationLatitude,destination,setDestination,sendMessageHandler,messages,itineraryPlan,setItineraryPlan,isSelectedItineraryPlan,setIsSelectedItineraryPlan , isLoading, finalItinerary , setTripDate, setTripBudget, addExpense, searchHotelHandler , showHotelInLocationPannel, setShowHotelInLocationPannel, showHotelDetails, setShowHotelDetails , addHotelToWishList, bookHotelHandler }}>
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