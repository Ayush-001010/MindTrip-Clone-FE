import { io } from "socket.io-client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const SERVER_URL = "http://localhost:3000/memories";
const socket = io(SERVER_URL, { autoConnect: false });

const useMemoriesSocketAction = () => {
  const { workId } = useParams();
  const { userID : userId } = useSelector((state: any) => state.userDetails);

  const handleDetails = (data: unknown) => {
    console.log("Memory Details:", data);
  };

  const handleError = (error: unknown) => {
    console.error("Memory Details Error:", error);
  };
  
  const roomUsers = (data: unknown) => {
    console.log("Room Users:", data);
  };

  useEffect(() => {
    if(!userId) return;
    if(!workId) return;
    
    socket.on("room:memoryDetails", handleDetails);
    socket.on("room:memoryDetails:error", handleError);
    socket.on("room:users", roomUsers);

    socket.connect();
    socket.emit("room:join", {workId , userId });
    return () => {
      socket.off("room:memoryDetails", handleDetails);
      socket.off("room:memoryDetails:error", handleError);
      socket.off("room:users", roomUsers);
      socket.disconnect();
    };
  }, [workId , userId]);
};

export default useMemoriesSocketAction;
