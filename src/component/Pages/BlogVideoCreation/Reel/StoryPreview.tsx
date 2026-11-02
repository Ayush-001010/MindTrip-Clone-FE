import React from "react";
import type { IGenerateVideoResponse, IInstaStorySuggestion } from "./IStoryboard";
import { downloadBlob } from "./downloadFile";

interface IStoryPreview {
    result: IGenerateVideoResponse;
    mediaUrls: Record<string, string>;
    mediaFiles: Record<string, File>;
}

const Sticker: React.FC<{ sticker: NonNullable<IInstaStorySuggestion["sticker"]> }> = ({ sticker }) => {
    if (sticker.type === "question") {
        return (
            <section className="absolute inset-x-4 bottom-6 overflow-hidden rounded-xl bg-white/95 shadow-lg">
                <p className="bg-violet-500 px-3 py-1 text-center text-[10px] font-bold uppercase tracking-wider text-white">Question</p>
                <section className="p-3 text-center">
                    <p className="text-xs font-bold text-zinc-900">{sticker.text}</p>
                    <p className="mt-2 rounded-lg bg-zinc-100 py-1.5 text-[11px] text-zinc-400">Type something...</p>
                </section>
            </section>
        );
    }

    return (
        <section className="absolute inset-x-4 bottom-6 rounded-xl bg-white/95 p-3 text-center shadow-lg">
            <p className="text-xs font-bold text-zinc-900">{sticker.text}</p>
            {sticker.type === "poll" && (
                <section className="mt-2 flex gap-2 text-[11px] font-semibold">
                    <span className="flex-1 rounded-lg bg-violet-100 py-1 text-violet-700">YES</span>
                    <span className="flex-1 rounded-lg bg-zinc-100 py-1 text-zinc-600">NO</span>
                </section>
            )}
            {sticker.type === "emoji_slider" && (
                <section className="relative mt-3 h-2 rounded-full bg-zinc-200">
                    <span className="absolute inset-y-0 left-0 w-3/4 rounded-full bg-linear-to-r from-violet-400 to-pink-400" />
                    <span className="absolute left-3/4 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl leading-none">😍</span>
                </section>
            )}
        </section>
    );
};

interface IStoryCard {
    suggestion: IInstaStorySuggestion;
    type: "image" | "video" | undefined;
    src: string | undefined;
    file: File | undefined;
    index: number;
}

const StoryCard: React.FC<IStoryCard> = ({ suggestion, type, src, file, index }) => (
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
            {suggestion.sticker && <Sticker sticker={suggestion.sticker} />}
        </section>
        <p className="text-sm text-zinc-200">{suggestion.caption}</p>
        <p className="text-xs text-violet-300">{suggestion.hashtags.join(" ")}</p>
        {suggestion.music_mood && <p className="text-xs text-zinc-500">Music mood: {suggestion.music_mood}</p>}
        <button
            type="button"
            disabled={!file}
            onClick={() => file && downloadBlob(file, `story-${index + 1}-${file.name}`)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition hover:border-violet-400 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
        >
            ⬇ Download {type === "video" ? "video" : "photo"}
        </button>
    </article>
);

const StoryPreview: React.FC<IStoryPreview> = ({ result, mediaUrls, mediaFiles }) => {
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
                        file={mediaFiles[suggestion.media_id]}
                        index={index}
                    />
                ))}
            </section>
        </section>
    );
};

export default StoryPreview;
