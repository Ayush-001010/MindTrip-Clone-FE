import React from "react";
import type IShowActivityType from "./IShowActivityType";
import { TbBrandTripadvisor } from "react-icons/tb";
import { GiMountainClimbing } from "react-icons/gi";
import { MdTempleBuddhist } from "react-icons/md";
import { GiSpeedBoat } from "react-icons/gi";

const ShowActivityType: React.FC<IShowActivityType> = ({ activityType }) => {

    const genratedIcon = () => {
        switch (activityType) {
            case "Attraction":
                return <TbBrandTripadvisor className="shrink-0" />;
            case "Trek":
                return <GiMountainClimbing className="shrink-0" />;
            case "Temple":
                return <MdTempleBuddhist className="shrink-0" />;
            case "Boat Ride":
                return <GiSpeedBoat className="shrink-0" />;
            default:
                return null;
        }
    }
    return (
        <section className="flex w-full items-center gap-2 text-lg font-semibold text-[#f8f9fa]">
            <span className="text-gray-400">{genratedIcon()}</span>
            <p>{activityType}</p>
        </section>
    );
};

export default ShowActivityType;