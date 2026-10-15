import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import type IHotelCommentSection from "./IHotelCommentSection";

const HotelCommentSection: React.FC<IHotelCommentSection> = ({ comments, onAddComment }) => {
    const [draftComment, setDraftComment] = useState("");

    const submitComment = () => {
        const trimmed = draftComment.trim();
        if (!trimmed) {
            return;
        }
        onAddComment(trimmed);
        setDraftComment("");
    };

    return (
        <div className="flex flex-col gap-2">
            {comments.length > 0 && (
                <ul className="flex max-h-24 flex-col gap-1.5 overflow-y-auto scrollbar-thin pr-1">
                    {comments.map((item, index) => (
                        <li key={`${item.name}-${index}`} className="rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-white/70">
                            <span className="font-semibold text-white/90">{item.name}</span>
                            <span className="text-white/40">: </span>
                            {item.comment}
                        </li>
                    ))}
                </ul>
            )}
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    value={draftComment}
                    onChange={(event) => setDraftComment(event.target.value)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter") {
                            submitComment();
                        }
                    }}
                    placeholder="Add a comment..."
                    className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white placeholder:text-white/30 focus:border-blue-400/50 focus:outline-none"
                />
                <button
                    type="button"
                    onClick={submitComment}
                    aria-label="Add comment"
                    className="flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-400 disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={!draftComment.trim()}
                >
                    <IoSend className="text-xs" />
                </button>
            </div>
        </div>
    );
};

export default HotelCommentSection;
