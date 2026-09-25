import React from "react";
import type IShowActivityDuration from "./IShowActivityDuration";
import { IoTimeOutline } from "react-icons/io5";

const ShowActivityDuration: React.FC<IShowActivityDuration> = ({ value }) => {
    return (
        <section className="flex w-full items-center gap-2 text-lg font-semibold text-[#f8f9fa]">
            { (value && value.length === 2 && value[0] && value[1]) && (
                <>
                    <IoTimeOutline className="shrink-0 text-gray-400" />
                    <p>{`${value[0].format("HH:mm")} - ${value[1].format("HH:mm")}`}</p>
                </>
            )}
        </section>
    );
};

export default ShowActivityDuration;