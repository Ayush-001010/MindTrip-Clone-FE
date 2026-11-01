import React, { createContext, useState, useEffect } from "react";
import useBlogAction from "../../../CustomHooks/useBlogAction";
import type IBlogVideoCreation from "./IBlogVideoCreation";
import Header from "./Header/Header";
import { useSelector } from "react-redux";
import Form from "./Form/Form";
import { useParams } from "react-router-dom";

export interface IPhotoOrVideoBlogVideo {
    file: File | null;
    duration: string;
    description: string;
    where : string;
}

export interface IThumbnailBlogVideo {
    text: string;
    description: string;
}


export interface IBlogVideoCreationContext {
    photosOrVideos: IPhotoOrVideoBlogVideo[];
    setPhotosOrVideos: React.Dispatch<React.SetStateAction<IPhotoOrVideoBlogVideo[]>>;
    blogPlaces : string[];
    thumbnails: IThumbnailBlogVideo[];
    setThumbnails: React.Dispatch<React.SetStateAction<IThumbnailBlogVideo[]>>;
    generated: boolean;
    setGenerated: React.Dispatch<React.SetStateAction<boolean>>;
}

const blogVideoCreationContext = createContext<IBlogVideoCreationContext | null>(null);

export const useGetBlogVideoCreationContext = () => {
    const context = React.useContext(blogVideoCreationContext);
    if (!context) {
        throw new Error("useGetBlogVideoCreationContext must be used within a BlogVideoCreationProvider");
    }
    return context;
}


const BlogVideoCreation : React.FC<IBlogVideoCreation> = () => {
    const { userName } = useSelector((state: any) => state.userDetails);
    const [photosOrVideos, setPhotosOrVideos] = useState<IPhotoOrVideoBlogVideo[]>([]);
    const [blogPlaces, setBlogPlaces] = useState<string[]>([]);
    const [thumbnails, setThumbnails] = useState<IThumbnailBlogVideo[]>([]);
    const [generated, setGenerated] = useState(false);
    const { getBlogPlaces } = useBlogAction();
    const {blogId} = useParams();

    // Fetch blog places or perform any other side effects if needed
    const fetchBlogPlaces = async () => {
        const places = await getBlogPlaces(blogId || ""); // Replace with actual blog ID
        setBlogPlaces(Array.from(new Set(places)));
    };

    useEffect(() => {
        if(!blogId) return;

        fetchBlogPlaces();
    }, [blogId]);

    return (
        <blogVideoCreationContext.Provider value={{ photosOrVideos, setPhotosOrVideos, blogPlaces, thumbnails, setThumbnails, generated, setGenerated }}>
            <main>
                <Header name={userName || ""}/>
                <Form />
            </main>
        </blogVideoCreationContext.Provider>
    );
};

export default BlogVideoCreation;