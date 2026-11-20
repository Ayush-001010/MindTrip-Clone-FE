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
    //  { "script": { "version": 1, "title": "Mountain Days, Golden Memories", "template": "Journey", "mood": "happy", "pace": "slow", "fps": 30, "width": 1080, "height": 1920, "durationSec": 22.588, "durationInFrames": 678, "audio": { "src": "https://d2uqdcpehc2tdl.cloudfront.net/Memories/Yellow.mp3", "startFromSec": 199.291, "bpm": 170 }, "scenes": [ { "index": 0, "clipId": "p17", "type": "photo", "mediaId": 17, "place": "Jibhi, Banjar, Himachal Pradesh, India", "src": "https://d2uqdcpehc2tdl.cloudfront.net/Memories/IMG_3950.jpeg", "startSec": 0, "endSec": 2.824, "fromFrame": 0, "durationInFrames": 85, "focalPoint": { "x": 0.39, "y": 0.68 }, "motion": "zoom-in", "caption": "Jibhi", "reason": "The couple beneath the tall waterfall creates an immediate, striking hook." }, { "index": 1, "clipId": "v29-0", "type": "video", "mediaId": 29, "place": "Jibhi, Banjar, Himachal Pradesh, India", "src": "https://d2uqdcpehc2tdl.cloudfront.net/Memories/IMG_8243.mov", "startSec": 2.824, "endSec": 5.647, "fromFrame": 85, "durationInFrames": 84, "trimStartSec": 3.083, "trimEndSec": 5.907, "playbackRate": 1, "reason": "The flowing river and forested slope add gentle scenic movement." }, { "index": 2, "clipId": "v12-0", "type": "video", "mediaId": 12, "place": "Jibhi, Banjar, Himachal Pradesh, India", "src": "https://d2uqdcpehc2tdl.cloudfront.net/Memories/DJI_20260514_133600_848_video.mov", "startSec": 5.647, "endSec": 8.471, "fromFrame": 169, "durationInFrames": 85, "trimStartSec": 1.381, "trimEndSec": 4.205, "playbackRate": 1, "reason": "The rocky trail footage gives the journey a clear sense of progress." }, { "index": 3, "clipId": "p13", "type": "photo", "mediaId": 13, "place": "Jibhi, Banjar, Himachal Pradesh, India", "src": "https://d2uqdcpehc2tdl.cloudfront.net/Memories/IMG_3992.jpeg", "startSec": 8.471, "endSec": 11.294, "fromFrame": 254, "durationInFrames": 85, "focalPoint": { "x": 0.55, "y": 0.55 }, "motion": "zoom-out", "reason": "The couple resting along the green trail adds a warm shared moment." }, { "index": 4, "clipId": "p11", "type": "photo", "mediaId": 11, "place": "Jibhi, Banjar, Himachal Pradesh, India", "src": "https://d2uqdcpehc2tdl.cloudfront.net/Memories/IMG_8174.jpeg", "startSec": 11.294, "endSec": 14.118, "fromFrame": 339, "durationInFrames": 85, "focalPoint": { "x": 0.32, "y": 0.48 }, "motion": "zoom-in", "reason": "The backward glance in the mountain clearing feels personal and joyful." }, { "index": 5, "clipId": "p8", "type": "photo", "mediaId": 8, "place": "Jibhi, Banjar, Himachal Pradesh, India", "src": "https://d2uqdcpehc2tdl.cloudfront.net/Memories/IMG_8103.jpeg", "startSec": 14.118, "endSec": 16.941, "fromFrame": 424, "durationInFrames": 84, "focalPoint": { "x": 0.49, "y": 0.55 }, "motion": "zoom-out", "reason": "The smiling portrait beside the waterfall brings a bright highlight." }, { "index": 6, "clipId": "p7", "type": "photo", "mediaId": 7, "place": "Manali, Manali, Himachal Pradesh, India", "src": "https://d2uqdcpehc2tdl.cloudfront.net/Memories/IMG_4152.jpeg", "startSec": 16.941, "endSec": 19.765, "fromFrame": 508, "durationInFrames": 85, "focalPoint": { "x": 0.52, "y": 0.65 }, "motion": "zoom-in", "caption": "Manali", "reason": "The hillside path and snowy peaks broaden the journey into Manali." }, { "index": 7, "clipId": "p30", "type": "photo", "mediaId": 30, "place": "Manali, Manali, Himachal Pradesh, India", "src": "https://d2uqdcpehc2tdl.cloudfront.net/Memories/IMG_4111.jpeg", "startSec": 19.765, "endSec": 22.588, "fromFrame": 593, "durationInFrames": 85, "focalPoint": { "x": 0.55, "y": 0.62 }, "motion": "zoom-out", "reason": "The glowing valley town beneath the evening sky provides a meaningful finale." } ], "pickedBy": "ai", "warnings": [] }, "music": { "durationSec": 268.25, "bpm": 170, "beats": [ 0.232, 0.585, 0.938, 1.291, 1.644, 1.997, 2.35, 2.703, 3.056, 3.409, 3.762, 4.115, 4.467, 4.82, 5.173, 5.526, 5.879, 6.232, 6.585, 6.938, 7.291, 7.644, 7.997, 8.35, 8.703, 9.056, 9.409, 9.762, 10.115, 10.467, 10.82, 11.173, 11.526, 11.879, 12.232, 12.585, 12.938, 13.291, 13.644, 13.997, 14.35, 14.703, 15.056, 15.409, 15.762, 16.115, 16.467, 16.82, 17.173, 17.526, 17.879, 18.232, 18.585, 18.938, 19.291, 19.644, 19.997, 20.35, 20.703, 21.056, 21.409, 21.762, 22.115, 22.467, 22.82, 23.173, 23.526, 23.879, 24.232, 24.585, 24.938, 25.291, 25.644, 25.997, 26.35, 26.703, 27.056, 27.409, 27.762, 28.115, 28.467, 28.82, 29.173, 29.526, 29.879, 30.232, 30.585, 30.938, 31.291, 31.644, 31.997, 32.35, 32.703, 33.056, 33.409, 33.762, 34.115, 34.467, 34.82, 35.173, 35.526, 35.879, 36.232, 36.585, 36.938, 37.291, 37.644, 37.997, 38.35, 38.703, 39.056, 39.409, 39.762, 40.115, 40.467, 40.82, 41.173, 41.526, 41.879, 42.232, 42.585, 42.938, 43.291, 43.644, 43.997, 44.35, 44.703, 45.056, 45.409, 45.762, 46.115, 46.467, 46.82, 47.173, 47.526, 47.879, 48.232, 48.585, 48.938, 49.291, 49.644, 49.997, 50.35, 50.703, 51.056, 51.409, 51.762, 52.115, 52.467, 52.82, 53.173, 53.526, 53.879, 54.232, 54.585, 54.938, 55.291, 55.644, 55.997, 56.35, 56.703, 57.056, 57.409, 57.762, 58.115, 58.467, 58.82, 59.173, 59.526, 59.879, 60.232, 60.585, 60.938, 61.291, 61.644, 61.997, 62.35, 62.703, 63.056, 63.409, 63.762, 64.115, 64.467, 64.82, 65.173, 65.526, 65.879, 66.232, 66.585, 66.938, 67.291, 67.644, 67.997, 68.35, 68.703, 69.056, 69.409, 69.762, 70.115, 70.467, 70.82, 71.173, 71.526, 71.879, 72.232, 72.585, 72.938, 73.291, 73.644, 73.997, 74.35, 74.703, 75.056, 75.409, 75.762, 76.115, 76.467, 76.82, 77.173, 77.526, 77.879, 78.232, 78.585, 78.938, 79.291, 79.644, 79.997, 80.35, 80.703, 81.056, 81.409, 81.762, 82.115, 82.467, 82.82, 83.173, 83.526, 83.879, 84.232, 84.585, 84.938, 85.291, 85.644, 85.997, 86.35, 86.703, 87.056, 87.409, 87.762, 88.115, 88.467, 88.82, 89.173, 89.526, 89.879, 90.232, 90.585, 90.938, 91.291, 91.644, 91.997, 92.35, 92.703, 93.056, 93.409, 93.762, 94.115, 94.467, 94.82, 95.173, 95.526, 95.879, 96.232, 96.585, 96.938, 97.291, 97.644, 97.997, 98.35, 98.703, 99.056, 99.409, 99.762, 100.115, 100.467, 100.82, 101.173, 101.526, 101.879, 102.232, 102.585, 102.938, 103.291, 103.644, 103.997, 104.35, 104.703, 105.056, 105.409, 105.762, 106.115, 106.467, 106.82, 107.173, 107.526, 107.879, 108.232, 108.585, 108.938, 109.291, 109.644, 109.997, 110.35, 110.703, 111.056, 111.409, 111.762, 112.115, 112.467, 112.82, 113.173, 113.526, 113.879, 114.232, 114.585, 114.938, 115.291, 115.644, 115.997, 116.35, 116.703, 117.056, 117.409, 117.762, 118.115, 118.467, 118.82, 119.173, 119.526, 119.879, 120.232, 120.585, 120.938, 121.291, 121.644, 121.997, 122.35, 122.703, 123.056, 123.409, 123.762, 124.115, 124.467, 124.82, 125.173, 125.526, 125.879, 126.232, 126.585, 126.938, 127.291, 127.644, 127.997, 128.35, 128.703, 129.056, 129.409, 129.762, 130.115, 130.467, 130.82, 131.173, 131.526, 131.879, 132.232, 132.585, 132.938, 133.291, 133.644, 133.997, 134.35, 134.703, 135.056, 135.409, 135.762, 136.115, 136.467, 136.82, 137.173, 137.526, 137.879, 138.232, 138.585, 138.938, 139.291, 139.644, 139.997, 140.35, 140.703, 141.056, 141.409, 141.762, 142.115, 142.467, 142.82, 143.173, 143.526, 143.879, 144.232, 144.585, 144.938, 145.291, 145.644, 145.997, 146.35, 146.703, 147.056, 147.409, 147.762, 148.115, 148.467, 148.82, 149.173, 149.526, 149.879, 150.232, 150.585, 150.938, 151.291, 151.644, 151.997, 152.35, 152.703, 153.056, 153.409, 153.762, 154.115, 154.467, 154.82, 155.173, 155.526, 155.879, 156.232, 156.585, 156.938, 157.291, 157.644, 157.997, 158.35, 158.703, 159.056, 159.409, 159.762, 160.115, 160.467, 160.82, 161.173, 161.526, 161.879, 162.232, 162.585, 162.938, 163.291, 163.644, 163.997, 164.35, 164.703, 165.056, 165.409, 165.762, 166.115, 166.467, 166.82, 167.173, 167.526, 167.879, 168.232, 168.585, 168.938, 169.291, 169.644, 169.997, 170.35, 170.703, 171.056, 171.409, 171.762, 172.115, 172.467, 172.82, 173.173, 173.526, 173.879, 174.232, 174.585, 174.938, 175.291, 175.644, 175.997, 176.35, 176.703, 177.056, 177.409, 177.762, 178.115, 178.467, 178.82, 179.173, 179.526, 179.879, 180.232, 180.585, 180.938, 181.291, 181.644, 181.997, 182.35, 182.703, 183.056, 183.409, 183.762, 184.115, 184.467, 184.82, 185.173, 185.526, 185.879, 186.232, 186.585, 186.938, 187.291, 187.644, 187.997, 188.35, 188.703, 189.056, 189.409, 189.762, 190.115, 190.467, 190.82, 191.173, 191.526, 191.879, 192.232, 192.585, 192.938, 193.291, 193.644, 193.997, 194.35, 194.703, 195.056, 195.409, 195.762, 196.115, 196.467, 196.82, 197.173, 197.526, 197.879, 198.232, 198.585, 198.938, 199.291, 199.644, 199.997, 200.35, 200.703, 201.056, 201.409, 201.762, 202.115, 202.467, 202.82, 203.173, 203.526, 203.879, 204.232, 204.585, 204.938, 205.291, 205.644, 205.997, 206.35, 206.703, 207.056, 207.409, 207.762, 208.115, 208.467, 208.82, 209.173, 209.526, 209.879, 210.232, 210.585, 210.938, 211.291, 211.644, 211.997, 212.35, 212.703, 213.056, 213.409, 213.762, 214.115, 214.467, 214.82, 215.173, 215.526, 215.879, 216.232, 216.585, 216.938, 217.291, 217.644, 217.997, 218.35, 218.703, 219.056, 219.409, 219.762, 220.115, 220.467, 220.82, 221.173, 221.526, 221.879, 222.232, 222.585, 222.938, 223.291, 223.644, 223.997, 224.35, 224.703, 225.056, 225.409, 225.762, 226.115, 226.467, 226.82, 227.173, 227.526, 227.879, 228.232, 228.585, 228.938, 229.291, 229.644, 229.997, 230.35, 230.703, 231.056, 231.409, 231.762, 232.115, 232.467, 232.82, 233.173, 233.526, 233.879, 234.232, 234.585, 234.938, 235.291, 235.644, 235.997, 236.35, 236.703, 237.056, 237.409, 237.762, 238.115, 238.467, 238.82, 239.173, 239.526, 239.879, 240.232, 240.585, 240.938, 241.291, 241.644, 241.997, 242.35, 242.703, 243.056, 243.409, 243.762, 244.115, 244.467, 244.82, 245.173, 245.526, 245.879, 246.232, 246.585, 246.938, 247.291, 247.644, 247.997, 248.35, 248.703, 249.056, 249.409, 249.762, 250.115, 250.467, 250.82, 251.173, 251.526, 251.879, 252.232, 252.585, 252.938, 253.291, 253.644, 253.997, 254.35, 254.703, 255.056, 255.409, 255.762, 256.115, 256.467, 256.82, 257.173, 257.526, 257.879, 258.232, 258.585, 258.938, 259.291, 259.644, 259.997, 260.35, 260.703, 261.056, 261.409, 261.762, 262.115, 262.467, 262.82, 263.173, 263.526, 263.879, 264.232, 264.585, 264.938, 265.291, 265.644, 265.997, 266.35, 266.703, 267.056, 267.409, 267.762, 268.115 ], "bars": [ { "startSec": 0.232, "endSec": 1.644, "energy": 0.11 }, { "startSec": 1.644, "endSec": 3.056, "energy": 0.11 }, { "startSec": 3.056, "endSec": 4.467, "energy": 0.14 }, { "startSec": 4.467, "endSec": 5.879, "energy": 0.12 }, { "startSec": 5.879, "endSec": 7.291, "energy": 0.21 }, { "startSec": 7.291, "endSec": 8.703, "energy": 0.22 }, { "startSec": 8.703, "endSec": 10.115, "energy": 0.23 }, { "startSec": 10.115, "endSec": 11.526, "energy": 0.14 }, { "startSec": 11.526, "endSec": 12.938, "energy": 0.67 }, { "startSec": 12.938, "endSec": 14.35, "energy": 0.69 }, { "startSec": 14.35, "endSec": 15.762, "energy": 0.71 }, { "startSec": 15.762, "endSec": 17.173, "energy": 0.73 }, { "startSec": 17.173, "endSec": 18.585, "energy": 0.81 }, { "startSec": 18.585, "endSec": 19.997, "energy": 0.75 }, { "startSec": 19.997, "endSec": 21.409, "energy": 0.75 }, { "startSec": 21.409, "endSec": 22.82, "energy": 0.74 }, { "startSec": 22.82, "endSec": 24.232, "energy": 0.75 }, { "startSec": 24.232, "endSec": 25.644, "energy": 0.76 }, { "startSec": 25.644, "endSec": 27.056, "energy": 0.74 }, { "startSec": 27.056, "endSec": 28.467, "energy": 0.73 }, { "startSec": 28.467, "endSec": 29.879, "energy": 0.67 }, { "startSec": 29.879, "endSec": 31.291, "energy": 0.66 }, { "startSec": 31.291, "endSec": 32.703, "energy": 0.71 }, { "startSec": 32.703, "endSec": 34.115, "energy": 0.69 }, { "startSec": 34.115, "endSec": 35.526, "energy": 0.64 }, { "startSec": 35.526, "endSec": 36.938, "energy": 0.57 }, { "startSec": 36.938, "endSec": 38.35, "energy": 0.66 }, { "startSec": 38.35, "endSec": 39.762, "energy": 0.64 }, { "startSec": 39.762, "endSec": 41.173, "energy": 0.5 }, { "startSec": 41.173, "endSec": 42.585, "energy": 0.49 }, { "startSec": 42.585, "endSec": 43.997, "energy": 0.6 }, { "startSec": 43.997, "endSec": 45.409, "energy": 0.52 }, { "startSec": 45.409, "endSec": 46.82, "energy": 0.48 }, { "startSec": 46.82, "endSec": 48.232, "energy": 0.45 }, { "startSec": 48.232, "endSec": 49.644, "energy": 0.65 }, { "startSec": 49.644, "endSec": 51.056, "energy": 0.54 }, { "startSec": 51.056, "endSec": 52.467, "energy": 0.72 }, { "startSec": 52.467, "endSec": 53.879, "energy": 0.6 }, { "startSec": 53.879, "endSec": 55.291, "energy": 0.69 }, { "startSec": 55.291, "endSec": 56.703, "energy": 0.62 }, { "startSec": 56.703, "endSec": 58.115, "energy": 0.56 }, { "startSec": 58.115, "endSec": 59.526, "energy": 0.59 }, { "startSec": 59.526, "endSec": 60.938, "energy": 0.59 }, { "startSec": 60.938, "endSec": 62.35, "energy": 0.57 }, { "startSec": 62.35, "endSec": 63.762, "energy": 0.48 }, { "startSec": 63.762, "endSec": 65.173, "energy": 0.53 }, { "startSec": 65.173, "endSec": 66.585, "energy": 0.71 }, { "startSec": 66.585, "endSec": 67.997, "energy": 0.59 }, { "startSec": 67.997, "endSec": 69.409, "energy": 0.56 }, { "startSec": 69.409, "endSec": 70.82, "energy": 0.68 }, { "startSec": 70.82, "endSec": 72.232, "energy": 0.65 }, { "startSec": 72.232, "endSec": 73.644, "energy": 0.62 }, { "startSec": 73.644, "endSec": 75.056, "energy": 0.54 }, { "startSec": 75.056, "endSec": 76.467, "energy": 0.64 }, { "startSec": 76.467, "endSec": 77.879, "energy": 0.58 }, { "startSec": 77.879, "endSec": 79.291, "energy": 0.6 }, { "startSec": 79.291, "endSec": 80.703, "energy": 0.57 }, { "startSec": 80.703, "endSec": 82.115, "energy": 0.61 }, { "startSec": 82.115, "endSec": 83.526, "energy": 0.62 }, { "startSec": 83.526, "endSec": 84.938, "energy": 0.59 }, { "startSec": 84.938, "endSec": 86.35, "energy": 0.63 }, { "startSec": 86.35, "endSec": 87.762, "energy": 0.61 }, { "startSec": 87.762, "endSec": 89.173, "energy": 0.6 }, { "startSec": 89.173, "endSec": 90.585, "energy": 0.69 }, { "startSec": 90.585, "endSec": 91.997, "energy": 0.85 }, { "startSec": 91.997, "endSec": 93.409, "energy": 0.85 }, { "startSec": 93.409, "endSec": 94.82, "energy": 0.79 }, { "startSec": 94.82, "endSec": 96.232, "energy": 0.7 }, { "startSec": 96.232, "endSec": 97.644, "energy": 0.72 }, { "startSec": 97.644, "endSec": 99.056, "energy": 0.81 }, { "startSec": 99.056, "endSec": 100.467, "energy": 0.81 }, { "startSec": 100.467, "endSec": 101.879, "energy": 0.71 }, { "startSec": 101.879, "endSec": 103.291, "energy": 0.8 }, { "startSec": 103.291, "endSec": 104.703, "energy": 0.83 }, { "startSec": 104.703, "endSec": 106.115, "energy": 0.76 }, { "startSec": 106.115, "endSec": 107.526, "energy": 0.35 }, { "startSec": 107.526, "endSec": 108.938, "energy": 0.2 }, { "startSec": 108.938, "endSec": 110.35, "energy": 0.32 }, { "startSec": 110.35, "endSec": 111.762, "energy": 0.55 }, { "startSec": 111.762, "endSec": 113.173, "energy": 0.72 }, { "startSec": 113.173, "endSec": 114.585, "energy": 0.69 }, { "startSec": 114.585, "endSec": 115.997, "energy": 0.71 }, { "startSec": 115.997, "endSec": 117.409, "energy": 0.81 }, { "startSec": 117.409, "endSec": 118.82, "energy": 0.86 }, { "startSec": 118.82, "endSec": 120.232, "energy": 0.92 }, { "startSec": 120.232, "endSec": 121.644, "energy": 0.93 }, { "startSec": 121.644, "endSec": 123.056, "energy": 0.83 }, { "startSec": 123.056, "endSec": 124.467, "energy": 0.81 }, { "startSec": 124.467, "endSec": 125.879, "energy": 0.83 }, { "startSec": 125.879, "endSec": 127.291, "energy": 0.66 }, { "startSec": 127.291, "endSec": 128.703, "energy": 0.67 }, { "startSec": 128.703, "endSec": 130.115, "energy": 0.69 }, { "startSec": 130.115, "endSec": 131.526, "energy": 0.7 }, { "startSec": 131.526, "endSec": 132.938, "energy": 0.68 }, { "startSec": 132.938, "endSec": 134.35, "energy": 0.68 }, { "startSec": 134.35, "endSec": 135.762, "energy": 0.68 }, { "startSec": 135.762, "endSec": 137.173, "energy": 0.56 }, { "startSec": 137.173, "endSec": 138.585, "energy": 0.67 }, { "startSec": 138.585, "endSec": 139.997, "energy": 0.57 }, { "startSec": 139.997, "endSec": 141.409, "energy": 0.49 }, { "startSec": 141.409, "endSec": 142.82, "energy": 0.63 }, { "startSec": 142.82, "endSec": 144.232, "energy": 0.58 }, { "startSec": 144.232, "endSec": 145.644, "energy": 0.52 }, { "startSec": 145.644, "endSec": 147.056, "energy": 0.45 }, { "startSec": 147.056, "endSec": 148.467, "energy": 0.55 }, { "startSec": 148.467, "endSec": 149.879, "energy": 0.59 }, { "startSec": 149.879, "endSec": 151.291, "energy": 0.65 }, { "startSec": 151.291, "endSec": 152.703, "energy": 0.67 }, { "startSec": 152.703, "endSec": 154.115, "energy": 0.63 }, { "startSec": 154.115, "endSec": 155.526, "energy": 0.65 }, { "startSec": 155.526, "endSec": 156.938, "energy": 0.57 }, { "startSec": 156.938, "endSec": 158.35, "energy": 0.48 }, { "startSec": 158.35, "endSec": 159.762, "energy": 0.6 }, { "startSec": 159.762, "endSec": 161.173, "energy": 0.53 }, { "startSec": 161.173, "endSec": 162.585, "energy": 0.5 }, { "startSec": 162.585, "endSec": 163.997, "energy": 0.47 }, { "startSec": 163.997, "endSec": 165.409, "energy": 0.62 }, { "startSec": 165.409, "endSec": 166.82, "energy": 0.65 }, { "startSec": 166.82, "endSec": 168.232, "energy": 0.64 }, { "startSec": 168.232, "endSec": 169.644, "energy": 0.6 }, { "startSec": 169.644, "endSec": 171.056, "energy": 0.64 }, { "startSec": 171.056, "endSec": 172.467, "energy": 0.63 }, { "startSec": 172.467, "endSec": 173.879, "energy": 0.73 }, { "startSec": 173.879, "endSec": 175.291, "energy": 0.82 }, { "startSec": 175.291, "endSec": 176.703, "energy": 0.9 }, { "startSec": 176.703, "endSec": 178.115, "energy": 0.76 }, { "startSec": 178.115, "endSec": 179.526, "energy": 0.79 }, { "startSec": 179.526, "endSec": 180.938, "energy": 0.78 }, { "startSec": 180.938, "endSec": 182.35, "energy": 0.9 }, { "startSec": 182.35, "endSec": 183.762, "energy": 0.74 }, { "startSec": 183.762, "endSec": 185.173, "energy": 0.73 }, { "startSec": 185.173, "endSec": 186.585, "energy": 0.87 }, { "startSec": 186.585, "endSec": 187.997, "energy": 0.8 }, { "startSec": 187.997, "endSec": 189.409, "energy": 0.75 }, { "startSec": 189.409, "endSec": 190.82, "energy": 0.34 }, { "startSec": 190.82, "endSec": 192.232, "energy": 0.2 }, { "startSec": 192.232, "endSec": 193.644, "energy": 0.3 }, { "startSec": 193.644, "endSec": 195.056, "energy": 0.66 }, { "startSec": 195.056, "endSec": 196.467, "energy": 0.71 }, { "startSec": 196.467, "endSec": 197.879, "energy": 0.74 }, { "startSec": 197.879, "endSec": 199.291, "energy": 0.72 }, { "startSec": 199.291, "endSec": 200.703, "energy": 0.79 }, { "startSec": 200.703, "endSec": 202.115, "energy": 0.76 }, { "startSec": 202.115, "endSec": 203.526, "energy": 0.75 }, { "startSec": 203.526, "endSec": 204.938, "energy": 0.95 }, { "startSec": 204.938, "endSec": 206.35, "energy": 0.75 }, { "startSec": 206.35, "endSec": 207.762, "energy": 0.8 }, { "startSec": 207.762, "endSec": 209.173, "energy": 0.8 }, { "startSec": 209.173, "endSec": 210.585, "energy": 0.73 }, { "startSec": 210.585, "endSec": 211.997, "energy": 0.69 }, { "startSec": 211.997, "endSec": 213.409, "energy": 0.66 }, { "startSec": 213.409, "endSec": 214.82, "energy": 0.69 }, { "startSec": 214.82, "endSec": 216.232, "energy": 0.72 }, { "startSec": 216.232, "endSec": 217.644, "energy": 0.74 }, { "startSec": 217.644, "endSec": 219.056, "energy": 0.72 }, { "startSec": 219.056, "endSec": 220.467, "energy": 0.77 }, { "startSec": 220.467, "endSec": 221.879, "energy": 0.8 }, { "startSec": 221.879, "endSec": 223.291, "energy": 0.89 }, { "startSec": 223.291, "endSec": 224.703, "energy": 0.83 }, { "startSec": 224.703, "endSec": 226.115, "energy": 0.81 }, { "startSec": 226.115, "endSec": 227.526, "energy": 0.88 }, { "startSec": 227.526, "endSec": 228.938, "energy": 0.86 }, { "startSec": 228.938, "endSec": 230.35, "energy": 0.72 }, { "startSec": 230.35, "endSec": 231.762, "energy": 0.77 }, { "startSec": 231.762, "endSec": 233.173, "energy": 0.8 }, { "startSec": 233.173, "endSec": 234.585, "energy": 0.81 }, { "startSec": 234.585, "endSec": 235.997, "energy": 0.71 }, { "startSec": 235.997, "endSec": 237.409, "energy": 0.83 }, { "startSec": 237.409, "endSec": 238.82, "energy": 0.84 }, { "startSec": 238.82, "endSec": 240.232, "energy": 0.83 }, { "startSec": 240.232, "endSec": 241.644, "energy": 0.87 }, { "startSec": 241.644, "endSec": 243.056, "energy": 0.87 }, { "startSec": 243.056, "endSec": 244.467, "energy": 0.92 }, { "startSec": 244.467, "endSec": 245.879, "energy": 1 }, { "startSec": 245.879, "endSec": 247.291, "energy": 0.87 }, { "startSec": 247.291, "endSec": 248.703, "energy": 0.9 }, { "startSec": 248.703, "endSec": 250.115, "energy": 0.76 }, { "startSec": 250.115, "endSec": 251.526, "energy": 0.54 }, { "startSec": 251.526, "endSec": 252.938, "energy": 0.32 }, { "startSec": 252.938, "endSec": 254.35, "energy": 0.38 }, { "startSec": 254.35, "endSec": 255.762, "energy": 0.51 }, { "startSec": 255.762, "endSec": 257.173, "energy": 0.26 }, { "startSec": 257.173, "endSec": 258.585, "energy": 0.17 }, { "startSec": 258.585, "endSec": 259.997, "energy": 0.28 }, { "startSec": 259.997, "endSec": 261.409, "energy": 0.41 }, { "startSec": 261.409, "endSec": 262.82, "energy": 0.32 }, { "startSec": 262.82, "endSec": 264.232, "energy": 0.23 }, { "startSec": 264.232, "endSec": 265.644, "energy": 0.15 }, { "startSec": 265.644, "endSec": 267.056, "energy": 0.04 } ], "peak": { "startSec": 235.997, "endSec": 250.997, "avg": 0.87 } } }
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
