import React from "react";
import type IInputBox from "./IInputBox";
import { IoIosSend } from "react-icons/io";

const InputBox: React.FC<IInputBox> = ({ sendHandler, changeHandler, value }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); sendHandler(); }}>
            <div className="w-full p-2 flex">
                <textarea
                    onChange={changeHandler as any}
                    className="w-full rounded-2xl border border-[#d9e4de]  px-4 py-3 text-[0.98rem] text-[#adb5bd] shadow-[0_12px_28px_rgba(126,145,136,0.12)] outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-[#a8cbbb]  focus:shadow-[0_16px_36px_rgba(126,145,136,0.18)]"
                    placeholder="Type a message..."
                    value={value}
                />
                {/* Add Send Button Here */}
                <div className="flex flex-col justify-center">
                    <button className="ml-2 rounded-2xl bg-[#a8cbbb] px-4 py-2 text-white hover:bg-[#91b69f] w-12 h-12" type="submit" >
                        <IoIosSend />
                    </button>
                </div>
            </div>
        </form>
    );
};

export default InputBox;