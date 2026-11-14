import React, { useEffect, useRef, useState } from "react";
import type IAudioBox from "./IAudioBox";
import { IoMusicalNotesOutline } from "react-icons/io5";

const AudioBox: React.FC<IAudioBox> = ({ files, open }) => {
    const [previews, setPreviews] = useState<{ file: File; url: string }[]>([]);
    const [failedUrls, setFailedUrls] = useState<string[]>([]);
    const containerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const nextPreviews = files.map((file) => ({ file, url: URL.createObjectURL(file) }));
        setPreviews(nextPreviews);
        setFailedUrls([]);
        return () => nextPreviews.forEach(({ url }) => URL.revokeObjectURL(url));
    }, [files]);

    useEffect(() => {
        const container = containerRef.current;
        const pausePlayers = () => container?.querySelectorAll("audio").forEach((audio) => audio.pause());
        if (!open) pausePlayers();
        return pausePlayers;
    }, [open]);

    return (
        <section ref={containerRef} aria-label="Selected music" className="space-y-3">
            {files.length === 0 && (
                <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-zinc-800 bg-black/20 px-4 py-10 text-center">
                    <span className="flex size-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-lg text-zinc-500">
                        <IoMusicalNotesOutline aria-hidden="true" />
                    </span>
                    <p className="text-xs font-medium text-zinc-300">No music added yet.</p>
                    <p className="text-[11px] text-zinc-400">Choose music above to listen to it here.</p>
                </div>
            )}
            {previews.map(({ file, url }) => (
                <article key={url} className="min-w-0 space-y-3 rounded-xl border border-zinc-800 bg-zinc-900/60 p-3 shadow-sm shadow-black/20 transition hover:border-zinc-600">
                    <div className="flex min-w-0 items-center gap-2.5">
                        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-zinc-800 bg-black/50 text-base text-zinc-400">
                            <IoMusicalNotesOutline aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-zinc-200" title={file.name}>{file.name}</p>
                            <p className="mt-1 text-[10px] text-zinc-400">Music preview</p>
                        </div>
                    </div>
                    <audio
                        src={url}
                        aria-label={`Preview ${file.name}`}
                        controls
                        preload="metadata"
                        onError={() => setFailedUrls((failed) => failed.includes(url) ? failed : [...failed, url])}
                        className="block h-10 w-full rounded-lg scheme-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                    />
                    {failedUrls.includes(url) && (
                        <p role="alert" className="text-xs leading-relaxed text-zinc-300">Unable to play this file. Try a supported audio format.</p>
                    )}
                </article>
            ))}
        </section>
    );
};

export default AudioBox;