import React from "react";
import type IDropInputBox from "./IDropInputBox";

const DropInputBox: React.FC<IDropInputBox> = ({ type, setFile }) => {
    const changeHandler = (event  : any) => {
        setFile(event.target.files);
    }
    return (
        <section className="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-md shadow-black/30">
            <h2 className="mb-1 text-sm font-semibold text-zinc-100">
                {type === "music" ? "Upload your music file" : "Upload your photos or videos"}
            </h2>
            <p className="mb-4 text-xs text-zinc-400">Choose a file to add it to your memories.</p>
            <input multiple type="file" onChange={changeHandler} aria-label={type === "music" ? "Choose a music file" : "Choose a photo or video"}
                className="w-full cursor-pointer rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-950/60 p-3 text-xs text-zinc-400 transition hover:border-[#212529] hover:bg-[#212529]/10 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-[#212529] file:px-3 file:py-2 file:text-xs file:font-semibold file:text-white file:transition hover:file:bg-[#212529] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#212529]"
            />
            {type === "photos" && (
                <p className="mt-2 text-xs text-zinc-400">You can upload at max 30 photos & 5 videos</p>
            )}
        </section>
    );
};

export default DropInputBox;