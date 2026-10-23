import React from 'react';
import type ISentBox from './ISentBox';
import { LuSend } from "react-icons/lu";

const SentBox: React.FC<ISentBox> = ({ submitHandler }) => {
    return (
        <button
            type="button"
            className="flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-[#ced4da] text-[#343a40] shadow-[0_16px_32px_rgba(14,165,233,0.18)] transition duration-300 hover:scale-[1.02] hover:bg-[#343a40] hover:text-white"
            onClick={submitHandler}
        >
            <LuSend />
        </button>
    );
};

export default SentBox;