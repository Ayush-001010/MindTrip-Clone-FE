import React, { createContext, useContext, useEffect, useState } from "react";
import useMemoriesSocketAction from "../../../CustomHooks/useMemoriesSocketAction";
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
    const {changePlaces , memoryDetails , addMedia } = useMemoriesSocketAction(setNotifyConfig, changeDropBoxHandler);
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

    return (
        <memoriesWorkStationContext.Provider value={{ openDropBox: dropBox, dropBoxHandler: changeDropBoxHandler, changePlaces , memoriesData: memoryDetails , setNotifyConfig , addMedia }}>
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