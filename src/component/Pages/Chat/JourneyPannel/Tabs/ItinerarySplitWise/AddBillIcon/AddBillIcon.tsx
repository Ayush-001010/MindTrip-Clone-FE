import React from "react";
import type IAddBillIcon from "./IAddBillIcon";
import { IoMdAddCircleOutline } from "react-icons/io";

const AddBillIcon: React.FC<IAddBillIcon> = ({ clickHandler }) => {
    return (
        <button
            onClick={clickHandler}
            type="button"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#60a5fa]/20 bg-[#0f172a]/88 px-3 py-2 text-[#dbeafe] transition-all duration-200 hover:border-[#93c5fd]/45 hover:bg-[#172554] active:translate-y-0"
        >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#38bdf8] to-[#2563eb] text-xl text-white">
                <IoMdAddCircleOutline />
            </span>
            <span className="text-sm font-semibold text-white">Add bill</span>
        </button>
    );
};

export default AddBillIcon;