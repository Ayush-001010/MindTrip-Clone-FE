
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import type IProgressPage from "./IProgressPage";
import {
    FaCheck,
    FaCloudArrowUp,
    FaWandMagicSparkles,
    FaFilm,
    FaPlay,
    FaArrowRight,
} from "react-icons/fa6";
import { GiSparkles } from "react-icons/gi";

const steps = [
    {
        title: "Memories uploaded",
        description: "Your photos and videos are safely collected.",
        icon: FaCloudArrowUp,
    },
    {
        title: "Memories analyzed",
        description: "AI has discovered your best travel moments.",
        icon: FaWandMagicSparkles,
    },
    {
        title: "Create your reel",
        description: "Choose a room and bring your memories to life.",
        icon: FaFilm,
    },
];

const CURRENT_STEP = 2;

const particles = [
    { x: -75, y: -35, delay: 0 },
    { x: 75, y: -55, delay: 0.5 },
    { x: -95, y: 35, delay: 1 },
    { x: 95, y: 40, delay: 1.5 },
    { x: 0, y: -75, delay: 0.8 },
];

const ProgressPage: React.FC<IProgressPage> = () => {
    const shouldReduceMotion = useReducedMotion();
    const progress = (CURRENT_STEP / steps.length) * 100;

    const reveal = (delay = 0) => ({
        initial: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
        animate: { opacity: 1, y: 0 },
        transition: {
            duration: shouldReduceMotion ? 0 : 0.6,
            delay: shouldReduceMotion ? 0 : delay,
            ease: "easeOut" as const,
        },
    });

    return (
        <section className="flex h-full w-full items-center justify-center px-4 py-6">
            <motion.div
                initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-zinc-800 bg-[#111116] shadow-2xl shadow-black/30"
            >
                {/* Background decoration */}
                <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-600/[0.08] blur-3xl" />
                <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-fuchsia-600/[0.06] blur-3xl" />

                {/* Header */}
                <motion.div
                    {...reveal(0.1)}
                    className="relative px-6 pb-5 pt-7"
                >
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <div className="mb-2 flex items-center gap-2">
                                <GiSparkles className="text-xs text-violet-400" />
                                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-violet-400">
                                    Your travel story
                                </p>
                            </div>

                            <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                                You're almost there!
                            </h2>

                            <p className="mt-2 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                                We've done the magic behind the scenes.
                                Now it's your turn to create something beautiful.
                            </p>
                        </div>

                        <motion.div
                            animate={
                                shouldReduceMotion
                                    ? {}
                                    : { rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }
                            }
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-300"
                        >
                            <FaFilm className="text-xl" />
                        </motion.div>
                    </div>
                </motion.div>

                {/* Film strip */}
                <motion.div
                    {...reveal(0.25)}
                    className="relative mx-5 overflow-hidden rounded-xl border border-zinc-700/70 bg-zinc-950"
                >
                    {/* Film holes */}
                    {[0, 1].map((row) => (
                        <div
                            key={row}
                            className={`flex justify-between px-3 py-2 ${
                                row === 0 ? "border-b border-zinc-800" : "border-t border-zinc-800"
                            }`}
                        >
                            {Array.from({ length: 12 }).map((_, i) => (
                                <span
                                    key={i}
                                    className="h-2 w-3 rounded-sm bg-zinc-800"
                                />
                            ))}
                        </div>
                    ))[0]}

                    {/* Scenes */}
                    <div className="grid grid-cols-3 gap-2 p-3">
                        {steps.map((step, index) => {
                            const isDone = index < CURRENT_STEP;
                            const isActive = index === CURRENT_STEP;
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    key={step.title}
                                    initial={{
                                        opacity: 0,
                                        y: shouldReduceMotion ? 0 : 20,
                                    }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: shouldReduceMotion ? 0 : 0.35 + index * 0.18,
                                    }}
                                    className={`relative flex min-h-36 flex-col items-center justify-center overflow-hidden rounded-lg border px-2 py-4 text-center ${
                                        isActive
                                            ? "border-violet-400/70 bg-gradient-to-b from-violet-500/20 to-fuchsia-500/10 shadow-[0_0_25px_rgba(139,92,246,0.12)]"
                                            : isDone
                                                ? "border-zinc-700 bg-zinc-900"
                                                : "border-zinc-800 bg-zinc-950 opacity-40"
                                    }`}
                                >
                                    {/* Active scene glow */}
                                    {isActive && (
                                        <>
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/[0.08] to-transparent"
                                                animate={
                                                    shouldReduceMotion
                                                        ? {}
                                                        : { x: ["-120%", "120%"] }
                                                }
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                    repeatDelay: 1,
                                                    ease: "linear",
                                                }}
                                            />

                                            {/* Floating sparkles */}
                                            {particles.map((particle, i) => (
                                                <motion.span
                                                    key={i}
                                                    className="pointer-events-none absolute left-1/2 top-1/2 text-violet-300"
                                                    animate={
                                                        shouldReduceMotion
                                                            ? {}
                                                            : {
                                                                x: [0, particle.x],
                                                                y: [0, particle.y],
                                                                opacity: [0, 0.9, 0],
                                                                scale: [0.4, 1, 0.3],
                                                            }
                                                    }
                                                    transition={{
                                                        duration: 2.5,
                                                        delay: particle.delay,
                                                        repeat: Infinity,
                                                        repeatDelay: 0.5,
                                                        ease: "easeInOut",
                                                    }}
                                                >
                                                    <GiSparkles className="text-[9px]" />
                                                </motion.span>
                                            ))}
                                        </>
                                    )}

                                    {/* Icon */}
                                    <motion.div
                                        animate={
                                            isActive && !shouldReduceMotion
                                                ? {
                                                    scale: [1, 1.1, 1],
                                                    boxShadow: [
                                                        "0 0 0px rgba(139,92,246,0)",
                                                        "0 0 20px rgba(139,92,246,0.25)",
                                                        "0 0 0px rgba(139,92,246,0)",
                                                    ],
                                                }
                                                : {}
                                        }
                                        transition={{
                                            duration: 2.5,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                        className={`relative z-10 mb-3 flex h-11 w-11 items-center justify-center rounded-full ${
                                            isDone
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : isActive
                                                    ? "bg-violet-500/20 text-violet-300"
                                                    : "bg-zinc-800 text-zinc-500"
                                        }`}
                                    >
                                        {isDone ? (
                                            <FaCheck />
                                        ) : (
                                            <Icon className="text-lg" />
                                        )}
                                    </motion.div>

                                    {/* Text */}
                                    <p className={`relative z-10 text-xs font-bold ${
                                        isDone || isActive
                                            ? "text-zinc-100"
                                            : "text-zinc-500"
                                    }`}>
                                        {step.title}
                                    </p>

                                    <span className={`relative z-10 mt-2 text-[9px] font-bold uppercase tracking-wider ${
                                        isDone
                                            ? "text-emerald-400"
                                            : isActive
                                                ? "text-violet-300"
                                                : "text-zinc-600"
                                    }`}>
                                        {isDone
                                            ? "Completed"
                                            : isActive
                                                ? "Ready for you"
                                                : "Coming up"}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Bottom film holes */}
                    <div className="flex justify-between border-t border-zinc-800 px-3 py-2">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <span
                                key={i}
                                className="h-2 w-3 rounded-sm bg-zinc-800"
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Progress */}
                <motion.div
                    {...reveal(0.7)}
                    className="px-6 py-5"
                >
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-xs font-medium text-zinc-400">
                            Your story preparation
                        </span>
                        <span className="text-xs font-bold text-violet-300">
                            {Math.round(progress)}%
                        </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{
                                duration: shouldReduceMotion ? 0 : 1.5,
                                delay: shouldReduceMotion ? 0 : 0.8,
                                ease: "easeOut",
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-purple-500 to-fuchsia-400"
                        />
                    </div>
                </motion.div>

                {/* Final CTA message */}
                <motion.div
                    {...reveal(0.9)}
                    className="relative mx-5 mb-5 overflow-hidden rounded-xl border border-violet-500/25 bg-gradient-to-r from-violet-500/[0.12] to-fuchsia-500/[0.06] p-4"
                >
                    <div className="flex items-center gap-3">
                        <motion.div
                            animate={
                                shouldReduceMotion
                                    ? {}
                                    : { rotate: [0, -8, 8, 0] }
                            }
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                            }}
                            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300"
                        >
                            <FaPlay className="ml-0.5 text-sm" />
                        </motion.div>

                        <div className="min-w-0 flex-1">
                            <h3 className="text-sm font-bold text-zinc-100">
                                Lights, camera, memories!
                            </h3>
                            <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                                Choose an existing room or create a new one.
                                Your next great travel story starts there.
                            </p>
                        </div>

                        <motion.div
                            animate={
                                shouldReduceMotion
                                    ? {}
                                    : { x: [0, 5, 0] }
                            }
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                            }}
                            className="shrink-0 text-violet-300"
                        >
                            <FaArrowRight />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default ProgressPage;
