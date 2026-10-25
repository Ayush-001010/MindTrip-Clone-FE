import React, { useState } from 'react';
import type IPollPost from './IPollPost';
import type IPollOption from '../../../../../../../../Interface/DataInterface/IPollOption';
import { FaPoll } from "react-icons/fa";
import { AiOutlineLike, AiFillLike, AiOutlineDislike, AiFillDislike } from "react-icons/ai";
import { useChatContext } from '../../../../../Chat';

type VoteState = "like" | "dislike" | null;

const PollPost: React.FC<IPollPost> = ({ post }) => {
    const options = post.options ?? [];
    const [myVotes, setMyVotes] = useState<Record<number, VoteState>>({});
    const [optionCounts, setOptionCounts] = useState<Record<number, { likeCount: number; disLikeCount: number }>>(
        () => Object.fromEntries(options.map((option) => [option.id, { likeCount: option.likeCount, disLikeCount: option.disLikeCount }]))
    );
    const { likeOrDislikeGroupHubPost } = useChatContext();

    const castVote = (option: IPollOption, vote: Exclude<VoteState, null>) => {
        const current = myVotes[option.id] ?? null;
        const next: VoteState = current === vote ? null : vote;

        setOptionCounts((prev) => {
            const counts = { ...prev[option.id] };
            if (current === "like") {
                counts.likeCount -= 1;
                likeOrDislikeGroupHubPost(option.id.toString(), false);
            }
            if (current === "dislike") {
                counts.disLikeCount -= 1;
                likeOrDislikeGroupHubPost(option.id.toString(), true);
            }
            if (next === "like") {
                counts.likeCount += 1;
                likeOrDislikeGroupHubPost(option.id.toString(), true);

            }
            if (next === "dislike") {
                counts.disLikeCount += 1;
                likeOrDislikeGroupHubPost(option.id.toString(), false);
            }
            return { ...prev, [option.id]: counts };
        });
        setMyVotes((prev) => ({ ...prev, [option.id]: next }));
    };

    return (
        <div className="flex gap-3 rounded-xl border border-violet-400/30 bg-violet-400/5 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-400/15 text-violet-300">
                <FaPoll size={16} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-violet-400/15 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-violet-300 uppercase">
                        Poll
                    </span>
                    {post.createdAt && (
                        <span className="shrink-0 text-xs text-[#adb5bd]">
                            {new Date(post.createdAt).toLocaleString(undefined, { hour: "2-digit", minute: "2-digit" })}
                        </span>
                    )}
                </div>

                <p className="text-sm leading-relaxed font-semibold break-words text-[#f1f3f5]">{post.content}</p>

                <div className="grid grid-cols-2 gap-2">
                    {options.map((option) => {
                        const counts = optionCounts[option.id] ?? { likeCount: option.likeCount, disLikeCount: option.disLikeCount };
                        const myVote = myVotes[option.id] ?? null;

                        return (
                            <div
                                key={option.id}
                                className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] p-2 transition-colors duration-200 hover:border-violet-300/30"
                            >
                                <p className="text-xs leading-snug break-words text-[#e9ecef]">{option.content}</p>

                                <div className="flex items-center gap-1.5">
                                    <button
                                        type="button"
                                        onClick={() => castVote(option, "like")}
                                        className={`flex cursor-pointer items-center gap-1 rounded-full px-1.5 py-0.5 text-[0.7rem] font-medium transition-colors duration-200 ${
                                            myVote === "like"
                                                ? "bg-emerald-400/15 text-emerald-300"
                                                : "text-[#adb5bd] hover:bg-white/5 hover:text-emerald-300"
                                        }`}
                                    >
                                        {myVote === "like" ? <AiFillLike size={12} /> : <AiOutlineLike size={12} />}
                                        {counts.likeCount}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => castVote(option, "dislike")}
                                        className={`flex cursor-pointer items-center gap-1 rounded-full px-1.5 py-0.5 text-[0.7rem] font-medium transition-colors duration-200 ${
                                            myVote === "dislike"
                                                ? "bg-rose-400/15 text-rose-300"
                                                : "text-[#adb5bd] hover:bg-white/5 hover:text-rose-300"
                                        }`}
                                    >
                                        {myVote === "dislike" ? <AiFillDislike size={12} /> : <AiOutlineDislike size={12} />}
                                        {counts.disLikeCount}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default PollPost;
