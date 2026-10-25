import React, { useState } from 'react';
import { HiOutlineMapPin } from "react-icons/hi2";
import type ICheckInPost from './ICheckInPost';
import { useChatContext } from '../../../../../Chat';

const REACH_WHEN_OPTIONS = ["5 mins", "10 mins", "20 mins"];

const CheckInPost: React.FC<ICheckInPost> = ({ post }) => {
    const [checkIns, setCheckIns] = useState(post.checkIn ?? []);
    const { checkInUpdate } = useChatContext();

    const markReachedHandler = async (id: number) => {
        setCheckIns((prev) => prev.map((entry) => (entry.id === id ? { ...entry, status: "Reached" } : entry)));

        const response = await checkInUpdate(id, "Reached", checkIns.find((entry) => entry.id === id)?.reachWhen ?? undefined);
        if (!response?.success) {
            // Revert the optimistic update if the request failed.
            setCheckIns((prev) => prev.map((entry) => (entry.id === id ? { ...entry, status: "Not Reached Yet" } : entry)));
        }
    };

    const reachWhenChangeHandler = async (id: number, reachWhen: string) => {
        const previousReachWhen = checkIns.find((entry) => entry.id === id)?.reachWhen;
        setCheckIns((prev) => prev.map((entry) => (entry.id === id ? { ...entry, reachWhen } : entry)));

        const entryStatus = checkIns.find((entry) => entry.id === id)?.status ?? "Not Reached Yet";
        const response = await checkInUpdate(id, entryStatus, reachWhen);
        if (!response?.success) {
            // Revert the optimistic update if the request failed.
            setCheckIns((prev) => prev.map((entry) => (entry.id === id ? { ...entry, reachWhen: previousReachWhen } : entry)));
        }
    };

    return (
        <div className="flex gap-3 rounded-xl border border-teal-400/30 bg-teal-400/5 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-teal-400/15 text-teal-300">
                <HiOutlineMapPin size={18} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-teal-400/15 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-teal-300 uppercase">
                        Check In
                    </span>
                    {post.createdAt && (
                        <span className="shrink-0 text-xs text-[#adb5bd]">
                            {new Date(post.createdAt).toLocaleString(undefined, { hour: "2-digit", minute: "2-digit" })}
                        </span>
                    )}
                </div>

                <p className="text-sm leading-relaxed font-semibold break-words text-[#f1f3f5]">{post.content}</p>

                {checkIns.length > 0 && (
                    <table className="w-full table-fixed border-separate border-spacing-y-1.5 text-xs">
                        <thead>
                            <tr className="text-left text-[0.65rem] tracking-wide text-[#868e96] uppercase">
                                <th className="px-2 font-medium">Member</th>
                                <th className="px-2 font-medium">Status</th>
                                <th className="px-2 font-medium">Reached when</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checkIns.map((entry) => {
                                const isReached = entry.status === "Reached";
                                return (
                                    <tr key={entry.id} className="rounded-lg border border-white/10 bg-white/[0.03]">
                                        <td className="truncate px-2 py-1.5 font-medium text-[#f1f3f5]">{entry.userMember}</td>
                                        <td className="px-2 py-1.5">
                                            <button
                                                type="button"
                                                disabled={isReached}
                                                onClick={() => markReachedHandler(entry.id)}
                                                className={`rounded-full px-2 py-0.5 text-[0.7rem] font-medium transition-colors duration-200 ${
                                                    isReached
                                                        ? "cursor-default border border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                                                        : "cursor-pointer border border-rose-400/40 bg-rose-400/10 text-rose-300 hover:bg-rose-400/20"
                                                }`}
                                            >
                                                {entry.status}
                                            </button>
                                        </td>
                                        <td className="px-2 py-1.5">
                                            {isReached ? (
                                                <span className="px-1.5 text-[#868e96]">-</span>
                                            ) : (
                                            <select
                                                value={entry.reachWhen ?? ""}
                                                onChange={(e) => reachWhenChangeHandler(entry.id, e.target.value)}
                                                className="w-full cursor-pointer rounded-md border border-white/10 bg-white/[0.03] px-1.5 py-1 text-[0.7rem] text-[#e9ecef] outline-none transition-colors duration-200 focus:border-white/20"
                                            >
                                                <option value="" disabled>Select</option>
                                                {REACH_WHEN_OPTIONS.map((option) => (
                                                    <option key={option} value={option}>{option}</option>
                                                ))}
                                            </select>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default CheckInPost;
