import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";
import type IUserInterface from "../Interface/DataInterface/IUserDetails";
import type INotificationConfig from "../Interface/DataInterface/INotificationConfig";

const useTripSocketAction = () => {
  const [notificationConfig , setNotificationConfig] = useState<INotificationConfig>({
    open: false,
    type: "",
    message: "",
    duration: undefined
  })

  const { tripId } = useParams();
  const userDetails = useSelector((state:any) => state.userDetails as IUserInterface);
  const SERVER_URL = "http://localhost:3000"; // change to your server URL

  const socket = io(SERVER_URL);

  socket.on("room:joined", (data : {userName: string}) => {
    const {userName}=data;
    console.log("User joined:", userName);
    if(userName !== userDetails.userName){
      setNotificationConfig({
        open: true,
        type: "userJoin",
        message: userName,
        duration: 3000
      });
    }
  });

  useEffect(()=>{
    if(userDetails.userName){
      console.log("Joining room with tripId:", tripId , " and userName:", userDetails.userName);
      socket.emit("room:join", { tripID: tripId, userID: "123", userName: userDetails.userName });
    }
  },[userDetails.userName])

  return { notificationConfig };
};

export default useTripSocketAction;
