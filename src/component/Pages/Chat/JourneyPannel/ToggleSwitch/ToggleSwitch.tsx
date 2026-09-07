import React, { useRef } from "react";
import type IToggleSwitch from "./IToggleSwitch";
import { LuMapPinned } from "react-icons/lu";
import { GiJourney } from "react-icons/gi";

const ToggleSwitch: React.FC<IToggleSwitch> = ({active}) => {
    const activeCss = useRef("bg-[#fff] text-[#172121]");
    const inActiveCss = useRef("bg-[#172121] text-[#fff]");


    return (
        <div className="flex">
            <p className="m-0 flex cursor-pointer items-center rounded-full border border-[#fff] bg-[#172121] p-1 shadow-lg backdrop-blur-sm">
                <span className={`${active === "trip" ? activeCss.current : inActiveCss.current} flex h-9 w-10 items-center justify-center rounded-full`}><GiJourney /></span>
                <span className={`${active === "location" ? activeCss.current : inActiveCss.current} flex h-9 w-10 items-center justify-center rounded-full transition`}><LuMapPinned /></span>
            </p>
        </div>
    );
};

export default ToggleSwitch;