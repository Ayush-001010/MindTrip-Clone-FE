import type { IStoryBoard } from "../ReelBox";
import type { IMemoriesGeneratedReel, IMemoriesReelAudioEdit } from "../../../../../../Interface/DataInterface/IMemoriesData";

interface IPlayerBox {
    storyBoard: IStoryBoard | null;
    audioUrl: string | null;
    generatedReel: IMemoriesGeneratedReel | null;
    audioEdit?: IMemoriesReelAudioEdit | null;
    forExport?: boolean;
}

export type { IPlayerBox as default };