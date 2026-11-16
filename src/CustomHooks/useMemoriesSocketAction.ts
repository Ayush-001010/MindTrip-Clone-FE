import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type IMemoriesData from "../Interface/DataInterface/IMemoriesData";
import type { INotifyConfig } from "../Interface/DataInterface/INotificationConfig";
import useCommonAction from "./useCommonAction";
import APIService from "../Services/APIService";
const SERVER_URL = "http://localhost:3000/memories";
const socket = io(SERVER_URL, { autoConnect: false });

const useMemoriesSocketAction = (setNotifyConfig : React.Dispatch<React.SetStateAction<INotifyConfig | undefined>> , changeDropBoxHandler : (type: "open" | "close") => void) => {
  const { workId } = useParams();
  const { userID : userId } = useSelector((state: any) => state.userDetails);
  const [memoryDetails, setMemoryDetails] = useState<IMemoriesData | null>(null);
  const {} = useCommonAction();

  const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

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

  const addMedia = async (taggedFiles: { file: File[]; tag: string }[] , audioFiles : File[]) => {
    const apiInstance = new APIService();
    const addData : { memoryId: number; type: "pic" | "video" | "audio"; url: string; tag?: string } [] = [];

    await Promise.all(taggedFiles.map(async ({ file , tag }) => {
        const fileType = file[0].type;
        const fileName = "Memories/" +  file[0].name;
        // Upload Image To AWS S3
        const fileUploadResponse = await apiInstance.postRequest<any>("/common/getUploadedFileURL", {
            contentType:fileType,
            key:fileName,
        });
        
        console.log("File Upload Response:", fileUploadResponse);
        await delay(1000);
        if(fileUploadResponse.success){
          await apiInstance.uploadFileToS3(fileUploadResponse.data, file[0], fileType)
          addData.push({
            memoryId: memoryDetails?.id!,
            type: fileType.startsWith("image/") ? "pic" : "video",
            url: fileName,
            tag: tag || ""
          });
        }
    }));

    await Promise.all(audioFiles.map(async (file) => {
        const fileType = file.type;
        const fileName = "Memories/" +  file.name;
        // Upload Audio To AWS S3
        const fileUploadResponse = await apiInstance.postRequest<any>("/common/getUploadedFileURL", {
            contentType:fileType,
            key:fileName,
        });
        
        console.log("Audio Upload Response:", fileUploadResponse);
        await delay(1000);
        if(fileUploadResponse.success){
          addData.push({
            memoryId: memoryDetails?.id!,
            type: "audio",
            url: fileName
          });
        }
    }));

    socket.emit("room:addMediaToMemory" , addData);
  }

  const handleAddMediaSuccess = (data: any) => {
    console.log("Add Media Success:", data);
    setNotifyConfig({
      type: "success",
      message: "Media added successfully",
      open: true,
      duration: 1500,
      pos: "top-left"
    });
    changeDropBoxHandler("close");
  };

  useEffect(() => {
    if(!userId) return;
    if(!workId) return;
    
    socket.on("room:memoryDetails", handleDetails);
    socket.on("room:memoryDetails:error", handleError);
    socket.on("room:users", roomUsers);
    socket.on("room:changePlaceInMemory:success", notifyChangePlaceSuccess);
    socket.on("room:addMediaToMemory:success", handleAddMediaSuccess);

    socket.connect();
    socket.emit("room:join", {workId , userId });
    return () => {
      socket.off("room:memoryDetails", handleDetails);
      socket.off("room:memoryDetails:error", handleError);
      socket.off("room:users", roomUsers);
      socket.off("room:addMediaToMemory:success", handleAddMediaSuccess);
      socket.disconnect();
    };
  }, [workId , userId]);

  return { changePlaces , memoryDetails , addMedia };
};

export default useMemoriesSocketAction;
