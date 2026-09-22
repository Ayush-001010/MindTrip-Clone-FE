import React, { useState } from "react";
import type IActivityImage from "./IActivityImage";
import { useGetBlogContext } from "../../../../Pages/Blogs/Blog/Blog";
import UploadImage from "./UploadImage/UploadImage";
import ShowImages from "./ShowImages/ShowImages";

const ActivityImage : React.FC<IActivityImage> = () => {
    const {mode} = useGetBlogContext();
    const [imageFiles, setImageFiles] = useState<File[]>([]);

    return (
        <section>
            { mode === "create" && (
                <section className="h-40 w-40 shrink-0 overflow-hidden rounded-xl">
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

export default ActivityImage;