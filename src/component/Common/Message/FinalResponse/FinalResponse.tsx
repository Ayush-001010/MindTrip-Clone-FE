import React from "react";
import { motion } from "framer-motion";
import type IFinalResponse from "./IFinalResponse";

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.03 } }
};

const char = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

const FinalResponse: React.FC<IFinalResponse> = ({ message }) => {
    console.log("Message:", message);
    return (
        <section className="mb-2 max-w-[85%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 px-4 py-2.5 text-sm leading-relaxed text-[#f8f9fa] shadow-sm">
            <motion.p key={message} variants={container} initial="hidden" animate="show" aria-label={message}>
                {message.split(/(\s+)/).map((part, wi) =>
                    /^\s+$/.test(part) ? (
                        <span key={wi}>{part}</span>
                    ) : (
                        <span key={wi} className="inline-block" aria-hidden>
                            {part.split("").map((ch, ci) => (
                                <motion.span key={ci} variants={char} className="inline-block">
                                    {ch}
                                </motion.span>
                            ))}
                        </span>
                    )
                )}
            </motion.p>
        </section>
    )
};

export default FinalResponse;