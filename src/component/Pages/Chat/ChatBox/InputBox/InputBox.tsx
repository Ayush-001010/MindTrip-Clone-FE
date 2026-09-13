import React from "react";
import type IInputBox from "./IInputBox";
import { IoIosSend } from "react-icons/io";

const InputBox: React.FC<IInputBox> = ({ sendHandler, changeHandler, value }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); sendHandler(); }}>
            <div className="flex w-full items-end gap-3 p-2">
                <textarea
                    onChange={changeHandler as any}
                    className="min-h-14 w-full rounded-[1.45rem] border border-slate-200/90 px-4 py-3 text-[0.98rem] text-[#fff]  outline-none transition-all duration-200 placeholder:text-[#e9ecef]"
                    placeholder="Type a message..."
                    value={value}
                />
                {/* Add Send Button Here */}
                <div className="flex flex-col justify-center">
                    <button className="flex h-12 w-12 items-center justify-center rounded-2xl transition duration-300 bg-[#ced4da] text-[#343a40] shadow-[0_16px_32px_rgba(14,165,233,0.18)] hover:scale-[1.02] hover:bg-[#343a40] hover:text-white cursor-pointer" type="submit" >
                        <IoIosSend />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default InputBox;