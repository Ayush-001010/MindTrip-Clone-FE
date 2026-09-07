import React from "react";
import type IUserPannel from "./IUserPannel";
import { BsThreeDots } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useSideNavBarContext } from "../SideNavBar";

const UserPannel: React.FC<IUserPannel> = () => {
    const { isCollapsed } = useSideNavBarContext();
    return (
        <div>
            {!isCollapsed && (
                <section className="flex items-center gap-2 rounded-2xl bg-[#000814] p-2 shadow-xl">
                    <div>
                        <div className="h-6 w-6 rounded-full bg-white text-[#000]">
                            <p className="m-0 flex h-full items-center justify-center text-2xl">
                                <FaUserCircle />
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="m-0 text-white text-sm">Test User</p>
                        <p className="m-0 text-white text-xs">testing@gmail.com</p>
                    </div>
                    <div className="cursor-pointer w-6 h-6 rounded-full p-1 bg-white text-[#000] hover:bg-[#e9ecef] transition">
                        <BsThreeDots className="text-2xs" />
                    </div>
                </section>
            )}
            {isCollapsed && (
                <section className="flex items-center justify-center gap-2 rounded-2xl bg-white p-2 shadow-xl">
                    <div>
                        <div className="h-6 w-6 rounded-full bg-white text-[#000]">
                            <p className="m-0 flex h-full items-center justify-center text-2xl">
                                <FaUserCircle />
                            </p>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default UserPannel;