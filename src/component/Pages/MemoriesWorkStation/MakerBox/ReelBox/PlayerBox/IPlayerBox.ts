import type { IStoryBoard } from "../ReelBox";

export default interface IPlayerBox {
    storyBoard: IStoryBoard | null;
    audioUrl: string | null;
}