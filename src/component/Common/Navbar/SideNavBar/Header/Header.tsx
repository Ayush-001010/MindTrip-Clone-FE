import React from "react";
import type IHeader from "./IHeader";
import CommonConfig from "../../../../../config/CommonConfig";
import { WiStars } from "react-icons/wi";
import { motion } from "framer-motion";

const Header: React.FC<IHeader> = () => {
    const titleWords = CommonConfig.companyName.split(" ");

    return (
        <div className="my-2">
            <motion.p
                className="flex items-center justify-center gap-3 text-center text-xl font-bubblegum tracking-[0.02em] text-slate-50 drop-shadow-[0_3px_12px_rgba(148,163,184,0.28)]"
                initial="hidden"
                animate="visible"
            >
                <span className="inline-flex h-10  w-10 items-center justify-center rounded-2xl border border-white/15 bg-gradient-to-br from-sky-400/30 via-cyan-300/20 to-emerald-300/20 text-4xl text-white shadow-[0_10px_24px_rgba(56,189,248,0.18)]">
                    <WiStars />
                </span>
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
            </motion.p>
        </div>
    );
};

export default Header;