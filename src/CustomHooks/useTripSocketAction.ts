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
  const [isLoading , setIsLoading] = useState<boolean>(false);
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
  socket.on("room:chat-response",(response) => {
    const {data} = response;
    console.log(data);
    setMessages(prevMessages => [...prevMessages, data]);
    setIsLoading(false);
  })

  const sendMessageHandler = async (userPrompt: string) => {
    // room:chat
    socket.emit("room:chat", { tripID: tripId , userPrompt });
    setIsLoading(true);
  }

  useEffect(()=>{
    if(userDetails.userName){
      socket.emit("room:join", { tripID: tripId, userID: "123", userName: userDetails.userName });
    }
  },[userDetails.userName]);

  useEffect(() => {
    setTimeout(() => {
      socket.emit("room:fetchOldChat", { tripID: tripId, userID: "123" });
    }, 3000);
  },[])

  return { notificationConfig, sendMessageHandler, messages, isLoading };
};

export default useTripSocketAction;
