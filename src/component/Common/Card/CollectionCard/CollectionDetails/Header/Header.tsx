import React from "react";
import type IHeader from "./IHeader";

const TABS = ["Activity", "Hotel", "Blog"] as const;

const Header: React.FC<IHeader> = ({ onClickHandler , activeTab }) => {
    return (
        <section className="mb-4 flex w-full justify-end">
            <div className="inline-flex gap-1 rounded-full bg-white/10 p-1 ring-1 ring-white/10 backdrop-blur">
                {TABS.map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                        <button
                            key={tab}
                            type="button"
                            aria-pressed={isActive}
                            disabled={isActive}
                            onClick={() => onClickHandler(tab)}
                            className={
                                "rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-300 " +
                                (isActive
                                    ? "cursor-default bg-[#6a994e] text-white shadow-md"
                                    : "cursor-pointer text-slate-300 hover:bg-white/10 hover:text-white")
                            }
                        >
                            {tab}
                        </button>
                    );
                })}
            </div>
        </section>
    );
};

export default Header;
