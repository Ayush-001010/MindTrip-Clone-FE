import React, { createContext, useContext, useState } from "react";
import useMemoriesSocketAction from "../../../CustomHooks/useMemoriesSocketAction";
import type IMemoriesWorkStation from "./IMemoriesWorkStation";
import Header from "./Header/Header";
import DropBox from "./DropBox/DropBox";

export interface IMemoriesWorkStationContext {
    openDropBox: boolean;
    dropBoxHandler: (type: "open" | "close") => void;
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
    const _ = useMemoriesSocketAction();
    const [dropBox , setDropBox] = useState(false);

    const changeDropBoxHandler = (type: "open" | "close") => {
        setDropBox(type === "open");
    };

    return (
        <memoriesWorkStationContext.Provider value={{ openDropBox: dropBox, dropBoxHandler: changeDropBoxHandler }}>
            <main className="m-6">
                <Header />
            </main>
            <DropBox />
        </memoriesWorkStationContext.Provider>
    );
};

export default MemoriesWorkStation;