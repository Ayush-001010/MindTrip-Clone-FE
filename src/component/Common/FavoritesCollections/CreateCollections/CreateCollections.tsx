import React, { useState } from "react";
import type ICreateCollections from "./ICreateCollections";
import useFavouritesAction from "../../../../customHooks/useFavouritesAction";

const CreateCollections: React.FC<ICreateCollections> = ({ onClose }) => {
    const { createCollection } = useFavouritesAction();
    const [collectionName, setCollectionName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const canSubmit = collectionName.trim().length > 0 && !isSubmitting;

    const sumbitHandler = async () => {
        if (!canSubmit) return;
        setIsSubmitting(true);
        try {
            await createCollection(collectionName.trim());
            onClose();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="flex w-full flex-col gap-5 text-white">
            <header className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold">Create a collection</h2>
                <p className="text-sm text-white/60">
                    Enter the name of the new collection you want to create.
                </p>
            </header>
            <input
                type="text"
                autoFocus
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sumbitHandler()}
                placeholder="Collection Name"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none transition focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/30"
            />
            <div className="flex items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={onClose}
                    className="cursor-pointer rounded-full px-5 py-2.5 font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                    Close
                </button>
                <button
                    type="button"
                    onClick={sumbitHandler}
                    disabled={!canSubmit}
                    className="cursor-pointer rounded-full bg-[#22C55E] px-5 py-2.5 font-semibold text-[#121113] shadow-lg transition hover:bg-[#4ade80] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#22C55E]"
                >
                    {isSubmitting ? "Creating..." : "Create Collection"}
                </button>
            </div>
        </section>
    );
};

export default CreateCollections;
