import React, { useEffect, useState } from "react";
import type IExpenceDetailsForm from "./IExpenceDetailsForm";
import { MdOutlineEdit } from "react-icons/md";
import { PiCalendar, PiMoneyWavyDuotone } from "react-icons/pi";
import { PiNote } from "react-icons/pi";
import { GiSchoolBag } from "react-icons/gi";
import { TbHotelService } from "react-icons/tb";
import { IoFastFood } from "react-icons/io5";
import { FaCarSide } from "react-icons/fa";
import { GiLargeDress } from "react-icons/gi";
import { GiWaveSurfer } from "react-icons/gi";
import { TbTrekking } from "react-icons/tb";

const ExpenceDetailsForm: React.FC<IExpenceDetailsForm> = ({
    expenseTotalAmount,
    setExpenseTotalAmount,
    expenseDescription,
    setExpenseDescription,
    expenseDate,
    setExpenseDate,
    expenseTitle,
    setExpenseTitle,
    setExpenseCategory
}) => {
    const [icon , setIcon] = useState<React.ReactNode>(null);

    const genrateIconDependOnTitle = (_title: string) => {
        if(_title.toLowerCase().includes("hotel")) {
            setExpenseCategory("hotel");
            setIcon(<TbHotelService className="text-2xl"/>);
        } else if(_title.toLowerCase().includes("food")) {
            setExpenseCategory("food");
            setIcon(<IoFastFood className="text-2xl"/>);
        } else if(_title.toLowerCase().includes("cab") || _title.toLowerCase().includes("taxi") || _title.toLowerCase().includes("uber") || _title.toLowerCase().includes("transport") || _title.toLowerCase().includes("bus") || _title.toLowerCase().includes("train") || _title.toLowerCase().includes("flight") || _title.toLowerCase().includes("rapido") || _title.toLowerCase().includes("auto") || _title.toLowerCase().includes("ola")) {
            setExpenseCategory("cab");
            setIcon(<FaCarSide className="text-2xl"/>);
        } else if(_title.toLowerCase().includes("dress")) {
            setExpenseCategory("dress");
            setIcon(<GiLargeDress className="text-2xl"/>);
        } else if(_title.toLowerCase().includes("surf")) {
            setExpenseCategory("surffing");
            setIcon(<GiWaveSurfer className="text-2xl"/>);
        } else if(_title.toLowerCase().includes("trek")) {
            setExpenseCategory("trek");
            setIcon(<TbTrekking className="text-2xl"/>);
        } else {
            setExpenseCategory("other");
            setIcon(<GiSchoolBag className="text-2xl"/>);
        }
    }

    useEffect(() => {
        const obj = setTimeout(() => {
            genrateIconDependOnTitle(expenseTitle);
        }, 500);
        return () => clearTimeout(obj);
    }, [expenseTitle]); 
    return (
        <section className="mt-3 space-y-2">
            <section className="flex items-center gap-2.5 rounded-lg border border-[#334155] px-2.5 py-2">
                <p className="m-0 flex h-9 w-9 items-center justify-center rounded-lg border border-[#334155] text-[#bfdbfe]">
                    {icon ? icon : <PiMoneyWavyDuotone className="text-lg"/>}
                </p>
                <div className="flex min-w-0 flex-1 items-center border-b border-[#475569] pb-1">
                    <input
                        type="text"
                        placeholder="Add a title"
                        value={expenseTitle}
                        onChange={(e) => setExpenseTitle(e.target.value)}
                        className="w-full bg-transparent text-sm text-[#f8f9fa] placeholder:text-[#94a3b8] focus:outline-none"
                    />
                    <MdOutlineEdit className="ml-2 shrink-0 text-sm text-[#93c5fd]" />
                </div>
            </section>
            <section className="flex items-center gap-2.5 rounded-lg border border-[#334155] px-2.5 py-2">
                <p className="m-0 flex h-9 w-9 items-center justify-center rounded-lg border border-[#334155] text-[#bfdbfe]">
                    <PiMoneyWavyDuotone className="text-lg"/>
                </p>
                <div className="flex min-w-0 flex-1 items-center border-b border-[#475569] pb-1">
                    <input
                        type="number"
                        placeholder="Drop an expense"
                        value={expenseTotalAmount}
                        onChange={(e) => setExpenseTotalAmount(Number(e.target.value))}
                        className="w-full bg-transparent text-sm text-[#f8f9fa] placeholder:text-[#94a3b8] focus:outline-none"
                    />
                    <MdOutlineEdit className="ml-2 shrink-0 text-sm text-[#93c5fd]" />
                </div>
            </section>
            <section className="flex items-center gap-2.5 rounded-lg border border-[#334155] px-2.5 py-2">
                <p className="m-0 flex h-9 w-9 items-center justify-center rounded-lg border border-[#334155] text-[#bfdbfe]">
                    <PiNote className="text-lg"/>
                </p>
                <div className="flex min-w-0 flex-1 items-center border-b border-[#475569] pb-1">
                    <input
                        type="text"
                        placeholder="Write a note"
                        value={expenseDescription}
                        onChange={(e) => setExpenseDescription(e.target.value)}
                        className="w-full bg-transparent text-sm text-[#f8f9fa] placeholder:text-[#94a3b8] focus:outline-none"
                    />
                    <MdOutlineEdit className="ml-2 shrink-0 text-sm text-[#93c5fd]" />
                </div>
            </section>
            <section className="flex items-center gap-2.5 rounded-lg border border-[#334155] px-2.5 py-2">
                <p className="m-0 flex h-9 w-9 items-center justify-center rounded-lg border border-[#334155] text-[#bfdbfe]">
                    <PiCalendar className="text-lg"/>
                </p>
                <div className="flex min-w-0 flex-1 items-center border-b border-[#475569] pb-1">
                    <input
                        type="date"
                        placeholder="Select a date"
                        value={expenseDate}
                        onChange={(e) => setExpenseDate(e.target.value)}
                        className="w-full bg-transparent text-sm text-[#f8f9fa] placeholder:text-[#94a3b8] focus:outline-none"
                    />
                    <MdOutlineEdit className="ml-2 shrink-0 text-sm text-[#93c5fd]" />
                </div>
            </section>
        </section>
    );
};

export default ExpenceDetailsForm;