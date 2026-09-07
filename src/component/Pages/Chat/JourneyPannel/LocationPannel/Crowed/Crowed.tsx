import React from "react";
import type ICrowed from "./ICrowed";
import { Tooltip } from "antd";

const Crowed: React.FC<ICrowed> = ({ crowedLevel, description }) => {
    return (
        <section className="w-full flex justify-end">
            <p className="flex items-center gap-2 text-[#e9ecef] flex-col">
                <span className="text-xs text-[#e9ecef] font-medium">
                    Crowd Level
                </span>
                <Tooltip title={description}>
                    <span className={`text-[13px] p-2 rounded-full ${crowedLevel === "High" ? "bg-[#660708] shadow-lg p-2" : crowedLevel === "Low" ? "" : ""}`}>{crowedLevel}</span>
                </Tooltip>
            </p>
        </section>
    )
};

export default Crowed;