import React, { useState } from "react";
import type IAddTravel from "./IAddTravel";
import { MdOutlineEdit } from "react-icons/md";
import { useGetBlogContext } from "../../../Blog";

const travelTypeOptions = [
    { value: "flight", label: "Flight" },
    { value: "bus", label: "Bus" },
    { value: "train", label: "Train" },
    { value: "car", label: "Car" },
    { value: "boat", label: "Boat" },
    { value: "uber", label: "Uber" },
    { value: "ola", label: "Ola" },
] as const;

const durationOptions = [
    { value: "30 minutes", label: "30 minutes" },
    { value: "1 hour", label: "1 hour" },
    { value: "1 hour 30 minutes", label: "1 hour 30 minutes" },
    { value: "2 hours", label: "2 hours" },
    { value: "2 hours 30 minutes", label: "2 hours 30 minutes" },
    { value: "3 hours", label: "3 hours" },
    { value: "3 hours 30 minutes", label: "3 hours 30 minutes" },
    { value: "4 hours", label: "4 hours" },
] as const;

const AddTravel: React.FC<IAddTravel> = ({ setTravelData }) => {
    const { selectedDay } = useGetBlogContext();
    const [travelType, setTravelType] = useState<(typeof travelTypeOptions)[number]["value"] | "">("");
    const [duration, setDuration] = useState<(typeof durationOptions)[number]["value"] | "">("");
    const [amountSpent, setAmountSpent] = useState<number | "">("");

    const submitHandler = () => {
        if (!travelType || !duration || amountSpent === "") {
            return;
        }

        const selectedTravelType = travelTypeOptions.find((option) => option.value === travelType);

        setTravelData({
            type: "travel",
            day: selectedDay,
            time: duration,
            travelType,
            amountSpent: Number(amountSpent),
            description: `${selectedTravelType?.label ?? "Travel"} for ${duration}`,
        });
    };

    return (
        <section className="my-1 flex w-full max-w-[268px] flex-col gap-2.5 rounded-xl border border-[#343a40] bg-[#151a1f] px-3 py-2.5 shadow-[0_10px_22px_rgba(0,0,0,0.16)]">
            <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-gray-400">Mode of Travel</label>
                <div className="flex items-center gap-2">
                    <select
                        value={travelType}
                        onChange={(e) => setTravelType(e.target.value as (typeof travelTypeOptions)[number]["value"] | "")}
                        className="h-7 w-full cursor-pointer border-b border-gray-500/70 bg-transparent px-0 py-1 text-xs text-gray-200 outline-none transition focus:text-white"
                    >
                        <option value=""></option>
                        {travelTypeOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <MdOutlineEdit className="shrink-0 cursor-pointer text-sm text-gray-400 transition hover:text-[#f8f9fa]" />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-gray-400">Duration</label>
                <div className="flex items-center gap-2">
                    <select
                        value={duration}
                        onChange={(e) => setDuration(e.target.value as (typeof durationOptions)[number]["value"] | "")}
                        className="h-7 w-full cursor-pointer border-b border-gray-500/70 bg-transparent px-0 py-1 text-xs text-gray-200 outline-none transition focus:text-white"
                    >
                        <option value=""></option>
                        {durationOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                    </select>
                    <MdOutlineEdit className="shrink-0 cursor-pointer text-sm text-gray-400 transition hover:text-[#f8f9fa]" />
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <label className="text-[11px] font-medium text-gray-400">Estimated Cost</label>
                <div className="flex items-center gap-2">
                    <input
                        className="h-7 w-full cursor-pointer border-b border-gray-500/70 bg-transparent px-0 py-1 text-xs text-gray-200 placeholder-gray-500 outline-none transition focus:text-white"
                        type="number"
                        value={amountSpent}
                        onChange={(e) => setAmountSpent(e.target.value === "" ? "" : Number(e.target.value))}
                        placeholder="Enter cost"
                    />
                    <MdOutlineEdit className="shrink-0 cursor-pointer text-sm text-gray-400 transition hover:text-[#f8f9fa]" />
                </div>
            </div>
            <button
                type="button"
                onClick={submitHandler}
                disabled={!travelType || !duration || amountSpent === ""}
                className="ml-auto rounded-lg border border-[#495057] px-3 py-1 text-xs font-medium text-[#dee2e6] transition hover:bg-[#212529] disabled:cursor-not-allowed disabled:opacity-50"
            >
                Save Travel
            </button>
        </section>
    );
}

export default AddTravel;