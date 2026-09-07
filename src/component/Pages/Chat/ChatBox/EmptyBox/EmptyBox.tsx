import React, { useEffect, useState } from "react";
import type IEmptyBox from "./IEmptyBox";
import useCommonActivities from "../../../../../customHooks/useCommonActivities";

const EmptyBox: React.FC<IEmptyBox> = () => {
    const { getEmptyChatBoxImage } = useCommonActivities();
    const [imageURL, setImageURL] = useState<string | null>(null);

    const fetchImage = async () => {
        const url = await getEmptyChatBoxImage();
        setImageURL(url);
    };
    useEffect(() => {
        fetchImage();
    }, []);
    return (
        <div className="flex flex-col h-full w-full items-center justify-center">
            {imageURL ? (
                <img src={imageURL} alt="Empty Chat Box" className="max-h-60 max-w-60 object-contain" />
            ) : (
                <p className="text-gray-500">Loading image...</p>
            )}
            <p className="text-center m-4 font-bold text-[#adb5bd]">
                Start a conversation by typing a message below or select a location from the journey panel to explore activities and destinations.
            </p>
        </div>
    );
}

export default EmptyBox;