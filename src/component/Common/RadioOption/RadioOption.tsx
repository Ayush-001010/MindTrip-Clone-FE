import React from "react";
import { motion } from "framer-motion";
import { IoCheckmark } from "react-icons/io5";
import type IRadioOption from "./IRadioOption";

const RadioOption: React.FC<IRadioOption> = ({
    options,
    value,
    onChange,
    title,
    className = "",
}) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`w-64 overflow-hidden rounded-xl border border-[#495057] bg-[#242423] shadow-xl shadow-black/40 ${className}`}
        >
            {title && (
                <p className="border-b border-[#3a3a39] px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#9a9a9a]">
                    {title}
                </p>
            )}
            <div className="flex flex-wrap gap-2 p-3">
                {options.map((option, index) => {
                    const isSelected = option.value === value;
                    return (
                        <motion.button
                            key={option.value}
                            type="button"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.2, delay: index * 0.04, ease: "easeOut" }}
                            onClick={() => onChange(option.value)}
                            className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm transition-all duration-200 ${
                                isSelected
                                    ? "border-[#f8f9fa] bg-[#f8f9fa] font-semibold text-[#212529]"
                                    : "border-[#495057] bg-transparent text-[#d6d6d6] hover:border-[#f8f9fa] hover:text-[#fff]"
                            }`}
                        >
                            {isSelected && <IoCheckmark className="text-base" />}
                            {option.label}
                        </motion.button>
                    );
                })}
            </div>
        </motion.section>
    );
};

export default RadioOption;
