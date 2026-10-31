import React from "react";
import { Player } from "@remotion/player";
import ReelComposition, { REEL_FPS, REEL_HEIGHT, REEL_WIDTH, totalReelFrames } from "./ReelComposition";
import type { IReelCompositionProps } from "./ReelComposition";
import type { IGenerateVideoResponse } from "./IStoryboard";

interface IReelPreview {
    result: IGenerateVideoResponse;
    mediaUrls: Record<string, string>;
}

const ReelPreview: React.FC<IReelPreview> = ({ result, mediaUrls }) => {
    const inputProps: IReelCompositionProps = { storyboard: result.storyboard, mediaUrls };

    return (
        <section className="flex flex-col items-center gap-3">
            <p className="text-sm font-semibold text-zinc-200">{result.storyboard.title || result.tripTitle}</p>
            <section className="w-full max-w-xs overflow-hidden rounded-xl border border-zinc-800 bg-black shadow-md shadow-black/30">
                <Player
                    component={ReelComposition}
                    inputProps={inputProps}
                    durationInFrames={totalReelFrames(result.storyboard)}
                    fps={REEL_FPS}
                    compositionWidth={REEL_WIDTH}
                    compositionHeight={REEL_HEIGHT}
                    controls
                    loop
                    style={{ width: "100%" }}
                />
            </section>
            {result.storyboard.music_mood && (
                <p className="text-xs text-zinc-500">Music mood: {result.storyboard.music_mood}</p>
            )}
        </section>
    );
};

export default ReelPreview;
