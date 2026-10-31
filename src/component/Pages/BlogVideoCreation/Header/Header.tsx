import React from "react";
import type IHeader from "./IHeader";
import { useGetBlogVideoCreationContext } from "../BlogVideoCreation";

const stack = "flex flex-col gap-1.5";
const chipBase = "rounded-lg border px-3 py-1.5 text-left text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400";
const chipIdle = `${chipBase} border-dashed border-zinc-700 bg-transparent text-zinc-500 hover:border-zinc-500 hover:text-zinc-300`;
const chipActive = `${chipBase} border-solid border-violet-500 bg-violet-500/15 text-violet-200 hover:bg-violet-500/25`;
const connector = "hidden w-6 border-t border-dashed border-zinc-700 sm:block";
const connectorActive = "hidden w-6 border-t border-solid border-violet-500 sm:block";

const Header: React.FC<IHeader> = ({ name }) => {
    const { photosOrVideos, thumbnails, generated } = useGetBlogVideoCreationContext();
    const photoCount = photosOrVideos.filter((item) => item.file?.type.startsWith("image/")).length;
    const videoCount = photosOrVideos.filter((item) => item.file?.type.startsWith("video/")).length;
    const chip = generated ? chipActive : chipIdle;
    const line = generated ? connectorActive : connector;

    return (
        <header className="m-4 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-md shadow-black/30">
            <section className="flex min-w-60 flex-1 flex-col gap-1">
                <p className="text-2xl font-bold tracking-tight text-white">
                    Welcome, <span className="text-violet-400">{name}</span>! 🚀
                </p>
                <p className="max-w-md text-sm text-zinc-400">
                    Convert your blog into a compelling AI-crafted story reel. Simply share your content and ideas to get started.
                </p>
            </section>
            <section className="flex items-center gap-2">
                <section className={stack}>
                    <button className={chip}>{photoCount} Photos</button>
                    <button className={chip}>{videoCount} Videos</button>
                    <button className={chip}>{thumbnails.length} Texts</button>
                </section>
                <span className={line} />
                <button className={`${chip} flex items-center gap-2 self-center`}>
                    <span className={`inline-block h-2 w-2 rounded-full ${generated ? "bg-emerald-400" : "bg-zinc-500"}`} />
                    Server
                </button>
                <span className={line} />
                <section className={stack}>
                    <button className={chip}>Reel Worker</button>
                    <button className={chip}>Story Worker</button>
                </section>
                <span className={line} />
                <button
                    disabled={!generated}
                    className={`self-center rounded-lg border px-6 py-2 text-sm font-semibold transition focus:outline-none ${generated ? "border-solid border-violet-500 bg-violet-500 text-white hover:bg-violet-400 active:scale-95" : "cursor-not-allowed border-dashed border-zinc-700 text-zinc-500"}`}
                >
                    Publish
                </button>
            </section>
        </header>
    );
};

export default Header;
