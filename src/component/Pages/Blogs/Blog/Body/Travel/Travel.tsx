import React from "react";
import { MdOutlineEdit } from "react-icons/md";

import type ITravel from "./ITravel";

const Travel: React.FC<ITravel> = () => {
    return (
        <section className="my-1 ml-3 flex w-64 flex-col gap-5 p-2 w-[356px]">
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-400">Mode of Travel</label>
                <div className="flex items-center gap-2">
                    <select className="w-full cursor-pointer px-0 py-1 text-sm text-gray-200 outline-none transition focus:text-white border-b-1">
                        <option value=""></option>
                        <option value="flight">Flight</option>
                        <option value="bus">Bus</option>
                        <option value="train">Train</option>
                        <option value="car">Car</option>
                        <option value="taxi">Taxi</option>
                    </select>
                    <MdOutlineEdit className="shrink-0 cursor-pointer text-gray-400 transition hover:text-[#f8f9fa]" />
                </div>
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-400">Duration</label>
                <div className="flex items-center gap-2">
                    <select className="w-full cursor-pointer px-0 py-1 text-sm text-gray-200 outline-none transition focus:text-white border-b-1">
                       <option value=""></option>
                       <option value="30">30 minutes</option>
                        <option value="60">1 hour</option>
                        <option value="90">1 hour 30 minutes</option>
                        <option value="120">2 hours</option>
                        <option value="150">2 hours 30 minutes</option>
                        <option value="180">3 hours</option>
                        <option value="210">3 hours 30 minutes</option>
                        <option value="240">4 hours</option>
                    </select>
                    <MdOutlineEdit className="shrink-0 cursor-pointer text-gray-400 transition hover:text-[#f8f9fa]" />
                </div>
            </div>
            <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-gray-400">Estimated Cost</label>
                <div className="flex items-center gap-2">
                    <input className="w-full cursor-pointer px-0 py-1 text-sm text-gray-200 placeholder-gray-500 outline-none transition focus:text-white border-b-1" type="number" placeholder="Enter cost" />
                    <MdOutlineEdit className="shrink-0 cursor-pointer text-gray-400 transition hover:text-[#f8f9fa]" />
                </div>
            </div>
        </section>
    );
};

export default Travel;