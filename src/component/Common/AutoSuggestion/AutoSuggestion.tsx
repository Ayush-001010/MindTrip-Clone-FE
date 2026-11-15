import React, { useId, useRef, useState } from "react";
import type IAutoSuggestion from "./IAutoSuggestion";
import SuggestionBox from "./SuggestionBox/SuggestionBox";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IoClose, IoLocationOutline, IoSearchOutline } from "react-icons/io5";

const AutoSuggestion: React.FC<IAutoSuggestion> = ({ changeHandler, value, suggestions, selectHandler, isMultiSelect, selectedValues }) => {
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const suggestionId = useId();
    const reduceMotion = useReducedMotion();
    const selected = [...new Set(Array.isArray(selectedValues) ? selectedValues : [selectedValues].filter(Boolean))];
    const availableSuggestions = [...new Set(suggestions)].filter((suggestion) => !selected.includes(suggestion));
    const showSuggestions = focused && value.trim().length > 0 && availableSuggestions.length > 0;

    return (
        <section
            className="relative w-full"
            onFocus={() => setFocused(true)}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
            }}
        >
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 shadow-md shadow-black/30 transition focus-within:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-700/30">
                {isMultiSelect && selected.length > 0 && (
                    <div aria-label="Selected places" className="flex max-h-28 flex-wrap gap-1 overflow-y-auto pt-2 pb-0.5">
                        <AnimatePresence initial={false}>
                            {selected.map((place) => (
                                <motion.span
                                    key={place}
                                    initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.95, y: reduceMotion ? 0 : 5 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.95 }}
                                    transition={{ duration: reduceMotion ? 0 : 0.16 }}
                                    className="inline-flex max-w-full items-center gap-1 rounded-md border border-zinc-800 bg-black/60 py-0.5 pr-0.5 pl-1.5 text-[10px] font-medium text-zinc-300"
                                >
                                    <IoLocationOutline aria-hidden="true" className="shrink-0 text-zinc-500" />
                                    <span className="max-w-32 truncate" title={place}>{place.split(",")[0].trim()}</span>
                                    <button
                                        type="button"
                                        aria-label={`Remove ${place}`}
                                        onClick={() => {
                                            selectHandler(place, "Remove");
                                            inputRef.current?.focus();
                                        }}
                                        className="flex size-5 shrink-0 cursor-pointer items-center justify-center rounded text-zinc-500 transition hover:bg-zinc-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-95"
                                    >
                                        <IoClose aria-hidden="true" className="text-xs" />
                                    </button>
                                </motion.span>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
                <div className="flex min-h-10 items-center gap-2">
                    <IoSearchOutline aria-hidden="true" className="shrink-0 text-base text-zinc-500" />
                    <input
                        ref={inputRef}
                        autoFocus
                        type="text"
                        aria-label="Search places"
                        aria-controls={showSuggestions ? suggestionId : undefined}
                        autoComplete="off"
                        placeholder={selected.length > 0 ? "Add another place..." : "Search places..."}
                        value={value}
                        onChange={(event) => changeHandler(event.target.value)}
                        className="min-w-0 flex-1 bg-transparent py-2 text-sm text-zinc-100 caret-zinc-300 outline-none placeholder:text-zinc-500"
                    />
                </div>
            </div>
            <AnimatePresence>
                {showSuggestions && (
                    <motion.div
                        id={suggestionId}
                        initial={{ opacity: 0, y: reduceMotion ? 0 : -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
                        transition={{ duration: reduceMotion ? 0 : 0.15 }}
                        className="absolute inset-x-0 top-full z-50 mt-2 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl shadow-black/40"
                    >
                        <p className="border-b border-zinc-800 px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">Suggested places</p>
                        <SuggestionBox
                            suggestions={availableSuggestions}
                            value={value}
                            selectHandler={(place, action) => {
                                selectHandler(place, action);
                                inputRef.current?.focus();
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default AutoSuggestion;