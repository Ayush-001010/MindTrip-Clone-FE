import React from 'react';
import type IAnnouncementPost from './IAnnouncementPost';
import { HiOutlineSpeakerphone } from "react-icons/hi";

const AnnouncementPost : React.FC<IAnnouncementPost> = ({ post }) => {
    return (
        <div className="flex gap-3 rounded-xl border border-amber-400/30 bg-amber-400/5 p-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-400/15 text-amber-300">
                <HiOutlineSpeakerphone size={18} />
            </span>
            <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-amber-300 uppercase">
                        Announcement
                    </span>
                    {post.createdAt && (
                        <span className="shrink-0 text-xs text-[#adb5bd]">
                            {new Date(post.createdAt).toLocaleString(undefined, { hour: "2-digit", minute: "2-digit" })}
                        </span>
                    )}
                </div>
                <p className="text-sm leading-relaxed break-words text-[#f1f3f5]">{post.content}</p>
            </div>
        </div>
    );
}

export default AnnouncementPost;