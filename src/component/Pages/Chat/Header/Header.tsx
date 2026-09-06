import React from "react";
import type IHeader from "./IHeader";
import { Button } from "antd";

const Header: React.FC<IHeader> = () => {
    return (
        <header className="flex w-full items-center justify-between px-3 py-3">
            <section className="flex w-1/2 justify-end">
                <div className="flex w-fit rounded-2xl border border-slate-200/90 bg-white/80 p-1.5 shadow-[0_14px_32px_rgba(148,163,184,0.18)] backdrop-blur-sm">
                    <p className="cursor-pointer rounded-xl border-r border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-sky-50 hover:text-sky-700">Where</p>
                    <p className="cursor-pointer border-r border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-sky-50 hover:text-sky-700">When</p>
                    <p className="cursor-pointer border-r border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-sky-50 hover:text-sky-700">Who</p>
                    <p className="cursor-pointer rounded-xl px-3 py-1.5 text-sm font-medium text-slate-500 transition hover:bg-sky-50 hover:text-sky-700">Budget</p>
                </div>
            </section>

            <section>
                <Button className="border-none! bg-[linear-gradient(135deg,#0ea5e9,#0284c7)] text-white! shadow-[0_16px_32px_rgba(14,165,233,0.18)] hover:bg-[linear-gradient(135deg,#0284c7,#0369a1)]!">
                    Create Trip
                </Button>
            </section>
        </header>
    )
};

export default Header;