import React from "react";
import type IToggleSwitch from "./IToggleSwitch";
import { LuMapPinned } from "react-icons/lu";
import { GiJourney } from "react-icons/gi";

const ToogleSwitch: React.FC<IToggleSwitch> = () => {
    return (
        <div className="flex">
            <p className="m-0 flex cursor-pointer items-center rounded-xl border border-slate-200/80 bg-white/85 p-1 text-slate-700 shadow-[0_10px_24px_rgba(148,163,184,0.16)] backdrop-blur-sm">
                <span className="flex h-9 w-10 items-center justify-center rounded-lg border-r border-slate-200 bg-sky-50 text-sky-700 transition hover:bg-sky-100"><GiJourney /></span>
                <span className="flex h-9 w-10 items-center justify-center rounded-lg text-slate-500 transition hover:bg-sky-50 hover:text-sky-700"><LuMapPinned /></span>
            </p>
        </div>
    );
};

export default ToogleSwitch;