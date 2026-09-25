import React from "react";
import type IAddActivityType from "./IAddActivityType";
import { Select } from "antd";
import { TbBrandTripadvisor } from "react-icons/tb";
import { GiMountainClimbing, GiSpeedBoat } from "react-icons/gi";
import { MdTempleBuddhist } from "react-icons/md";

const activityTypeOptions = [
    { value: "Attraction", label: <span className="flex items-center gap-2"><TbBrandTripadvisor /> Attraction</span> },
    { value: "Trek", label: <span className="flex items-center gap-2"><GiMountainClimbing /> Trek</span> },
    { value: "Temple", label: <span className="flex items-center gap-2"><MdTempleBuddhist /> Temple</span> },
    { value: "Boat Ride", label: <span className="flex items-center gap-2"><GiSpeedBoat /> Boat Ride</span> },
];

const AddActivityType: React.FC<IAddActivityType> = ({ setActivityType }) => {
    return (
        <section className="flex w-full flex-col">
            <Select
                placeholder="Select activity type"
                options={activityTypeOptions}
                onChange={(value) => setActivityType(value)}
                className="w-[200px] [&_.ant-select-arrow]:!text-[#fff] [&_.ant-select-selection-item]:!text-[#e9ecef] [&_.ant-select-selection-placeholder]:!text-gray-400 [&_.ant-select-selector]:!rounded-none [&_.ant-select-selector]:!border-0 [&_.ant-select-selector]:!border-b [&_.ant-select-selector]:!border-gray-300 [&_.ant-select-selector]:!bg-transparent [&_.ant-select-selector]:!px-0 [&_.ant-select-selector]:!shadow-none"
                popupClassName="!bg-transparent !border !border-gray-700 [&_.ant-select-item]:!bg-transparent [&_.ant-select-item]:!text-gray-400 [&_.ant-select-item-option-active]:!text-[#e9ecef] [&_.ant-select-item-option-selected]:!text-[#fff] [&_.ant-select-item-option-selected]:!font-semibold"
            />
        </section>
    );
};

export default AddActivityType;