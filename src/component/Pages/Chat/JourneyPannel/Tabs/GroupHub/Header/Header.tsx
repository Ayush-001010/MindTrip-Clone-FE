import React from "react";
import type IHeader from "./IHeader";

const TABS = ["Poll", "Announcement", "Opinion", "Check ins", "Medical Assistance"];

const Header : React.FC<IHeader> = ({ activeTab, setActiveTab }) => {

    return (
        <header className="absolute top-0 right-0 flex w-fit items-center gap-1 rounded-lg bg-[#212529]/80 p-1 text-xs backdrop-blur-sm">
            {TABS.map((tab) => (
                <p
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`cursor-pointer rounded-md px-2.5 py-1 whitespace-nowrap transition-colors duration-200 ${
                        activeTab === tab
                            ? "bg-[#ced4da] font-semibold text-[#343a40]"
                            : "text-[#ced4da] hover:bg-[#343a40] hover:text-white"
                    }`}
                >
                    {tab}
                </p>
            ))}
        </header>
    )
};

export default Header;