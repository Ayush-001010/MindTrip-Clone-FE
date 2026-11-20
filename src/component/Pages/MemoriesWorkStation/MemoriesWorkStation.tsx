import React, { createContext, useContext, useEffect, useState } from "react";
import type { IMemoriesChat, IMemoriesGeneratedReel, IMemoryMusicData } from "../../../Interface/DataInterface/IMemoriesData";
import useMemoriesSocketAction from "../../../CustomHooks/useMemoriesSocketAction";
import type { IMemoriesReelAnalysisBatch } from "../../../Interface/DataInterface/IMemoriesData";
import type IMemoriesWorkStation from "./IMemoriesWorkStation";
import Header from "./Header/Header";
import DropBox from "./DropBox/DropBox";
import useNotification from "../../../customHookWithUI/useNotification";
import type { INotifyConfig } from "../../../Interface/DataInterface/INotificationConfig";
import type IMemoriesData from "../../../Interface/DataInterface/IMemoriesData";
import MakerBox from "./MakerBox/MakerBox";

export interface IMemoriesWorkStationContext {
    openDropBox: boolean;
    dropBoxHandler: (type: "open" | "close") => void;
    changePlaces: (places: string[]) => Promise<void>;
    memoriesData : IMemoriesData | null,
    setNotifyConfig: React.Dispatch<React.SetStateAction<INotifyConfig | undefined>>;
    addMedia: (taggedFiles: {file : File[] , tag : string}[], audioFiles: File[]) => Promise<void>;
    sendCommentToAI: (comment: string) => void;
    rooms: string[];
    activtyRoom: string;
    setActivtyRoom: React.Dispatch<React.SetStateAction<string>>;
    batchDetails: IMemoriesReelAnalysisBatch[] | null;
    isAnalyzingCompleted: boolean;
    handleAddRoom: (roomName: string) => void;
    roomChats:IMemoriesChat[] | null;
    audioFiles: IMemoryMusicData[];
    generatedReel: IMemoriesGeneratedReel | null;
    isReelGenerating: boolean;
    selectedAudioUrl: string | null;
    setSelectedAudioUrl: React.Dispatch<React.SetStateAction<string | null>>;
    handleReelCreation: (template: "Journey" | "Mistory" | "Key Moment" | "Fast Clip", soundtrack: string, mood: "Happy" | "Fun" | "Relaxing"| "Romantic", pace: "Slow" | "Medium" | "Fast", place: string[], userSuggestion?: string, targetSeconds?: { min: number; max: number }) => void;
}

const memoriesWorkStationContext = createContext<IMemoriesWorkStationContext | null>(null);

export const useGetMemoriesWorkStationContext = () => {
    const context = useContext(memoriesWorkStationContext);
    if (!context) {
        throw new Error("useGetMemoriesWorkStationContext must be used within a MemoriesWorkStationProvider");
    }
    return context;
}

const MemoriesWorkStation: React.FC<IMemoriesWorkStation> = () => {
    const [notifyConfig, setNotifyConfig] = useState<INotifyConfig>();
    const changeDropBoxHandler = (type: "open" | "close") => {
        setDropBox(type === "open");
    };
    const {changePlaces , memoryDetails , addMedia , sendCommentToAI , rooms , batchDetails , isAnalyzingCompleted , handleAddRoom, fetchRoomChatData, roomChats, audioFiles, generatedReel, isReelGenerating, handleReelCreation } = useMemoriesSocketAction(setNotifyConfig, changeDropBoxHandler);
    const [activtyRoom, setActivtyRoom] = useState("");
    const [selectedAudioUrl, setSelectedAudioUrl] = useState<string | null>(null);
    const [dropBox , setDropBox] = useState(false);
    const [addNewPlace, setAddNewPlace] = useState(false);
    const notification = useNotification(
        notifyConfig?.type ?? "alert",
        notifyConfig?.message ?? "",
        notifyConfig?.open ?? false,
        notifyConfig?.duration,
        notifyConfig?.pos
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            setNotifyConfig(undefined);
        }, notifyConfig?.duration ?? 1500);
        return () => clearTimeout(timeout);
    },[notifyConfig]);

    useEffect(()=>{
        if(activtyRoom) {
            const val = memoryDetails?.rooms?.filter(room => room.name === activtyRoom);
            if(val && val.length > 0)
                fetchRoomChatData(val[0].id);
        }
    },[activtyRoom])

    return (
        <memoriesWorkStationContext.Provider value={{ openDropBox: dropBox, dropBoxHandler: changeDropBoxHandler, changePlaces , memoriesData: memoryDetails , setNotifyConfig , addMedia , sendCommentToAI , rooms , activtyRoom, setActivtyRoom, batchDetails , isAnalyzingCompleted , handleAddRoom, roomChats, audioFiles, generatedReel, isReelGenerating, selectedAudioUrl, setSelectedAudioUrl, handleReelCreation }}>
            {notification}
            <main className="m-3 sm:m-6">
                <Header addNewPlace={addNewPlace} setAddNewPlace={setAddNewPlace} />
                <hr className="my-4 border-zinc-700" />
                <MakerBox/>
                <DropBox />
            </main>
        </memoriesWorkStationContext.Provider>
    );
};

export default MemoriesWorkStation;