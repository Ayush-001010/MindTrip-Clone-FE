import React, { useEffect, useId, useState } from "react";
import type IVisualBox from "./IVisualBox";
import { Checkbox, ConfigProvider, Image } from "antd";
import { IoChevronDownOutline, IoExpandOutline, IoImageOutline, IoLocationOutline, IoPricetagOutline, IoVideocamOutline } from "react-icons/io5";
import { useGetMemoriesWorkStationContext } from "../../MemoriesWorkStation";

const tagControlsTheme = {
    components: {
        Checkbox: {
            colorPrimary: "#52525b",
            colorPrimaryHover: "#71717a",
            colorBorder: "#52525b",
        },
    },
};

const VisualBox: React.FC<IVisualBox> = ({ files , setFiles }) => {
    const [previews, setPreviews] = useState<{ file: File; url: string, tag: string }[]>([]);
    const [activeImage, setActiveImage] = useState<string | null>(null);
    const imagePreviews = previews.filter(({ file }) => !file.type.startsWith("video/"));
    const activeImageIndex = imagePreviews.findIndex(({ url }) => url === activeImage);
    const [isSelectedTagOpen, setIsSelectedTagOpen] = useState(false);
    const { memoriesData, setNotifyConfig } = useGetMemoriesWorkStationContext();
    const [tagPlace, setTagPlace] = useState<string | null>(null);
    const tagOptionsId = useId();

    const changeHandler = (value : boolean , index: number) => {
        if (!tagPlace || tagPlace === "") {
            setNotifyConfig({
                pos: "top-left",
                message: "Please select a tag",
                type: "alert",
                open: true
            });
        }
        setFiles((prevFiles) => {
            const newFiles = [...prevFiles];
            if (value) {
                newFiles[index].tag = tagPlace || "";
            } else {
                newFiles[index].tag = "";
            }
            return newFiles;
        });
    }


    useEffect(() => {
        const nextPreviews = files.flatMap(({ file, tag }) => file.map((f) => ({ file: f, url: URL.createObjectURL(f), tag })));
        setPreviews(nextPreviews);
        return () => nextPreviews.forEach(({ url }) => URL.revokeObjectURL(url));
    }, [files]);

    if (!memoriesData) return null;

    return (
        <ConfigProvider theme={tagControlsTheme}>
            <section className="space-y-4">
                {files.length !== 0 && (
                    <section className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 shadow-md shadow-black/20">
                        <div className="flex items-center justify-between gap-3">
                            <div className="min-w-0">
                                <h3 className="text-xs font-semibold text-zinc-100">Place tags</h3>
                                <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">Choose a place, then tick the files to tag.</p>
                            </div>
                            <button
                                type="button"
                                aria-expanded={isSelectedTagOpen}
                                aria-controls={tagOptionsId}
                                onClick={() => setIsSelectedTagOpen(!isSelectedTagOpen)}
                                className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg border border-zinc-700 bg-black/50 px-2.5 py-2 text-xs font-medium text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-95"
                            >
                                <IoPricetagOutline aria-hidden="true" />
                                Tags
                                <IoChevronDownOutline aria-hidden="true" className={`transition-transform motion-reduce:transition-none ${isSelectedTagOpen ? "rotate-180" : ""}`} />
                            </button>
                        </div>
                        <div id={tagOptionsId} hidden={!isSelectedTagOpen}>
                            <div className="mt-3 flex max-h-32 flex-wrap gap-1.5 overflow-y-auto border-t border-zinc-800 pt-3">
                                {memoriesData.place.split(",").map((place, index) => (
                                    <button
                                        type="button"
                                        onClick={() => setTagPlace(place)}
                                        key={index}
                                        aria-pressed={tagPlace === place}
                                        title={place.trim()}
                                        className={`inline-flex max-w-full cursor-pointer items-center gap-1 rounded-md border px-2 py-1.5 text-[10px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-95 ${
                                            tagPlace === place
                                                ? "border-zinc-500 bg-zinc-800 text-white"
                                                : "border-zinc-800 bg-black/40 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-800/60 hover:text-zinc-200"
                                        }`}
                                    >
                                        <IoLocationOutline aria-hidden="true" className="shrink-0" />
                                        <span className="truncate">{place.trim()}</span>
                                    </button>
                                ))}
                            </div>
                            {tagPlace && (
                                <p className="mt-2 truncate text-[10px] text-zinc-400" title={tagPlace}>
                                    Applying: <span className="font-medium text-zinc-200">{tagPlace.trim()}</span>
                                </p>
                            )}
                        </div>
                    </section>
                )}
                <section aria-label="Selected photos and videos" className="grid grid-cols-2 gap-3">
                    {files.length === 0 && (
                        <div className="col-span-2 flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-800 bg-black/20 px-4 py-10 text-center">
                            <span className="flex size-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-lg text-zinc-500">
                                <IoImageOutline aria-hidden="true" />
                            </span>
                            <p className="text-xs font-medium text-zinc-300">No visual files added yet.</p>
                            <p className="text-[11px] text-zinc-400">Choose photos or videos above to preview them here.</p>
                        </div>
                    )}
                    {previews.map(({ file, url, tag }, index) => (
                        <section key={url} className="min-w-0 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/60 p-2 shadow-sm shadow-black/20 transition hover:border-zinc-600">
                            <div className="mb-2 flex min-h-5 items-center justify-between gap-2 px-0.5">
                                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                                    {file.type.startsWith("video/") ? <IoVideocamOutline aria-hidden="true" /> : <IoImageOutline aria-hidden="true" />}
                                    {file.type.startsWith("video/") ? "Video" : "Photo"}
                                </span>
                                {isSelectedTagOpen && (
                                    <Checkbox
                                        aria-label={`Apply selected place tag to ${file.name}`}
                                        checked={Boolean(tagPlace) && tag === tagPlace}
                                        onChange={(event) => changeHandler(event.target.checked, index)}
                                    />
                                )}
                            </div>
                            <figure>
                                {file.type.startsWith("video/") ? (
                                    <video src={url} aria-label={file.name} controls playsInline preload="metadata" className="aspect-square w-full rounded-lg bg-black object-contain" />
                                ) : (
                                    <button
                                        type="button"
                                        aria-label={`View ${file.name} full size`}
                                        onClick={() => setActiveImage(url)}
                                        className="group relative block aspect-square w-full cursor-zoom-in overflow-hidden rounded-lg bg-black transition hover:bg-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 active:scale-95"
                                    >
                                        <img src={url} alt={file.name} className="h-full w-full object-contain" />
                                        <span className="absolute right-1.5 bottom-1.5 inline-flex items-center gap-1 rounded-md border border-white/10 bg-black/80 px-1.5 py-1 text-[10px] font-medium text-zinc-200 transition group-hover:border-white/20 group-hover:text-white">
                                            <IoExpandOutline aria-hidden="true" />
                                            View
                                        </span>
                                    </button>
                                )}
                                <figcaption className="truncate px-0.5 pt-2 text-[11px] font-medium text-zinc-300" title={file.name}>{file.name}</figcaption>
                            </figure>
                            <div className="mt-2 flex items-center gap-1 border-t border-zinc-800 px-0.5 pt-2 pb-0.5 text-[10px] text-zinc-400">
                                <IoLocationOutline aria-hidden="true" className="shrink-0" />
                                <span className={`truncate ${tag ? "text-zinc-300" : ""}`} title={tag || "No tag"}>
                                    {tag ? tag.split(",")[0].trim() : "No tag"}
                                </span>
                            </div>
                        </section>
                    ))}
                    <Image.PreviewGroup
                        items={imagePreviews.map(({ file, url }) => ({ src: url, alt: file.name }))}
                        preview={{
                            open: activeImageIndex >= 0,
                            current: Math.max(0, activeImageIndex),
                            onOpenChange: (open) => {
                                if (!open) setActiveImage(null);
                            },
                            onChange: (index) => setActiveImage(imagePreviews[index].url),
                        }}
                    />
                </section>
            </section>
        </ConfigProvider>
    );
};

export default VisualBox;