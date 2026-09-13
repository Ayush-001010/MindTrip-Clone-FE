import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";
import type IUserInterface from "../Interface/DataInterface/IUserDetails";
import type INotificationConfig from "../Interface/DataInterface/INotificationConfig";
import type IMessageTrip from "../Interface/DataInterface/IMessageTrip";

const useTripSocketAction = () => {
  const [notificationConfig , setNotificationConfig] = useState<INotificationConfig>({
    open: false,
    type: "",
    message: "",
    duration: undefined
  });
  const [messages, setMessages] = useState<Array<IMessageTrip>>([]);

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
      // setMessages(oldMessages);
      console.log(oldMessages.response.data)
      console.log("Old Messages:", JSON.parse(oldMessages.response.data[0].response));
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
        setMessages(prevMessages => [...prevMessages, obj]);
      })
  });

  const sendMessageHandler = async (userPrompt: string) => {
    console.log("User Message:", userPrompt);
    // room:chat
    socket.emit("room:chat", { tripID: tripId , userPrompt });
  }

  useEffect(()=>{
    if(userDetails.userName){
      socket.emit("room:join", { tripID: tripId, userID: "123", userName: userDetails.userName });
    }
  },[userDetails.userName]);

  useEffect(() => {
    setTimeout(() => {
      socket.emit("room:fetchOldChat", { tripID: tripId, userID: "123" });
      console.log("Fetching old chat for trip:", tripId);
    }, 3000);
  },[])

  return { notificationConfig, sendMessageHandler, messages };
};

export default useTripSocketAction;
