import React from "react";
import type IAddBillIcon from "./IAddBillIcon";
import { IoMdAddCircleOutline } from "react-icons/io";

const AddBillIcon: React.FC<IAddBillIcon> = ({ clickHandler }) => {
    return (
        <button
            onClick={clickHandler}
            type="button"
            className="absolute cursor-pointer bottom-5 right-5 inline-flex items-center gap-3 rounded-2xl border border-[#60a5fa]/20 bg-[#0f172a]/88 px-4 py-3 text-[#dbeafe] shadow-[0_12px_28px_rgba(15,23,42,0.28)] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#93c5fd]/45 hover:bg-[#172554] hover:shadow-[0_16px_34px_rgba(37,99,235,0.18)] active:translate-y-0"
        >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#38bdf8] to-[#2563eb] text-[1.65rem] text-white shadow-[0_8px_18px_rgba(37,99,235,0.24)]">
                <IoMdAddCircleOutline />
            </span>
            <span className="text-left leading-tight">
                <span className="block text-[0.7rem] font-medium uppercase tracking-[0.24em] text-[#93c5fd]">Expense</span>
                <span className="block text-sm font-semibold text-white">Add bill</span>
            </span>
        </button>
    );
};

export default AddBillIcon;