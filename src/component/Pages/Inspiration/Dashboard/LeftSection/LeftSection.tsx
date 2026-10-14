import React, { useEffect, useState } from "react";
import type ILeftSection from "./ILeftSection";
import { LiaRobotSolid } from "react-icons/lia";
import { motion } from "framer-motion";

interface ISegment {
    text: string;
    className?: string;
}

const TYPING_SPEED_MS = 20;

const paragraphs: ISegment[][] = [
    [{ text: "Hey! Great to see you here! 🌟" }],
    [
        { text: "I'm " },
        { text: "Moscut", className: "font-semibold text-white" },
        { text: ", your travel buddy and planning partner. Tell me what you're dreaming about, whether it's a relaxing beach escape, a foodie adventure, a mountain retreat, or exploring a new city, and I'll help craft the perfect itinerary just for you." },
    ],
    [{ text: "Let's make travel planning fun, easy, and exciting together." }],
    [{ text: "What's on your mind today? 🌍💙" }],
    [{text: "Discover Upcoming Long Weekends ✈️"}],
    [{text:"Get Updates on Your Upcoming Trip ✈️"}],
    [{text:"Splitwise Updates 🧾"}],
    [{text:"Custom Agents 🤖"}]
];

// Lengths are counted in code points so emoji are never split mid-character.
const lengths = paragraphs.map((segments) =>
    segments.reduce((total, segment) => total + Array.from(segment.text).length, 0)
);

const offsets = lengths.map((_, index) => lengths.slice(0, index).reduce((sum, value) => sum + value, 0));
const totalChars = lengths.reduce((sum, value) => sum + value, 0);

// Unrevealed characters stay in the DOM but invisible, so the layout never jumps while typing.
const renderTyped = (segments: ISegment[], visibleCount: number) => {
    let remaining = visibleCount;
    return segments.map((segment, index) => {
        const characters = Array.from(segment.text);
        const shown = characters.slice(0, remaining).join("");
        const hidden = characters.slice(remaining).join("");
        remaining = Math.max(0, remaining - characters.length);
        return (
            <span key={index} className={segment.className}>
                {shown}
                <span className="opacity-0">{hidden}</span>
            </span>
        );
    });
};

const LeftSection: React.FC<ILeftSection> = () => {
    const [typedCount, setTypedCount] = useState(0);
    const [thinking, setThinking] = useState<boolean>(true);

    useEffect(() => {
        const timeout = setTimeout(() => setThinking(false), 800);
        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        if (thinking) return;
        const timer = setInterval(() => {
            setTypedCount((count) => {
                if (count >= totalChars) {
                    clearInterval(timer);
                    return count;
                }
                return count + 1;
            });
        }, TYPING_SPEED_MS);
        return () => clearInterval(timer);
    }, [thinking]);

    const visibleIn = (index: number) => Math.min(Math.max(typedCount - offsets[index], 0), lengths[index]);

    return (
        <section className="relative flex max-w-2xl flex-col gap-6 text-[#C9BFB5]">
            <div className="pointer-events-none absolute -left-16 -top-16 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
            <p className="relative m-0 flex items-center gap-4 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl lg:text-4xl">
                <motion.span
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
                    transition={{
                        opacity: { duration: 0.4 },
                        scale: { duration: 0.4 },
                        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
                    }}
                    className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-3xl text-white shadow-[0_8px_24px_rgba(0,0,0,0.5)] sm:h-14 sm:w-14 sm:text-4xl"
                >
                    <LiaRobotSolid />
                </motion.span>
                {thinking ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2" aria-label="Thinking">
                        {[0, 150, 300].map((delay) => (
                            <span
                                key={delay}
                                style={{ animationDelay: `${delay}ms` }}
                                className="h-2 w-2 animate-bounce rounded-full bg-[#C9BFB5]"
                            />
                        ))}
                    </span>
                ) : (
                    <span>{renderTyped(paragraphs[0], visibleIn(0))}</span>
                )}
            </p>
            {!thinking && <>
                <p className="relative m-0 text-base leading-7 sm:text-lg sm:leading-8">{renderTyped(paragraphs[1], visibleIn(1))}</p>
                <p className="relative m-0 text-base leading-7 sm:text-lg sm:leading-8">{renderTyped(paragraphs[2], visibleIn(2))}</p>
                <section className="relative flex flex-col gap-4">
                    <p className="m-0 text-lg font-semibold text-white sm:text-xl">
                        {renderTyped(paragraphs[3], visibleIn(3))}
                    </p>
                    <section className="grid w-full gap-3 sm:grid-cols-2">
                        {[4, 5, 6, 7].map((index) => (
                            <button
                                key={index}
                                type="button"
                                disabled={visibleIn(index) < lengths[index]}
                                className={`rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left text-sm leading-6 text-[#C9BFB5] shadow-[0_8px_20px_rgba(0,0,0,0.35)] transition duration-300 enabled:cursor-pointer enabled:hover:-translate-y-0.5 enabled:hover:border-white/25 enabled:hover:bg-white/10 enabled:hover:text-white focus-visible:outline-2 focus-visible:outline-white/40 sm:text-base ${visibleIn(index) > 0 ? "opacity-100" : "opacity-0"}`}
                            >
                                {renderTyped(paragraphs[index], visibleIn(index))}
                            </button>
                        ))}
                    </section>
                </section>
            </>}
        </section>
    );
};

export default LeftSection;