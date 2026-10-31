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

const emptyData = (): IPhotoOrVideoBlogVideo => ({ file: null, duration: "", description: "", where: "" });

const CaptureVisuals: React.FC<ICaptureVisuals> = () => {
    const { blogPlaces, setPhotosOrVideos } = useGetBlogVideoCreationContext();
    const nextId = useRef(1);
    const newDraft = (): IDraft => ({ id: nextId.current++, data: emptyData(), saved: false });
    const [drafts, setDrafts] = useState<IDraft[]>(() => [newDraft()]);

    // Only saved records with a file are shared with the rest of the page.
    useEffect(() => {
        setPhotosOrVideos(drafts.filter((d) => d.saved && d.data.file !== null).map((d) => d.data));
    }, [drafts, setPhotosOrVideos]);

    const updateDraft = (id: number, data: IPhotoOrVideoBlogVideo) => {
        setDrafts((prev) => prev.map((d) => (d.id === id ? { ...d, data, saved: false } : d)));
    };

    const saveDraft = (id: number) => {
        setDrafts((prev) => {
            const next = prev.map((d) => (d.id === id ? { ...d, saved: true } : d));
            return next[next.length - 1].saved ? [...next, newDraft()] : next;
        });
    };

    const removeDraft = (id: number) => {
        setDrafts((prev) => {
            const next = prev.filter((d) => d.id !== id);
            return next.length === 0 || next[next.length - 1].saved ? [...next, newDraft()] : next;
        });
    };

    return (
        <section className="mx-4 mt-6">
            <p className="border-l-2 border-violet-500 pl-3 text-sm text-zinc-400">
                Share your photos and videos with us so we can create content tailored to your needs.
            </p>
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
