import React from "react";
import type IUserPannel from "./IUserPannel";
import { BsThreeDots } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

const UserPannel: React.FC<IUserPannel> = () => {
    return (
        <div className="flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/70 px-3 py-3 shadow-[0_12px_28px_rgba(148,163,184,0.14)]">
            <div>
                {/* Image of User */}
                <div className="h-10 w-10 rounded-full bg-sky-100 text-sky-700">
                    <p className="m-0 flex h-full items-center justify-center text-2xl">
                        <FaUserCircle />
                    </p>
                </div>
            </div>
            <div>
                <p className="m-0 text-slate-700">Test User</p>
                <p className="m-0 text-slate-500">testing@gmail.com</p>
            </div>
            <div className="cursor-pointer rounded-full p-1 transition hover:bg-sky-100">
                <BsThreeDots className="text-slate-500" />
            </div>
        </div >
    );
};

export default UserPannel;