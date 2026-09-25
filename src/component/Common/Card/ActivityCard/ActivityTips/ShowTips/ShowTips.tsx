import React from "react";
import type IShowTips from "./IShowTips";

const ShowTips: React.FC<IShowTips> = ({ tips }) => {
    return (
        <section className="mt-4 rounded-xl px-4 py-3">
            <ul className="flex list-disc flex-col gap-2 pl-5 text-base font-medium leading-relaxed text-[#f8f9fa] marker:text-gray-400">
                {tips.map((tip, index) => (
                    <li key={index} className="break-words">
                        {tip}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default ShowTips;