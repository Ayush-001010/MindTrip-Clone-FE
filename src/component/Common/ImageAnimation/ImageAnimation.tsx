import React from "react";
import type IImageAnimation from "./IImageAnimation";
import Image from "../../../Images/Copilot_20260820_203411.png";

const ImageAnimation: React.FC<IImageAnimation> = () => {
    return (
        <div className="relative">
            <img
                src={Image}
                alt="Travel itinerary preview"
                className="block h-[420px] w-full rounded-[24px] border border-[#E8DED1] object-cover saturate-[0.78] contrast-95 brightness-105 shadow-[0_18px_40px_rgba(160,146,132,0.18)] sm:h-[520px]"
            />
        </div>
    );
};

export default ImageAnimation;