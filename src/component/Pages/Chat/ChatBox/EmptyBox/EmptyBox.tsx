import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type IEmptyBox from "./IEmptyBox";
import useCommonActivities from "../../../../../CustomHooks/useCommonActivities";


const EmptyBox: React.FC<IEmptyBox> = () => {
    const { getEmptyChatBoxImage } = useCommonActivities();
    const [imageURL, setImageURL] = useState<string | null>(null);

    const fetchImage = async () => {
        const url = await getEmptyChatBoxImage();
        setImageURL(url);
    };
    useEffect(() => {
        fetchImage();
    }, []);
    const message =
        "Start a conversation by typing a message below or select a location from the journey panel to explore activities and destinations.";

    const container = {
        hidden: {},
        show: {
            transition: {
                staggerChildren: 0.02,
            },
        },
    };

    const char = {
        hidden: { opacity: 0, y: 6 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div className="flex flex-col h-full w-full items-center justify-center px-4">
            {imageURL ? (
                <motion.img
                    src={imageURL}
                    alt="Empty Chat Box"
                    className="max-h-60 max-w-60 object-contain mb-6"
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                />
            ) : (
                <p className="text-gray-500">Loading image...</p>
            )}

            <motion.p
                className="text-center m-4 font-bold text-[#adb5bd] max-w-prose"
                variants={container}
                initial="hidden"
                animate="show"
                aria-label="Empty chat instructions"
            >
                {message.split("").map((ch, i) => (
                    <motion.span
                        key={i}
                        variants={char}
                        className="inline-block"
                        aria-hidden={ch === " "}
                    >
                        {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                ))}
            </motion.p>
        </div>
    );
}

export default EmptyBox;