import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoSearch } from "react-icons/io5";
import type ISuggestion from "./ISuggestion";
import type { ISuggestionOption } from "./ISuggestion";

const escapeRegExp = (text: string) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Wraps the portion of `label` matching `query` (case-insensitive, all occurrences) in bold.
const highlightMatch = (label: string, query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return label;

    const regex = new RegExp(`(${escapeRegExp(trimmedQuery)})`, "gi");
    const parts = label.split(regex);

    return parts.map((part, index) =>
        part.toLowerCase() === trimmedQuery.toLowerCase() ? (
            <strong key={index} className="font-bold text-[#fff]">{part}</strong>
        ) : (
            <React.Fragment key={index}>{part}</React.Fragment>
        )
    );
};

const Suggestion: React.FC<ISuggestion> = ({
    value,
    onValueChange,
    options,
    onSelectOption,
    isLoading = false,
    placeholder = "Search...",
    loadingText = "Searching...",
    emptyText = "No results found",
    icon = <IoSearch />,
    className = "",
}) => {
    return (
        <motion.section
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`relative w-64 ${className}`}
        >
            <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9a9a9a]">
                    {icon}
                </span>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                    placeholder={placeholder}
                    className="w-full rounded-full border border-[#495057] bg-[#242423] py-2 pl-9 pr-4 text-sm text-[#d6d6d6] placeholder-[#7a7a7a] outline-none transition-all duration-300 focus:border-[#f8f9fa] focus:shadow-[0_0_0_3px_rgba(248,249,250,0.1)]"
                />
            </div>

            <AnimatePresence>
                {(isLoading || options.length > 0) && (
                    <motion.ul
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute left-0 right-0 z-10 mt-2 max-h-56 overflow-y-auto rounded-xl border border-[#495057] bg-[#242423] p-1 shadow-xl shadow-black/40"
                    >
                        {isLoading ? (
                            <li className="px-3 py-2 text-sm text-[#9a9a9a]">{loadingText}</li>
                        ) : options.length === 0 ? (
                            <li className="px-3 py-2 text-sm text-[#9a9a9a]">{emptyText}</li>
                        ) : (
                            options.map((option: ISuggestionOption, index: number) => (
                                <motion.li
                                    key={option.value}
                                    initial={{ opacity: 0, x: -6 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, delay: index * 0.04, ease: "easeOut" }}
                                    onClick={() => onSelectOption(option)}
                                    className="cursor-pointer rounded-lg px-3 py-2 text-sm text-[#d6d6d6] transition-colors duration-200 hover:bg-[#3a3a39] hover:text-[#fff]"
                                >
                                    {highlightMatch(option.label, value)}
                                </motion.li>
                            ))
                        )}
                    </motion.ul>
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default Suggestion;
