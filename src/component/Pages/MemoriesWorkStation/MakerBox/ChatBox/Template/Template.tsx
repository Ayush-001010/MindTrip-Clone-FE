import React, { useState } from "react";
import type ITemplate from "./ITemplate";
import AudioSelector from "./AudioSelector/AudioSelector";
import TemplateOptions, { type ReelTemplate } from "./TemplateOptions/TemplateOptions";
import Ton from "./Ton/Ton";
import { useGetMemoriesWorkStationContext } from "../../../MemoriesWorkStation";

const Template: React.FC<ITemplate> = () => {
    const { memoriesData, selectedAudioUrl, handleReelCreation, isReelGenerating } = useGetMemoriesWorkStationContext();
    const [selectedTemplate, setSelectedTemplate] = useState<ReelTemplate>();
    const [mood, setMood] = useState<string>();
    const [pace, setPace] = useState<string>();
    const [selectedPlaces, setSelectedPlaces] = useState<string[]>([]);
    const [suggestion, setSuggestion] = useState("");

    const savedPlaces = memoriesData?.place ?? "";
    const places = [...new Set(
        savedPlaces.split(savedPlaces.includes("|") ? "|" : /,(?=\S)/)
            .map((name) => name.trim())
            .filter(Boolean),
    )];
    const orderedPlaces = selectedPlaces.filter((name) => places.includes(name));
    const note = suggestion.trim();
    const missingFields = [
        !selectedTemplate && "story style",
        !selectedAudioUrl && "soundtrack",
        !mood && "mood",
        !pace && "pace",
        !orderedPlaces.length && "at least one place",
    ].filter(Boolean);

    const handleCreateReel = () => {
        if (missingFields.length || !selectedTemplate) return;
        console.log("Creating reel with template:", selectedTemplate , mood, pace, orderedPlaces, note , selectedAudioUrl);
        handleReelCreation(
            selectedTemplate.title as "Journey" | "Mistory" | "Key Moment" | "Fast Clip",
            selectedAudioUrl!,
            mood as "Happy" | "Fun" | "Relaxing" | "Romantic",
            pace as "Slow" | "Medium" | "Fast",
            orderedPlaces,
            note ? note : undefined,
        );
    };

    return (
        <section className="flex max-h-[min(30rem,75dvh)] w-full min-w-0 flex-col self-start rounded-xl border border-zinc-800 bg-zinc-950/80 shadow-xl shadow-black/20">
            <div
                role="region"
                aria-label="Reel setup settings"
                tabIndex={0}
                className="flex min-h-0 flex-col gap-2.5 overflow-y-auto overscroll-y-contain rounded-t-xl p-2.5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-400"
            >
                <TemplateOptions selectedId={selectedTemplate?.id} onSelect={setSelectedTemplate} />

                <AudioSelector />

                <Ton
                    mood={mood}
                    pace={pace}
                    selectedPlaces={orderedPlaces}
                    places={places}
                    suggestion={suggestion}
                    onMoodChange={setMood}
                    onPaceChange={setPace}
                    onPlacesChange={setSelectedPlaces}
                    onSuggestionChange={setSuggestion}
                />
            </div>

            <footer className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-zinc-800 px-2.5 py-2">
                <p role="status" className="text-xs text-zinc-400">
                    {isReelGenerating
                        ? "Creating your reel..."
                        : missingFields.length
                            ? `Still required: ${missingFields.join(", ")}.`
                            : "Ready to create your reel."}
                </p>
                <button
                    type="button"
                    onClick={handleCreateReel}
                    disabled={missingFields.length > 0 || isReelGenerating}
                    className="ml-auto cursor-pointer rounded-lg bg-violet-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-400 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-400 disabled:active:scale-100"
                >
                    {isReelGenerating ? "Creating..." : "Create reel"}
                </button>
            </footer>
        </section>
    );
};

export default Template;
