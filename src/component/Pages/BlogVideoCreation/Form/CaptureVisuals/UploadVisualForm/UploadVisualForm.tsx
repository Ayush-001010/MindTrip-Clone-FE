import React, { useEffect, useState } from "react";
import type IUploadVisualForm from "./IUploadVisualForm";
import { Select, TimePicker } from "antd";
import dayjs from "dayjs";

const TIME_FORMAT = "HH:mm:ss";
const fieldLabel = "text-[10px] font-semibold uppercase tracking-wider text-zinc-400";
const input = "w-full rounded-md border border-zinc-700 bg-zinc-800/60 px-2.5 py-1.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400/50";

const UploadVisualForm: React.FC<IUploadVisualForm> = ({ item, blogPlaces, onChange, onRemove, saved, onSave }) => {
    const [previewUrl, setPreviewUrl] = useState("");
    const { file } = item;

    useEffect(() => {
        if (!file) {
            setPreviewUrl("");
            return;
        }
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
    }, [file]);

    const handleChange = (updated: typeof item) => onChange(updated);

    const canSave = item.duration !== "" && item.where !== "";

    const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files?.[0];
        if (selected) onChange({ ...item, file: selected });
        event.target.value = "";
    };

    const isVideo = file?.type.startsWith("video/");

    return (
        <section className="flex flex-col gap-3 rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 shadow-md shadow-black/30 transition hover:border-zinc-700">
            {file === null ? (
                <label className="group flex h-64 w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-zinc-700 bg-zinc-800/40 text-center transition hover:border-violet-400 hover:bg-violet-500/10">
                    <svg className="h-6 w-6 text-zinc-500 transition group-hover:text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16V4m0 0L8 8m4-4 4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" />
                    </svg>
                    <span className="text-xs font-medium text-zinc-300">Upload photo / video</span>
                    <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFile} />
                </label>
            ) : (
                <>
                    <section className="relative overflow-hidden rounded-lg bg-black">
                        {previewUrl && (isVideo ? (
                            <video src={previewUrl} controls playsInline preload="metadata" className="h-64 w-full object-contain" />
                        ) : (
                            <img src={previewUrl} alt={file.name} className="h-64 w-full object-cover" />
                        ))}
                        <span className="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase text-violet-300 backdrop-blur">
                            {isVideo ? "Video" : "Photo"}
                        </span>
                        <button
                            type="button"
                            aria-label="Remove"
                            onClick={onRemove}
                            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-sm text-zinc-200 backdrop-blur transition hover:bg-zinc-700 hover:text-white"
                        >
                            ✕
                        </button>
                    </section>
                    <p className="truncate text-xs text-zinc-500" title={file.name}>{file.name}</p>
                    <section className="flex flex-col gap-2">
                        <section className="flex flex-col gap-1">
                            <p className={fieldLabel}>When</p>
                            <TimePicker
                                size="small"
                                className="w-full"
                                format={TIME_FORMAT}
                                value={item.duration ? dayjs(item.duration, TIME_FORMAT) : null}
                                onChange={(_, time) => handleChange({ ...item, duration: typeof time === "string" ? time : "" })}
                            />
                        </section>
                        <section className="flex flex-col gap-1">
                            <p className={fieldLabel}>Where</p>
                            <Select
                                size="small"
                                className="w-full"
                                placeholder="Select place"
                                value={item.where || undefined}
                                onChange={(value) => handleChange({ ...item, where: value })}
                                options={blogPlaces.map((place) => ({ label: place, value: place }))}
                            />
                        </section>
                        <section className="flex flex-col gap-1">
                            <p className={fieldLabel}>Description</p>
                            <input
                                type="text"
                                placeholder="Describe this moment..."
                                className={input}
                                value={item.description}
                                onChange={(e) => handleChange({ ...item, description: e.target.value })}
                            />
                        </section>
                    </section>
                    <button
                        type="button"
                        disabled={!canSave}
                        onClick={onSave}
                        className={`rounded-lg px-4 py-1.5 text-sm font-semibold transition active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500 ${saved ? "bg-zinc-800 text-violet-300" : "bg-violet-500 text-white hover:bg-violet-400"}`}
                    >
                        {saved ? "Saved ✓" : "Save"}
                    </button>
                </>
            )}
        </section>
    );
};

export default UploadVisualForm;
