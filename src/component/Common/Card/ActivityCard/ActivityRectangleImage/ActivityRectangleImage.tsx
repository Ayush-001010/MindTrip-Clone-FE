import React, { useState } from "react";
import type IActivityRectangleImage from "./IActivityRectangleImage";
import { useGetBlogContext } from "../../../../Pages/Blogs/Blog/Blog";
import UploadImage from "../ActivityImage/UploadImage/UploadImage";
import ShowImages from "../ActivityImage/ShowImages/ShowImages";

const ActivityRectangleImage: React.FC<IActivityRectangleImage> = () => {
    const { mode } = useGetBlogContext();
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    return (
        <section>
            {mode === "create" && (
                <section className="h-48 w-full min-w-0 overflow-hidden rounded-xl">
                    {imageFiles.length === 0 && (
                        <UploadImage setImageFiles={setImageFiles} />
                    )}
                    {imageFiles.length > 0 && (
                        <ShowImages imagesURL={[]} imageFiles={imageFiles} />
                    )}
                </section>
            )}
        </section>
    );
};

export default ActivityRectangleImage;