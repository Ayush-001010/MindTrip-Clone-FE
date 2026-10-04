import React from "react";
import type ITextBanner from "./ITextBanner";
import { motion } from "framer-motion";

const bannerLines = [
    "Step Into A World Of Wonder",
    "And Adventure",
];

const flowSteps = ["Think It", "Tell Us", "Plan It", "Go"];

const TextBanner: React.FC<ITextBanner> = () => {
    return (
        <section className="w-[600px]">
            <motion.p className="flex flex-col gap-1 font-fraunces">
                {bannerLines.map((line, index) => (
                    <motion.span
                        key={line}
                        className="text-4xl font-bold leading-tight tracking-wide text-[#f8f9fa] [text-shadow:0_2px_14px_rgba(0,0,0,0.35)] sm:text-5xl md:text-4xl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 1.5,
                            delay: index * 0.50,
                            ease: "easeOut",
                        }}
                    >
                        {line}
                    </motion.span>
                ))}
            </motion.p>
            <motion.p
                className="mt-4 max-w-[520px] text-sm leading-relaxed text-[#ced4da]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            >
                Plan, explore, and share every journey in one place. Create itineraries with friends, discover amazing places, manage expenses, save travel memories, and get personalised trip recommendations tailored to your interests. ✈️🌍✨
            </motion.p>
            <motion.p className="mt-6 flex flex-wrap items-center gap-2">
                {flowSteps.map((step, index) => (
                    <React.Fragment key={step}>
                        <motion.span
                            className="rounded-full border border-[#495057] bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#f8f9fa]"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: 1.3 + index * 0.15,
                                ease: "easeOut",
                            }}
                        >
                            {step}
                        </motion.span>

                        {index < flowSteps.length - 1 && (
                            <motion.span
                                className="text-sm text-[#9B6B43]"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{
                                    duration: 0.4,
                                    delay: 1.3 + index * 0.15 + 0.08,
                                }}
                            >
                                →
                            </motion.span>
                        )}
                    </React.Fragment>
                ))}
            </motion.p>

        </section>
    );
};

export default TextBanner;