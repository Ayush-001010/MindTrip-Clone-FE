import React, { useEffect, useState } from "react";
import useFavouritesAction from "../../../../../../../customHooks/useFavouritesAction";
import type IFavorites from "./IFavorites";
import { Drawer } from "antd";
import type IFaviouritesCollection from "../../../../../../../Interface/DataInterface/IFavouritesCollection";
import EmptyPannel from "./EmptyPannel/EmptyPannel";
import CollectionCard from "../../../../../Card/CollectionCard/CollectionCard";
import { CiCirclePlus } from "react-icons/ci";

const Favorites: React.FC<IFavorites> = ({ openDrawer, closeDrawer }) => {
    const [collections, setCollections] = useState<IFaviouritesCollection[]>([]);
    const { fetchCollection } = useFavouritesAction();

    useEffect(() => {
        const getCollections = async () => {
            const response = await fetchCollection();
            if (response.success && response.data)
                setCollections(response.data);
        };
        getCollections();
    }, []);
    return (
        <Drawer
            placement="left"
            size={550}
            open={openDrawer}
            onClose={closeDrawer}
            styles={{
                header: { background: "#121113" },
                body: { background: "#121113", padding: 16 },
                section: { background: "#121113" },
            }}
            mask={{ blur: true }}
            classNames={{ header: "[&_.ant-drawer-title]:text-white [&_.ant-drawer-close]:text-white" }}
        >
            {collections.length === 0 && <EmptyPannel onClose={closeDrawer} />}
            {collections.length > 0 && (
                <>
                    <header className="flex justify-around border-b border-white/20 pb-2 mb-4">
                        <p className="text-xl mb-2 font-semibold text-white">Your Collections</p>
                        <p className="ml-auto cursor-pointer flex items-center gap-2 text-sm font-semibold text-[#22C55E]">
                            <CiCirclePlus className="text-lg" />
                            Add Collection
                        </p>
                    </header>
                    <section>
                        {collections.map((collection) => (
                            <CollectionCard key={collection.id} name={collection.name} id={collection.id} image1={collection.image1} image2={collection.image2} image3={collection.image3} />
                        ))}
                    </section>
                </>
            )}
        </Drawer>
    );
};

export default Favorites;
