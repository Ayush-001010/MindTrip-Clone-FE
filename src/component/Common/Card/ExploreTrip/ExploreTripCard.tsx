import React from "react";
import type IExploreTripCard from "./IExploreTripCard";
import { Button } from "antd";

const ExploreTripCard: React.FC<IExploreTripCard> = ({ data }) => {
    const { description, image, title } = data;

    return (
        <div
            className="group relative h-[28rem] w-80 shrink-0 overflow-hidden rounded-3xl bg-slate-200 bg-cover bg-center shadow-[0_24px_60px_rgba(15,23,42,0.22)] transition duration-300 hover:-translate-y-1 sm:w-96"
            style={{ backgroundImage: `url(${image})` }}
            aria-label={title}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/10 transition duration-300 group-hover:from-black/80 group-hover:via-black/35" />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />

            <div className="absolute inset-x-0 bottom-0 space-y-4 p-5 text-white sm:p-6">

                <div className="space-y-2">
                    <p className="text-2xl font-semibold leading-tight drop-shadow-sm">{title}</p>
                    <p className="line-clamp-4 max-w-[28ch] text-sm leading-6 text-white/85 sm:text-[15px]">
                        {description}
                    </p>
                </div>

                <Button className="!h-11 !w-full !rounded-full !border-0 !bg-white/95 !font-medium !text-slate-900 !shadow-none transition hover:!bg-white group-hover:!translate-y-0">
                    Create Itinerary
                </Button>
            </div>
        </div>
    );
};

export default ExploreTripCard;