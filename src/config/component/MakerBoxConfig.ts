import type { IStoryBoardScene } from "../../component/Pages/MemoriesWorkStation/MakerBox/ReelBox/ReelBox";

export default class MakerBoxConfig {
    static defaultReelConfig : IStoryBoardScene[] = [
        {
            duration: 2,
            type: "1"
        },
        {
            duration: 2,
            type: "2"
        },
        {
            duration: 2,
            type: "3"
        },
        {
            duration: 2,
            type: "play"
        },
        {
            duration: 10,
            type: "message-to-server"
        }
    ];
}