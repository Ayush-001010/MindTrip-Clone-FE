import React, { useEffect, useRef, useState } from "react";
import type IAnimation from "./IAnimation";
import { Player, type PlayerRef } from "@remotion/player";
import BlogAnimation from "./BlogAnimation/BlogAnimation";
import { useGetBlogContext } from "../Blog";
import { BLOG_FPS, buildBlogTimeline } from "./blogTimeline";

export type { IAnimationVideoType } from "./blogTimeline";
const Animation: React.FC<IAnimation> = () => {
    const { blogValue } = useGetBlogContext();
    const sence = buildBlogTimeline(blogValue);
    const totalDurationInFrames = sence.reduce((total, scene) => total + scene.durationInFrames, 0);
    const playerRef = useRef<PlayerRef>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const player = playerRef.current;
        if (!player) return;

        const onPlay = () => setIsPlaying(true);
        const onPause = () => setIsPlaying(false);
        const onEnded = () => setIsPlaying(false);

        setIsPlaying(player.isPlaying());
        player.addEventListener("play", onPlay);
        player.addEventListener("pause", onPause);
        player.addEventListener("ended", onEnded);

        return () => {
            player.removeEventListener("play", onPlay);
            player.removeEventListener("pause", onPause);
            player.removeEventListener("ended", onEnded);
        };
    }, []);

    return (
        <section data-playing={isPlaying} className="flex h-full w-full items-center justify-center">
            <Player
                ref={playerRef}
                component={BlogAnimation}
                inputProps={{
                    sence,
                    isPlaying
                }}
                controls
                alwaysShowControls
                style={{ width: "100%" }}
                durationInFrames={totalDurationInFrames}
                compositionWidth={1920}
                compositionHeight={1500}
                fps={BLOG_FPS} />
        </section >
    )
};

export default Animation;