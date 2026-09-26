import React, { useState } from "react";
import type IHeader from "./IHeader";
import { useGetBlogContext } from "../Blog";
import { MdOutlineEdit } from "react-icons/md";
import { GoShare } from "react-icons/go";
import { MdFavoriteBorder } from "react-icons/md";
import { MdOutlineShoppingCart } from "react-icons/md";
import TravelAgency from "./TravelAgency/TravelAgency";

const Header: React.FC<IHeader> = ({ selectedDay }) => {
    const { mode, blogValue, saveChangeToBlog } = useGetBlogContext();
    const [isTravelAgency, setTravelAgency] = useState(false);

    const openTravelAgency = () => {
        setTravelAgency(true);
    };

    const closeTravelAgency = () => {
        setTravelAgency(false);
    };

    return (
        <header className="flex flex-col gap-4 border-b border-slate-700/60 px-4 py-4 lg:flex-row lg:items-start lg:justify-between">
            <section className="min-w-0 flex-1">
                <section className="flex items-center gap-3">
                    <input
                        value={blogValue?.tripTitle ?? ""}
                        onChange={(e) => saveChangeToBlog("tripTitle", e.target.value)}
                        type="text"
                        placeholder="Name Your Adventure"
                        className={mode === "create" ? "w-full max-w-xl border-b border-[#ced4da]/70 pb-1 text-2xl font-semibold tracking-tight text-[#dee2e6] placeholder:text-[#ced4da]/60 focus:outline-none" : "w-full max-w-xl text-2xl font-semibold tracking-tight text-[#dee2e6] placeholder:text-[#ced4da]/60 focus:outline-none"}
                    />
                    {mode === "create" && <MdOutlineEdit className="shrink-0 cursor-pointer text-lg text-[#ced4da] transition-opacity hover:opacity-80" />}
                </section>
                <section className="mt-3">
                    {mode === "create" && (
                        <div className="flex items-start gap-3">
                            <textarea
                                value={blogValue?.tripOverview ?? ""}
                                onChange={(e) => saveChangeToBlog("tripOverview", e.target.value)}
                                placeholder="Describe Your Adventure"
                                className={mode === "create" ? "min-h-[30px] w-full max-w-3xl resize-none border-b border-[#ced4da]/70 pb-1 text-sm font-medium leading-5 text-[#dee2e6] placeholder:text-[#ced4da]/60 focus:outline-none" : ""}
                            >
                            </textarea>
                            <p className="mb-0 mt-1">
                                <MdOutlineEdit className="inline-block cursor-pointer text-lg text-[#ced4da] transition-opacity hover:opacity-80" />
                            </p>
                        </div>
                    )}
                </section>
                <section className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-[#dee2e6]">
                    <p className="m-0 flex items-center gap-2">
                        <span className="font-medium text-[#ced4da]">Total Places:</span>
                        <span className="font-normal">{blogValue?.noOfPlaces}</span>
                    </p>
                    <p className="m-0 flex items-center gap-2">
                        <span className="font-medium text-[#ced4da]">Total Activities:</span>
                        <span className="font-normal">{blogValue?.noOfActivities}</span>
                    </p>
                    <div className="flex items-center gap-2">
                        <p className="m-0 font-medium text-[#ced4da]">Duration:</p>
                        {mode === "create" && (
                            <section onChange={(e:any) => saveChangeToBlog("tripDuration", e.target.value)}>
                                <select className="w-[30px] cursor-pointer text-sm font-medium text-[#dee2e6] outline-none transition-colors hover:border-slate-300/70 focus:border-slate-300/70">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </section>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="m-0 font-medium text-[#ced4da]">Select Day:</p>
                        <p>{selectedDay}</p>
                    </div>
                </section>
            </section>
            <section className="flex flex-wrap items-center gap-3 lg:justify-end">
                {mode === "create" && (
                    <>
                        <button onClick={openTravelAgency} className="rounded-full cursor-pointer border border-slate-500/70 px-4 py-1.5 text-sm font-medium text-[#dee2e6] transition-colors hover:border-slate-300/70">
                            Travel Agency ?
                        </button>
                        <button className="rounded-full cursor-pointer border border-slate-500/70 px-4 py-1.5 text-sm font-medium text-[#dee2e6] transition-colors hover:border-slate-300/70">
                            Publish
                        </button>
                        <button className="rounded-full cursor-pointer border border-slate-500/70 px-4 py-1.5 text-sm font-medium text-[#dee2e6] transition-colors hover:border-slate-300/70">
                            Preview
                        </button>
                    </>
                )}
                <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600/70 text-[#ced4da] transition-colors hover:border-slate-300/70 hover:text-[#dee2e6]">
                    <GoShare className="inline-block cursor-pointer text-lg" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600/70 text-[#ced4da] transition-colors hover:border-slate-300/70 hover:text-[#dee2e6]">
                    <MdFavoriteBorder className="inline-block cursor-pointer text-lg" />
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-600/70 text-[#ced4da] transition-colors hover:border-slate-300/70 hover:text-[#dee2e6]">
                    <MdOutlineShoppingCart className="inline-block cursor-pointer text-lg" />
                </button>
            </section>
            <TravelAgency isOpen={isTravelAgency} onClose={closeTravelAgency} />
        </header>
    );
};

export default Header;