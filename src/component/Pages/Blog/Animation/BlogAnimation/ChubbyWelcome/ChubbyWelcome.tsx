import React from "react";
import type IChubbyWelcome from "./IChubbyWelcome";
import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { useParams } from "react-router-dom";
import Cat from "../../../../../Common/Cat/Cat";

const ChubbyWelcome: React.FC<IChubbyWelcome> = () => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const {blogId} = useParams();
    const catName = "CHUBBY";

    const opacity = Math.min(1,frame/60);
    const catProgress = spring({
        frame: frame - Math.round(1.5 * fps),
        fps,
        config: { stiffness: 160, damping: 15 },
    });

    return (
        <AbsoluteFill className="comic-background relative">
            <div className="flex w-full justify-end">
                <p style={{ opacity }} className="text-[100px] font-smokum tracking-widest font-bold mr-4 mt-4 text-[#fff]">
                    Case File : {blogId}
                </p>
            </div>
            <div className="flex h-full justify-center items-center gap-2">
                <div className="relative flex items-center justify-center gap-2 leading-none">
                <Cat progress={catProgress} />
                {catName.split("").map((letter, index) => {
                    // Start each letter 0.3 seconds after the previous one.
                    const delay = Math.round(index * 0.3 * fps);
                    const progress = spring({
                        frame: frame - delay,
                        fps,
                        config: {
                            stiffness: 300,
                            damping: 15,
                        },
                    });

                    const y = -800 * (1 - progress);


                    return (
                        <span
                            key={index}
                            className="relative z-10 font-luckiest-guy text-[400px] text-[#fff] text-shadow-[0_40px_20px_#001d3d]"
                            style={{
                                transform: `translateY(${y}px)`,
                                opacity: Math.min(1, Math.max(0, progress)),
                            }}
                        >
                            {letter}
                        </span>
                    );
                })}
                </div>
            </div>
        </AbsoluteFill>
    );
};

export default ChubbyWelcome;