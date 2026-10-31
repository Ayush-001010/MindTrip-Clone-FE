import React from "react";
import type { IGenerateVideoResponse, IInstaStorySuggestion } from "./IStoryboard";

interface IStoryPreview {
    result: IGenerateVideoResponse;
    mediaUrls: Record<string, string>;
}

const StoryCard: React.FC<{ suggestion: IInstaStorySuggestion; type: "image" | "video" | undefined; src: string | undefined; index: number }> = ({ suggestion, type, src, index }) => (
    <article className="flex w-60 shrink-0 flex-col gap-2">
        <section className="relative aspect-9/16 overflow-hidden rounded-2xl border border-zinc-800 bg-black shadow-md shadow-black/30">
            {src && type === "video" && (
                <video src={src} muted loop autoPlay playsInline className="h-full w-full object-cover" />
            )}
            {src && type === "image" && <img src={src} alt={suggestion.caption} className="h-full w-full object-cover" />}
            <span className="absolute left-3 top-3 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold text-violet-300 backdrop-blur">
                Story {index + 1}
            </span>
            {suggestion.location_tag && (
                <span className="absolute left-3 top-10 max-w-[85%] truncate rounded-full bg-black/60 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur">
                    📍 {suggestion.location_tag}
                </span>
            )}
            {suggestion.sticker && (
                <section className="absolute inset-x-4 bottom-6 rounded-xl bg-white/95 p-3 text-center shadow-lg">
                    <p className="text-xs font-bold text-zinc-900">{suggestion.sticker.text}</p>
                    {suggestion.sticker.type === "poll" && (
                        <section className="mt-2 flex gap-2 text-[11px] font-semibold">
                            <span className="flex-1 rounded-lg bg-violet-100 py-1 text-violet-700">YES</span>
                            <span className="flex-1 rounded-lg bg-zinc-100 py-1 text-zinc-600">NO</span>
                        </section>
                    )}
                </section>
            )}
        </section>
        <p className="text-sm text-zinc-200">{suggestion.caption}</p>
        <p className="text-xs text-violet-300">{suggestion.hashtags.join(" ")}</p>
        {suggestion.music_mood && <p className="text-xs text-zinc-500">Music mood: {suggestion.music_mood}</p>}
    </article>
);

const StoryPreview: React.FC<IStoryPreview> = ({ result, mediaUrls }) => {
    const { instaStory, media } = result;

    if (!instaStory || instaStory.suggestions.length === 0) {
        return <p className="text-center text-sm text-zinc-500">No story suggestions were generated for this blog.</p>;
    }

    const byId = new Map(instaStory.suggestions.map((s) => [s.media_id, s]));
    const ordered = [
        ...instaStory.story_order.map((id) => byId.get(id)).filter((s): s is IInstaStorySuggestion => s !== undefined),
        ...instaStory.suggestions.filter((s) => !instaStory.story_order.includes(s.media_id)),
    ];

    return (
        <section className="flex flex-col gap-4">
            <p className="text-center text-sm font-semibold text-zinc-200">{instaStory.overall_theme}</p>
            <section className="flex gap-4 overflow-x-auto pb-2">
                {ordered.map((suggestion, index) => (
                    <StoryCard
                        key={`${suggestion.media_id}-${index}`}
                        suggestion={suggestion}
                        type={media.find((m) => m.media_id === suggestion.media_id)?.type}
                        src={mediaUrls[suggestion.media_id]}
                        index={index}
                    />
                ))}
            </section>
        </section>
    );
};

export default StoryPreview;
