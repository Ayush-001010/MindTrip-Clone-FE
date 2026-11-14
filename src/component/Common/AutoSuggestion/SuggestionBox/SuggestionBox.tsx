import React from "react";
import type ISuggestionBox from "./ISuggestionBox";
import { IoAddOutline, IoLocationOutline } from "react-icons/io5";

const SuggestionBox: React.FC<ISuggestionBox> = ({ suggestions, value, selectHandler }) => {

    const makeMatchTextBold = (suggestion: string, value: string) => {
        const escapedValue = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const parts = suggestion.split(new RegExp(`(${escapedValue})`, "gi"));
        return parts.map((part, index) => 
            part.toLowerCase() === value.toLowerCase() ? <b key={index} className="font-semibold text-zinc-100">{part}</b> : part
        );
    };
    return (
        <ul aria-label="Place suggestions" className="max-h-64 space-y-0.5 overflow-y-auto p-1.5">
            {suggestions.map((suggestion) => (
                <li key={suggestion}>
                    <button
                        type="button"
                        onClick={() => selectHandler(suggestion, "Add")}
                        className="group flex w-full cursor-pointer items-center gap-2 rounded-lg px-2 py-2.5 text-left text-xs leading-relaxed text-zinc-300 transition hover:bg-zinc-900 hover:text-white focus-visible:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-500 active:bg-black sm:text-sm"
                    >
                        <IoLocationOutline aria-hidden="true" className="shrink-0 text-base text-zinc-500 group-hover:text-zinc-300" />
                        <span className="min-w-0 flex-1 break-words">{makeMatchTextBold(suggestion, value)}</span>
                        <IoAddOutline aria-hidden="true" className="shrink-0 text-base text-zinc-500 group-hover:text-zinc-300" />
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default SuggestionBox;