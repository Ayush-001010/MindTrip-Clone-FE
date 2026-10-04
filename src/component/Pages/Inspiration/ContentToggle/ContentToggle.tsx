import React, { useState } from "react";
import type IContentToggle from "./IContentToggle";
import { FaQuestion, FaRobot } from "react-icons/fa";
import { BiHomeAlt2 } from "react-icons/bi";
import { SlSocialInstagram } from "react-icons/sl";
import { AnimatePresence, motion } from "framer-motion";

const menuItems = [
    { label: "Agent", position: "top", icon: FaRobot },
    { label: "Blog", position: "left", icon: SlSocialInstagram },
    { label: "Home", position: "right", icon: BiHomeAlt2 },
] as const;

const positionClasses: Record<(typeof menuItems)[number]["position"], string> = {
    top: "bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2",
    left: "right-[calc(100%+10px)] top-1/2 -translate-y-1/2",
    right: "left-[calc(100%+10px)] top-1/2 -translate-y-1/2",
};

const ContentToggle: React.FC<IContentToggle> = ({ setContentType }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="fixed bottom-8 right-24 z-50">
            <div className="relative">
                <AnimatePresence>
                    {isOpen &&
                        menuItems.map((item, index) => (
                            <motion.div
                                key={item.label}
                                className={`absolute ${positionClasses[item.position]}`}
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                transition={{ duration: 0.25, delay: index * 0.06, ease: "easeOut" }}
                            >
                                <button
                                    type="button"
                                    onClick={() => setContentType(item.label.toLowerCase() as "home" | "blog" | "agent")}
                                    className="flex h-9 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-[#f8f9fa] px-3 text-[11px] font-semibold text-[#212529] shadow-lg shadow-black/30 transition-transform duration-200 hover:scale-105"
                                >
                                    <item.icon className="text-sm" />
                                    {item.label}
                                </button>
                            </motion.div>
                        ))}
                </AnimatePresence>

                <button
                    type="button"
                    aria-label="Toggle help menu"
                    onClick={() => setIsOpen((prev) => !prev)}
                    className="relative z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#f8f9fa] text-sm text-[#212529] shadow-lg shadow-black/30 transition-transform duration-200 hover:scale-105"
                >
                    <FaQuestion />
                </button>
            </div>
        </section>
    );
};

export default ContentToggle;