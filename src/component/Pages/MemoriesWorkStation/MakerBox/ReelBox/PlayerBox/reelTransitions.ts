import type { IMemoriesReelScene } from "../../../../../../Interface/DataInterface/IMemoriesData";

export const getTransitionFrames = (
    scene: IMemoriesReelScene,
    previousScene: IMemoriesReelScene | undefined,
    fps: number,
): number => {
    if (!previousScene) return 0;

    const availableVideoFrames = scene.type === "video"
        ? Math.floor(Math.max(0, Math.round((scene.trimStartSec ?? 0) * fps)) / (scene.playbackRate ?? 1))
        : Infinity;

    return Math.min(
        Math.round(fps * 0.45),
        Math.floor(previousScene.durationInFrames / 2),
        Math.floor(scene.durationInFrames / 2),
        availableVideoFrames,
    );
};

export const getVideoTrimBefore = (scene: IMemoriesReelScene, transitionFrames: number, fps: number): number =>
    Math.max(0, Math.round((scene.trimStartSec ?? 0) * fps - transitionFrames * (scene.playbackRate ?? 1)));
