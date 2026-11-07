import React, { useEffect, useState } from "react";
import type IUserInfoCard from "./IUserInfoCard";
import { ConfigProvider, Modal, theme } from "antd";

const cardFace = "col-start-1 row-start-1 flex min-h-72 min-w-0 flex-col justify-between rounded-3xl p-7 shadow-2xl shadow-black/50 backface-hidden";

const UserInfoCardFaces: React.FC<Pick<IUserInfoCard, "profile"> & { open: boolean }> = ({ profile, open }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        if (!open) return;

        const timeout = setTimeout(() => setIsFlipped(true), 1000);
        return () => clearTimeout(timeout);
    }, [open]);

    const generateProfileImage = (sizeClass = "size-24 text-4xl") => (
        <div className={`flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-violet-500/10 font-semibold text-violet-300 ring-1 ring-violet-400/30 ${sizeClass}`}>
            {profile?.userImage ? (
                <img
                    src={profile.userImage}
                    alt={`${profile.name}'s profile`}
                    className="h-full w-full object-cover"
                />
            ) : (
                <span>{profile?.name?.[0]?.toUpperCase() ?? ""}</span>
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
    }

    const displayName = profile?.name ? `${profile.name[0].toUpperCase()}${profile.name.slice(1)}` : "";

    const sinceLabel = profile?.createdAt
        ? new Date(profile.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
        : "";

    return (
        <section className="perspective-[1200px]">
            <div
                className={`grid transform-3d transition-transform duration-1000 ease-in-out motion-reduce:transition-none ${isFlipped ? "rotate-y-180" : "rotate-y-0"}`}
            >
                <section className={`${cardFace} justify-center border border-zinc-800 bg-zinc-900 text-zinc-100`} aria-hidden={isFlipped} inert={isFlipped}>
                    <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-8">
                        <div className="flex min-w-0 flex-col items-center text-center">
                            {generateProfileImage()}
                            <p className="mt-3 max-w-full text-2xl font-semibold tracking-tight wrap-break-word">{displayName}</p>
                            <p className="text-xs text-zinc-400">{profile?.location ?? ""}</p>
                        </div>
                        <dl className="w-full flex-1 divide-y divide-zinc-800 sm:w-auto">
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

                <section className={`${cardFace} relative rotate-y-180 justify-center overflow-hidden border border-zinc-800 bg-[#0b0d0f] text-zinc-100`} aria-hidden={!isFlipped} inert={!isFlipped}>
                    <div className="pointer-events-none absolute -right-6 -bottom-6 flex size-72 select-none items-center justify-center overflow-hidden text-[12rem] leading-none font-bold text-violet-400/30 opacity-60 mask-[radial-gradient(circle_at_70%_70%,black_20%,transparent_70%)]" aria-hidden>
                        {profile?.userImage ? (
                            <img src={profile.userImage} alt="" className="size-full object-cover grayscale" />
                        ) : (
                            <span>{profile?.name?.[0]?.toUpperCase() ?? ""}</span>
                        )}
                    </div>
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#0b0d0f] via-[#0b0d0f]/70 to-transparent" aria-hidden />
                    <div className="relative z-10">
                        <h2 className="wrap-break-word text-2xl font-semibold tracking-tight">{displayName}</h2>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-violet-300">
                            {sinceLabel ? `Traveling since ${sinceLabel}` : "MindTrip traveler"}
                        </p>
                        <p className="mt-4 max-h-40 overflow-y-auto whitespace-pre-wrap wrap-break-word text-sm leading-6 text-zinc-300">
                            {profile?.aboutMe?.trim() || "I'm a travel enthusiast who loves exploring new places, experiencing different cultures, and creating unforgettable memories. Every journey teaches me something new and inspires me to see the world from a different perspective."}
                        </p>
                    </div>
                </section>
            </div>
        </section>
    );
};

const UserInfoCard: React.FC<IUserInfoCard> = ({ profile, open, onClose }) => {
    const [internalOpen, setInternalOpen] = useState(true);
    const isOpen = (open ?? internalOpen) && profile !== null;

    const closeHandler = () => {
        setInternalOpen(false);
        onClose();
    };

    return (
        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
            token: { colorPrimary: "#8b5cf6" },
            components: { Modal: { contentBg: "transparent", boxShadow: "none" } },
        }}>
            <Modal
                open={isOpen}
                onCancel={closeHandler}
                centered
                width={480}
                footer={null}
                title={null}
                closable={false}
                destroyOnHidden
                classNames={{ container: "overflow-hidden rounded-3xl" }}
                aria-label={`${profile?.name ?? "User"} profile`}
            >
                <section className="p-10">
                    <UserInfoCardFaces key={`${isOpen}-${profile?.id}`} profile={profile} open={isOpen} />
                </section>
            </Modal>
        </ConfigProvider>
    );
};

export default UserInfoCard;