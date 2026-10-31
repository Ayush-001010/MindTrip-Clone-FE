import type { IPhotoOrVideoBlogVideo } from "../../../BlogVideoCreation";

export default interface IUploadVisualForm {
    item : IPhotoOrVideoBlogVideo;
    blogPlaces : string[];
    onChange : (item: IPhotoOrVideoBlogVideo) => void;
    onRemove : () => void;
    saved : boolean;
    onSave : () => void;
}
