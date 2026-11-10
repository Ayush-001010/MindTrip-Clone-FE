import React from "react";
import type INotCreatedYet from "./INotCreatedYet";

const NotCreatedYet: React.FC<INotCreatedYet> = ({ setButtonAnimation }) => {
    return (
        <section className="w-full h-screen flex justify-center items-center">
            <p onClick={() => setButtonAnimation(true)} className="p-10 font-medium text-xs text-[#f8f9fa] transition-colors duration-300 cursor-pointer hover:text-[#adb5bd]">
                Ready to relive your adventures? Create a Memory, invite your friends, and let AI transform your trip into stunning story-based videos, reels, stories, and a travel blog filled with unforgettable moments.
            </p>
        </section>
    );
};

export default NotCreatedYet;