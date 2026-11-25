import React from "react";

interface CatProps {
    progress: number;
}

const Cat: React.FC<CatProps> = ({ progress }) => {
    const position = "pointer-events-none absolute left-[calc(50%-240px)] w-[480px]";
    const animationStyle = {
        opacity: Math.min(1, Math.max(0, progress)),
        transform: `translateY(${(1 - progress) * 100}px)`,
    };

    return (
        <>
            <svg
                aria-hidden="true"
                className={`${position} bottom-[80%] z-0`}
                style={animationStyle}
                viewBox="0 0 400 320"
                fill="none"
            >
                <path d="M75 143C64 105 64 48 78 19C103 27 134 54 156 82" fill="#F6A23D" stroke="#1B2032" strokeWidth="7" strokeLinejoin="round" />
                <path d="M85 112C79 79 80 54 85 39C101 48 119 64 133 80Z" fill="#F16B86" />
                <path d="M325 143C336 105 336 48 322 19C297 27 266 54 244 82" fill="#F6A23D" stroke="#1B2032" strokeWidth="7" strokeLinejoin="round" />
                <path d="M315 112C321 79 320 54 315 39C299 48 281 64 267 80Z" fill="#F16B86" />
                <path d="M52 218C52 123 108 69 200 69C292 69 348 123 348 218C348 274 291 307 200 307C109 307 52 274 52 218Z" fill="#F6A23D" stroke="#1B2032" strokeWidth="7" />
                <path d="M174 72L181 109M200 70V110M226 72L219 109" stroke="#D67925" strokeWidth="10" strokeLinecap="round" />
                <path d="M54 199L82 207M53 218L81 222M346 199L318 207M347 218L319 222" stroke="#D67925" strokeWidth="8" strokeLinecap="round" />
                <path d="M77 225L29 219M77 237L33 239M323 225L371 219M323 237L367 239" stroke="#1B2032" strokeWidth="4" strokeLinecap="round" />
                <ellipse cx="145" cy="199" rx="20" ry="27" fill="#1B2032" />
                <ellipse cx="255" cy="199" rx="20" ry="27" fill="#1B2032" />
                <circle cx="151" cy="190" r="8" fill="#FFF9E9" />
                <circle cx="261" cy="190" r="8" fill="#FFF9E9" />
                <circle cx="139" cy="210" r="3" fill="#FFF9E9" />
                <circle cx="249" cy="210" r="3" fill="#FFF9E9" />
                <path d="M189 224H211L200 237Z" fill="#F16B86" stroke="#1B2032" strokeWidth="4" strokeLinejoin="round" />
                <path d="M200 237V243M200 243C195 250 189 250 185 246M200 243C205 250 211 250 215 246" stroke="#1B2032" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <svg
                aria-hidden="true"
                className={`${position} bottom-[65%] z-20`}
                style={animationStyle}
                viewBox="0 0 400 320"
                fill="none"
            >
                <ellipse cx="116" cy="260" rx="33" ry="23" transform="rotate(-8 116 260)" fill="#FFF3DA" stroke="#1B2032" strokeWidth="5" />
                <ellipse cx="284" cy="260" rx="33" ry="23" transform="rotate(8 284 260)" fill="#FFF3DA" stroke="#1B2032" strokeWidth="5" />
                <path d="M108 253L110 265M123 252L125 264M277 252L275 264M292 253L290 265" stroke="#1B2032" strokeWidth="4" strokeLinecap="round" />
            </svg>
        </>
    );
};

export default Cat;
