import type { IThumbnailBlogVideo } from "../../../BlogVideoCreation";

export default interface IThumbnailForm {
    place: string[];
    thumbnail: IThumbnailBlogVideo;
    onChange: (thumbnail: IThumbnailBlogVideo) => void;
    onRemove?: () => void;
    saved: boolean;
    onSave: () => void;
}
