import React from "react";
import type IToggleSwitch from "./IToggleSwitch";
import { BsAppleMusic } from "react-icons/bs";
import { MdOutlineInsertPhoto } from "react-icons/md";

const ToggleSwitch: React.FC<IToggleSwitch> = ({ type, changeHandler }) => {
    return (
        <section className="flex justify-end">
            <section aria-label="Upload type" className="grid grid-cols-2 gap-1 w-24 rounded-full border border-zinc-800 bg-zinc-900/80 p-1">
                <button
                    type="button"
                    aria-pressed={type === "music"}
                    onClick={() => changeHandler("music")}
                    className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${type === "music"
                            ? "bg-[#212529] text-white shadow-sm"
                            : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                        }`}
                >
                    <BsAppleMusic aria-hidden="true" className="text-base" />
                </button>
                <button
                    type="button"
                    aria-pressed={type === "photos"}
                    onClick={() => changeHandler("photos")}
                    className={`flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-full px-3 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${type === "photos"
                            ? "bg-[#212529] text-white shadow-sm"
                            : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
                        }`}
                >
                    <MdOutlineInsertPhoto aria-hidden="true" className="text-lg" />
                </button>
            </section>
        </section>
    );
};

export default ToggleSwitch;