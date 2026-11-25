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

    static welcomeReelTextContent : {
        content: string;
        imageUrl: string;
    }[] = [
        {
            content:"I hope you have an amazing trip! Make beautiful memories, have lots of fun, and take a break from the everyday hustle. Enjoy every moment and make it unforgettable! ❤️",
            imageUrl:""
        },
        {
            content:"Now comes the hardest part — turning all those amazing moments into a beautiful reel! But don't worry, I've got you covered. Just upload your videos, photos, and favourite songs, and I'll analyse everything and turn your trip memories into an amazing reel! ❤️",
            imageUrl:""
        }
    ]
}