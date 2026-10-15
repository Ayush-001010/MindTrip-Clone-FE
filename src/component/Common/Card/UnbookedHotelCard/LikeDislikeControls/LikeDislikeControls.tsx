import React from "react";
import { AiFillLike, AiFillDislike, AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import type ILikeDislikeControls from "./ILikeDislikeControls";

const LikeDislikeControls: React.FC<ILikeDislikeControls> = ({
    likeCount,
    dislikeCount,
    liked,
    disliked,
    onLike,
    onDislike,
}) => {
    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={onLike}
                aria-pressed={liked}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                    liked
                        ? "border-blue-400/40 bg-blue-500/15 text-blue-300"
                        : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white"
                }`}
            >
                {liked ? <AiFillLike className="text-sm" /> : <AiOutlineLike className="text-sm" />}
                <span>{likeCount}</span>
            </button>
            <button
                type="button"
                onClick={onDislike}
                aria-pressed={disliked}
                className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                    disliked
                        ? "border-red-400/40 bg-red-500/15 text-red-300"
                        : "border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white"
                }`}
            >
                {disliked ? <AiFillDislike className="text-sm" /> : <AiOutlineDislike className="text-sm" />}
                <span>{dislikeCount}</span>
            </button>
        </div>
    );
};

export default LikeDislikeControls;
