import React from 'react';
import type IOpinionPost from './IOpinionPost';
import { HiOutlineChatBubbleLeftEllipsis } from "react-icons/hi2";
import OpinionContent from './OpinionContent/OpinionContent';
import OpinionComment from './OpinionComment/OpinionComment';

const OpinionPost: React.FC<IOpinionPost> = ({ post }) => {
    return (
        <div className="flex gap-3 rounded-xl border border-sky-400/30 bg-sky-400/5 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-400/15 text-sky-300">
                <HiOutlineChatBubbleLeftEllipsis size={18} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-sky-400/15 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-sky-300 uppercase">
                        Opinion
                    </span>
                    {post.createdAt && (
                        <span className="shrink-0 text-xs text-[#adb5bd]">
                            {new Date(post.createdAt).toLocaleString(undefined, { hour: "2-digit", minute: "2-digit" })}
                        </span>
                    )}
                </div>

                <OpinionContent post={post} />
                <OpinionComment postId={post.id?.toString() || ""} comments={post.comments} />
            </div>
        </div>
    );
};

export default OpinionPost;
