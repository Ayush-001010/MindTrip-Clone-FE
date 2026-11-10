import React, { useState } from "react";
import { message } from "antd";
import useCommonAction from "../../../../CustomHooks/useCommonAction";
import type IFriendCard from "./IFriendCard";
import UserInfoCard from "../UserInfoCard/UserInfoCard";

const FriendCard: React.FC<IFriendCard> = ({ data , isSearch }) => {
    const { name  , status , userImage, id } = data;
    const { addFriend , takeFriendRequestAction } = useCommonAction();

    const [infoOpen, setInfoOpen] = useState(false);
    const [currentStatus, setCurrentStatus] = useState(status);
    const [isActingOnRequest, setIsActingOnRequest] = useState(false);
    const profile = {
        ...data,
        id: Number(data.id),
        createdAt: new Date(data.createdAt).toISOString(),
        email: "", password: "", updatedAt: "", holidayDate: "",
        anniversaryDate: null, birthdayDate: null, genralAnswer: null, googleId: null,
        interests: null, location: null, notifyNotes: null,
    };

    const handleFriendRequestAction = async (action: "Accept" | "Reject") => {
        setIsActingOnRequest(true);
        try {
            const response = await takeFriendRequestAction(Number(id), action);
            if (!response.success) {
                message.error(response.error || "Could not update friend request. Please try again.");
                return;
            }

            setCurrentStatus(action === "Accept" ? "Friend" : "Reject");
            message.success(action === "Accept" ? "Friend request approved." : "Friend request rejected.");
        } catch (error) {
            console.error("Could not update friend request:", error);
            message.error("Could not update friend request. Please try again.");
        } finally {
            setIsActingOnRequest(false);
        }
    };


    const imageButton = (content: React.ReactNode) => (
        <button
            type="button"
            aria-label={`Open ${name}'s profile`}
            onClick={() => setInfoOpen(true)}
            className="shrink-0 rounded-full transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 active:scale-95"
        >
            {content}
        </button>
    );
    const genrateImage = () => {
        if (userImage) {
            return imageButton(<img src={userImage} alt={name} className="size-10 shrink-0 rounded-full object-cover ring-1 ring-violet-400/30" />);
        } else {
            return imageButton(<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-violet-500/10 text-base font-semibold text-violet-300 ring-1 ring-violet-400/30">{name.charAt(0).toUpperCase()}</div>);
        }
    };
    const badgeBase = "rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider";
    const badge = currentStatus === "Friend"
        ? <span className={`${badgeBase} bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-400/20`}>Friend</span>
        : currentStatus === "Pending"
            ? <span className={`${badgeBase} bg-amber-500/10 text-amber-300 ring-1 ring-amber-400/20`}>Pending</span>
            : <span className={`${badgeBase} bg-rose-500/10 text-rose-300 ring-1 ring-rose-400/20`}>Rejected</span>;
    return (
        <>
        <section className="flex items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3 transition hover:border-violet-400/40 hover:bg-zinc-900/60">
            {genrateImage()}
            <p className="min-w-0 flex-1 truncate text-sm font-semibold text-zinc-100">{name}</p>
            { !isSearch && badge}
            { !isSearch && currentStatus === "Pending" && (
                <div className="flex shrink-0 items-center gap-1.5">
                    <button
                        type="button"
                        disabled={isActingOnRequest}
                        className="rounded-lg bg-violet-500 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
                        onClick={() => void handleFriendRequestAction("Accept")}
                    >
                        Approve
                    </button>
                    <button
                        type="button"
                        disabled={isActingOnRequest}
                        className="rounded-lg border border-zinc-700 px-2.5 py-1 text-xs font-semibold text-zinc-300 transition hover:bg-zinc-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 active:scale-95 disabled:cursor-not-allowed disabled:text-zinc-500"
                        onClick={() => void handleFriendRequestAction("Reject")}
                    >
                        Reject
                    </button>
                </div>
            )}
            { isSearch && (
                <button
                    type="button"
                    className="rounded-lg cursor-pointer bg-violet-500 px-3 py-1 text-xs font-semibold text-white transition hover:bg-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 active:scale-95"
                    onClick={() => addFriend(parseInt(id))}
                >
                    Send Request
                </button>
            )}
        </section>
        <UserInfoCard profile={profile} open={infoOpen} onClose={() => setInfoOpen(false)} />
        </>
    );
};

export default FriendCard;