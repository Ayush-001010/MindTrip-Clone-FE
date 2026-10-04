import React, { useState } from "react";
import type IActivityImage from "./IActivityImage";
import { useGetBlogContext } from "../../../../Pages/Blog/Blog";
import UploadImage from "./UploadImage/UploadImage";
import ShowImages from "./ShowImages/ShowImages";
import { useGetActivityCardData } from "../ActivityCard";

const ActivityImage: React.FC<IActivityImage> = () => {
    const { mode } = useGetBlogContext();
    const [, setImageFiles] = useState<File[]>([]);
    const { blogActivity } = useGetActivityCardData();
    // blogActivity.images mixes already-uploaded URL strings with pending (not yet uploaded) File objects
    const images = (blogActivity?.images ?? []) as unknown[];
    const savedImageURLs = images.filter((img): img is string => typeof img === "string");
    const pendingImageFiles = images.filter((img): img is File => img instanceof File);
    const hasImages = savedImageURLs.length > 0 || pendingImageFiles.length > 0;

    return (
        <section className="h-40 w-40 shrink-0 overflow-hidden rounded-xl">
            {mode === "create" && (
                <>
                    {!hasImages && (
                        <UploadImage setImageFiles={setImageFiles} />
                    )}
                    {hasImages && (
                        <ShowImages imagesURL={savedImageURLs} imageFiles={pendingImageFiles} />
                    )}
                </>
            )}
            {mode === "preview" && hasImages && (
                <ShowImages imagesURL={savedImageURLs} imageFiles={pendingImageFiles} />
            )}
        </section>
    );
};

export default ActivityImage;