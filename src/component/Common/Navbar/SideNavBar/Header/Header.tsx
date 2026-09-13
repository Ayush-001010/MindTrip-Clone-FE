import React from "react";
import type IHeader from "./IHeader";
import CommonConfig from "../../../../../config/CommonConfig";
import { WiStars } from "react-icons/wi";
import { motion } from "framer-motion";
import { CiLogout } from "react-icons/ci";
import { useSideNavBarContext } from "../SideNavBar";
import { CgLogIn } from "react-icons/cg";

const Header: React.FC<IHeader> = () => {
    const { setIsCollapsed, isCollapsed } = useSideNavBarContext();
    const titleWords = CommonConfig.companyName.split(" ");

    return (
        <div className="my-2 flex justify-between items-center">
            <motion.p
                className="flex items-center justify-start gap-3 text-center text-xl font-bubblegum tracking-[0.02em] text-[#fff] drop-shadow-[0_3px_12px_rgba(148,163,184,0.18)]"
                initial="hidden"
                animate="visible"
            >
                {!isCollapsed && (
                    <span className="inline-flex h-10  w-10 items-center justify-center rounded-2xl border border-sky-200/80 bg-[#fff] text-4xl text-[#000] shadow-xl">
                        <WiStars />
                    </span>
                )}
                {isCollapsed && (
                    <span onClick={() => setIsCollapsed(false)} className="inline-flex h-10 w-18 hover:bg-[#dee2e6] cursor-pointer items-center justify-center rounded-2xl bg-white text-black shadow-xl">
                        <CgLogIn />
                    </span>
                )}
                {!isCollapsed && (
                    <span>
                        {titleWords.map((word, wordIndex) => {
                            const priorCharacters = titleWords
                                .slice(0, wordIndex)
                                .reduce((count, currentWord) => count + currentWord.length, 0) + wordIndex;

                            return (
                                <span key={`${word}-${wordIndex}`} className="inline-block whitespace-nowrap">
                                    {Array.from(word).map((character, characterIndex) => (
                                        <motion.span
                                            key={`${character}-${wordIndex}-${characterIndex}`}
                                            className="inline-block"
                                            variants={{
                                                hidden: {
                                                    opacity: 0,
                                                    y: 14,
                                                    filter: "blur(6px)",
                                                },
                                                visible: {
                                                    opacity: 1,
                                                    y: 0,
                                                    filter: "blur(0px)",
                                                    transition: {
                                                        duration: 0.42,
                                                        delay: 0.12 + (priorCharacters + characterIndex) * 0.045,
                                                        ease: [0.22, 1, 0.36, 1],
                                                    },
                                                },
                                            }}
                                        >
                                            {character}
                                        </motion.span>
                                    ))}
                                    {wordIndex < titleWords.length - 1 ? <span className="inline-block">&nbsp;</span> : null}
                                </span>
                            );
                        })}
                    </span>
                )}
            </motion.p>
            {!isCollapsed && (
                <p className="text-2xl cursor-pointer hover:bg-[#495057] rounded-lg p-1" onClick={() => setIsCollapsed(true)}>
                    <CiLogout />
                </p>
            )}
        </div>
    );
};

export default Header;