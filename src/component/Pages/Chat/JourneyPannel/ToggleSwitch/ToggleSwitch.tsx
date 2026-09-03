import React from "react";
import type IToggleSwitch from "./IToggleSwitch";
import { LuMapPinned } from "react-icons/lu";
import { GiJourney } from "react-icons/gi";

const ToogleSwitch: React.FC<IToggleSwitch> = () => {
    return (
        <div className="flex">
            <p className="m-0 p-0 border border-[#6c757d] rounded-lg flex justify-center items-center text-[#ffffff] cursor-pointer">
                <span className="w-10 h-8 flex justify-center items-center hover:bg-[#6c757d] rounded-l-lg border-r border-[#6c757d] "><GiJourney /></span>
                <span className="w-10 h-8 flex justify-center items-center hover:bg-[#6c757d] rounded-r-lg"><LuMapPinned /></span>
            </p>
        </div>
    );
};

export default ToogleSwitch;