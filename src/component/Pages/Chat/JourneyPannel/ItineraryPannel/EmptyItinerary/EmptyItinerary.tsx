import React from "react";
import type IEmptyItinerary from "./IEmptyItinerary";
import { motion } from "framer-motion";

const EmptyItinerary: React.FC<IEmptyItinerary> = () => {
    const message = "No itinerary available. Add destinations to build your trip.";

    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.03,
            },
        },
    };

    const char = {
        hidden: { opacity: 0, y: 6 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div className="flex flex-col items-center justify-center p-4 h-full">
            <motion.p
                className="mt-4 text-center text-sm text-gray-300 max-w-xs"
                variants={container}
                initial="hidden"
                animate="show"
            >
                {message.split("")?.map((ch, i) => (
                    <motion.span key={i} variants={char} className="">
                        {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                ))}
            </motion.p>
        </div>
    );
};

export default EmptyItinerary;