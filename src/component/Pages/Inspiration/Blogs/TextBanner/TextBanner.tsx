import React from "react";
import type ITextBanner from "./ITextBanner";
import type IUserInterface from "../../../../../Interface/DataInterface/IUserDetails";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const description = "Welcome to the Great Hall of Stories, where travellers from every corner of the world share their most magical adventures. Browse through countless tales, create your own travel journal, and inspire future explorers. Our enchanted search spell helps you uncover exactly the stories you're looking for.";

const TextBanner: React.FC<ITextBanner> = () => {
    const { userName } = useSelector((state: any) => state.userDetails as IUserInterface);

    return (
        <section className="w-full max-w-3xl px-2 pt-8 mt-2 sm:pt-12">
            <motion.h1
                className="font-fraunces text-balance text-[clamp(2.25rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-[#f8f9fa] [text-shadow:0_2px_18px_rgba(0,0,0,0.4)]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
            >
                Welcome{" "}
                <span className="bg-gradient-to-r from-[#dee2e6] via-[#6c757d] to-[#343a40] bg-clip-text text-transparent [text-shadow:none]">
                    {userName ?? ""} !!
                </span>
            </motion.h1>
            <div className="mt-5 h-[3px] w-20 rounded-full bg-gradient-to-r from-[#dee2e6] to-transparent" />
            <motion.p
                className="mt-5 max-w-xl text-pretty text-base leading-8 text-[#adb5bd]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
                {description}
            </motion.p>
        </section>
    );
};

export default TextBanner;
