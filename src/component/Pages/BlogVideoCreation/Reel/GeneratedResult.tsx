import React, { useState } from "react";
import ReelPreview from "./ReelPreview";
import StoryPreview from "./StoryPreview";
import useReelMedia from "./useReelMedia";
import type { IGenerateVideoResponse } from "./IStoryboard";
import type { IPhotoOrVideoBlogVideo } from "../BlogVideoCreation";

interface IGeneratedResult {
    result: IGenerateVideoResponse;
    photosOrVideos: IPhotoOrVideoBlogVideo[];
}

type View = "reel" | "stories";

const tabBase = "rounded-lg border px-6 py-2 text-sm font-semibold transition active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400";
const tabIdle = `${tabBase} border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-violet-400 hover:text-white`;
const tabActive = `${tabBase} border-violet-500 bg-violet-500 text-white`;

const GeneratedResult: React.FC<IGeneratedResult> = ({ result, photosOrVideos }) => {
    // Nothing is shown until the user picks a view.
    const [view, setView] = useState<View | null>(null);
    const { mediaUrls, mediaFiles } = useReelMedia(result, photosOrVideos);

    const toggle = (next: View) => setView((current) => (current === next ? null : next));

    return (
        <section className="mx-4 mb-8 flex flex-col items-center gap-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5">
            <section className="flex flex-col items-center gap-1">
                <p className="text-base font-semibold text-white">Your content is ready 🎉</p>
                <p className="text-xs text-zinc-500">Choose what you want to preview.</p>
            </section>
            <section className="flex gap-3">
                <button type="button" className={view === "reel" ? tabActive : tabIdle} onClick={() => toggle("reel")}>
                    🎬 Reel
                </button>
                <button type="button" className={view === "stories" ? tabActive : tabIdle} onClick={() => toggle("stories")}>
                    📱 Stories
                </button>
            </section>
            {view === "reel" && <ReelPreview result={result} mediaUrls={mediaUrls} />}
            {view === "stories" && (
                <section className="w-full">
                    <StoryPreview result={result} mediaUrls={mediaUrls} mediaFiles={mediaFiles} />
                </section>
            )}
        </section>
    );
};

export default GeneratedResult;
