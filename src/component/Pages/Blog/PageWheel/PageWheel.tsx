import React, { useEffect, useRef, useState } from "react";
import type IPageWheel from "./IPageWheel";
import { useGetBlogContext } from "../Blog";

const circleStyles = [
    "bg-gradient-to-br from-[#f8f9fa] to-[#dee2e6] text-[#14202b] ring-2 ring-sky-400/70 shadow-[0_18px_38px_rgba(56,189,248,0.35)]",
    "bg-[#26343a] text-[#c7d3d6] ring-1 ring-white/10 shadow-[0_14px_28px_rgba(0,0,0,0.35)]",
    "bg-[#1f2937] text-[#cbd5e1] ring-1 ring-white/10 shadow-[0_12px_24px_rgba(0,0,0,0.3)]",
    "bg-[#2f3a3a] text-[#cbd5d1] ring-1 ring-white/10 shadow-[0_14px_30px_rgba(0,0,0,0.35)]",
    "bg-[#374151] text-[#e2e8f0] ring-1 ring-white/10 shadow-[0_14px_28px_rgba(0,0,0,0.3)]",
];
const activeCircleStyle = circleStyles[0];
const restCircleStyles = circleStyles.slice(1);
const normalizeAngle = (angle: number) => ((angle % 360) + 360) % 360;

const PageWheel: React.FC<IPageWheel> = ({  changeSelectedDay }) => {
    const { blogValue } = useGetBlogContext();
    const boxRef = useRef<HTMLElement | null>(null);
    const lastRotateAtRef = useRef(0);
    // start at 180deg so the first circle (index 0) begins front-facing on the left instead of tucked away on the right
    const [rotation, setRotation] = useState(180);
    const orbitCenterY = 180;
    const orbitRadius = 90;
    const circleSize = 80;
    const safeCount = Math.min(5, Math.max(1, blogValue?.tripDuration ?? 0));
    const rotationStep = 12;
    const rotationCooldownMs = 100;

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
    const positions = Array.from({ length: blogValue?.tripDuration ?? 0 }, (_, index) => {
        const baseAngle = index * angleStep;
        const totalAngle = rotation + baseAngle;
        const normalizedAngle = normalizeAngle(totalAngle);
        // the circle sitting at the 180deg mark is the one poking out furthest to the left (the front-facing one)
        const distanceFromFront = Math.min(Math.abs(normalizedAngle - 180), 360 - Math.abs(normalizedAngle - 180));
        // 1 when front-facing (180deg), 0 when tucked behind at the back (0deg) - drives the fade/scale disappearing effect
        const visibility = (1 - Math.cos((normalizedAngle * Math.PI) / 180)) / 2;

        return { key: index, totalAngle, distanceFromFront, visibility };
    });

    const frontIndex = positions.reduce(
        (closestIdx, position, idx) => (position.distanceFromFront < positions[closestIdx].distanceFromFront ? idx : closestIdx),
        0
    );

    const circles = positions.map((position, idx) => {
        const scale = 0.75 + 0.35 * position.visibility;
        if(idx === frontIndex) {
            changeSelectedDay(position.key + 1);
        }

        return {
            key: position.key,
            className: idx === frontIndex ? activeCircleStyle : restCircleStyles[idx % restCircleStyles.length],
            opacity: 0.15 + 0.85 * position.visibility,
            zIndex: Math.round(position.visibility * 100),
            // rotate around the anchor, push out along the radius, then counter-rotate so the label stays upright
            transform: `translate(50%, -50%) rotate(${position.totalAngle}deg) translateX(${orbitRadius}px) rotate(${-position.totalAngle}deg) scale(${scale})`,
        };
    });

    return (
        <section className="absolute right-0 bottom-10 w-[180px] overflow-visible">
            <section
                ref={boxRef}
                className="relative h-100 overflow-y-auto overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                <div className="relative h-[600px] overflow-visible">
                    {circles.map((circle) => (
                        <section
                            key={circle.key}
                            className={`absolute right-0 flex items-center justify-center rounded-full border border-white/50 text-center transition-[transform,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${circle.className}`}
                            style={{
                                top: `${orbitCenterY}px`,
                                width: `${circleSize}px`,
                                height: `${circleSize}px`,
                                transform: circle.transform,
                                opacity: circle.opacity,
                                zIndex: circle.zIndex,
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