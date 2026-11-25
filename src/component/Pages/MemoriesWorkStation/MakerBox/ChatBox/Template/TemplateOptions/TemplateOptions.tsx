import {
    // BsBookmarkStarFill,
    BsCameraReelsFill,
    BsCheckCircleFill,
    // BsLightningChargeFill,
    // BsStarFill,
} from "react-icons/bs";

const templates = [
    {
        id: "journey",
        title: "Journey",
        description: "A cinematic reel that follows your journey from start to finish.",
        Icon: BsCameraReelsFill,
    },
    // {
    //     id: "mistory",
    //     title: "Mistory",
    //     description: "Build a story around your key destinations and the moments between them.",
    //     Icon: BsBookmarkStarFill,
    // },
    // {
    //     id: "moments",
    //     title: "Key Moments",
    //     description: "Highlight the standout memories from your trip.",
    //     Icon: BsStarFill,
    // },
    // {
    //     id: "fast-clips",
    //     title: "Fast Clips",
    //     description: "Capture the energy of your journey with quick, lively cuts.",
    //     Icon: BsLightningChargeFill,
    // },
] as const;

type TemplateOption = (typeof templates)[number];
export type ReelTemplate = Pick<TemplateOption, "id" | "title">;

interface TemplateOptionsProps {
    selectedId: ReelTemplate["id"] | undefined;
    onSelect: (template: ReelTemplate) => void;
}

const TemplateOptions = ({ selectedId, onSelect }: TemplateOptionsProps) => (
    <>
        <header className="flex shrink-0 items-start justify-between gap-2 border-b border-zinc-800 pb-2">
            <div className="space-y-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-violet-300">
                    Reel setup
                </p>
                <h2 className="text-sm font-semibold tracking-tight text-zinc-100 sm:text-base">
                    Choose your story style
                </h2>
                <p className="max-w-lg text-xs leading-relaxed text-zinc-400">
                    Pick a starting point for the reel you want to create.
                </p>
            </div>
            <span className="shrink-0 rounded-full border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-[10px] font-medium text-zinc-400">
                {templates.length} styles
            </span>
        </header>

        <section aria-label="Reel templates" className="grid shrink-0 grid-cols-1 gap-1.5 sm:grid-cols-2">
            {templates.map(({ id, title, description, Icon }) => {
                const isSelected = selectedId === id;
                return (
                    <button
                        key={id}
                        type="button"
                        aria-pressed={isSelected}
                        onClick={() => onSelect({ id, title })}
                        className={`group cursor-pointer flex min-w-0 flex-col items-start rounded-lg border p-2 text-left transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 ${
                            isSelected
                                ? "border-violet-400/80 bg-violet-500/10 shadow-md shadow-violet-950/20 ring-1 ring-violet-400/20"
                                : "border-zinc-800 bg-zinc-900/70 hover:border-zinc-600 hover:bg-zinc-900"
                        }`}
                    >
                        <span className="mb-1 flex w-full items-center justify-between">
                            <span
                                className={`flex size-6 items-center justify-center rounded-md transition ${
                                    isSelected
                                        ? "bg-violet-500 text-white shadow-md shadow-violet-950/40"
                                        : "bg-zinc-800 text-zinc-300 group-hover:text-violet-300"
                                }`}
                            >
                                <Icon aria-hidden="true" size={14} />
                            </span>
                            {isSelected && (
                                <BsCheckCircleFill aria-hidden="true" className="text-violet-300" size={16} />
                            )}
                        </span>
                        <span className="text-xs font-semibold text-zinc-100">{title}</span>
                        <span className="mt-1 text-[11px] font-normal leading-4 text-zinc-400">
                            {description}
                        </span>
                    </button>
                );
            })}
        </section>
    </>
);

export default TemplateOptions;
