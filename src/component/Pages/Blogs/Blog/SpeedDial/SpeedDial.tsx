import React, { useState } from "react";
import type ISpeedDial from "./ISpeedDial";

interface ISpeedDialAction {
    id: string;
    label: string;
    path: React.ReactNode;
}

const actions: ISpeedDialAction[] = [
    {
        id: "share",
        label: "Share",
        path: (
            <path strokeLinecap="round" strokeWidth="2" d="M7.926 10.898 15 7.727m-7.074 5.39L15 16.29M8 12a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm12 5.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm0-11a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z" />
        ),
    },
    {
        id: "print",
        label: "Print",
        path: (
            <path strokeLinejoin="round" strokeWidth="2" d="M16.444 18H19a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h2.556M17 11V5a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v6h10ZM7 15h10v4a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1v-4Z" />
        ),
    },
    {
        id: "download",
        label: "Download",
        path: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01" />
        ),
    },
    {
        id: "copy",
        label: "Copy",
        path: (
            <path strokeLinejoin="round" strokeWidth="2" d="M14 4v3a1 1 0 0 1-1 1h-3m4 10v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2m11-3v10a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7.87a1 1 0 0 1 .24-.65l2.46-2.87a1 1 0 0 1 .76-.35H18a1 1 0 0 1 1 1Z" />
        ),
    },
];

const SpeedDial: React.FC<ISpeedDial> = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="group fixed end-6 bottom-6">
            <div
                id="speed-dial-menu-default"
                className={`mb-4 flex-col items-center space-y-2 ${isOpen ? "flex" : "hidden"}`}
            >
                {actions.map((action) => (
                    <div key={action.id} className="group/item relative">
                        <button
                            type="button"
                            className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-default bg-neutral-primary-soft text-body shadow-xs hover:border-default-medium hover:bg-neutral-secondary-medium hover:text-heading focus:outline-none focus:ring-4 focus:ring-neutral-secondary-soft"
                        >
                            <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <g stroke="currentColor">{action.path}</g>
                            </svg>
                            <span className="sr-only">{action.label}</span>
                        </button>
                        <div
                            role="tooltip"
                            className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-base bg-dark px-3 py-2 text-sm font-medium text-white opacity-0 shadow-xs transition-opacity duration-300 group-hover/item:opacity-100"
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
                className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white hover:bg-brand-strong focus:outline-none focus:ring-4 focus:ring-brand-medium"
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
