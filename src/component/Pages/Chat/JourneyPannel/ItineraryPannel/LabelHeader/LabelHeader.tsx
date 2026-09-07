import React from "react";
import type ILabelHeader from "./ILabelHeader";
import { IoIosArrowDown } from "react-icons/io";

const LabelHeader: React.FC<ILabelHeader> = ({ text }) => {
    return <p className="text-sm text-[#fff]">
        <span>
            <IoIosArrowDown className="inline-block mr-2" />
        </span>
        {text}
    </p>;
};

export default LabelHeader;