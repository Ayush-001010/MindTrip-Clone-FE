import React, { useEffect, useState } from "react";
import type IEmptyPannel from "./IEmptyPannel";

const AnimatedText: React.FC<{ text: string; speed?: number }> = ({ text, speed = 30 }) => {
    const [visible, setVisible] = useState(0);

    useEffect(() => {
        setVisible(0);
        if (!text) return;
        const id = setInterval(() => {
            setVisible((v) => {
                if (v >= text.length) {
                    clearInterval(id);
                    return v;
                }
                return v + 1;
            });
        }, speed);
        return () => clearInterval(id);
    }, [text, speed]);

    return (
        <p className="text-center text-white/95 text-sm max-w-prose">
            {text.split("").map((ch, i) => {
                const isVisible = i < visible;
                return (
                    <span
                        aria-hidden={!isVisible}
                        key={i}
                        className="inline-block"
                        style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible ? "translateY(0)" : "translateY(6px)",
                            transition: "opacity 160ms ease, transform 160ms ease",
                            transitionDelay: `${i * 20}ms`,
                        }}
                    >
                        {ch === ' ' ? '\u00A0' : ch}
                    </span>
                );
            })}
        </p>
    );
};

const EmptyPannel: React.FC<IEmptyPannel> = () => {
    const message = "Chat with MindTrip AI to craft your perfect itinerary.";
    return (
        <div className="flex h-full w-full items-center justify-center px-4">
            <AnimatedText text={message} speed={25} />
        </div>
    );
};

export default EmptyPannel;