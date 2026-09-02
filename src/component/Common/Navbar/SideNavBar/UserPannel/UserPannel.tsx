import React from "react";
import type IUserPannel from "./IUserPannel";
import { BsThreeDots } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

const UserPannel: React.FC<IUserPannel> = () => {
    return (
        <div className="flex items-center gap-2">
            <div>
                {/* Image of User */}
                <div className="rounded-full w-10 h-10 bg-gray-300">
                    <p className="m-0 flex justify-center text-2xl items-center h-full">
                        <FaUserCircle />
                    </p>
                </div>
            </div>
            <div>
                <p className="m-0 text-[#adb5bd]">Test User</p>
                <p className="m-0 text-[#ced4da]">testing@gmail.com</p>
            </div>
            <div className="p-1 hover:bg-[#495057] hover:rounded-full cursor-pointer">
                <BsThreeDots className="text-[#adb5bd]" />
            </div>
        </div >
    );
};

export default UserPannel;