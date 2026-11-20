import React, { useEffect, useState } from "react";
import type { IMemoryMusicData } from "../../../../../../../Interface/DataInterface/IMemoriesData";
import { IoMusicalNotesOutline } from "react-icons/io5";
import useCommonAction from "../../../../../../../CustomHooks/useCommonAction";
import { useGetMemoriesWorkStationContext } from "../../../../MemoriesWorkStation";

interface IAudioOption extends IMemoryMusicData {
    playbackUrl: string;
}

const AudioSelector: React.FC = () => {
    const { audioFiles, dropBoxHandler, selectedAudioUrl, setSelectedAudioUrl } =useGetMemoriesWorkStationContext();
    const [audioOptions, setAudioOptions] = useState<IAudioOption[]>([]);
    const [selectedAudioId, setSelectedAudioId] = useState("default");
    const [isLoadingAudio, setIsLoadingAudio] = useState(false);
    const [audioLoadError, setAudioLoadError] = useState(false);
    const { getImages } = useCommonAction();

    useEffect(() => {
        let isCurrent = true;

        if (audioFiles.length === 0) {
            setAudioOptions([]);
            setSelectedAudioId("default");
            setSelectedAudioUrl(null);
            setIsLoadingAudio(false);
            setAudioLoadError(false);
            return () => {
                isCurrent = false;
            };
        }

        setIsLoadingAudio(true);
        setAudioLoadError(false);
        setSelectedAudioId("default");
        setSelectedAudioUrl(null);

        Promise.all(
            audioFiles.map(async (file) => {
                const response = await getImages(file.url);
                if (typeof response?.data !== "string" || !response.data) {
                    throw new Error(`Unable to load audio file ${file.id}`);
                }
                return { ...file, playbackUrl: response.data };
            }),
        )
            .then((options) => {
                if (!isCurrent) return;
                setAudioOptions(options);
            })
            .catch((error: unknown) => {
                console.error("Unable to load memory audio:", error);
                if (!isCurrent) return;
                setAudioOptions([]);
                setSelectedAudioId("default");
                setSelectedAudioUrl(null);
                setAudioLoadError(true);
            })
            .finally(() => {
                if (isCurrent) setIsLoadingAudio(false);
            });

        return () => {
            isCurrent = false;
        };
    }, [audioFiles]);

    const handleAudioChange = (audioId: string, isChecked: boolean) => {
        const nextAudioId = isChecked ? audioId : "default";
        const selectedOption = audioOptions.find(
            (option) => String(option.id) === nextAudioId,
        );
        setSelectedAudioId(nextAudioId);
        setSelectedAudioUrl(selectedOption?.playbackUrl ?? null);
    };

    return (
        <section className="shrink-0 space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/60 p-2.5">
            <header className="flex items-start gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-700/70 bg-zinc-800 text-violet-300">
                    <IoMusicalNotesOutline aria-hidden="true" size={16} />
                </span>
                <div className="min-w-0 flex-1 pt-0.5">
                    <h3 className="text-xs font-semibold text-zinc-100">Soundtrack</h3>
                    <p className="mt-1 text-[11px] leading-relaxed text-zinc-400">
                        Choose one track for your reel (required).
                    </p>
                </div>
                {audioOptions.length > 0 && !isLoadingAudio && (
                    <span className="shrink-0 rounded-full border border-zinc-700 bg-zinc-800/80 px-2 py-1 text-[9px] font-medium text-zinc-300">
                        {audioOptions.length} {audioOptions.length === 1 ? "track" : "tracks"}
                    </span>
                )}
            </header>

            {isLoadingAudio ? (
                <p role="status" className="flex items-center gap-2 text-xs text-zinc-400">
                    <span className="size-1.5 animate-pulse rounded-full bg-violet-300" />
                    Loading your music...
                </p>
            ) : audioLoadError ? (
                <p
                    role="alert"
                    className="rounded-md border border-zinc-700 bg-zinc-950/60 px-3 py-2 text-xs text-zinc-300"
                >
                    Couldn't load your music. Reload the page to try again.
                </p>
            ) : (
                <fieldset className="space-y-2">
                    <legend className="sr-only">Choose one soundtrack</legend>

                    {audioOptions.map((option, index) => {
                        const audioId = String(option.id);
                        return (
                            <label
                                key={option.id}
                                className={`flex cursor-pointer items-center gap-2.5 rounded-md border px-3 py-2 text-xs transition focus-within:ring-2 focus-within:ring-violet-400 ${
                                    selectedAudioId === audioId
                                        ? "border-violet-400/70 bg-violet-500/10 text-zinc-100"
                                        : "border-zinc-800 bg-zinc-950/50 text-zinc-300 hover:border-zinc-600"
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedAudioId === audioId}
                                    onChange={(event) =>
                                        handleAudioChange(audioId, event.currentTarget.checked)
                                    }
                                    className="size-3.5 shrink-0 accent-violet-400"
                                />
                                <span className="min-w-0 flex-1 truncate">
                                    Uploaded track {index + 1}
                                </span>
                            </label>
                        );
                    })}

                    {audioOptions.length === 0 && (
                        <div className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-dashed border-zinc-700 bg-zinc-950/40 px-3 py-2">
                            <p className="text-[11px] text-zinc-400">No uploaded music yet.</p>
                            <button
                                type="button"
                                onClick={() => dropBoxHandler("open")}
                                className="rounded px-2 py-1 text-[11px] font-semibold text-violet-300 transition hover:bg-violet-500/10 hover:text-violet-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                            >
                                Add music
                            </button>
                        </div>
                    )}
                </fieldset>
            )}

            {selectedAudioUrl && selectedAudioId !== "default" && (
                <audio
                    key={selectedAudioId}
                    src={selectedAudioUrl}
                    controls
                    preload="metadata"
                    aria-label="Preview selected soundtrack"
                    className="block h-9 w-full rounded-md border border-zinc-800 bg-zinc-950/70 p-1 scheme-dark accent-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                />
            )}
        </section>
    );
};

export default AudioSelector;
