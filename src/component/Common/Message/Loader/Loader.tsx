import React from "react";
import type ILoader from "./ILoader";

const Loader: React.FC<ILoader> = () => {
    return (
        <div className="max-w-[88%] rounded-[1.6rem] rounded-bl-md border border-slate-200/90 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(241,245,249,0.94))] px-4 py-3.5 text-slate-800 shadow-[0_20px_40px_rgba(148,163,184,0.16)] ring-1 ring-sky-200/70 backdrop-blur-sm sm:max-w-[74%]">
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2.5 shadow-inner shadow-slate-200/70">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.55)] [animation-delay:-0.28s]"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)] [animation-delay:-0.14s]"></span>
                    <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.42)]"></span>
                </div>
                <div className="h-7 w-px bg-gradient-to-b from-sky-400/45 via-slate-300/40 to-transparent"></div>
                <div className="flex gap-1.5 pt-0.5">
                    <span className="h-1.5 w-5 rounded-full bg-sky-400/65"></span>
                    <span className="h-1.5 w-3 rounded-full bg-slate-300"></span>
                </div>
            </div>
        </div>
    );
};

export default Loader;