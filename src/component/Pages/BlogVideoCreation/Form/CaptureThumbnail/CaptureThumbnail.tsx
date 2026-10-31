import React, { useEffect, useRef, useState } from "react";
import { useGetBlogVideoCreationContext } from "../../BlogVideoCreation";
import type ICaptureThumbnail from "./ICaptureThumbnail";
import type { IThumbnailBlogVideo } from "../../BlogVideoCreation";
import ThumbnailForm from "./ThumbnailForm/ThumbnailForm";

interface IDraft {
    id: number;
    data: IThumbnailBlogVideo;
    saved: boolean;
}

const CaptureThumbnail: React.FC<ICaptureThumbnail> = () => {
    const { blogPlaces, setThumbnails } = useGetBlogVideoCreationContext();
    const nextId = useRef(1);
    const newDraft = (): IDraft => ({ id: nextId.current++, data: { text: "", description: "" }, saved: false });
    const [drafts, setDrafts] = useState<IDraft[]>(() => [newDraft()]);

    // Only saved, non-empty records are shared with the rest of the page.
    useEffect(() => {
        setThumbnails(drafts.filter((d) => d.saved && d.data.text.trim() !== "").map((d) => d.data));
    }, [drafts, setThumbnails]);

    const updateDraft = (id: number, data: IThumbnailBlogVideo) => {
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
                Share your thumbnail with us so we can create content tailored to your needs.
            </p>
            <section className="m-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {drafts.map((draft) => (
                    <ThumbnailForm
                        key={`thumbnail-${draft.id}`}
                        place={blogPlaces}
                        thumbnail={draft.data}
                        saved={draft.saved}
                        onChange={(updated) => updateDraft(draft.id, updated)}
                        onSave={() => saveDraft(draft.id)}
                        onRemove={drafts.length > 1 ? () => removeDraft(draft.id) : undefined}
                    />
                ))}
            </section>
        </section>
    );
};

export default CaptureThumbnail;
