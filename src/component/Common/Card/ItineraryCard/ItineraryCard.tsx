import React, { createContext, useContext } from "react";
import type IItineraryCard from "./IItineraryCard";
import ItineraryTips from "./ItineraryTips/ItineraryTips";
import ItineraryActivity from "./ItineraryActivity/ItineraryActivity";
import type { IFinalItineraryDay } from "../../../../Interface/DataInterface/IFinalItineraryResponse";

interface ItineraryCardProps extends React.FC<IItineraryCard & {children: React.ReactNode}> {
    ItineraryTips: typeof ItineraryTips;
    ItineraryActivity : typeof ItineraryActivity;
}

export interface IItineraryCardContext {
    mode: "edit" | "view";
    tips?: string[];
    days: IFinalItineraryDay[];
}

const ItineraryCardContext = createContext<IItineraryCardContext | null>(null);

export const useGetItineraryCardContext = () => {
    const context = useContext(ItineraryCardContext);
    if (!context) {
        throw new Error("ItineraryCardContext is not available");
    }
    return context;
}

const ItineraryCard : ItineraryCardProps = ({children, mode, tips, days}) => {
    return (
        <ItineraryCardContext.Provider value={{mode, tips, days}}>
            <main>
                {children}
            </main>
        </ItineraryCardContext.Provider>
    );
};

ItineraryCard.ItineraryTips = ItineraryTips;
ItineraryCard.ItineraryActivity = ItineraryActivity;

export default ItineraryCard;