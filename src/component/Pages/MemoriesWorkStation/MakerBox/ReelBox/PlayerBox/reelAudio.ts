import type { IMemoriesGeneratedReel, IMemoriesReelAudioEdit } from "../../../../../../Interface/DataInterface/IMemoriesData";

export const getOriginalReelAudio = (reel: IMemoriesGeneratedReel) =>
    reel.script.audio.originalAudio ?? {
        src: reel.script.audio.src,
        startFromSec: reel.script.audio.startFromSec,
        endAtSec: reel.script.audio.endAtSec,
        volume: reel.script.audio.volume,
        durationSec: reel.script.audio.durationSec,
    };

export const applyReelAudioEdit = (
    reel: IMemoriesGeneratedReel,
    audioEdit: IMemoriesReelAudioEdit | null,
): IMemoriesGeneratedReel => {
    if (!audioEdit) return reel;

    const originalAudio = getOriginalReelAudio(reel);
    return {
        ...reel,
        script: {
            ...reel.script,
            audio: {
                ...reel.script.audio,
                originalAudio,
                src: audioEdit.sourceKey,
                startFromSec: audioEdit.startFromSec,
                endAtSec: audioEdit.endAtSec,
                volume: audioEdit.volume,
                durationSec: audioEdit.durationSec,
            },
        },
    };
};
