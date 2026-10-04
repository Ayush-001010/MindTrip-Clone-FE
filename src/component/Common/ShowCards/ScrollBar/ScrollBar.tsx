import React from "react";
import type IScrollBar from "./IScrollBar";

const GAP = 56;
const VISIBLE_SIDE = 3;

const ScrollBar: React.FC<IScrollBar> = ({ total, active, onChange }) => {
    const count = Math.max(total, 0);

    return (
        <nav
            aria-label="Pagination"
            className="relative mx-auto h-14 [perspective:700px]"
            style={{ width: (VISIBLE_SIDE * 2 + 1) * GAP }}
        >
            {Array.from({ length: count }, (_, index) => {
                const page = index + 1;
                const offset = index - (active - 1);
                const distance = Math.abs(offset);
                const isActive = offset === 0;
                const isVisible = distance <= VISIBLE_SIDE;
                const opacity = isVisible ? Math.max(0.2, 1 - distance * 0.28) : 0;

                return (
                    <button
                        key={page}
                        type="button"
                        aria-label={`Go to page ${page}`}
                        aria-current={isActive ? "page" : undefined}
                        tabIndex={isVisible ? 0 : -1}
                        onClick={() => onChange(page)}
                        className={`group absolute left-1/2 top-1/2 -ml-5 -mt-5 h-10 w-10 cursor-pointer rounded-full outline-none transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-white/60 ${isVisible ? "" : "pointer-events-none"}`}
                        style={{
                            opacity,
                            zIndex: VISIBLE_SIDE + 1 - distance,
                            transform: `translateX(${offset * GAP}px) translateZ(${-distance * 50}px) rotateY(${-offset * 28}deg) scale(${isActive ? 1.25 : 1})`,
                        }}
                    >
                        <span
                            className={`flex h-full w-full items-center justify-center rounded-full text-sm font-semibold transition-colors duration-500 ${isActive
                                ? "bg-white/90 text-[#03060d] shadow-[0_6px_16px_rgba(0,0,0,0.4)]"
                                : "border border-white/10 bg-white/5 text-white/50 group-hover:bg-white/10 group-hover:text-white/80"
                                }`}
                        >
                            {page}
                        </span>
                    </button>
                );
            })}
        </nav>
    );
};

export default ScrollBar;
