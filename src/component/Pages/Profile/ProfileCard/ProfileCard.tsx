import React, { useEffect, useState } from "react";
import { message } from "antd";
import APIService from "../../../../Services/APIService";
import type IProfileCard from "./IProfileCard";
import { FaInstagram } from "react-icons/fa";
import UserInfoCard from "../../../Common/Card/UserInfoCard/UserInfoCard";
import { FaEdit } from "react-icons/fa";
import ProfileMediaModal from "./ProfileMediaModal/ProfileMediaModal";
import { FaUserFriends } from "react-icons/fa";
import FriendDashboardModel from "../../../Common/Model/FriendDashboardModel/FriendDashboardModel";

const ProfileCard: React.FC<IProfileCard> = ({ profile, mode, imageFile, onImageChange, changeProfileFields }) => {
    const [userInfoCardOpen, setUserInfoCardOpen] = useState(false);
    const [mediaModalOpen, setMediaModalOpen] = useState(false);
    const instagramUrl = profile?.instagramUrl ?? "";
    const storedImage = profile?.userImage || "";
    const [resolvedImage, setResolvedImage] = useState("");
    const [friendDashboardModalOpen, setFriendDashboardModalOpen] = useState(false);
    const isImageURL = /^(https?:|data:|blob:)/.test(storedImage);
    const userImage = isImageURL ? storedImage : resolvedImage;

    useEffect(() => {
        if (!storedImage || isImageURL) return;
        let active = true;
        const api = new APIService();
        api.getRequest<string>(`/common/someRandomImages?type=${encodeURIComponent(storedImage)}`).then((response) => {
            if (!active) return;
            if (response.success && typeof response.data === "string" && response.data) {
                setResolvedImage(response.data);
            } else {
                message.error(response.error || "Could not load your profile image.");
            }
        });
        return () => { active = false; };
    }, [storedImage, isImageURL]);

    const generateProfileImage = () => (
        <div className="relative size-24  shrink-0 sm:size-28">
            <div className="flex size-full items-center justify-center overflow-hidden rounded-full bg-violet-500/10 text-4xl font-semibold text-violet-300 ring-1 ring-violet-400/30">
                {userImage ? (
                    <img src={userImage} alt={`${profile?.name ?? "User"}'s profile`} className="size-full object-cover" />
                ) : (
                    <span>{profile?.name?.[0]?.toUpperCase() ?? ""}</span>
                )}
            </div>
            {mode === "edit" && (
            <button
                type="button"
                aria-label="Edit profile photo"
                onClick={(e) => { e.stopPropagation(); setMediaModalOpen(true); }}
                className="absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full border-2 border-zinc-900 bg-violet-500 text-xs text-white shadow-md transition hover:bg-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 active:scale-95"
            >
                <FaEdit />
            </button>
            )}
        </div>
    );
    const calculateDuration = () => {
        const userProfileCreatedAt = profile?.createdAt;
        if (!userProfileCreatedAt) return "";
        // Calculate duration in month and year base.
        const createdAtDate = new Date(userProfileCreatedAt);
        const now = new Date();
        const years = now.getFullYear() - createdAtDate.getFullYear();
        const months = now.getMonth() - createdAtDate.getMonth();
        const days = now.getDate() - createdAtDate.getDate();
        if (months < 0) {
            return `${years - 1} years and ${12 + months} months`;
        }
        if (years === 0 && months === 0) {
            return `${days} days on MindTrip`;
        }
        if (years === 0) {
            return `${months} months on MindTrip`;
        }
        return `${years} years on MindTrip`;
    };
    const clickFriendsButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        setFriendDashboardModalOpen(true);
    };

    const displayName = profile?.name ? `${profile.name[0].toUpperCase()}${profile.name.slice(1)}` : "";

    return (
        <>
            <section
                role="button"
                tabIndex={0}
                aria-label="Open profile details"
                onClick={() => setUserInfoCardOpen(true)}
                onKeyDown={(e) => { if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setUserInfoCardOpen(true); } }}
                className="relative w-full max-w-md self-start cursor-pointer rounded-3xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-100 shadow-xl shadow-black/40 transition duration-300 hover:-translate-y-0.5 hover:border-zinc-700 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 sm:p-8"
            >
                <button
                    type="button"
                    aria-label="Friends"
                    onClick={clickFriendsButton}
                    className="absolute cursor-pointer top-4 right-14 rounded-full bg-zinc-800 p-2 text-zinc-300 transition hover:bg-zinc-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 active:scale-95"
                >
                    <FaUserFriends />
                </button>
                {mode === "edit" ? <button
                    type="button"
                    aria-label="Edit profile photo and Instagram"
                    onClick={(e) => { e.stopPropagation(); setMediaModalOpen(true); }}
                    className="absolute top-4 right-4 rounded-full bg-zinc-800 p-2 text-zinc-300 transition hover:bg-zinc-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 active:scale-95"
                >
                    <FaInstagram />
                </button> : instagramUrl ? (
                    <a href={instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Open Instagram profile" onClick={(e) => e.stopPropagation()} className="absolute top-4 right-4 rounded-full bg-zinc-800 p-2 text-zinc-300 transition hover:bg-zinc-700 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50">
                        <FaInstagram />
                    </a>
                ) : null}
                <div className="mt-4 flex min-w-0 flex-col items-center gap-6 sm:mt-0 sm:flex-row sm:items-center sm:gap-8 lg:flex-col xl:flex-row">
                    <div className="flex min-w-0 flex-col items-center text-center">
                        {generateProfileImage()}
                        <p className="mt-3 max-w-full text-2xl font-semibold tracking-tight wrap-break-word">{displayName}</p>
                        <p className="max-w-full text-xs text-zinc-400 wrap-break-word">{profile?.location ?? ""}</p>
                    </div>
                    <dl className="w-full min-w-0 flex-1 divide-y divide-zinc-800 sm:w-auto lg:w-full xl:w-auto">
                        <div className="pb-3">
                            <dd className="text-xl font-semibold">{profile?.numberOfTrips ?? 0}</dd>
                            <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Trips</dt>
                        </div>
                        <div className="py-3">
                            <dd className="text-xl font-semibold">{profile?.numberOfBlogs ?? 0}</dd>
                            <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Blogs</dt>
                        </div>
                        <div className="pt-3">
                            <dd className="text-sm font-semibold">{calculateDuration()}</dd>
                            <dt className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Duration</dt>
                        </div>
                    </dl>
                </div>
            </section>
            <UserInfoCard profile={profile ? { ...profile, userImage } : null} open={userInfoCardOpen} onClose={() => setUserInfoCardOpen(false)} />
            {mediaModalOpen && mode === "edit" && (
                <ProfileMediaModal
                    imageUrl={userImage}
                    imageFile={imageFile}
                    instagramUrl={instagramUrl}
                    onClose={() => setMediaModalOpen(false)}
                    onSave={(file, url) => { onImageChange(file); changeProfileFields("instagramUrl", url); }}
                />
            )}
            <FriendDashboardModel openModal={friendDashboardModalOpen} closeFunc={() => setFriendDashboardModalOpen(false)} />
        </>
    );
};

export default ProfileCard;