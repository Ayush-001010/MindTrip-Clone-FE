import React, { useState } from "react";
import { useGetMemoriesWorkStationContext } from "../MemoriesWorkStation";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type IHeader from "./IHeader";
import { RxShare2 } from "react-icons/rx";
import UserInvite from "../../../Common/UserInvite/UserInvite";
import useMemoriesAction from "../../../../CustomHooks/useMemoriesAction";
import { FaBoxOpen } from "react-icons/fa";
import { Tooltip } from "antd";
import { IoLocation } from "react-icons/io5";

const Header: React.FC<IHeader> = () => {
    const [openUserInvite, setOpenUserInvite] = useState(false);
    const { inviteUser } = useMemoriesAction();
    const { workId } = useParams();
    const { userName } = useSelector((state: any) => state.userDetails);
    const { dropBoxHandler } = useGetMemoriesWorkStationContext();

    const openInviteModal = () => setOpenUserInvite(true);
    const closeInviteModal = () => setOpenUserInvite(false);
    const inviteIdToBase62 = (inviteId: string) => {
        const CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const bytes = new TextEncoder().encode(inviteId);
        let num = 0n;
        for (const byte of bytes) {
            num = num * 256n + BigInt(byte);
        }
        if (num === 0n) return CHARS[0];
        let result = '';
        while (num > 0n) {
            result = CHARS[Number(num % 62n)] + result;
            num = num / 62n;
        }
        return result;
    }
    const createInviteUrl = async () => {
        const base62 = inviteIdToBase62(`${workId}:${Date.now()}`);

        await inviteUser(userName, workId || "", base62);

        return `http://localhost:5173/invite/${base62}`;
    }

    return (
        <header className="m-4">
            <section className="flex justify-end">
                <Tooltip title="Add Places">
                    <p className="cursor-pointer mx-2 animate-shake  text-[#fff] font-medium bg-[#161a1d] p-2 rounded-full ring-1 text-sm">
                        <IoLocation />
                    </p>
                </Tooltip>
                <Tooltip title="Drop Photos , Music or Videos">
                    <p onClick={() => dropBoxHandler("open")} className="cursor-pointer animate-shake mx-2 text-[#fff] font-medium bg-[#161a1d] p-2 rounded-full ring-1 text-sm">
                        <FaBoxOpen />
                    </p>
                </Tooltip>
                <Tooltip title="User Invite">
                    <p onClick={openInviteModal} className="cursor-pointer mx-2 animate-shake  text-[#fff] font-medium bg-[#161a1d] p-2 rounded-full ring-1 text-sm">
                        <RxShare2 />
                    </p>
                </Tooltip>
            </section>

            <UserInvite openModal={openUserInvite} closeFunc={closeInviteModal} limit={5} members={[]} genrateUrl={createInviteUrl} />
        </header>
    );
};

export default Header;