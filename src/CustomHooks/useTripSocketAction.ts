import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";
import type IUserInterface from "../Interface/DataInterface/IUserDetails";
import type INotificationConfig from "../Interface/DataInterface/INotificationConfig";
import type IMessageTrip from "../Interface/DataInterface/IMessageTrip";
import type IFinalItineraryResponse from "../Interface/DataInterface/IFinalItineraryResponse";
import APIService from "../Services/APIService";

const useTripSocketAction = () => {
  const [notificationConfig , setNotificationConfig] = useState<INotificationConfig>({
    open: false,
    type: "",
    message: "",
    duration: undefined
  });
  const [isLoading , setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<IMessageTrip>>([]);
  const [finalItinerary, setFinalItinerary] = useState<IFinalItineraryResponse | null>(null);
  const [isFinalItineraryReceived, setIsFinalItineraryReceived] = useState<boolean>(false);

  const { tripId } = useParams();
  const userDetails = useSelector((state:any) => state.userDetails as IUserInterface);
  const SERVER_URL = "http://localhost:3000"; // change to your server URL
  const socket = io(SERVER_URL);

  socket.on("room:joined", (data : {userName: string}) => {
    const {userName}=data;
    if(userName !== userDetails.userName){
      setNotificationConfig({
        open: true,
        type: "userJoin",
        message: userName,
        duration: 3000
      });
    }
  });
  socket.on("room:oldChatDetails", (oldMessages: any) => {
    console.log("Received old chat details from server:", oldMessages);
      // setMessages(oldMessages);
      const {response} = oldMessages;
      response.data.forEach((message:any) =>{
        const obj: IMessageTrip = {
          ID: `${message.id}-messageKey`,
          userID: message.userID,
          tripID: message.tripID,
          message: message.message,
          timestamp: new Date(message.messageDate),
          response: JSON.parse(message.response)
        };
        if( obj.response && obj.response.type === "final-itinerary"){
          setIsFinalItineraryReceived(true);
        }
        setMessages(prevMessages => [...prevMessages, obj]);
      })
  });
  socket.on("room:chat-response",(response) => {
    const {data} = response;
    console.log(data);
    setMessages(prevMessages => [...prevMessages, data]);
    setIsLoading(false);
  });
  socket.on("room:setTripStartAndEnd-response" , (response) => {
    const { startDate, endDate } = response;
    console.log("Received trip dates from server:", response);
    setFinalItinerary(prev => {
      if (!prev) {
        return prev;
      }
      return { ...prev, startDate: new Date(startDate), endDate: new Date(endDate) };
    });
    setNotificationConfig(()=>{
      return {
        open: true,
        type: "alert",
        message: "Trip dates have been updated",
        duration: 3000
      };
    });
  });
  socket.on("room:setTripBudget-response", (response) => {
    const { budget } = response;
    console.log("Received trip budget from server:", budget);
    setNotificationConfig({
      open: true,
      type: "alert",
      message: "Trip budget has been updated",
      duration: 3000
    });
  });
  socket.on("room:addExpense-response", (response) => {
    console.log("Received add expense response from server:", response);
    const { success, data } = response;
    if(success){
      setNotificationConfig({
        open: true,
        type: "expense-added",
        message: data,
        duration: 3000
      });
    } else {
      setNotificationConfig({
        open: true,
        type: "error",
        message: "Failed to add expense",
        duration: 3000
      });
    }
  });

  const setTripDate = (startDate: Date, endDate: Date) => {
    console.log("Setting trip dates:", { startDate, endDate });
    socket.emit("room:setTripStartAndEnd", { tripID: tripId, startDate, endDate });
  };
  const setTripBudget = (budget: number) => {
    socket.emit("room:setTripBudget", { tripID: tripId, budget });
  };

  const sendMessageHandler = async (userPrompt: string) => {
    // room:chat
    socket.emit("room:chat", { tripID: tripId , userPrompt });
    setIsLoading(true);
  };

  useEffect(()=>{
    if(userDetails.userName){
      socket.emit("room:join", { tripID: tripId, userID: "123", userName: userDetails.userName });
    }
  },[userDetails.userName]);

  useEffect(() => {
    setTimeout(() => {
      console.log("Fetching old chat for trip:", tripId);
      socket.emit("room:fetchOldChat", { tripID: tripId, userID: "123" });
    }, 3000);
  },[]);

  const getFinalItinerary = async () => {
    // /trip/fetchFinalItinerary
    const apiServiceInstance = new APIService();
    const response = await apiServiceInstance.postRequest<any>("/trip/fetchFinalItinerary", { tripID: tripId });
    console.log(response);
    if(response && response.data){
      console.log("Processed trip itinerary dates:", response.data);
      setFinalItinerary({...(JSON.parse(response.data.tripItinerary) as IFinalItineraryResponse) , countUserOnTrip : response.data.countUserOnTrip , startDate: response.data.startDate, endDate: response.data.endDate , budget : response.data.budget });
    }
  };

  const addExpense = (paidBy :{userId: number, userName: string} , totalAmount:number, title : string , category : string, spendAt: Date, splitMethod: "equal" | "percentage" | "custom" | "ratio",   splitAmong: {userId : number , userName : string , amount : number}[] ,  notes?: string) => {
    // { tripID, paidBy, totalAmount, title, category, spendAt, splitMethod, splitAmong, notes }
    socket.emit("room:addExpense", { tripID: tripId, totalAmount, paidBy, title, category, spendAt, splitMethod, splitAmong, notes });
  } 

  useEffect(() => {
    if(isFinalItineraryReceived){
      getFinalItinerary();
    }
  }, [isFinalItineraryReceived]);

  return { notificationConfig, sendMessageHandler, messages, isLoading, finalItinerary , setTripDate, setTripBudget , addExpense };
};

export default useTripSocketAction;