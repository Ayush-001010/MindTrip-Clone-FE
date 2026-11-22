import React, { useRef } from "react";
import type IReelByScript from "./IReelByScript";
import { Player, type PlayerRef } from "@remotion/player";
import PlayerBox from "../../../Pages/MemoriesWorkStation/MakerBox/ReelBox/PlayerBox/PlayerBox";
import { getGeneratedReelDurationInFrames } from "../../../Pages/MemoriesWorkStation/MakerBox/ReelBox/PlayerBox/reelTransitions";

const REEL_COMPOSITION_WIDTH = 344;
const REEL_COMPOSITION_HEIGHT = 685;

const ReelByScript: React.FC<IReelByScript> = ({ storyBoard }) => {
    const playerRef = useRef<PlayerRef>(null);
    const generatedReel = "script" in storyBoard ? storyBoard : { script: storyBoard };
    const durationInFrames = getGeneratedReelDurationInFrames(generatedReel);

    return (
        <section>
            <Player
                ref={playerRef}
                inputProps={{ storyBoard: null, audioUrl: null, generatedReel }}
                durationInFrames={durationInFrames}
                component={PlayerBox}
                fps={generatedReel.script.fps}
                compositionWidth={REEL_COMPOSITION_WIDTH}
                compositionHeight={REEL_COMPOSITION_HEIGHT}
                style={{ width: "100%" }}
                controls
                clickToPlay={false}
                loop
            />
        </section>
    );
};

export default ReelByScript;
