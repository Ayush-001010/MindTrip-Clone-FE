import React, { useEffect, useRef, useState } from "react";
import type ICaptureVisuals from "./ICaptureVisuals";
import { useGetBlogVideoCreationContext } from "../../BlogVideoCreation";
import type { IPhotoOrVideoBlogVideo } from "../../BlogVideoCreation";
import UploadVisualForm from "./UploadVisualForm/UploadVisualForm";

interface IDraft {
    id: number;
    data: IPhotoOrVideoBlogVideo;
    saved: boolean;
}

const CaptureVisuals: React.FC<ICaptureVisuals> = () => {
    const { blogPlaces, setPhotosOrVideos } = useGetBlogVideoCreationContext();
    const nextId = useRef(1);
    const [drafts, setDrafts] = useState<IDraft[]>([]);

    // Only saved records with a file are shared with the rest of the page.
    useEffect(() => {
        setPhotosOrVideos(drafts.filter((d) => d.saved && d.data.file !== null).map((d) => d.data));
    }, [drafts, setPhotosOrVideos]);

    // One draft per selected file, appended after any existing drafts.
    const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files ?? []);
        event.target.value = "";
        if (files.length === 0) return;
        const created: IDraft[] = files.map((file) => ({
            id: nextId.current++,
            data: { file, duration: "", description: "", where: "" },
            saved: false,
        }));
        setDrafts((prev) => [...prev, ...created]);
    };

    const updateDraft = (id: number, data: IPhotoOrVideoBlogVideo) => {
        setDrafts((prev) => prev.map((d) => (d.id === id ? { ...d, data, saved: false } : d)));
    };

    const saveDraft = (id: number) => {
        setDrafts((prev) => prev.map((d) => (d.id === id ? { ...d, saved: true } : d)));
    };

    const removeDraft = (id: number) => {
        setDrafts((prev) => prev.filter((d) => d.id !== id));
    };

    const savedCount = drafts.filter((d) => d.saved).length;

    return (
        <section className="mx-4 mt-6">
            <p className="border-l-2 border-violet-500 pl-3 text-sm text-zinc-400">
                Share your photos and videos with us so we can create content tailored to your needs.
            </p>
            <label className="group m-4 flex cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-800/40 px-4 py-8 text-center transition hover:border-violet-400 hover:bg-violet-500/10">
                <svg className="h-7 w-7 text-zinc-500 transition group-hover:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                </svg>
                <span className="text-sm font-medium text-zinc-300">Upload photos / videos</span>
                <span className="text-xs text-zinc-500">Select as many as you like, then fill in the details for each.</span>
                <input type="file" multiple accept="image/*,video/*" className="hidden" onChange={handleFiles} />
            </label>
            {drafts.length > 0 && (
                <p className="mx-4 text-xs text-zinc-500">{savedCount} of {drafts.length} saved</p>
            )}
            <section className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {drafts.map((draft) => (
                    <UploadVisualForm
                        key={`upload-visual-form-${draft.id}`}
                        item={draft.data}
                        blogPlaces={blogPlaces}
                        saved={draft.saved}
                        onChange={(updated) => updateDraft(draft.id, updated)}
                        onSave={() => saveDraft(draft.id)}
                        onRemove={() => removeDraft(draft.id)}
                    />
                ))}
            </section>
        </section>
    );
};

export default CaptureVisuals;
