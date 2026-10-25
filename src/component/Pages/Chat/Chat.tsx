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
import useTripAction from '../../../CustomHooks/useTripAction';
import { useParams } from 'react-router-dom';
import type IUserInterface from '../../../Interface/DataInterface/IUserDetails';
import { useSelector } from 'react-redux';
import type IGroupHubMessage from '../../../Interface/DataInterface/IGroupHubMessage';

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
    isTripAdmin: boolean;
    sendNewMessage?: (type : "announcement" | "medical-emergency" | "poll" | "opinion" | "check-ins" , message: IGroupHubMessage) => void;
    groupHubPosts: IGroupHubMessage[];
    createActionHandler: (type: "poll" | "opinion" | "default", title: string, option1?: string, option2?: string, option3?: string, option4?: string , imageUrl?: string) => void;
    createAction: {type: "poll" | "opinion" | "default", title: string, option1?: string, option2?: string, option3?: string, option4?: string, imageUrl?: string} | null;
    likeOrDislikeGroupHubPost: (postID: string, like: boolean) => Promise<any>;
    addCommentOnOpinion: ( postId: string, comment: string, parentOpinionCommentId?: string) => Promise<any>;
    checkInUpdate: ( id: number, status: string, reachWhen?: string) => Promise<any>;
    tripSuggestionsDate? : { startDate: Date | null, endDate: Date | null };
}

const ChatContext = createContext<IChatContext>({
    isSelectedLocation: false,
    locationLongitude: 0,
    locationLatitude: 0,
    destination:null,
    sendMessageHandler: async (_: string) => {},
    messages: [],
    groupHubPosts: [],
    createAction: null,
    itineraryPlan: null,
    isSelectedItineraryPlan: false,
    isLoading: false,
    finalItinerary: null,
    addExpense: (_paidBy :{userId: number, userName: string} , _totalAmount:number, _title : string , _category : string, _spendAt: Date, _splitMethod: "equal" | "percentage" | "custom" | "ratio",   _splitAmong: {userId : number , userName : string , amount : number}[] ,  _notes?: string) => {},
    showHotelInLocationPannel: false,
    showHotelDetails: null,
    isTripAdmin: false,
    sendNewMessage: async (_type : "announcement" | "medical-emergency" | "poll" | "opinion" | "check-ins" , _message: IGroupHubMessage) => {},
    createActionHandler: (type: "poll" | "opinion" | "default", title: string, option1?: string, option2?: string, option3?: string, option4?: string , imageUrl?: string) => {
        console.log(type, title, option1, option2, option3, option4, imageUrl);
    },
    likeOrDislikeGroupHubPost: async (_postID: string, _like: boolean) => {},
    addCommentOnOpinion: async (_opinionId: string, _comment: string, _parentOpinionCommentId?: string) => {},
    checkInUpdate: async (_id: number, _status: string, _reachWhen?: string) => {}
});

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatContextProvider');
    }
    return context;
}

const Chat : React.FC<IChat> = () => {
    const { notificationConfig, sendMessageHandler, messages , isLoading, finalItinerary , setTripDate, setTripBudget, addExpense, searchHotelHandler , addHotelToWishList, bookHotelHandler , sendNewMessage , tripSuggestionsDate } = useTripSocketAction();
    const [isSelectedLocation, setIsSelectedLocation] = useState<boolean>(false);
    const [locationLongitude, setLocationLongitude] = useState<number>(0);
    const [locationLatitude, setLocationLatitude] = useState<number>(0);
    const [showHotelInLocationPannel, setShowHotelInLocationPannel] = useState<boolean>(false);
    const [showHotelDetails , setShowHotelDetails] = useState<IHotelDetail | null>(null);
    const [destination, setDestination] = useState<ISuggestedDestination | null>(null);
    const [itineraryPlan , setItineraryPlan] = useState<IItineraryPlan | null>(null);
    const [isSelectedItineraryPlan, setIsSelectedItineraryPlan] = useState<boolean>(false);
    const [isTripAdmin, setIsTripAdmin] = useState<boolean>(false);
    const notification = useNotification(notificationConfig.type, notificationConfig.message, notificationConfig.open, notificationConfig.duration);
    const { isUserTripAdmin , fetchOldGroupHubPost , likeOrDislikeGroupHubPost , addCommentOnOpinion , checkInUpdate } = useTripAction();
    const { tripId } = useParams();
    const { userID } = useSelector((state: any) => state.userDetails as IUserInterface);
    const [groupHubPosts, setGroupHubPosts] = useState<IGroupHubMessage[]>([]);
    const [createAction , setCreateAction] = useState<{
        type: "poll" | "opinion",
        title: string,
        option1?: string,
        option2?: string,
        option3?: string,
        option4?: string,
        imageUrl?: string
    } | null>(null);

    const createActionHandler = (type: "poll" | "opinion" | "default", title: string, option1?: string, option2?: string, option3?: string, option4?: string , imageUrl?:string) => {
        if(type === "default") {
            setCreateAction(null);
            return;
        }else if(type === "poll"){
            setCreateAction({type,title,option1,option2,option3,option4});
        } else if(type === "opinion"){
            setCreateAction({type,title,imageUrl});
        }
    };

    useEffect(() => {
        const aiMessage = localStorage.getItem("aiMessage");
        if (aiMessage) {
            const obj = JSON.parse(aiMessage);
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

    useEffect(()=>{
        if(!tripId || !userID) {
            return;
        }
        isUserTripAdmin().then(response => {
            console.log("Is user trip admin:", response);
            if(response.success && response.data){
                setIsTripAdmin(true);
            }
        });
        fetchOldGroupHubPost().then((response:any) => {
            console.log("Old Group Hub Post:", response);
            if(response.success && response.data){
                setGroupHubPosts(response.data);
            }
        });
    },[tripId, userID]);

    return (
        <ChatContext.Provider value={{isSelectedLocation,locationLongitude,locationLatitude,setIsSelectedLocation,setLocationLongitude,setLocationLatitude,destination,setDestination,sendMessageHandler,messages,itineraryPlan,setItineraryPlan,isSelectedItineraryPlan,setIsSelectedItineraryPlan , isLoading, finalItinerary , setTripDate, setTripBudget, addExpense, searchHotelHandler , showHotelInLocationPannel, setShowHotelInLocationPannel, showHotelDetails, setShowHotelDetails , addHotelToWishList, bookHotelHandler , isTripAdmin , sendNewMessage , groupHubPosts, createActionHandler , createAction , likeOrDislikeGroupHubPost, addCommentOnOpinion , checkInUpdate , tripSuggestionsDate }}>
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