import React, { useEffect, useMemo, useState } from "react";
import type ITripIsCreated from "./ITripIsCreated";
import { AnimatePresence, motion } from "framer-motion";
import { FaRegUser } from "react-icons/fa";
import { FaRobot } from "react-icons/fa";

const TripIsCreated: React.FC<ITripIsCreated> = () => {
    const CHAR_STAGGER = 0.018;
    const message1 = useMemo(() => "You're just one step away from creating your perfect itinerary.", []);
    const message2 = useMemo(() => "Chat with AI to start planning your trip.", []);

    const conversation = useMemo(() => [
        { from: "user", text: "Hey, I want to plan a trip to Himachal." },
        { from: "ai", text: "Sure! What dates are you planning to travel?" },
        { from: "user", text: "10th June to 20th June." },
        { from: "ai", text: "Great! Check the suggested itineraries for your trip." },
        { from : "user", text: "Plan A sounds good. Please go ahead and finalize it." },
        { from: "ai", text: "Perfect! Your trip has been successfully created." }
    ] as const, []);
    const [step, setStep] = useState(0);
    const current = conversation[step];
    const toAI = current.from === "user";

    useEffect(() => {
        /// Stop after one round of conversation
        if (step >= conversation.length - 1) return;
        const id = setTimeout(() => setStep((p) => (p + 1) % conversation.length), 1800);
        return () => clearTimeout(id);
    }, [step, conversation.length]);

    const container = {
        hidden: {},
        show: {
            transition: {
                delayChildren: 0.2,
                staggerChildren: CHAR_STAGGER,
            },
        },
    };

    const char = {
        hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
        show: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: { duration: 0.35, ease: "easeOut" as const },
        },
    };

    return (
        <motion.section className="flex flex-col items-center justify-center gap-8 p-6 h-full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
            <div className="flex flex-col items-center gap-2 max-w-lg">
                <motion.p className="text-center text-lg font-semibold text-white" variants={container} initial="hidden" animate="show">
                    {message1.split("").map((ch, i) => (
                        <motion.span key={i} variants={char}>
                            {ch === " " ? "\u00A0" : ch}
                        </motion.span>
                    ))}
                </motion.p>
                <motion.p className="text-center text-base text-gray-400" variants={container} initial="hidden" animate="show">
                    {message2.split("").map((ch, i) => (
                        <motion.span key={i} variants={char}>
                            {ch === " " ? "\u00A0" : ch}
                        </motion.span>
                    ))}
                </motion.p>
            </div>
            <div className="grid w-full max-w-2xl grid-cols-[1fr_auto_1fr] items-start gap-x-2 gap-y-4">
                <div className="flex justify-end">
                    <motion.span
                        className="flex h-16 w-16 items-center justify-center rounded-full border-2 bg-gray-800 text-2xl text-gray-200"
                        animate={{ scale: toAI ? 1.12 : 1, borderColor: toAI ? "#a5b4fc" : "#4b5563" }}
                    >
                        <FaRegUser />
                    </motion.span>
                </div>
                <svg width="220" height="90" viewBox="0 0 220 90" fill="none" className="overflow-visible" aria-hidden>
                    <motion.path
                        d="M 0 32 C 0 -12, 220 -12, 220 32"
                        strokeLinecap="round"
                        initial={false}
                        animate={{ strokeWidth: toAI ? 6 : 1.5, stroke: toAI ? "#818cf8" : "#4b5563", opacity: toAI ? 1 : 0.7 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.path
                        d="M 220 32 C 220 76, 0 76, 0 32"
                        strokeLinecap="round"
                        initial={false}
                        animate={{ strokeWidth: toAI ? 1.5 : 6, stroke: toAI ? "#4b5563" : "#34d399", opacity: toAI ? 0.7 : 1 }}
                        transition={{ duration: 0.3 }}
                    />
                    <motion.circle
                        key={step}
                        r="5"
                        fill={toAI ? "#c7d2fe" : "#a7f3d0"}
                        initial={{ cx: toAI ? 0 : 220, cy: 32, opacity: 0 }}
                        animate={toAI
                            ? { cx: [0, 40, 110, 180, 220], cy: [32, 8, 2, 8, 32], opacity: [0, 1, 1, 1, 0] }
                            : { cx: [220, 180, 110, 40, 0], cy: [32, 56, 62, 56, 32], opacity: [0, 1, 1, 1, 0] }}
                        transition={{ duration: 0.9, ease: "easeInOut" }}
                    />
                </svg>
                <div className="flex justify-start">
                    <motion.span
                        className="flex h-16 w-16 items-center justify-center rounded-full border-2 bg-indigo-500/20 text-2xl text-indigo-300"
                        animate={{ scale: toAI ? 1 : 1.12, borderColor: toAI ? "#6366f199" : "#34d399" }}
                    >
                        <FaRobot />
                    </motion.span>
                </div>

                <div className="flex min-h-20 justify-end">
                    <AnimatePresence mode="wait">
                        {toAI && (
                            <motion.p
                                key={`u-${step}`}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="h-fit max-w-[16rem] rounded-2xl rounded-tr-sm border border-indigo-400/40 bg-gray-800 px-4 py-2.5 text-sm text-gray-100"
                            >
                                {current.text}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
                <div />
                <div className="flex min-h-20 justify-start">
                    <AnimatePresence mode="wait">
                        {!toAI && (
                            <motion.p
                                key={`a-${step}`}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="h-fit max-w-[16rem] rounded-2xl rounded-tl-sm border border-emerald-400/40 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-100"
                            >
                                {current.text}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.section>
    );
};

export default TripIsCreated;