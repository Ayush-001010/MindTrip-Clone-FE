import type { IMemoriesGeneratedReel } from "../../../../Interface/DataInterface/IMemoriesData";

export default interface IReelByScript {
    storyBoard: IMemoriesGeneratedReel | IMemoriesGeneratedReel["script"];
}