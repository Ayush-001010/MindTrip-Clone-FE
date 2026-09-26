import React, { useState } from "react";
import type IAddTips from "./IAddTips";
import { CiCirclePlus } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";
import { useGetActivityCardData } from "../../ActivityCard";
import { useGetBlogContext } from "../../../../../Pages/Blogs/Blog/Blog";

const AddTips: React.FC<IAddTips> = ({ setTips, setIsStopEditing }) => {
    const [noOfTips, setNoOfTips] = useState(1);
    const [tips, setLocalTips] = useState<string[]>([]);
    const { saveChangeToBlog } = useGetBlogContext();
    const { indexNumber } = useGetActivityCardData();

    const changeHandler = (newTips: string[]) => {
        setLocalTips(newTips);
        setTips(newTips);
        saveChangeToBlog("activities", newTips, indexNumber, "tips");
    };

    return (
        <section className="mt-4 flex flex-col gap-4 rounded-xl px-4 py-3">
            <section className="flex flex-col gap-3">
                {Array.from({ length: noOfTips }).map((_, index) => (
                    <input
                        value={tips[index] || ""}
                        onChange={(e) => {
                            const newTips = [...tips];
                            newTips[index] = e.target.value;
                            changeHandler(newTips);
                        }}
                        placeholder={`Enter tip ${index + 1}`}
                        className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-1.5 text-base font-medium text-[#f8f9fa] outline-none placeholder:text-gray-400 transition-colors focus:border-gray-100"
                        key={index}
                    />
                ))}
            </section>

            <section className="flex items-center justify-between gap-3 border-t border-white/10 pt-1">
                <button
                    type="button"
                    className="flex w-fit cursor-pointer items-center gap-1 text-sm font-medium text-gray-400 transition-colors hover:text-[#f8f9fa]"
                    onClick={() => setNoOfTips(noOfTips + 1)}
                >
                    <CiCirclePlus className="text-2xl" />
                    <span>Add Tip</span>
                </button>

                <button
                    type="button"
                    onClick={() => setIsStopEditing(true)}
                    className="flex items-center gap-1 text-sm font-medium text-gray-400 transition-colors hover:text-[#f8f9fa]"
                >
                    <MdOutlineEdit className="shrink-0 text-2xl" />
                    <span>Done</span>
                </button>
            </section>
        </section>
    );
};

export default AddTips;