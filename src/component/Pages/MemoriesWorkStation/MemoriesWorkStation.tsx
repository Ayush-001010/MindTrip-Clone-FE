import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import type { IMemoriesChat, IMemoriesGeneratedReel, IMemoriesReelAudioEdit, IMemoryMusicData } from "../../../Interface/DataInterface/IMemoriesData";
import useMemoriesSocketAction, { isGeneratedReel } from "../../../CustomHooks/useMemoriesSocketAction";
import type { IMemoriesReelAnalysisBatch } from "../../../Interface/DataInterface/IMemoriesData";
import type IMemoriesWorkStation from "./IMemoriesWorkStation";
import Header from "./Header/Header";
import DropBox from "./DropBox/DropBox";
import useNotification from "../../../customHookWithUI/useNotification";
import type { INotifyConfig } from "../../../Interface/DataInterface/INotificationConfig";
import type IMemoriesData from "../../../Interface/DataInterface/IMemoriesData";
import MakerBox from "./MakerBox/MakerBox";
import useMemoriesAction from "../../../CustomHooks/useMemoriesAction";

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
    reelAudioEdit: IMemoriesReelAudioEdit | null;
    setReelAudioEdit: React.Dispatch<React.SetStateAction<IMemoriesReelAudioEdit | null>>;
    handleReelCreation: (template: "Journey" | "Mistory" | "Key Moment" | "Fast Clip", soundtrack: string, mood: "Happy" | "Fun" | "Relaxing"| "Romantic", pace: "Slow" | "Medium" | "Fast", place: string[], userSuggestion?: string, targetSeconds?: { min: number; max: number }) => void;
    saveRoomScript: (userId: string, userName: string , place : string, script: IMemoriesGeneratedReel) => Promise<boolean | null>;
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
    const {changePlaces , memoryDetails , addMedia , sendCommentToAI , rooms , batchDetails , isAnalyzingCompleted , handleAddRoom, fetchRoomChatData, roomChats, audioFiles, generatedReel, isReelGenerating, setGeneratedReel, handleReelCreation } = useMemoriesSocketAction(setNotifyConfig, changeDropBoxHandler);
    const { saveRoomScript: persistRoomScript } = useMemoriesAction();
    const savedRoomReels = useRef(new Map<string, IMemoriesGeneratedReel>());
    const [activtyRoom, setActivtyRoom] = useState("");
    const [selectedAudioUrl, setSelectedAudioUrl] = useState<string | null>(null);
    const [reelAudioEdit, setReelAudioEdit] = useState<IMemoriesReelAudioEdit | null>(null);
    const [dropBox , setDropBox] = useState(false);
    const [addNewPlace, setAddNewPlace] = useState(false);
    const saveRoomScript: IMemoriesWorkStationContext["saveRoomScript"] = async (userId, userName, place, script) => {
        const saved = await persistRoomScript(userId, userName, place, script);
        if (saved) {
            if (activtyRoom && memoryDetails) savedRoomReels.current.set(`${memoryDetails.id}:${activtyRoom}`, script);
            setGeneratedReel(current => current === generatedReel ? script : current);
        }
        return saved;
    };
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
        setGeneratedReel(null);
        if (activtyRoom) {
            const room = memoryDetails?.rooms?.find(room => room.name === activtyRoom);
            if (room) {
                fetchRoomChatData(room.id);
                const savedReel = savedRoomReels.current.get(`${memoryDetails?.id}:${activtyRoom}`);
                if (savedReel || room.script) {
                    const reel = savedReel ?? { script: room.script };
                    if (isGeneratedReel(reel)) {
                        setGeneratedReel(reel);
                    } else {
                        console.error("Saved room reel is invalid:", room.script);
                        setNotifyConfig({
                            type: "alert",
                            message: "The saved reel is incomplete and cannot be played.",
                            open: true,
                            pos: "top-left"
                        });
                    }
                }
            }
        }
    },[activtyRoom])

    return (
        <memoriesWorkStationContext.Provider value={{ openDropBox: dropBox, dropBoxHandler: changeDropBoxHandler, changePlaces , memoriesData: memoryDetails , setNotifyConfig , addMedia , sendCommentToAI , rooms , activtyRoom, setActivtyRoom, batchDetails , isAnalyzingCompleted , handleAddRoom, roomChats, audioFiles, generatedReel, isReelGenerating, selectedAudioUrl, setSelectedAudioUrl, reelAudioEdit, setReelAudioEdit, handleReelCreation, saveRoomScript }}>
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