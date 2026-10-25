import React from 'react';
import type IOpinionContent from './IOpinionContent';

const OpinionContent: React.FC<IOpinionContent> = ({ post }) => {
    if (post.imageUrl) {
        return (
            <div className="relative flex h-24 w-full items-end overflow-hidden rounded-lg">
                <img
                    src={post.imageUrl}
                    alt={post.content}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <p className="relative z-10 line-clamp-2 p-2.5 text-xs leading-snug font-medium text-white">
                    {post.content}
                </p>
            </div>
        );
    }

    return (
        <p className="text-sm leading-relaxed font-semibold break-words text-[#f1f3f5]">{post.content}</p>
    );
};

export default OpinionContent;
