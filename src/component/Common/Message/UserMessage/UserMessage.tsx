import React from "react";
import type IUserMessage from "./IUserMessage";
import { motion } from "framer-motion";
import { RiUser3Fill } from "react-icons/ri";

const UserMessage: React.FC<IUserMessage> = ({ message }) => {

    const container = {
        hidden: {},
        show: { transition: { staggerChildren: 0.018 } },
    };

    const char = {
        hidden: { opacity: 0, y: 6 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <section className="flex w-full justify-end items-center">
            <div className="flex items-center justify-center max-w-[88%] gap-2.5 sm:max-w-[74%]">
                <motion.p className="text-xs leading-6 text-[#fff] m-0 font-bold" variants={container} initial="hidden" animate="show" aria-label="User message">
                    {message.split("").map((ch, i) => (
                        <motion.span key={i} className="inline-block" variants={char} aria-hidden={ch === " "}>
                            {ch === " " ? "\u00A0" : ch}
                        </motion.span>
                    ))}
                </motion.p>
                <span className="mb-1 border p-2 rounded-lg bg-[#dee2e6] opacity-80 shadow-lg text-[#000]">
                    <RiUser3Fill className="h-4 w-4" />
                </span>
            </div>
        </section>
    );
};

export default UserMessage;