import type { IMemoriesGeneratedReel, IMemoriesReelScene } from "../../../../../../Interface/DataInterface/IMemoriesData";

export const getGeneratedReelDurationInFrames = (reel: IMemoriesGeneratedReel): number => {
    const sceneFrames = reel.script.scenes.reduce((sum, scene) => sum + scene.durationInFrames, 0);
    const duration = Math.max(reel.script.durationInFrames, sceneFrames);
    return Number.isFinite(duration) && duration > 0 ? Math.round(duration) : 1;
};

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
