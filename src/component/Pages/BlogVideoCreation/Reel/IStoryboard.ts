export type MusicMood = "upbeat" | "calm" | "cinematic" | "romantic" | "adventurous";
export type SceneTransition = "fade" | "slide" | "none";
export type ImageMotion = "zoom_in" | "zoom_out" | "pan_left" | "pan_right" | "none";
export type ThumbnailStyle = "bold_center" | "question" | "stat" | "quote" | "versus" | "action";
export type ThumbnailTextPosition = "top" | "center" | "bottom";

interface ISceneBase {
    route_stop?: number;
    transition?: SceneTransition;
}

export interface IImageScene extends ISceneBase {
    type: "image";
    media_id: string;
    duration: number;
    caption?: string;
    motion?: ImageMotion;
    focus?: { x: number; y: number };
}

export interface IVideoScene extends ISceneBase {
    type: "video";
    media_id: string;
    trimStart: number;
    trimEnd: number;
    keepAudio?: boolean;
    caption?: string;
    reason?: string;
}

export interface IThumbnailScene extends ISceneBase {
    type: "thumbnail";
    thumbnail_id: string;
    duration: number;
    style?: ThumbnailStyle;
    background_media_ids?: string[];
    text_position?: ThumbnailTextPosition;
}

export type IStoryboardScene = IImageScene | IVideoScene | IThumbnailScene;

export interface IStoryboard {
    title: string;
    music_mood?: MusicMood;
    total_duration: number;
    scenes: IStoryboardScene[];
}

export interface IGeneratedMedia {
    media_id: string;
    type: "image" | "video";
    mimeType: string;
    note: { duration: string; description: string; where: string };
}

export interface IGeneratedThumbnail {
    text: string;
    description: string;
}

export type StickerType = "poll" | "emoji_slider" | "question";

export interface IInstaStorySuggestion {
    media_id: string;
    caption: string;
    hashtags: string[];
    location_tag?: string;
    sticker?: { type: StickerType; text: string };
    music_mood?: MusicMood;
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
    thumbnails: IGeneratedThumbnail[];
    media: IGeneratedMedia[];
    storyboard: IStoryboard;
    instaStory: IInstaStory | null;
}
