import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type IMemoriesData from "../Interface/DataInterface/IMemoriesData";
const SERVER_URL = "http://localhost:3000/memories";
const socket = io(SERVER_URL, { autoConnect: false });

import type { INotifyConfig } from "../Interface/DataInterface/INotificationConfig";
const useMemoriesSocketAction = (setNotifyConfig : React.Dispatch<React.SetStateAction<INotifyConfig | undefined>>) => {
  const { workId } = useParams();
  const { userID : userId } = useSelector((state: any) => state.userDetails);
  const [memoryDetails, setMemoryDetails] = useState<IMemoriesData | null>(null);


  const handleDetails = (data: IMemoriesData) => {
    console.log("Memory Details:", data);
    setMemoryDetails(data);
  };

  const handleError = (error: unknown) => {
    console.error("Memory Details Error:", error);
  };
  
  const roomUsers = (data: unknown) => {
    console.log("Room Users:", data);
  };

  const notifyChangePlaceSuccess = () => {
    console.log("Change Place In Memory Success");
    setNotifyConfig({
      type: "success",
      message: "Change Place In Memory Success",
      open: true,
      pos:"top-left",
      duration: 2000
    });
  };

  const changePlaces = async (places : string[]) => {
    console.log("Changed Places:", places);
    socket.emit("room:changePlaceInMemory", {
      id:memoryDetails?.id,
      placeName: places.join(",")
    })
  };

  useEffect(() => {
    if(!userId) return;
    if(!workId) return;
    
    socket.on("room:memoryDetails", handleDetails);
    socket.on("room:memoryDetails:error", handleError);
    socket.on("room:users", roomUsers);
    socket.on("room:changePlaceInMemory:success", notifyChangePlaceSuccess);

    socket.connect();
    socket.emit("room:join", {workId , userId });
    return () => {
      socket.off("room:memoryDetails", handleDetails);
      socket.off("room:memoryDetails:error", handleError);
      socket.off("room:users", roomUsers);
      socket.disconnect();
    };
  }, [workId , userId]);

  return { changePlaces , memoryDetails };
};

export default useMemoriesSocketAction;
