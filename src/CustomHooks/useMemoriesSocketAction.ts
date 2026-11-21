import { io } from "socket.io-client";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type IMemoriesData from "../Interface/DataInterface/IMemoriesData";
import type { IMemoriesChat, IMemoriesGeneratedReel, IMemoriesReelAnalysisBatch, IMemoriesReelScene, IMemoryMusicData } from "../Interface/DataInterface/IMemoriesData";
import type { INotifyConfig } from "../Interface/DataInterface/INotificationConfig";
import useCommonAction from "./useCommonAction";
import APIService from "../Services/APIService";
const SERVER_URL = "http://localhost:3000/memories";
const socket = io(SERVER_URL, { autoConnect: false });

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isReelScene = (value: unknown): value is IMemoriesReelScene => {
  if (!isRecord(value)) return false;
  return (
    (value.type === "photo" || value.type === "video") &&
    typeof value.index === "number" &&
    typeof value.clipId === "string" &&
    typeof value.mediaId === "number" &&
    typeof value.src === "string" &&
    value.src.length > 0 &&
    typeof value.durationInFrames === "number" &&
    Number.isFinite(value.durationInFrames) &&
    value.durationInFrames > 0
  );
};

const isGeneratedReel = (value: unknown): value is IMemoriesGeneratedReel => {
  if (!isRecord(value) || !isRecord(value.script)) return false;
  const { script } = value;
  return (
    typeof script.version === "number" &&
    typeof script.title === "string" &&
    typeof script.template === "string" &&
    typeof script.mood === "string" &&
    typeof script.pace === "string" &&
    typeof script.fps === "number" &&
    Number.isFinite(script.fps) &&
    script.fps > 0 &&
    typeof script.width === "number" &&
    Number.isFinite(script.width) &&
    script.width > 0 &&
    typeof script.height === "number" &&
    Number.isFinite(script.height) &&
    script.height > 0 &&
    typeof script.durationSec === "number" &&
    Number.isFinite(script.durationSec) &&
    script.durationSec > 0 &&
    typeof script.durationInFrames === "number" &&
    Number.isFinite(script.durationInFrames) &&
    script.durationInFrames > 0 &&
    isRecord(script.audio) &&
    typeof script.audio.src === "string" &&
    script.audio.src.length > 0 &&
    Array.isArray(script.scenes) &&
    script.scenes.length > 0 &&
    script.scenes.every(isReelScene)
  );
};

const useMemoriesSocketAction = (setNotifyConfig : React.Dispatch<React.SetStateAction<INotifyConfig | undefined>> , changeDropBoxHandler : (type: "open" | "close") => void) => {
  const { workId } = useParams();
  const { userID : userId , userName } = useSelector((state: any) => state.userDetails);
  const [memoryDetails, setMemoryDetails] = useState<IMemoriesData | null>(null);
  const {} = useCommonAction();
  const [rooms , setRooms] = useState<string[]>([]);
  const [batchDetails , setBatchDetails] = useState<IMemoriesReelAnalysisBatch[] | null>(null);
  const [isAnalyzingCompleted, setIsAnalyzingCompleted] = useState<boolean>(false);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>(null);
  const [roomChats, setRoomChats] = useState<IMemoriesChat[] | null>(null);
  const [audioFiles, setAudioFiles] = useState<IMemoryMusicData[]>([]);
  const [generatedReel, setGeneratedReel] = useState<IMemoriesGeneratedReel | null>(null);
  const [isReelGenerating, setIsReelGenerating] = useState(false);

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
          await apiInstance.uploadFileToS3(fileUploadResponse.data, file, fileType)
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

  const sendCommentToAI = useCallback((comment : string) => {
    const memoryId = memoryDetails?.id;
    if (memoryId == null) {
      setNotifyConfig({
        type: "alert",
        message: "Memory details are not loaded yet. Please try again.",
        open: true,
        pos: "top-left"
      });
      return;
    }

    console.log("Sending comment to AI:", memoryId);
    socket.emit("room:reelGenerationConversation" , {
      memoryId,
      userMessage: comment,
      actionType: "Start",
      userName: userName
    })
  }, [memoryDetails?.id, userName, setNotifyConfig]);

  const handleAnalysisBatchStatus = (data: IMemoriesReelAnalysisBatch[]) => {
    setBatchDetails(data);
  };

  const handleReelGenerationConversationCompleted = (data: any) => {
    console.log("Reel Generation Conversation Completed:", data);
    setIsAnalyzingCompleted(true);
  };

  const handleAddRoom = (roomName: string) => {
    console.log("Adding room:", roomName);
    socket.emit("room:createMemoriesRoom", { name : roomName  , memoryId: memoryDetails?.id });
  };

  const handleCreateMemoriesRoomSuccess = (data: any) => {
    console.log("Create Memories Room Success:", data);
    setRooms((prevRooms : string[]) => [...prevRooms, data.name]);
    setNotifyConfig({
      type: "success",
      message: "Room created successfully",
      open: true,
      duration: 1500,
      pos: "top-left"
    });
  };

  const fetchRoomChatData = (roomId : number) => {
    console.log("Fetching room chat data for roomId:", roomId);
    setSelectedRoomId(roomId);
    socket.emit("room:fetchRoomChats", { roomId  });
  };
  
  const handleFetchRoomChatsSuccess = (data: any) => {
    console.log("Fetched room chats:", data);
    const chats = data.filter((chat: IMemoriesChat) => chat.roomId === selectedRoomId);
    setRoomChats(chats);
  };

  const fetchAudio = () => {
    socket.emit("room:fetchAudioInMemory",{memoryId: memoryDetails?.id})
  }

  const handleFetchAudioInMemorySuccess = (data: any) => {
    console.log("Fetched audio in memory:", data);
    setAudioFiles(data);
  };

  const handleReelCreationSuccess = (data: unknown) => {
    console.log("Reel creation success:", data);
    if (!isGeneratedReel(data)) {
      setIsReelGenerating(false);
      setNotifyConfig({
        type: "alert",
        message: "The reel response was incomplete. Please try creating it again.",
        open: true,
        pos: "top-left"
      });
      return;
    }

    setGeneratedReel(data);
    setIsReelGenerating(false);
    setNotifyConfig({
      type: "success",
      message: "Your reel is ready to preview",
      open: true,
      duration: 2000,
      pos: "top-left"
    });
  };

  const handleReelCreation = (template: "Journey" | "Mistory" | "Key Moment" | "Fast Clip", soundtrack: string, mood: "Happy" | "Fun" | "Relaxing"| "Romantic", pace: "Slow" | "Medium" | "Fast", place: string[], userSuggestion?: string, targetSeconds?: { min: number; max: number }) =>{
    const memoryId = memoryDetails?.id;
    if (memoryId == null) {
      setNotifyConfig({
        type: "alert",
        message: "Memory details are not loaded yet. Please try again.",
        open: true,
        pos: "top-left"
      });
      return;
    }

    setGeneratedReel(null);
    setIsReelGenerating(true);
    socket.emit("room:createReel", {
      memoryId,
      template,
      soundtrack,
      soundtrackTitle: soundtrack.split("/").pop()?.split(".")[0],
      mood,
      pace,
      place,
      userSuggestion,
      targetSeconds: targetSeconds ?? { min: 20, max: 50 }
    });
  }
  
  useEffect(() => {
    if(!userId) return;
    if(!workId) return;
    
    socket.on("room:memoryDetails", handleDetails);
    socket.on("room:memoryDetails:error", handleError);
    socket.on("room:users", roomUsers);
    socket.on("room:changePlaceInMemory:success", notifyChangePlaceSuccess);
    socket.on("room:addMediaToMemory:success", handleAddMediaSuccess);
    socket.on("room:analysisBatchStatus", handleAnalysisBatchStatus);
    socket.on("room:reelGenerationConversation:completed", handleReelGenerationConversationCompleted);
    socket.on("room:createMemoriesRoom:success", handleCreateMemoriesRoomSuccess);
    socket.on("room:fetchRoomChats:success", handleFetchRoomChatsSuccess);
    socket.on("room:fetchAudioInMemory:success", handleFetchAudioInMemorySuccess);
    socket.on("room:createReel:success", handleReelCreationSuccess);
    

    socket.connect();
    socket.emit("room:join", {workId , userId });
    return () => {
      socket.off("room:memoryDetails", handleDetails);
      socket.off("room:memoryDetails:error", handleError);
      socket.off("room:users", roomUsers);
      socket.off("room:changePlaceInMemory:success", notifyChangePlaceSuccess);
      socket.off("room:addMediaToMemory:success", handleAddMediaSuccess);
      socket.off("room:analysisBatchStatus", handleAnalysisBatchStatus);
      socket.off("room:reelGenerationConversation:completed", handleReelGenerationConversationCompleted);
      socket.off("room:createMemoriesRoom:success", handleCreateMemoriesRoomSuccess);
      socket.off("room:fetchRoomChats:success", handleFetchRoomChatsSuccess);
      socket.off("room:fetchAudioInMemory:success", handleFetchAudioInMemorySuccess);
      socket.off("room:createReel:success", handleReelCreationSuccess);

      socket.disconnect();
    };
  }, [workId , userId]);

  useEffect(() => {
    if(memoryDetails?.rooms) {
      setRooms(memoryDetails.rooms.map(room => room.name));
      fetchAudio();
    }
  },[memoryDetails?.rooms]);

  return { changePlaces , memoryDetails , addMedia , sendCommentToAI , rooms , batchDetails , isAnalyzingCompleted , handleAddRoom, fetchRoomChatData, roomChats, audioFiles, generatedReel, isReelGenerating, handleReelCreation };
};

export default useMemoriesSocketAction;
