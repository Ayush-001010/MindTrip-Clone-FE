import React from "react";
import type ISwitchContentBar from "./ISwitchContentBar";

const tabBase = "flex-1 rounded-md px-4 py-1.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 active:scale-95";
const tabActive = "bg-violet-500 text-white shadow-md shadow-violet-500/20";
const tabInactive = "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100";

const SwitchContentBar : React.FC<ISwitchContentBar> = ({ active, changeHandler }) => {
    return (
        <section className="flex gap-1 rounded-lg border border-zinc-800 bg-zinc-900 p-1">
            <button
                type="button"
                className={`${tabBase} ${active === "Friends" ? tabActive : tabInactive}`}
                onClick={() => changeHandler("Friends")}
            >
                Friends
            </button>
            <button
                type="button"
                className={`${tabBase} ${active === "Requests" ? tabActive : tabInactive}`}
                onClick={() => changeHandler("Requests")}
            >
                Requests
            </button>
        </section>
    )
};

export default SwitchContentBar;