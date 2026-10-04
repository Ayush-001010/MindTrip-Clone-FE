import React, { useEffect, useState } from "react";
import type IShowCards from "./IShowCards";
import ScrollBar from "./ScrollBar/ScrollBar";
import BlogCard from "../Card/BlogCard/BlogCard";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

const ShowCards: React.FC<IShowCards> = ({ type, data }) => {
    const [activePage, setActivePage] = useState(1);
    const [isStopRotation, setIsStopRotation] = useState(false);
    const reduceMotion = useReducedMotion();


    const clickHandler = (page: number) => {
        setIsStopRotation(!isStopRotation);
        setActivePage(page);
    };

    useEffect(() => {
        const timeOutID = setTimeout(() => {
            if (isStopRotation) return;
            if (data.length === 0 || data.length === 1) return;
            if (activePage === data.length) setActivePage(1);
            else setActivePage(activePage + 1);
        }, 3000);
        return () => clearTimeout(timeOutID);
    }, [activePage, isStopRotation])

    return (
        <section className="flex flex-col items-center justify-center w-full">
            {type === "blog" && (
                <section className="mb-2">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activePage}
                            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: reduceMotion ? 0 : -16 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                        >
                            <BlogCard blogData={data[activePage - 1]} />
                        </motion.div>
                    </AnimatePresence>
                </section>
            )}
            <ScrollBar total={data.length} active={activePage} onChange={clickHandler} />
        </section>
    );
};

export default ShowCards;