import React, { useEffect, useRef, useState } from "react";
import type IReelByScript from "./IReelByScript";
import { Player, type PlayerRef } from "@remotion/player";
import PlayerBox from "../../../Pages/MemoriesWorkStation/MakerBox/ReelBox/PlayerBox/PlayerBox";
import { getGeneratedReelDurationInFrames } from "../../../Pages/MemoriesWorkStation/MakerBox/ReelBox/PlayerBox/reelTransitions";
import useCommonAction from "../../../../CustomHooks/useCommonAction";
import type { IMemoriesReelAudioEdit } from "../../../../Interface/DataInterface/IMemoriesData";

const REEL_COMPOSITION_WIDTH = 344;
const REEL_COMPOSITION_HEIGHT = 685;

const ReelByScript: React.FC<IReelByScript> = ({ storyBoard }) => {
    const playerRef = useRef<PlayerRef>(null);
    const generatedReel = "script" in storyBoard ? storyBoard : { script: storyBoard };
    const durationInFrames = getGeneratedReelDurationInFrames(generatedReel);
    const audioKey = generatedReel.script.audio.src;
    const { getImages } = useCommonAction();
    const [audioEdit, setAudioEdit] = useState<IMemoriesReelAudioEdit | null>(null);

    useEffect(() => {
        let isCurrent = true;
        if (/^(https?:|blob:|data:)/i.test(audioKey)) {
            return () => {
                isCurrent = false;
            };
        }

        getImages(audioKey)
            .then((response) => {
                if (typeof response?.data !== "string" || !response.data) {
                    throw new Error("Unable to load reel soundtrack.");
                }
                if (!isCurrent) return;
                setAudioEdit({
                    sourceKey: audioKey,
                    playbackUrl: response.data,
                    startFromSec: generatedReel.script.audio.startFromSec ?? 0,
                    endAtSec: generatedReel.script.audio.endAtSec ?? generatedReel.script.audio.durationSec ?? 0,
                    volume: generatedReel.script.audio.volume ?? 0.5,
                    durationSec: generatedReel.script.audio.durationSec ?? 0,
                });
            })
            .catch((error: unknown) => {
                console.error("Unable to load reel soundtrack:", error);
            });

        return () => {
            isCurrent = false;
        };
    }, [audioKey, generatedReel.script.audio.durationSec, generatedReel.script.audio.endAtSec, generatedReel.script.audio.startFromSec, generatedReel.script.audio.volume, getImages]);

    const activeAudioEdit = audioEdit?.sourceKey === audioKey ? audioEdit : null;

    return (
        <section>
            <Player
                ref={playerRef}
                inputProps={{ storyBoard: null, audioUrl: null, generatedReel, audioEdit: activeAudioEdit }}
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
