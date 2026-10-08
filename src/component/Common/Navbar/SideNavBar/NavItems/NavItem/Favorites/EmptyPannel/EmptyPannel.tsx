import React, { useEffect, useState } from "react";
import { useGetAppContext } from "../../../../../../../../App";
import { motion } from "framer-motion";
import type IEmptyPannel from "./IEmptyPannel";
import useCommonAction from "../../../../../../../../customHooks/useCommonAction";

const MESSAGE = "Currently, you have not created any collections yet.";
const CHAR_DELAY = 0.03;

const EmptyPannel: React.FC<IEmptyPannel> = ({onClose}) => {
    const { getImages } = useCommonAction();
    const [image, setImage] = useState<string | null>(null);
    const {changeFavoritesConfig} = useGetAppContext();

    const createCollection = () => {
        changeFavoritesConfig({
            openFavorites: true,
            uiType: "create-collection"
        });
        onClose();
    }

    useEffect(() => {
        getImages("Common/wait.png").then((res) => {
            if (res.data)
                setImage(res?.data as string || "");
        });
    }, []);

    return (
        <main className="flex h-full flex-col items-center justify-center gap-6 px-4 text-center">
            {image && (
                <motion.img
                    src={image}
                    alt="Empty Pannel"
                    className="w-44 select-none drop-shadow-lg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                />
            )}
            <p
                aria-label={MESSAGE}
                className="text-lg font-medium leading-relaxed text-white/90"
            >
                {MESSAGE.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2 + index * CHAR_DELAY }}
                    >
                        {char}
                    </motion.span>
                ))}
            </p>
            <motion.button
                type="button"
                className="cursor-pointer rounded-full bg-[#22C55E] px-6 py-3 font-semibold text-[#121113] shadow-lg transition hover:bg-[#4ade80]"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + MESSAGE.length * CHAR_DELAY }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={createCollection}
            >
                Create a Collection
            </motion.button>
        </main>
    );
};

export default EmptyPannel;
