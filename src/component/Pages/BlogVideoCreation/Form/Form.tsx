import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useBlogAction from "../../../../customHooks/useBlogAction";
import type IForm from "./IForm";
import { ConfigProvider, theme } from "antd";
import { useGetBlogVideoCreationContext } from "../BlogVideoCreation";
import CaptureVisuals from "./CaptureVisuals/CaptureVisuals";
import CaptureThumbnail from "./CaptureThumbnail/CaptureThumbnail";
import GeneratedResult from "../Reel/GeneratedResult";
import type { IGenerateVideoResponse } from "../Reel/IStoryboard";
import type { IPhotoOrVideoBlogVideo } from "../BlogVideoCreation";

const antdDarkTheme = {
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: "#8b5cf6",
        colorBgContainer: "#27272a",
        colorBgElevated: "#27272a",
        colorBorder: "#3f3f46",
        colorTextPlaceholder: "#71717a",
        borderRadius: 6,
    },
};

const Form: React.FC<IForm> = () => {
    const { photosOrVideos, thumbnails, setGenerated } = useGetBlogVideoCreationContext();
    const { blogId } = useParams();
    const { genrateVideo } = useBlogAction();
    const [isGenerating, setIsGenerating] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    // Keep the exact files used for this result so later edits don't break the preview.
    const [reel, setReel] = useState<{ id: number; result: IGenerateVideoResponse; files: IPhotoOrVideoBlogVideo[] } | null>(null);
    const hasContent = photosOrVideos.length > 0 || thumbnails.length > 0;

    const handleGenerateVideo = async () => {
        if (!blogId || isGenerating) return;
        const payload = { blogId, photosOrVideos, thumbnails };
        setIsGenerating(true);
        setErrorMessage("");
        setGenerated(false);
        try {
            const response = await genrateVideo(payload);
            if (response.success && response.storyboard && response.media) {
                setReel((prev) => ({ id: (prev?.id ?? 0) + 1, result: response as IGenerateVideoResponse, files: photosOrVideos }));
                setGenerated(true);
            } else {
                setErrorMessage(response.error || "Could not generate the video. Please try again.");
            }
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <ConfigProvider theme={antdDarkTheme}>
            <section>
                <CaptureVisuals />
                <CaptureThumbnail />
                <section className="mx-4 mb-6 flex justify-center border-t border-zinc-800 pt-6">
                    <button
                        type="button"
                        disabled={!hasContent || isGenerating}
                        onClick={handleGenerateVideo}
                        className="rounded-lg bg-violet-500 px-8 py-3 text-base font-semibold text-white transition hover:bg-violet-400 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500 disabled:active:scale-100"
                    >
                        {isGenerating ? "Generating..." : "Generate Video"}
                    </button>
                </section>
                {errorMessage && <p className="mx-4 mb-4 text-center text-sm text-red-400">{errorMessage}</p>}
                {reel && <GeneratedResult key={reel.id} result={reel.result} photosOrVideos={reel.files} />}
            </section>
        </ConfigProvider>
    );
};

export default Form;
