import type { IStoryBoard } from "../ReelBox";
import type { IMemoriesGeneratedReel } from "../../../../../../Interface/DataInterface/IMemoriesData";

type IPlayerBox = {
    storyBoard: IStoryBoard | null;
    audioUrl: string | null;
    generatedReel: IMemoriesGeneratedReel | null;
    forExport?: boolean;
};

export default IPlayerBox;