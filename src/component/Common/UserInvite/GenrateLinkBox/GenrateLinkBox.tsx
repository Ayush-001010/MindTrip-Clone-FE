import React, { useState } from "react";
import type IGenrateLinkBox from "./IGenrateLinkBox";
import { FiCopy, FiLink, FiRefreshCw } from "react-icons/fi";

const buttonClass = "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-900 active:scale-95";

const GenrateLinkBox: React.FC<IGenrateLinkBox> = ({ value, clickGenerate, clickCopy }) => {
    const [generateCount, setGenerateCount] = useState(0);

    const handleGenerate = () => {
        setGenerateCount((count) => count + 1);
        clickGenerate();
    };

    return (
        <section aria-label="Invite link" className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 shadow-lg shadow-black/30 sm:p-5">
            <h2 className="text-base font-semibold text-zinc-100">Invite your friends</h2>
            <p className="mt-1 text-sm text-zinc-400">Generate a link and share it with your group.</p>
            <div className="mt-4 flex min-w-0 items-center gap-2 rounded-lg border border-zinc-700 bg-transparent px-3 focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-400">
                <FiLink aria-hidden="true" className="size-4 shrink-0 text-zinc-500" />
                <input
                    type="text"
                    value={value}
                    readOnly
                    aria-label="Invitation link"
                    placeholder="Your invite link will appear here"
                    className="min-w-0 flex-1 bg-transparent py-3 text-sm text-zinc-200 placeholder:text-zinc-500 focus:outline-none"
                />
            </div>
            <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button type="button" onClick={handleGenerate} className={`${buttonClass} cursor-pointer bg-zinc-200 text-zinc-900 hover:bg-white`}>
                    <FiRefreshCw key={generateCount} aria-hidden="true" className={`size-4 ${generateCount > 0 ? "motion-safe:animate-spin-clockwise" : ""}`} />
                    Generate
                </button>
                <button type="button" onClick={clickCopy} disabled={!value.trim()} className={`${buttonClass} cursor-pointer border border-zinc-700 text-zinc-200 hover:border-zinc-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:border-zinc-800 disabled:bg-transparent disabled:text-zinc-600 disabled:active:scale-100`}>
                    <FiCopy aria-hidden="true" className="size-4" />
                    Copy
                </button>
            </div>
        </section>
    );
};

export default GenrateLinkBox;