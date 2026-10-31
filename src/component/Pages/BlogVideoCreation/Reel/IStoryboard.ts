export interface IStoryboardScene {
    media_id: string;
    type: "image" | "video";
    duration?: number;
    trimStart?: number;
    trimEnd?: number;
    keepAudio?: boolean;
    caption?: string;
    motion?: string;
    transition?: string;
    reason?: string;
}

export interface IStoryboard {
    title: string;
    music_mood?: string;
    total_duration: number;
    scenes: IStoryboardScene[];
}

export interface IGeneratedMedia {
    media_id: string;
    type: "image" | "video";
    mimeType: string;
    note: { duration: string; description: string; where: string };
}

export interface IInstaStorySuggestion {
    media_id: string;
    caption: string;
    hashtags: string[];
    location_tag?: string;
    sticker?: { type: string; text: string };
    music_mood?: string;
}

export interface IInstaStory {
    overall_theme: string;
    story_order: string[];
    suggestions: IInstaStorySuggestion[];
}

export interface IGenerateVideoResponse {
    success: boolean;
    blogId: number;
    tripTitle: string;
    thumbnails: { text: string; description: string }[];
    media: IGeneratedMedia[];
    storyboard: IStoryboard;
    instaStory: IInstaStory | null;
}
