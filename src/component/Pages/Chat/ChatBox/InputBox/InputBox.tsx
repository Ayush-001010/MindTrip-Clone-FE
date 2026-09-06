import React from "react";
import type IInputBox from "./IInputBox";
import { IoIosSend } from "react-icons/io";

const InputBox: React.FC<IInputBox> = ({ sendHandler, changeHandler, value }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); sendHandler(); }}>
            <div className="flex w-full items-end gap-3 p-2">
                <textarea
                    onChange={changeHandler as any}
                    className="min-h-14 w-full rounded-[1.45rem] border border-slate-200/90 bg-white/95 px-4 py-3 text-[0.98rem] text-slate-700 shadow-[0_18px_36px_rgba(148,163,184,0.16)] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-sky-400/70 focus:bg-white focus:shadow-[0_20px_42px_rgba(14,165,233,0.14)]"
                    placeholder="Type a message..."
                    value={value}
                />
                {/* Add Send Button Here */}
                <div className="flex flex-col justify-center">
                    <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-300/70 bg-[linear-gradient(135deg,#38bdf8,#0ea5e9)] text-white shadow-[0_16px_32px_rgba(14,165,233,0.18)] transition hover:scale-[1.02] hover:bg-[linear-gradient(135deg,#0ea5e9,#0284c7)]" type="submit" >
                        <IoIosSend />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default InputBox;