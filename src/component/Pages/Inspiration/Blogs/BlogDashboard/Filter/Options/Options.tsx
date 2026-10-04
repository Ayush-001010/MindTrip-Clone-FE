import React from "react";
import type IOptions from "./IOptions";
import { IoLocation } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { FaTags } from "react-icons/fa";
import { TbPigMoney } from "react-icons/tb";
import { PiNumberCircleOne } from "react-icons/pi";
import { Tooltip } from "antd";

const Options: React.FC<IOptions> = ({ setSelectFilterType }) => {
    return (
        <section className="flex justify-between w-sm">
            <section>
                <Tooltip title="Location">
                    <button onClick={() => setSelectFilterType("location")} className="p-3 cursor-pointer hover:text-[#fff] transition-all duration-300 shadow-2xs shadow-[#495057] text-[#d6d6d6] bg-[#242423] rounded-full text-lg ">
                        <IoLocation />
                    </button>
                </Tooltip>
            </section>
            <section>
                <Tooltip title="Profile/Title">
                    <button onClick={() => setSelectFilterType("profile")} className="p-3 cursor-pointer hover:text-[#fff] transition-all duration-300 shadow-2xs shadow-[#495057] text-[#d6d6d6] bg-[#242423] rounded-full text-lg ">
                        <ImProfile />
                    </button>
                </Tooltip>
            </section>
            <section>
                <Tooltip title="Budget">
                    <button onClick={() => setSelectFilterType("budget")} className="p-3 cursor-pointer hover:text-[#fff] transition-all duration-300 shadow-2xs shadow-[#495057] text-[#d6d6d6] bg-[#242423] rounded-full text-lg ">
                        <TbPigMoney />
                    </button>
                </Tooltip>
            </section>
            <section>
                <Tooltip title="Number Of Places">
                    <button onClick={() => setSelectFilterType("numberOfPlace")} className="p-3 cursor-pointer hover:text-[#fff] transition-all duration-300 shadow-2xs shadow-[#495057] text-[#d6d6d6] bg-[#242423] rounded-full text-lg ">
                        <PiNumberCircleOne />
                    </button>
                </Tooltip>
            </section>
            <section>
                <Tooltip title="Tags">
                    <button onClick={() => setSelectFilterType("tags")} className="p-3 cursor-pointer hover:text-[#fff] transition-all duration-300 shadow-2xs shadow-[#495057] text-[#d6d6d6] bg-[#242423] rounded-full text-lg ">
                        <FaTags />
                    </button>
                </Tooltip>
            </section>
        </section>
    );
};

export default Options;