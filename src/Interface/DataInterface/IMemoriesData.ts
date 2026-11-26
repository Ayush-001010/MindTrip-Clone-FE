export default interface IMemoriesData {
    id: number;
    name: string;
    createdBy: number;
    totalCreditLeft : number;
    numberOfPeopleWorkingCurrently : number;
    progress: number;
    uiType: "type1" | "type2";
    userDetails: { userId: number; userName: string }[];
    place: string;
    workId : string;
    isTripPhotoAndVideoUpload?: boolean;
    isTripAudioUpload?: boolean;
    rooms:{name : string , id : number , script?: IMemoriesGeneratedReel["script"] | null }[];
    isAllAnalysisCompleted?: boolean;
}

export interface IMemoriesReelAnalysisBatch {
    tagName: string;
    status: "pending" | "completed" | "failed";
}

export interface IMemoriesChat {
    id: number;
    roomId: number | null;
    memoryId: number | null;
    userMessage: string;
    botMessage: string | null;
    userName: string | null;
    actionType: "Start" | "Other" | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface IMemoryMusicData {
    id: number;
    type: "audio";
    url: string;
}

export interface IMemoriesReelAudioTrack {
    src: string;
    startFromSec?: number;
    endAtSec?: number;
    volume?: number;
    durationSec?: number;
}

export interface IMemoriesReelAudioEdit {
    sourceKey: string;
    playbackUrl: string;
    startFromSec: number;
    endAtSec: number;
    volume: number;
    durationSec: number;
}

export interface IMemoriesReelScene {
    index: number;
    clipId: string;
    type: "photo" | "video";
    mediaId: number;
    place?: string;
    src: string;
    startSec?: number;
    endSec?: number;
    fromFrame?: number;
    durationInFrames: number;
    focalPoint?: { x: number; y: number };
    motion?: string;
    caption?: string;
    reason?: string;
    trimStartSec?: number;
    trimEndSec?: number;
    playbackRate?: number;
}

export interface IMemoriesGeneratedReel {
    script: {
        version: number;
        title: string;
        template: string;
        mood: string;
        pace: string;
        fps: number;
        width: number;
        height: number;
        durationSec: number;
        durationInFrames: number;
        audio: IMemoriesReelAudioTrack & {
            bpm?: number;
            originalAudio?: IMemoriesReelAudioTrack;
        };
        scenes: IMemoriesReelScene[];
        pickedBy?: string | string[];
        warnings?: string[];
    };
    music?: Record<string, unknown>;
}