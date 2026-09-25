import React, { useState } from "react";
import { useGetBlogContext } from "../Blog";
import { MdOutlineSurfing } from "react-icons/md";
import type ISpeedDial from "./ISpeedDial";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { TbSailboat } from "react-icons/tb";
import { MdOutlineFlightLand } from "react-icons/md";
import { IoIosImages } from "react-icons/io";
import { GrNotes } from "react-icons/gr";

interface ISpeedDialAction {
    id: string;
    label: string;
    path: React.ReactNode;
}

const actions: ISpeedDialAction[] = [
    {
        id:"Activity",
        label: "Activity",
        path: (
            <MdOutlineSurfing size={24} />
        )
    },
    {
        id:"Tips",
        label: "Tips",
        path: (
            <MdOutlineTipsAndUpdates size={24} />
        )
    },
    {
        id:"Side-Activity",
        label: "Sub Activity",
        path: (
            <TbSailboat size={24} />
        )
    },
    {
        id:"Images",
        label: "Images",
        path: (
            <IoIosImages size={24} />
        )
    },
    {
        id:"Notes",
        label: "Notes",
        path: (
            <GrNotes size={24} />
        )
    }
];

const SpeedDial: React.FC<ISpeedDial> = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { itemAddToActivity } = useGetBlogContext();

    const handleActionClick = (id: string) => {
        itemAddToActivity(id as "Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes");
    };

    return (
        <div className="group fixed bottom-6 left-35">
            <div
                id="speed-dial-menu-default"
                className={`mb-4 flex-col items-center space-y-2 ${isOpen ? "flex" : "hidden"}`}
            >
                {actions.map((action) => (
                    <div key={action.id} className="group/item relative">
                        <button
                            type="button"
                            onClick={() => handleActionClick(action.id)}
                            className="flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border border-slate-600/60 bg-slate-800/80 text-[#ced4da] shadow-sm transition-colors hover:border-slate-400/70 hover:bg-slate-700 hover:text-[#dee2e6] focus:outline-none focus:ring-4 focus:ring-slate-600/40"
                        >
                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <g stroke="currentColor">{action.path}</g>
                            </svg>
                            <span className="sr-only">{action.label}</span>
                        </button>
                        <div
                            role="tooltip"
                            className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 group-hover/item:opacity-100"
                        >
                            {action.label}
                        </div>
                    </div>
                ))}
            </div>
            <button
                type="button"
                aria-controls="speed-dial-menu-default"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
                className="flex h-12 w-12 items-center justify-center shadow-lg shadow-slate-900/40 rounded-full bg-[#6c757d] transition-colors hover:bg-[#adb5bd] cursor-pointer focus:outline-none "
            >
                <svg
                    className={`h-5 w-5 transition-transform ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                </svg>
                <span className="sr-only">Open actions menu</span>
            </button>
        </div>
    );
};

export default SpeedDial;
