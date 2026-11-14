import React, { useRef, useState } from "react";
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
import AddPlace from "../AddPlace/AddPlace";

const iconButton = "flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-zinc-700 bg-zinc-900 text-zinc-300 shadow-sm transition hover:border-zinc-500 hover:bg-black hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-95";

const Header: React.FC<IHeader> = ({ addNewPlace, setAddNewPlace }) => {
    const [openUserInvite, setOpenUserInvite] = useState(false);
    const locationButtonRef = useRef<HTMLButtonElement>(null);
    const { inviteUser } = useMemoriesAction();
    const { workId } = useParams();
    const { userName } = useSelector((state: any) => state.userDetails);
    const { dropBoxHandler , memoriesData , setNotifyConfig } = useGetMemoriesWorkStationContext();

    const openDropBoxHandler = () => {
        if( !memoriesData?.place || memoriesData?.place?.length === 0) {
            setNotifyConfig({
                type: "alert",
                message: "No places available to add media",
                open: true,
                duration: 1500
            });
            return;
        }
        dropBoxHandler("open");
    }
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
        <header className="relative mb-6">
            <section className="flex items-start justify-end gap-2 sm:gap-3">
                <div
                    className="flex min-w-0 flex-1 items-start justify-end gap-2"
                    onKeyDown={(event) => {
                        if (event.key === "Escape") {
                            setAddNewPlace(false);
                            locationButtonRef.current?.focus();
                        }
                    }}
                >
                    <AddPlace open={addNewPlace} setOpen={setAddNewPlace} />
                    <Tooltip title={addNewPlace ? "Close place search" : "Add places"}>
                        <button
                            ref={locationButtonRef}
                            type="button"
                            aria-label={addNewPlace ? "Close place search" : "Add places"}
                            aria-expanded={addNewPlace}
                            aria-controls={addNewPlace ? "add-place-search" : undefined}
                            onClick={() => setAddNewPlace((open) => !open)}
                            className={`${iconButton} ${addNewPlace ? "border-zinc-500 bg-black text-white" : ""}`}
                        >
                            <IoLocation aria-hidden="true" className="text-lg" />
                        </button>
                    </Tooltip>
                </div>
                <Tooltip title="Drop Photos , Music or Videos">
                    <button type="button" aria-label="Add photos, music or videos" onClick={openDropBoxHandler} className={iconButton}>
                        <FaBoxOpen aria-hidden="true" />
                    </button>
                </Tooltip>
                <Tooltip title="User Invite">
                    <button type="button" aria-label="Invite people" onClick={openInviteModal} className={iconButton}>
                        <RxShare2 aria-hidden="true" />
                    </button>
                </Tooltip>
            </section>

            <UserInvite openModal={openUserInvite} closeFunc={closeInviteModal} limit={5} members={[]} genrateUrl={createInviteUrl} />
        </header>
    );
};

export default Header;