import React, { useEffect, useRef, useState } from "react";
import { IoMusicalNotesOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import type {
    IMemoriesGeneratedReel,
    IMemoriesReelAudioEdit,
    IMemoryMusicData,
} from "../../../../../../Interface/DataInterface/IMemoriesData";
import type IUserInterface from "../../../../../../Interface/DataInterface/IUserDetails";
import useCommonAction from "../../../../../../CustomHooks/useCommonAction";
import { getGeneratedReelDurationInFrames } from "../../ReelBox/PlayerBox/reelTransitions";
import { applyReelAudioEdit, getOriginalReelAudio } from "../../ReelBox/PlayerBox/reelAudio";
import { useGetMemoriesWorkStationContext } from "../../../MemoriesWorkStation";

interface IAudioOption extends IMemoryMusicData {
    playbackUrl: string;
}

interface ILoadedAudioOptions {
    files: IMemoryMusicData[];
    options: IAudioOption[];
    error: boolean;
}

const originalTrackValue = "__original__";
const emptyAudioOptions: IAudioOption[] = [];

const formatTime = (seconds: number): string => {
    const safeSeconds = Math.max(0, Math.floor(seconds));
    return `${Math.floor(safeSeconds / 60)}:${String(safeSeconds % 60).padStart(2, "0")}`;
};

const MusicEditor: React.FC = () => {
    const {
        audioFiles,
        generatedReel,
        memoriesData,
        reelAudioEdit,
        saveRoomScript,
        setReelAudioEdit,
    } = useGetMemoriesWorkStationContext();
    const { getImages } = useCommonAction();
    const [loadedAudioOptions, setLoadedAudioOptions] = useState<ILoadedAudioOptions | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const [saveError, setSaveError] = useState(false);
    const [previewError, setPreviewError] = useState("");
    const previewRef = useRef<HTMLAudioElement>(null);
    const hydratedReelRef = useRef<IMemoriesGeneratedReel | null>(null);
    const { userID, userName } = useSelector((state: { userDetails: IUserInterface }) => state.userDetails);
    const reelDurationSec = generatedReel
        ? getGeneratedReelDurationInFrames(generatedReel) / generatedReel.script.fps
        : 0;
    const currentAudioOptions = loadedAudioOptions?.files === audioFiles ? loadedAudioOptions : null;
    const audioOptions = currentAudioOptions?.options ?? emptyAudioOptions;
    const isLoadingAudio = audioFiles.length > 0 && !currentAudioOptions;
    const audioLoadError = currentAudioOptions?.error ?? false;

    useEffect(() => {
        let isCurrent = true;
        if (audioFiles.length === 0) {
            return () => {
                isCurrent = false;
            };
        }

        Promise.all(
            audioFiles.map(async (file) => {
                const response = await getImages(file.url);
                if (typeof response?.data !== "string" || !response.data) {
                    throw new Error(`Unable to load music file ${file.id}`);
                }
                return { ...file, playbackUrl: response.data };
            }),
        )
            .then((options) => {
                if (isCurrent) setLoadedAudioOptions({ files: audioFiles, options, error: false });
            })
            .catch((error: unknown) => {
                console.error("Unable to load reel music:", error);
                if (!isCurrent) return;
                setLoadedAudioOptions({ files: audioFiles, options: [], error: true });
            });

        return () => {
            isCurrent = false;
        };
    }, [audioFiles, getImages]);

    useEffect(() => {
        if (!generatedReel || isLoadingAudio) return;
        if (hydratedReelRef.current === generatedReel) return;
        hydratedReelRef.current = generatedReel;

        const audio = generatedReel.script.audio;
        const activeAudio = audio;
        const option = audioOptions.find((item) => item.url === activeAudio.src);
        const durationSec = activeAudio.durationSec ?? 0;
        const minClipSec = Math.min(1, durationSec, reelDurationSec);
        const requestedStart = activeAudio.startFromSec ?? 0;
        const startFromSec = durationSec > 0
            ? Math.min(requestedStart, Math.max(durationSec - minClipSec, 0))
            : requestedStart;
        const endAtSec = durationSec > 0
            ? Math.min(
                Math.min(durationSec, startFromSec + reelDurationSec),
                Math.max(activeAudio.endAtSec ?? Math.min(durationSec, startFromSec + reelDurationSec), startFromSec + minClipSec),
            )
            : activeAudio.endAtSec ?? 0;
        setReelAudioEdit({
            sourceKey: activeAudio.src,
            playbackUrl: option?.playbackUrl ?? activeAudio.src,
            startFromSec,
            endAtSec,
            volume: activeAudio.volume ?? 0.5,
            durationSec,
        });
    }, [audioFiles, audioOptions, generatedReel, isLoadingAudio, reelDurationSec, setReelAudioEdit]);

    useEffect(() => {
        const preview = previewRef.current;
        if (!preview || !reelAudioEdit || preview.readyState === 0) return;
        preview.pause();
        preview.currentTime = reelAudioEdit.startFromSec;
        preview.volume = reelAudioEdit.volume;
    }, [reelAudioEdit]);

    if (!generatedReel) return null;

    const originalAudio = getOriginalReelAudio(generatedReel);
    const selectedValue = reelAudioEdit && reelAudioEdit.sourceKey !== originalAudio.src
        ? reelAudioEdit.sourceKey
        : originalTrackValue;
    const selectedSourceKey = selectedValue === originalTrackValue ? originalAudio.src : selectedValue;
    const previewSrc = reelAudioEdit?.playbackUrl ?? "";
    const selectedEdit = reelAudioEdit?.sourceKey === selectedSourceKey ? reelAudioEdit : null;
    const trackDurationSec = selectedEdit?.durationSec ?? 0;
    const minClipSec = Math.min(1, trackDurationSec, reelDurationSec);
    const maxStartSec = Math.max(trackDurationSec - minClipSec, 0);
    const minEndSec = Math.min((selectedEdit?.startFromSec ?? 0) + minClipSec, trackDurationSec);
    const maxEndSec = Math.min(trackDurationSec, (selectedEdit?.startFromSec ?? 0) + reelDurationSec);
    const clipDurationSec = selectedEdit
        ? Math.max(selectedEdit.endAtSec - selectedEdit.startFromSec, 0)
        : 0;

    const selectTrack = (value: string) => {
        setSaveMessage("");
        setSaveError(false);
        setPreviewError("");
        if (value === originalTrackValue) {
            const option = audioOptions.find((item) => item.url === originalAudio.src);
            setReelAudioEdit({
                sourceKey: originalAudio.src,
                playbackUrl: option?.playbackUrl ?? originalAudio.src,
                startFromSec: originalAudio.startFromSec ?? 0,
                endAtSec: originalAudio.endAtSec ?? originalAudio.durationSec ?? 0,
                volume: originalAudio.volume ?? 0.5,
                durationSec: originalAudio.durationSec ?? 0,
            });
            return;
        }

        const option = audioOptions.find((item) => item.url === value);
        if (!option) return;
        setReelAudioEdit({
            sourceKey: option.url,
            playbackUrl: option.playbackUrl,
            startFromSec: 0,
            endAtSec: 0,
            volume: 0.5,
            durationSec: 0,
        });
    };

    const updateEdit = (changes: Partial<IMemoriesReelAudioEdit>) => {
        if (!selectedEdit) return;
        setSaveMessage("");
        setSaveError(false);
        setReelAudioEdit({ ...selectedEdit, ...changes });
    };

    const updateStart = (value: number) => {
        if (!Number.isFinite(value)) return;
        const startFromSec = Math.max(0, Math.min(value, maxStartSec));
        updateEdit({
            startFromSec,
            endAtSec: Math.min(trackDurationSec, startFromSec + Math.max(clipDurationSec, minClipSec)),
        });
    };

    const updateEnd = (value: number) => {
        if (!Number.isFinite(value)) return;
        updateEdit({ endAtSec: Math.max(minEndSec, Math.min(value, maxEndSec)) });
    };

    const handleSave = async () => {
        if (!generatedReel || isSaving) return;
        if (!selectedEdit || !trackDurationSec || previewError || clipDurationSec <= 0) {
            setSaveMessage("Wait for the track to load and choose a valid music clip.");
            setSaveError(true);
            return;
        }
        if (!userID || !userName) {
            setSaveMessage("Your account details are not ready. Please try again.");
            setSaveError(true);
            return;
        }

        setIsSaving(true);
        setSaveMessage("");
        setSaveError(false);
        try {
            const reelWithMusic = applyReelAudioEdit(generatedReel, reelAudioEdit);
            const saved = await saveRoomScript(
                userID,
                userName,
                memoriesData?.place ?? "",
                reelWithMusic,
            );
            if (!saved) throw new Error("Could not save your music changes. Please try again.");
            previewRef.current?.pause();
            setSaveMessage("Saved. Press Play on the reel to hear your clip.");
        } catch (error) {
            console.error("Could not save reel music:", error);
            setSaveMessage(error instanceof Error ? error.message : "Could not save your music changes.");
            setSaveError(true);
        } finally {
            setIsSaving(false);
        }
    };

    const handlePreviewMetadata = (event: React.SyntheticEvent<HTMLAudioElement>) => {
        if (!selectedEdit) return;
        const durationSec = event.currentTarget.duration;
        if (!Number.isFinite(durationSec) || durationSec <= 0) {
            setPreviewError("This track has no readable duration. Choose another audio file.");
            return;
        }
        setPreviewError("");
        setReelAudioEdit((current) => {
            if (!current || current.sourceKey !== selectedEdit.sourceKey) return current;
            const minClipSec = Math.min(1, durationSec, reelDurationSec);
            const startFromSec = Math.min(current.startFromSec, Math.max(durationSec - minClipSec, 0));
            const maxEndSec = Math.min(durationSec, startFromSec + reelDurationSec);
            const requestedEnd = current.endAtSec > current.startFromSec
                ? current.endAtSec
                : Math.min(durationSec, startFromSec + reelDurationSec);
            const endAtSec = Math.min(
                maxEndSec,
                Math.max(requestedEnd, startFromSec + minClipSec),
            );
            return { ...current, durationSec, startFromSec, endAtSec };
        });
    };

    return (
        <section className="w-full min-w-0 max-w-[360px] space-y-3 rounded-xl border border-zinc-700/70 bg-zinc-900/90 p-3 shadow-lg shadow-black/20">
            <header className="flex items-center gap-2.5">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-700 bg-zinc-800 text-zinc-200">
                    <IoMusicalNotesOutline aria-hidden="true" size={16} />
                </span>
                <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-zinc-100">Trim music</h3>
                    <p className="mt-0.5 text-[11px] text-zinc-400">
                        Your track. Your favorite part.
                    </p>
                </div>
            </header>

            <label className="block space-y-1">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Soundtrack</span>
                <select
                    disabled={isSaving}
                    value={selectedValue}
                    onChange={(event) => selectTrack(event.currentTarget.value)}
                    className="min-h-10 w-full min-w-0 truncate rounded-lg border border-zinc-700 bg-zinc-950 px-2.5 py-2 text-xs text-zinc-100 transition focus:border-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500/40 disabled:opacity-50"
                >
                    <option value={originalTrackValue}>Original AI soundtrack</option>
                    {audioOptions.map((option, index) => (
                        <option key={option.id} value={option.url}>
                            {option.url.split("/").pop() || `Uploaded track ${index + 1}`}
                        </option>
                    ))}
                </select>
            </label>

            {isLoadingAudio && <p role="status" className="text-xs text-zinc-400">Loading your music...</p>}
            {audioLoadError && (
                <p role="alert" className="text-xs text-zinc-300">
                    Couldn't load uploaded music. Try reloading the page.
                </p>
            )}
            {previewSrc && (
                <audio
                    ref={previewRef}
                    key={previewSrc}
                    src={previewSrc}
                    controls
                    preload="metadata"
                    aria-label="Preview soundtrack"
                    onLoadedMetadata={handlePreviewMetadata}
                    onPlay={(event) => {
                        if (!selectedEdit) return;
                        event.currentTarget.currentTime = selectedEdit.startFromSec;
                        event.currentTarget.volume = selectedEdit.volume;
                    }}
                    onTimeUpdate={(event) => {
                        if (selectedEdit && selectedEdit.endAtSec > selectedEdit.startFromSec && event.currentTarget.currentTime >= selectedEdit.endAtSec) {
                            event.currentTarget.pause();
                        }
                    }}
                    onError={() => setPreviewError("Unable to play this track. Choose another file or reload the page.")}
                    className="block h-10 w-full rounded-lg border border-zinc-800 bg-zinc-950 scheme-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                />
            )}
            {previewError && <p role="alert" className="text-xs text-zinc-300">{previewError}</p>}

            {selectedEdit && (
                <fieldset disabled={isSaving} className="grid min-w-0 grid-cols-2 gap-x-3 gap-y-2.5">
                    <legend className="sr-only">Choose the music segment</legend>
                    <div className="col-span-2 rounded-lg border border-zinc-800 bg-zinc-950/80 p-2.5">
                        <div className="flex items-baseline justify-between gap-2">
                            <p className="font-mono text-lg font-semibold tabular-nums text-zinc-100">
                                {formatTime(selectedEdit.startFromSec)} - {formatTime(selectedEdit.endAtSec)}
                            </p>
                            <span className="shrink-0 rounded-md bg-zinc-800 px-1.5 py-0.5 text-[10px] tabular-nums text-zinc-300">
                                {formatTime(clipDurationSec)} clip
                            </span>
                        </div>
                        <div aria-hidden="true" className="relative mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-800">
                            <span
                                className="absolute h-full rounded-full bg-zinc-300"
                                style={{
                                    left: `${trackDurationSec ? selectedEdit.startFromSec / trackDurationSec * 100 : 0}%`,
                                    width: `${trackDurationSec ? clipDurationSec / trackDurationSec * 100 : 0}%`,
                                }}
                            />
                        </div>
                        <div className="mt-1 flex justify-between font-mono text-[10px] text-zinc-500">
                            <span>0:00</span>
                            <span>{formatTime(trackDurationSec)}</span>
                        </div>
                    </div>
                    <label className="min-w-0 space-y-1">
                        <span className="flex justify-between gap-2 text-xs text-zinc-300">
                            <span>Start</span>
                            <span>{formatTime(selectedEdit.startFromSec)}</span>
                        </span>
                        <input
                            type="range"
                            min={0}
                            max={maxStartSec}
                            step={0.1}
                            value={Math.min(selectedEdit.startFromSec, maxStartSec)}
                            disabled={!trackDurationSec || maxStartSec === 0}
                            onChange={(event) => updateStart(event.currentTarget.valueAsNumber)}
                            aria-label="Music clip start"
                            className="h-6 w-full accent-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:opacity-40"
                        />
                        <span className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1.5 focus-within:border-zinc-400">
                            <input
                                key={selectedEdit.startFromSec}
                                type="number"
                                inputMode="decimal"
                                min={0}
                                max={maxStartSec}
                                step={0.1}
                                defaultValue={selectedEdit.startFromSec}
                                disabled={!trackDurationSec}
                                onBlur={(event) => {
                                    if (event.currentTarget.reportValidity()) updateStart(event.currentTarget.valueAsNumber);
                                }}
                                required
                                aria-label="Clip start in seconds"
                                className="w-full min-w-0 bg-transparent font-mono text-sm text-zinc-100 focus-visible:outline-2 focus-visible:outline-zinc-400"
                            />
                            <span className="text-[10px] text-zinc-500">sec</span>
                        </span>
                    </label>
                    <label className="min-w-0 space-y-1">
                        <span className="flex justify-between gap-2 text-xs text-zinc-300">
                            <span>End</span>
                            <span>{formatTime(selectedEdit.endAtSec)}</span>
                        </span>
                        <input
                            type="range"
                            min={minEndSec}
                            max={maxEndSec}
                            step={0.1}
                            value={Math.max(minEndSec, Math.min(selectedEdit.endAtSec, maxEndSec))}
                            disabled={!trackDurationSec || minEndSec >= maxEndSec}
                            onChange={(event) => updateEnd(event.currentTarget.valueAsNumber)}
                            aria-label="Music clip end"
                            className="h-6 w-full accent-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 disabled:opacity-40"
                        />
                        <span className="flex items-center gap-1 rounded-md border border-zinc-700 bg-zinc-950 px-2 py-1.5 focus-within:border-zinc-400">
                            <input
                                key={selectedEdit.endAtSec}
                                type="number"
                                inputMode="decimal"
                                min={minEndSec}
                                max={maxEndSec}
                                step={0.1}
                                defaultValue={selectedEdit.endAtSec}
                                disabled={!trackDurationSec}
                                onBlur={(event) => {
                                    if (event.currentTarget.reportValidity()) updateEnd(event.currentTarget.valueAsNumber);
                                }}
                                required
                                aria-label="Clip end in seconds"
                                className="w-full min-w-0 bg-transparent font-mono text-sm text-zinc-100 focus-visible:outline-2 focus-visible:outline-zinc-400"
                            />
                            <span className="text-[10px] text-zinc-500">sec</span>
                        </span>
                    </label>
                    <label className="col-span-2 flex items-center gap-3">
                        <span className="flex justify-between gap-2 text-xs text-zinc-300">
                            <span className="w-12 shrink-0">Volume</span>
                        </span>
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={selectedEdit.volume}
                            onChange={(event) => updateEdit({ volume: Number(event.currentTarget.value) })}
                            aria-label="Music volume"
                            className="h-6 min-w-0 flex-1 accent-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400"
                        />
                        <span className="w-9 text-right text-xs tabular-nums text-zinc-400">{Math.round(selectedEdit.volume * 100)}%</span>
                    </label>
                    <p className="col-span-2 text-[10px] leading-relaxed text-zinc-400">
                        Preview plays this clip only. Any remaining reel time is silent.
                    </p>
                </fieldset>
            )}
            <footer className="space-y-2 border-t border-zinc-800 pt-2.5">
                {saveMessage && <p role={saveError ? "alert" : "status"} className="text-[11px] text-zinc-400">{saveMessage}</p>}
                <button
                    type="button"
                    onClick={handleSave}
                    disabled={isSaving || !trackDurationSec || !!previewError}
                    className="min-h-10 w-full rounded-lg bg-zinc-100 px-4 py-2 text-xs font-semibold text-zinc-900 transition hover:bg-white active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
                >
                    {isSaving ? "Saving..." : "Save to reel"}
                </button>
            </footer>
        </section>
    );
};

export default MusicEditor;
