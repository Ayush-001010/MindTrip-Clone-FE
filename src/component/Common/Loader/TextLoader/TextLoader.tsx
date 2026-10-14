import React from "react";
import type ITextLoader from "./ITextLoader";
import { FaSearch } from "react-icons/fa";

const TextLoader: React.FC<ITextLoader> = ({ text, loading }) => {
    if (!loading) return null;

    return (
        <p role="status" aria-live="polite" className="text-[#8b8c89] animate-pulse text-sm font-semibold inline-flex items-center gap-2">
            <FaSearch className="shrink-0" aria-hidden="true" />
            <span>{text}</span>
        </p>
    );
};

export default TextLoader;