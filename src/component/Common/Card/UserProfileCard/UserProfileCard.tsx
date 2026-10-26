import React, { useEffect, useState } from "react";
import type IUserProfileCard from "./IUserProfileCard";
import { Modal } from "antd";
import useCommonAction from "../../../../customHooks/useCommonAction";
import type IUserFriends from "../../../../Interface/DataInterface/IUserFriends";
import type IUserFollowing from "../../../../Interface/DataInterface/IUserFollowing";
import type IUserFollower from "../../../../Interface/DataInterface/IUserFollower";
import { FaUser, FaTimes, FaHeart, FaBirthdayCake, FaUmbrellaBeach, FaUserFriends, FaUserPlus, FaUserCheck } from "react-icons/fa";
import moment from "moment";

const UserProfileCard: React.FC<IUserProfileCard> = ({ open, closeHandler }) => {
    const { fetchUserDetails, fetchUserFriends, fetchUserFollowing, fetchUserFollowers , updateUserDetails } = useCommonAction();
    const [userDetails, setUserDetails] = useState<{
        name : string;
        email : string;
        anniversaryDate : string | null;
        birthdayDate : string | null;
        holidayDate : string | null;
    } | null>(null);
    const [userFriends, setUserFriends] = useState<IUserFriends[]>([]);
    const [userFollowing, setUserFollowing] = useState<IUserFollowing[]>([]);
    const [userFollowers, setUserFollowers] = useState<IUserFollower[]>([]);
    const [anniversaryDate, setAnniversaryDate] = useState<string | null>(null);
    const [birthdayDate, setBirthdayDate] = useState<string | null>(null);
    const [newHolidayDate, setNewHolidayDate] = useState<string>("");
    const [activeTab, setActiveTab] = useState<"friends" | "following" | "followers">("friends");

    const parseHolidayDates = (holidayDate?: string | null): string[] =>
        holidayDate ? holidayDate.split("|").filter(Boolean) : [];

    const fetchData = async () => {
        const userDetailsRes : { success: boolean; data?: any } = await fetchUserDetails();
        if (userDetailsRes.success && userDetailsRes.data) {
            setUserDetails(userDetailsRes.data);
        }

        const userFriendsRes : { success: boolean; data?: any } = await fetchUserFriends();
        if (userFriendsRes.success && userFriendsRes.data) {
            setUserFriends(userFriendsRes.data);
        }

        const userFollowingRes : { success: boolean; data?: any } = await fetchUserFollowing();
        if (userFollowingRes.success && userFollowingRes.data) {
            setUserFollowing(userFollowingRes.data);
        }

        const userFollowersRes : { success: boolean; data?: any } = await fetchUserFollowers();
        if (userFollowersRes.success && userFollowersRes.data) {
            setUserFollowers(userFollowersRes.data);
        }
    };
    
    useEffect(() => {
        fetchData();
    }, []);

    console.log("User Friends:", userFriends);
    console.log("User Following:", userFollowing);
    console.log("User Followers:", userFollowers);
    console.log("User Details:", userDetails);

    useEffect(() => {
        if (anniversaryDate || birthdayDate) {
            updateUserDetails({
                anniversaryDate: anniversaryDate ?? undefined,
                birthdayDate: birthdayDate ?? undefined,
            });
            fetchData();
        }
    }, [anniversaryDate, birthdayDate]);

    const addHolidayDate = async () => {
        if (!newHolidayDate) return;
        const formatted = moment(newHolidayDate).format("DD-MM");
        const existing = parseHolidayDates(userDetails?.holidayDate);
        if (existing.includes(formatted)) {
            setNewHolidayDate("");
            return;
        }
        await updateUserDetails({ holidayDate: [...existing, formatted].join("|") });
        setNewHolidayDate("");
        fetchData();
    };

    const removeHolidayDate = async (date: string) => {
        const existing = parseHolidayDates(userDetails?.holidayDate).filter((d) => d !== date);
        await updateUserDetails({ holidayDate: existing.join("|") });
        fetchData();
    };

    return (
        <Modal open={open} onCancel={closeHandler} centered width={640} footer={null} title={null} rootClassName="transparent-modal"
            styles={{
                mask: {
                    background: "rgba(0, 0, 0, 0.55)",
                    backdropFilter: "blur(8px)",
                },
                container: {
                    background: "transparent",
                    padding: 0,
                    boxShadow: "none",
                },
                body: {
                    padding: 0,
                    background: "transparent",
                },
                header: {
                    display: "none",
                },
                footer: {
                    display: "none",
                },
            }}
            closeIcon={null}>
            <main className="w-full max-w-xl rounded-2xl bg-zinc-900/95 p-6 shadow-2xl ring-1 ring-white/10 backdrop-blur">
                <section className="flex items-center gap-6">
                    <section className="flex items-center gap-3">
                        <p className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 ring-2 ring-white/10">
                            <FaUser className="text-white text-xl" />
                        </p>
                        <section className="flex flex-col gap-0.5">
                            <p className="text-white text-base font-semibold whitespace-nowrap">{userDetails?.name}</p>
                            <p className="text-zinc-400 text-xs whitespace-nowrap">{userDetails?.email}</p>
                        </section>
                    </section>
                    <section className="flex flex-1 gap-3">
                        <button
                            type="button"
                            onClick={() => setActiveTab("friends")}
                            className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-3 ring-1 transition ${
                                activeTab === "friends" ? "bg-zinc-700 ring-fuchsia-400/40" : "bg-zinc-800 ring-white/5 hover:ring-white/10"
                            }`}
                        >
                            <span className="text-fuchsia-400 text-lg font-semibold">{userFriends.length}</span>
                            <span className="text-zinc-400 text-xs">Friends</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("following")}
                            className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-3 ring-1 transition ${
                                activeTab === "following" ? "bg-zinc-700 ring-fuchsia-400/40" : "bg-zinc-800 ring-white/5 hover:ring-white/10"
                            }`}
                        >
                            <span className="text-fuchsia-400 text-lg font-semibold">{userFollowing.length}</span>
                            <span className="text-zinc-400 text-xs">Following</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("followers")}
                            className={`flex flex-1 flex-col items-center gap-1 rounded-xl py-3 ring-1 transition ${
                                activeTab === "followers" ? "bg-zinc-700 ring-fuchsia-400/40" : "bg-zinc-800 ring-white/5 hover:ring-white/10"
                            }`}
                        >
                            <span className="text-fuchsia-400 text-lg font-semibold">{userFollowers.length}</span>
                            <span className="text-zinc-400 text-xs">Followers</span>
                        </button>
                    </section>
                </section>

                <hr className="my-5 border-white/10" />

                <section className="rounded-xl bg-zinc-800 p-3 ring-1 ring-white/5">
                    <section className="mb-3 flex gap-2">
                        <button
                            type="button"
                            onClick={() => setActiveTab("friends")}
                            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium transition ${
                                activeTab === "friends" ? "bg-fuchsia-600 text-white" : "text-zinc-400 hover:bg-zinc-700"
                            }`}
                        >
                            <FaUserFriends /> Friends
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("following")}
                            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium transition ${
                                activeTab === "following" ? "bg-fuchsia-600 text-white" : "text-zinc-400 hover:bg-zinc-700"
                            }`}
                        >
                            <FaUserPlus /> Following
                        </button>
                        <button
                            type="button"
                            onClick={() => setActiveTab("followers")}
                            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium transition ${
                                activeTab === "followers" ? "bg-fuchsia-600 text-white" : "text-zinc-400 hover:bg-zinc-700"
                            }`}
                        >
                            <FaUserCheck /> Followers
                        </button>
                    </section>

                    <section className="flex max-h-40 flex-col gap-1.5 overflow-y-auto">
                        {activeTab === "friends" &&
                            (userFriends.length > 0 ? (
                                userFriends.map((friend) => (
                                    <section
                                        key={friend.friendId}
                                        className="flex items-center gap-2.5 rounded-lg bg-zinc-900 px-2.5 py-2 ring-1 ring-white/5"
                                    >
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-xs font-semibold text-white">
                                            {friend.friendName?.[0]?.toUpperCase()}
                                        </span>
                                        <p className="text-white text-xs font-medium">{friend.friendName}</p>
                                    </section>
                                ))
                            ) : (
                                <p className="py-2 text-center text-zinc-500 text-xs">No friends yet</p>
                            ))}

                        {activeTab === "following" &&
                            (userFollowing.length > 0 ? (
                                userFollowing.map((following) => (
                                    <section
                                        key={following.followingUserId}
                                        className="flex items-center gap-2.5 rounded-lg bg-zinc-900 px-2.5 py-2 ring-1 ring-white/5"
                                    >
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-xs font-semibold text-white">
                                            {following.followingUserName?.[0]?.toUpperCase()}
                                        </span>
                                        <p className="text-white text-xs font-medium">{following.followingUserName}</p>
                                    </section>
                                ))
                            ) : (
                                <p className="py-2 text-center text-zinc-500 text-xs">Not following anyone yet</p>
                            ))}

                        {activeTab === "followers" &&
                            (userFollowers.length > 0 ? (
                                userFollowers.map((follower) => (
                                    <section
                                        key={follower.followerID}
                                        className="flex items-center gap-2.5 rounded-lg bg-zinc-900 px-2.5 py-2 ring-1 ring-white/5"
                                    >
                                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-600 text-xs font-semibold text-white">
                                            {follower.followerName?.[0]?.toUpperCase()}
                                        </span>
                                        <p className="text-white text-xs font-medium">{follower.followerName}</p>
                                    </section>
                                ))
                            ) : (
                                <p className="py-2 text-center text-zinc-500 text-xs">No followers yet</p>
                            ))}
                    </section>
                </section>

                <hr className="my-5 border-white/10" />

                <section className="grid grid-cols-3 gap-3">
                    <section className="flex flex-col gap-2 rounded-xl bg-zinc-800 p-3 ring-1 ring-white/5">
                        <p className="flex items-center gap-2 text-zinc-300 text-xs font-medium">
                            <FaHeart className="text-fuchsia-400" />
                            Anniversary
                        </p>
                        {userDetails?.anniversaryDate ? (
                            <p className="text-white text-sm">{userDetails.anniversaryDate}</p>
                        ) : (
                            <input
                                type="date"
                                className="rounded-lg border border-white/10 bg-zinc-900 px-2 py-1.5 text-xs text-white outline-none focus:border-fuchsia-400"
                                value={anniversaryDate ?? ""}
                                onChange={(e) => setAnniversaryDate(e.target.value)}
                            />
                        )}
                    </section>

                    <section className="flex flex-col gap-2 rounded-xl bg-zinc-800 p-3 ring-1 ring-white/5">
                        <p className="flex items-center gap-2 text-zinc-300 text-xs font-medium">
                            <FaBirthdayCake className="text-fuchsia-400" />
                            Birthday
                        </p>
                        {userDetails?.birthdayDate ? (
                            <p className="text-white text-sm">{userDetails.birthdayDate}</p>
                        ) : (
                            <input
                                type="date"
                                className="rounded-lg border border-white/10 bg-zinc-900 px-2 py-1.5 text-xs text-white outline-none focus:border-fuchsia-400"
                                value={birthdayDate ?? ""}
                                onChange={(e) => setBirthdayDate(e.target.value)}
                            />
                        )}
                    </section>

                    <section className="flex flex-col gap-2 rounded-xl bg-zinc-800 p-3 ring-1 ring-white/5">
                        <p className="flex items-center gap-2 text-zinc-300 text-xs font-medium">
                            <FaUmbrellaBeach className="text-fuchsia-400" />
                            Holiday
                        </p>
                        {parseHolidayDates(userDetails?.holidayDate).length > 0 && (
                            <section className="flex flex-wrap gap-1.5">
                                {parseHolidayDates(userDetails?.holidayDate).map((date) => (
                                    <span
                                        key={date}
                                        className="flex items-center gap-1 rounded-full bg-zinc-900 px-2 py-0.5 text-xs text-white ring-1 ring-white/10"
                                    >
                                        {date}
                                        <button
                                            type="button"
                                            onClick={() => removeHolidayDate(date)}
                                            className="text-zinc-400 transition hover:text-fuchsia-400"
                                        >
                                            <FaTimes className="text-[10px]" />
                                        </button>
                                    </span>
                                ))}
                            </section>
                        )}
                        <section className="flex items-center gap-1.5">
                            <input
                                type="date"
                                className="min-w-0 flex-1 rounded-lg border border-white/10 bg-zinc-900 px-2 py-1.5 text-xs text-white outline-none focus:border-fuchsia-400"
                                value={newHolidayDate}
                                onChange={(e) => setNewHolidayDate(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={addHolidayDate}
                                className="shrink-0 rounded-lg bg-fuchsia-600 px-2.5 py-1.5 text-xs font-medium text-white transition hover:bg-fuchsia-500"
                            >
                                Add
                            </button>
                        </section>
                    </section>
                </section>
            </main>
        </Modal>
    );
};

export default UserProfileCard;