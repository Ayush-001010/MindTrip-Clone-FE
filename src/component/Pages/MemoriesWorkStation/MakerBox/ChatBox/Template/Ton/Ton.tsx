import { ConfigProvider, Input, Select, theme } from "antd";
import type { ThemeConfig } from "antd";
import { useId } from "react";

const moods = [
    { value: "happy", label: "Happy" },
    { value: "relaxed", label: "Relaxed" },
    { value: "fun", label: "Fun" },
    { value: "romantic", label: "Romantic" },
];

const paces = [
    { value: "slow", label: "Slow" },
    { value: "medium", label: "Medium" },
    { value: "fast", label: "Fast" },
];

const toneTheme: ThemeConfig = {
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: "#a78bfa",
        colorBgContainer: "#18181b",
        colorBgElevated: "#18181b",
        colorBorder: "#3f3f46",
        colorTextPlaceholder: "#a1a1aa",
        borderRadius: 8,
    },
};

const fieldLabel = "block text-[10px] font-semibold uppercase tracking-wider text-zinc-400";

interface TonProps {
    mood: string | undefined;
    pace: string | undefined;
    selectedPlaces: string[];
    places: string[];
    suggestion: string;
    onMoodChange: (value: string | undefined) => void;
    onPaceChange: (value: string | undefined) => void;
    onPlacesChange: (value: string[]) => void;
    onSuggestionChange: (value: string) => void;
}

const Ton = ({
    mood, pace, selectedPlaces, places, suggestion,
    onMoodChange, onPaceChange, onPlacesChange, onSuggestionChange,
}: TonProps) => {
    const moodId = useId();
    const paceId = useId();
    const placeId = useId();
    const visitOrderId = useId();
    const suggestionId = useId();

    const visitPositions = selectedPlaces.map((_, index) => ({
        value: index,
        label: `#${index + 1}`,
    }));

    const movePlace = (from: number, to: number) => {
        const nextPlaces = [...selectedPlaces];
        const [place] = nextPlaces.splice(from, 1);
        nextPlaces.splice(to, 0, place);
        onPlacesChange(nextPlaces);
    };

    return (
        <section aria-label="Reel preferences" className="@container shrink-0 space-y-2 rounded-lg border border-zinc-800 bg-zinc-900/60 p-2.5">
            <header className="flex items-center justify-between gap-2">
                <h3 className="text-xs font-semibold text-zinc-100">Reel preferences</h3>
            </header>
            <ConfigProvider theme={toneTheme} componentSize="small">
                <div className="grid gap-2 @2xs:grid-cols-2">
                    <div className="min-w-0 space-y-1">
                        <label htmlFor={moodId} className={fieldLabel}>Mood</label>
                        <Select<string>
                            id={moodId}
                            aria-required="true"
                            value={mood}
                            onChange={onMoodChange}
                            options={moods}
                            placeholder="Choose a mood"
                            allowClear
                            className="w-full"
                        />
                    </div>
                    <div className="min-w-0 space-y-1">
                        <label htmlFor={paceId} className={fieldLabel}>Pace</label>
                        <Select<string>
                            id={paceId}
                            aria-required="true"
                            value={pace}
                            onChange={onPaceChange}
                            options={paces}
                            placeholder="Choose a pace"
                            allowClear
                            className="w-full"
                        />
                    </div>
                    <div className="min-w-0 space-y-2.5 rounded-lg border border-zinc-800 bg-zinc-950/60 p-2.5 @2xs:col-span-2">
                        <div className="space-y-1">
                            <label htmlFor={placeId} className={fieldLabel}>Step 1: Choose places</label>
                            <Select<string[]>
                                id={placeId}
                                aria-required="true"
                                mode="multiple"
                                value={selectedPlaces}
                                onChange={onPlacesChange}
                                options={places.map((name) => ({ value: name, label: name }))}
                                placeholder={places.length ? "Select one or more places" : "No places in this memory"}
                                disabled={!places.length}
                                allowClear
                                maxTagCount={2}
                                className="w-full"
                            />
                        </div>
                        <div className="space-y-1.5 border-t border-zinc-800 pt-2">
                            <p id={visitOrderId} className={fieldLabel}>Step 2: Set visit order</p>
                            {selectedPlaces.length === 0 ? (
                                <p className="rounded-md border border-dashed border-zinc-700 px-2 py-1.5 text-xs text-zinc-400">
                                    {places.length
                                        ? "The first place you select will appear here as your first stop."
                                        : "Add places to this memory to set a visit order."}
                                </p>
                            ) : (
                                <>
                                    <p className="text-xs text-zinc-400">
                                        {selectedPlaces.length === 1
                                            ? "Select another place to change the order, or remove this stop."
                                            : "Use the dropdown to reorder a stop, or Remove to leave it out."}
                                    </p>
                                    <ol aria-labelledby={visitOrderId} className="space-y-1">
                                        {selectedPlaces.map((name, index) => (
                                            <li key={name} className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-900/80 px-2 py-1.5">
                                                <span className="min-w-0 flex-1 wrap-break-word text-xs font-medium text-zinc-100">
                                                    <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-wide text-violet-300">
                                                        {index === 0 ? "First stop" : `Stop ${index + 1}`}
                                                    </span>
                                                    {name}
                                                </span>
                                                {selectedPlaces.length > 1 && (
                                                    <Select<number>
                                                        aria-label={`Change visit order for ${name}`}
                                                        value={index}
                                                        options={visitPositions}
                                                        onChange={(position) => movePlace(index, position)}
                                                        className="w-16 shrink-0"
                                                    />
                                                )}
                                                <button
                                                    type="button"
                                                    aria-label={`Remove ${name} from the visit order`}
                                                    onClick={() => onPlacesChange(selectedPlaces.filter((place) => place !== name))}
                                                    className="shrink-0 cursor-pointer rounded-md px-2 py-1 text-xs font-medium text-zinc-400 transition hover:bg-zinc-800 hover:text-zinc-100 focus-visible:outline-2 focus-visible:outline-violet-400"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ol>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="min-w-0 space-y-1 @2xs:col-span-2">
                        <label htmlFor={suggestionId} className={fieldLabel}>Your suggestion (optional)</label>
                        <Input.TextArea
                            id={suggestionId}
                            value={suggestion}
                            onChange={(event) => onSuggestionChange(event.currentTarget.value)}
                            rows={2}
                            placeholder="e.g. Open with the sunrise and end with the group photo."
                            className="w-full"
                        />
                    </div>
                </div>
            </ConfigProvider>
        </section>
    );
};

export default Ton;