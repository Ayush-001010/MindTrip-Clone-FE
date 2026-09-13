import React from "react";
import type ICloseBox from "./ICloseBox";
import { IoMdClose } from "react-icons/io";

const CloseBox: React.FC<ICloseBox> = ({ onClose }) => {
    return (
        <section>
            <p onClick={onClose} className="text-[#fff] cursor-pointer hover:bg-[#ced4da] w-fit p-2 rounded-full hover:text-[#000] font-semibold">
                <IoMdClose/>
            </p>
        </section>
    );
};

export default CloseBox;