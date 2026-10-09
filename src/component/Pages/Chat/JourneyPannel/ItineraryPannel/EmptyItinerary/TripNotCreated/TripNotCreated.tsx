import React, { useMemo } from "react";
import { motion } from "framer-motion";
import useTripAction from "../../../../../../../CustomHooks/useTripAction";
import type ITripNotCreated from "./ITripNotCreated";

const TripNotCreated: React.FC<ITripNotCreated> = () => {
    const { createNewTrip } = useTripAction();
    const CHAR_STAGGER = 0.025;
    const message = useMemo(() => "No itinerary available. Create your own itinerary by clicking the button below.", []);
    const typingDuration = message.length * CHAR_STAGGER;

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
        <motion.div
            className="flex flex-col items-center justify-center p-4 h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
        >
            <motion.p
                className="mt-4 text-center text-sm text-gray-300"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {message.split("").map((ch, i) => (
                    <motion.span key={i} variants={char}>
                        {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                ))}
            </motion.p>
            <motion.button
                type="button"
                initial={{ opacity: 0, y: 12, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: typingDuration + 0.4 }}
                whileHover={{ scale: 1.05, backgroundColor: "#6a994e" }}
                whileTap={{ scale: 0.96 }}
                className="mt-4 cursor-pointer rounded-lg bg-[#adb5bd] p-2 px-4 text-sm font-medium text-white shadow-md"
                onClick={createNewTrip}
            >
                Create Itinerary
            </motion.button>
        </motion.div>
    );
};

export default TripNotCreated;