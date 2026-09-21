import React, { useEffect, useRef, useState } from "react";
import type IPageWheel from "./IPageWheel";

const circleStyles = [
    "bg-[#dee2e6] text-[#2f3e46] shadow-[0_18px_38px_rgba(0,0,0,0.35)]",
    "bg-[#6e9f9f] text-white shadow-[0_20px_34px_rgba(0,0,0,0.4)]",
    "bg-slate-800 text-[#dee2e6] ring-1 ring-slate-600/70 shadow-[0_12px_24px_rgba(0,0,0,0.3)]",
    "bg-[#335c4d] text-white shadow-[0_18px_32px_rgba(0,0,0,0.4)]",
    "bg-slate-700/80 text-[#ced4da] ring-1 ring-slate-500/60 shadow-[0_14px_30px_rgba(0,0,0,0.3)]",
];

const PageWheel: React.FC<IPageWheel> = ({ count = 5 }) => {
    const boxRef = useRef<HTMLElement | null>(null);
    const lastRotateAtRef = useRef(0);
    const [rotation, setRotation] = useState(0);
    const orbitCenterY = 180;
    const orbitRadius = 90;
    const circleSize = 80;
    const safeCount = Math.min(5, Math.max(1, count));
    const rotationStep = 8;
    const rotationCooldownMs = 160;

    useEffect(() => {
        const element = boxRef.current;
        if (!element) return;

        const handleScroll = (e: WheelEvent) => {
            e.preventDefault();

            // ignore extra wheel ticks that arrive before the previous rotation settles
            const now = Date.now();
            if (now - lastRotateAtRef.current < rotationCooldownMs) return;
            lastRotateAtRef.current = now;

            if (e.deltaY > 0) {
                setRotation((prev) => prev + rotationStep);
            } else if (e.deltaY < 0) {
                setRotation((prev) => prev - rotationStep);
            }
        };

        element.addEventListener("wheel", handleScroll, { passive: false });
        return () => {
            element.removeEventListener("wheel", handleScroll);
        };
    }, []);

    const angleStep = 360 / safeCount;
    const circles = Array.from({ length: safeCount }, (_, index) => {
        const baseAngle = index * angleStep;
        const totalAngle = rotation + baseAngle;

        return {
            key: index,
            className: circleStyles[index % circleStyles.length],
            // rotate around the anchor, push out along the radius, then counter-rotate so the label stays upright
            transform: `translate(50%, -50%) rotate(${totalAngle}deg) translateX(${orbitRadius}px) rotate(${-totalAngle}deg)`,
        };
    });

    return (
        <section className="absolute right-0 top-50 h-full w-[180px] overflow-visible">
            <section
                ref={boxRef}
                className="relative h-100 overflow-y-auto overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                <div className="relative h-[600px] overflow-visible">
                    {circles.map((circle) => (
                        <section
                            key={circle.key}
                            className={`absolute right-0 flex items-center justify-center rounded-full border border-white/50 text-center transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${circle.className}`}
                            style={{
                                top: `${orbitCenterY}px`,
                                width: `${circleSize}px`,
                                height: `${circleSize}px`,
                                transform: circle.transform,
                            }}
                        >
                            <p className="m-0 select-none text-[10px] font-semibold uppercase tracking-[0.22em] opacity-90">
                                Day {circle.key + 1}
                            </p>
                        </section>
                    ))}
                </div>
            </section>
        </section>
    );
};

export default PageWheel;