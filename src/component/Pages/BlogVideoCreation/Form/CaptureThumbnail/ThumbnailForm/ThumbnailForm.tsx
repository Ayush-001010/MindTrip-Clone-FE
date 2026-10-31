import React from "react";
import type IThumbnailForm from "./IThumbnailForm";
import { Select } from "antd";

const fieldLabel = "text-[10px] font-semibold uppercase tracking-wider text-zinc-400";
const input = "w-full rounded-md border border-zinc-700 bg-zinc-800/60 px-2.5 py-1.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400/50";

const ThumbnailForm: React.FC<IThumbnailForm> = ({ place, thumbnail, onChange, onRemove, saved, onSave }) => {
    const canSave = thumbnail.text.trim() !== "" && thumbnail.description !== "";

    const handleChange = (updated: typeof thumbnail) => onChange(updated);

    return (
        <section className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 shadow-md shadow-black/30 transition hover:border-zinc-700">
            <section className="flex items-center justify-between">
                <h1 className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
                    <span className="h-2 w-2 rounded-full bg-violet-400" />
                    Thumbnail
                </h1>
                {onRemove && (
                    <button
                        type="button"
                        aria-label="Remove thumbnail"
                        onClick={onRemove}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-sm text-zinc-400 transition hover:bg-zinc-700 hover:text-white"
                    >
                        ✕
                    </button>
                )}
            </section>
            <section className="flex flex-col gap-1">
                <p className={fieldLabel}>Thumbnail text</p>
                <input
                    type="text"
                    className={input}
                    value={thumbnail.text}
                    placeholder="Thumbnail Text"
                    onChange={(e) => handleChange({ ...thumbnail, text: e.target.value })}
                />
            </section>
            <section className="flex flex-col gap-1">
                <p className={fieldLabel}>Where do you want to place this thumbnail?</p>
                <Select
                    size="small"
                    className="w-full"
                    placeholder="Select place"
                    value={thumbnail.description || undefined}
                    onChange={(value) => handleChange({ ...thumbnail, description: value })}
                    options={[
                        { label: "Starting", value: "Starting" },
                        { label: "Ending", value: "Ending" },
                        ...place.map((p) => ({ label: `After ${p}`, value: `After ${p}` })),
                    ]}
                />
            </section>
            <button
                type="button"
                disabled={!canSave}
                onClick={onSave}
                className={`mt-1 rounded-lg px-4 py-1.5 text-sm font-semibold transition active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500 ${saved ? "bg-zinc-800 text-violet-300" : "bg-violet-500 text-white hover:bg-violet-400"}`}
            >
                {saved ? "Saved ✓" : "Save"}
            </button>
        </section>
    );
};

export default ThumbnailForm;