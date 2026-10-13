import React, { useEffect, useState } from "react";
import type IUserPannel from "./IUserPannel";
import { BsThreeDots } from "react-icons/bs";
import { useSideNavBarContext } from "../SideNavBar";
import { useSelector } from "react-redux";
import type IUserInterface from "../../../../../Interface/DataInterface/IUserDetails";

const UserPannel: React.FC<IUserPannel> = () => {
    const { isCollapsed } = useSideNavBarContext();
    const userDetails = useSelector((state: any) => state.userDetails as IUserInterface);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");


    useEffect(() => {
        if(userDetails.userName) {
            setUserName(userDetails.userName);
            setUserEmail(userDetails.userEmail as string);
        }
    }, [userDetails]);

    return (
        <div>
            {!isCollapsed && (
                <section className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#1b1a1d] p-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#495057] text-sm font-semibold text-white">
                        {userName[0]?.toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="m-0 truncate text-sm font-medium text-white">{userName}</p>
                        <p className="m-0 truncate text-xs text-[#9a9a9f]">{userEmail}</p>
                    </div>
                    <button type="button" aria-label="User menu" className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#C9BFB5] transition hover:bg-[#212529] hover:text-white">
                        <BsThreeDots />
                    </button>
                </section>
            )}
            {isCollapsed && (
                <section className="flex items-center justify-center">
                    <div title={userName} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#495057] text-sm font-semibold text-white">
                        {userName[0]?.toUpperCase()}
                    </div>
                </section>
            )}
        </div>
    );
};

export default UserPannel;