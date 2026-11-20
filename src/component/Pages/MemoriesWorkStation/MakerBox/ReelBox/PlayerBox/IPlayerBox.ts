import type { IStoryBoard } from "../ReelBox";
import type { IMemoriesGeneratedReel } from "../../../../../../Interface/DataInterface/IMemoriesData";

export default interface IPlayerBox {
    storyBoard: IStoryBoard | null;
    audioUrl: string | null;
    generatedReel: IMemoriesGeneratedReel | null;
}