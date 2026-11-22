import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type IShowGlobePlaceInDetails from "./IShowGlobePlaceInDetails";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ShowGlobePlaceInDetails: React.FC<IShowGlobePlaceInDetails> = ({places, onClose}) => {
    const reduceMotion = useReducedMotion();

    return (
        <motion.section
            initial={reduceMotion ? false : { opacity: 0, x: 40, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute bottom-3 left-3 right-3 z-10 overflow-hidden rounded-xl border border-[#003566] bg-[#000814]/95 shadow-lg shadow-black/50 backdrop-blur-md sm:bottom-4 sm:left-auto sm:right-4 sm:w-[400px]"
        >
            <header className="border-b border-[#003566] px-4 py-3">
                <div className="flex justify-between items-center">
                    <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ffc300]/80">#World-616</p>
                    <p onClick={onClose} className="cursor-pointer">
                        <IoIosCloseCircleOutline className="text-xl text-[#ffc300]/80" />
                    </p>
                </div>
                <p className="mt-1 text-lg font-bold leading-tight text-[#ffd60a]">Places People Explore</p>
            </header>

            <section className="px-3 pb-3 pt-2">
                <div className="grid grid-cols-[28px_minmax(0,1fr)_72px] items-center px-2 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#ffc300]">
                    <span aria-hidden="true"></span>
                    <p className="m-0">Place</p>
                    <p className="m-0 text-center">Visits</p>
                </div>

                {places.length > 0 ? (
                    <div className="max-h-[200px] overflow-y-auto pr-1">
                        {places.map((place, index) => (
                            <div
                                key={`${place.placeName}-${index}`}
                                className="grid grid-cols-[28px_minmax(0,1fr)_72px] items-center rounded-lg border-b border-[#003566]/50 px-2 py-2.5 transition-colors duration-200 hover:bg-[#003566]/20 last:border-b-0"
                            >
                                <span className="text-xs font-semibold text-[#ffc300]/60">{String(index + 1).padStart(2, "0")}</span>
                                <p className="m-0 truncate pr-2 text-sm font-medium text-[#e9ecef]" title={place.placeName}>
                                    {place.placeName}
                                </p>
                                <p className="m-0 text-center">
                                    <span className="inline-flex min-w-9 justify-center rounded-md border border-[#ffc300]/30 bg-[#ffc300]/10 px-2 py-1 text-xs font-bold text-[#ffd60a]">
                                        {place.count}
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="mx-1 mb-1 flex min-h-20 items-center justify-center rounded-lg border border-dashed border-[#003566] bg-[#001d3d]/30 px-4 text-center">
                        <p className="m-0 text-sm text-[#adb5bd]">No places to show yet</p>
                    </div>
                )}
            </section>
        </motion.section>
    )
}

export default ShowGlobePlaceInDetails;