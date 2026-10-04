import React from "react";
import type INotStartYet from "./INotStartYet";

const NotStartYet: React.FC<INotStartYet> = () => {
    return (
        <section className="bg-[#161a1d] shadow-sm shadow-[#333533] p-4 rounded-xl  flex">
            <p className="text-[#b2b2b2] font-semibold text-md">
                <span>[</span>
                Begin Your Journey
                <span>]</span>
            </p>
            <p className="ml-2 text-[#736f72] text-md">
                From planning to packing, we've got you covered. Create your itinerary, build your travel agent, pack your bag, and discover the world with us.
            </p>
        </section>
    );
};

export default NotStartYet;