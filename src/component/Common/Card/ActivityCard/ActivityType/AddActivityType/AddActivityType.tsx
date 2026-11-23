import React from "react";
import type IAddActivityType from "./IAddActivityType";
import { Select } from "antd";
import { useGetActivityCardData } from "../../ActivityCard";
import { useGetBlogContext } from "../../../../../Pages/Blog/Blog";
import { TbBrandTripadvisor } from "react-icons/tb";
import { GiMountainClimbing, GiSpeedBoat, GiCampingTent, GiParachute, GiHiking, GiFishingBoat, GiAirBalloon, GiScubaTanks, GiHorseHead } from "react-icons/gi";
import { MdTempleBuddhist, MdOutlineMuseum, MdOutlineShoppingBag, MdOutlineRestaurant, MdOutlineFestival, MdOutlineLocalFireDepartment, MdOutlineCameraAlt } from "react-icons/md";
import {FaPersonSwimming,FaBicycle,FaBinoculars,FaLandmark,FaUmbrellaBeach,FaSpa,FaShip,FaWater,FaPersonSkiing} from "react-icons/fa6";

const activityTypeOptions = [
    // Sightseeing
    { value: "Attraction", label: <span className="flex items-center gap-2"><TbBrandTripadvisor /> Attraction</span> },
    { value: "Sightseeing", label: <span className="flex items-center gap-2"><FaBinoculars /> Sightseeing</span> },
    { value: "Museum", label: <span className="flex items-center gap-2"><MdOutlineMuseum /> Museum</span> },
    { value: "Historical Site", label: <span className="flex items-center gap-2"><FaLandmark /> Historical Site</span> },
    { value: "Photography", label: <span className="flex items-center gap-2"><MdOutlineCameraAlt /> Photography</span> },

    // Adventure
    { value: "Trek", label: <span className="flex items-center gap-2"><GiMountainClimbing /> Trek</span> },
    { value: "Hiking", label: <span className="flex items-center gap-2"><GiHiking /> Hiking</span> },
    { value: "Camping", label: <span className="flex items-center gap-2"><GiCampingTent /> Camping</span> },
    { value: "Paragliding", label: <span className="flex items-center gap-2"><GiParachute /> Paragliding</span> },
    { value: "Skiing", label: <span className="flex items-center gap-2"><FaPersonSkiing /> Skiing</span> },
    { value: "Scuba Diving", label: <span className="flex items-center gap-2"><GiScubaTanks /> Scuba Diving</span> },
    { value: "Horse Riding", label: <span className="flex items-center gap-2"><GiHorseHead /> Horse Riding</span> },
    { value: "Cycling", label: <span className="flex items-center gap-2"><FaBicycle /> Cycling</span> },
    { value: "Hot Air Balloon", label: <span className="flex items-center gap-2"><GiAirBalloon /> Hot Air Balloon</span> },

    // Water Activities
    { value: "Boat Ride", label: <span className="flex items-center gap-2"><GiSpeedBoat /> Boat Ride</span> },
    { value: "Swimming", label: <span className="flex items-center gap-2"><FaPersonSwimming /> Swimming</span> },
    { value: "Scenic Cruise", label: <span className="flex items-center gap-2"><FaShip /> Scenic Cruise</span> },
    { value: "Water Sports", label: <span className="flex items-center gap-2"><FaWater /> Water Sports</span> },
    { value: "Beach Visit", label: <span className="flex items-center gap-2"><FaUmbrellaBeach /> Beach Visit</span> },
    { value: "Fishing", label: <span className="flex items-center gap-2"><GiFishingBoat /> Fishing</span> },

    // Culture & Heritage
    { value: "Temple", label: <span className="flex items-center gap-2"><MdTempleBuddhist /> Temple</span> },
    { value: "Cultural Experience", label: <span className="flex items-center gap-2"><MdOutlineFestival /> Cultural Experience</span> },
    { value: "Local Market", label: <span className="flex items-center gap-2"><MdOutlineShoppingBag /> Local Market</span> },
    { value: "Festival", label: <span className="flex items-center gap-2"><MdOutlineFestival /> Festival</span> },

    // Food & Relaxation
    { value: "Food Experience", label: <span className="flex items-center gap-2"><MdOutlineRestaurant /> Food Experience</span> },
    { value: "Spa & Wellness", label: <span className="flex items-center gap-2"><FaSpa /> Spa & Wellness</span> },
    { value: "Bonfire", label: <span className="flex items-center gap-2"><MdOutlineLocalFireDepartment /> Bonfire</span> },
];

const AddActivityType: React.FC<IAddActivityType> = ({ setActivityType }) => {
    const { saveChangeToBlog } = useGetBlogContext();
    const { indexNumber } = useGetActivityCardData();

    const changeHandler = (value: string) => {
        setActivityType(value);
        saveChangeToBlog("activities", value, indexNumber, "activityType");
    };
    return (
        <section className="flex w-full flex-col">
            <Select
                placeholder="Select activity type"
                options={activityTypeOptions}
                onChange={(value) => changeHandler(value)}
                className="w-[200px]  [&_.ant-select-arrow]:!text-[#fff] [&_.ant-select-selection-item]:!text-sm [&_.ant-select-selection-item]:!text-[#e9ecef] [&_.ant-select-selection-placeholder]:!text-sm [&_.ant-select-selection-placeholder]:!text-gray-400 [&_.ant-select-selector]:!min-h-8 [&_.ant-select-selector]:!rounded-none [&_.ant-select-selector]:!border-0 [&_.ant-select-selector]:!border-b [&_.ant-select-selector]:!border-gray-300 [&_.ant-select-selector]:!bg-transparent [&_.ant-select-selector]:!px-0 [&_.ant-select-selector]:!py-0 [&_.ant-select-selector]:!shadow-none"
                classNames={{ popup: { root: "!bg-transparent !border !border-gray-700 [&_.ant-select-item]:!bg-transparent [&_.ant-select-item]:!text-gray-400 [&_.ant-select-item-option-active]:!text-[#e9ecef] [&_.ant-select-item-option-selected]:!text-[#fff] [&_.ant-select-item-option-selected]:!font-semibold" } }}
            />
        </section>
    );
};

export default AddActivityType;