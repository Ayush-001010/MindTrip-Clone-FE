import { useEffect, useState } from "react";
import type { IGenerateVideoResponse } from "./IStoryboard";
import type { IPhotoOrVideoBlogVideo } from "../BlogVideoCreation";

// The API returns media[] without URLs. Files were uploaded per type (photos, then videos) in
// order, so the nth media entry of a type maps to the nth uploaded file of that type.
const buildMediaFiles = (result: IGenerateVideoResponse, photosOrVideos: IPhotoOrVideoBlogVideo[]): Record<string, File> => {
    const files = {
        image: photosOrVideos.filter((item) => item.file?.type.startsWith("image/")).map((item) => item.file as File),
        video: photosOrVideos.filter((item) => item.file?.type.startsWith("video/")).map((item) => item.file as File),
    };
    const counters = { image: 0, video: 0 };
    const map: Record<string, File> = {};
    result.media.forEach((media) => {
        const file = files[media.type][counters[media.type]++];
        if (file) map[media.media_id] = file;
    });
    return map;
};

export interface IReelMedia {
    mediaUrls: Record<string, string>;
    mediaFiles: Record<string, File>;
}

const useReelMedia = (result: IGenerateVideoResponse, photosOrVideos: IPhotoOrVideoBlogVideo[]): IReelMedia => {
    const [media, setMedia] = useState<IReelMedia>({ mediaUrls: {}, mediaFiles: {} });

    // URLs are created and revoked in the same effect so StrictMode's extra cleanup can't leave dead URLs.
    useEffect(() => {
        const files = buildMediaFiles(result, photosOrVideos);
        const urls = Object.fromEntries(Object.entries(files).map(([id, file]) => [id, URL.createObjectURL(file)]));
        setMedia({ mediaUrls: urls, mediaFiles: files });
        return () => Object.values(urls).forEach((url) => URL.revokeObjectURL(url));
    }, [result, photosOrVideos]);

    return media;
};

export default useReelMedia;
