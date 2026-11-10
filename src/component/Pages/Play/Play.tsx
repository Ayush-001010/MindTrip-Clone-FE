import { Player } from "@remotion/player";
import React from "react";
import { playCompositions } from "./playCompositions";

const previewClass = "rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 shadow-md shadow-black/30";
const Play: React.FC = () => {
  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-zinc-100 sm:p-6">
      <h1 className="mb-6 text-2xl font-semibold">Remotion compositions</h1>
      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        {playCompositions.map((composition) => (
          <section
            key={composition.id}
            className={previewClass}
            aria-labelledby={`${composition.id}-heading`}
          >
            <h2 id={`${composition.id}-heading`} className="mb-1 text-lg font-semibold">
              {composition.width > composition.height ? "Landscape" : "Portrait"}
            </h2>
            <p className="mb-3 text-sm text-zinc-400">
              {composition.width} x {composition.height} / {composition.durationInFrames / composition.fps} seconds / {composition.fps} fps
            </p>
            <Player
              component={composition.component}
              durationInFrames={composition.durationInFrames}
              fps={composition.fps}
              compositionWidth={composition.width}
              compositionHeight={composition.height}
              controls
              className="w-full overflow-hidden rounded-lg"
            />
          </section>
        ))}
      </div>
    </main>
  );
};

export default Play;
