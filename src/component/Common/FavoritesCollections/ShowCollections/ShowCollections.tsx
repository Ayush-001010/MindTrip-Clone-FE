import React, { useEffect, useState } from "react";
import type IShowCollections from "./IShowCollections";
import useFavouritesAction from "../../../../customHooks/useFavouritesAction";
import type IFaviouritesCollection from "../../../../Interface/DataInterface/IFavouritesCollection";
import CollectionCard from "../../Card/CollectionCard/CollectionCard";
import { CiCirclePlus } from "react-icons/ci";

const ShowCollections: React.FC<IShowCollections> = ({ addFavoritesItem }) => {
    const { fetchCollection } = useFavouritesAction();
    const [collections, setCollections] = useState<IFaviouritesCollection[]>([]);

    console.log("Collection     ", collections);

    useEffect(() => {
        const getCollections = async () => {
            const response = await fetchCollection();
            if (response.success && response.data) {
                setCollections(response.data);
            }
        };
        getCollections();
    }, []);
    return (
        <section className="flex flex-col gap-5">
            <header className="flex items-center justify-between gap-3 pr-10">
                <div className="flex flex-col">
                    <h2 className="text-xl font-semibold text-white">Your collections</h2>
                    <p className="text-sm text-white/50">
                        {collections.length} {collections.length === 1 ? "collection" : "collections"}
                    </p>
                </div>
                <button
                    type="button"
                    className="flex cursor-pointer items-center gap-2 rounded-full bg-[#22C55E] px-4 py-2 text-sm font-semibold text-[#121113] shadow-lg transition hover:bg-[#4ade80] active:scale-95"
                >
                    <CiCirclePlus className="text-lg" />
                    Add Collection
                </button>
            </header>
            {collections.length === 0 ? (
                <p className="rounded-2xl border-2 border-dashed border-white/15 py-10 text-center text-sm text-white/50">
                    No collections yet. Create one to start saving places.
                </p>
            ) : (
                <section className="grid max-h-[60vh] grid-cols-2 gap-4 overflow-y-auto pr-1">
                    {collections.map((collection) => (
                        <section onClick={() => addFavoritesItem(collection.id)} key={collection.id}>
                            <CollectionCard name={collection.name} id={collection.id} image1={collection.image1} image2={collection.image2} image3={collection.image3} />
                        </section>
                    ))}
                </section>
            )}
        </section>
    );
};

export default ShowCollections;