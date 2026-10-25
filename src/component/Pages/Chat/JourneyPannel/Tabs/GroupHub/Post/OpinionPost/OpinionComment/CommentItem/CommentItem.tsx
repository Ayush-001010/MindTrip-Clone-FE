import React, { useState } from 'react';
import { LuSend } from "react-icons/lu";
import type ICommentItem from './ICommentItem';

const CommentItem: React.FC<ICommentItem> = ({ comment, onReply }) => {
    const [isReplying, setIsReplying] = useState(false);
    const [replyText, setReplyText] = useState("");

    const submitReplyHandler = () => {
        if (!replyText.trim()) return;

        onReply(comment.id, replyText.trim());
        setReplyText("");
        setIsReplying(false);
    };

    return (
        <div className="flex flex-col gap-1.5">
            <div className="rounded-lg border border-white/10 bg-white/[0.03] p-2">
                <p className="text-xs font-semibold text-[#f1f3f5]">{comment.userName}</p>
                <p className="text-xs leading-snug text-[#ced4da]">{comment.comment}</p>
                <button
                    type="button"
                    onClick={() => setIsReplying((prev) => !prev)}
                    className="mt-1 cursor-pointer text-[0.7rem] font-medium text-[#868e96] transition-colors duration-200 hover:text-sky-300"
                >
                    Reply
                </button>
            </div>

            {comment.replies.length > 0 && (
                <div className="ml-4 flex flex-col gap-1.5 border-l border-white/10 pl-3">
                    {comment.replies.map((reply) => (
                        <CommentItem key={reply.id} comment={reply} onReply={onReply} />
                    ))}
                </div>
            )}

            {isReplying && (
                <div className="ml-4 flex items-center gap-2 pl-3">
                    <input
                        type="text"
                        autoFocus
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && submitReplyHandler()}
                        placeholder={`Reply to ${comment.userName}...`}
                        className="h-8 w-full rounded-full border border-white/10 bg-white/[0.03] px-3 text-xs text-white outline-none transition-colors duration-200 placeholder:text-[#868e96] focus:border-white/20"
                    />
                    <button
                        type="button"
                        onClick={submitReplyHandler}
                        className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#ced4da] text-[#343a40] transition duration-300 hover:bg-[#343a40] hover:text-white"
                    >
                        <LuSend size={12} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default CommentItem;
