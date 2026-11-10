import React, { useEffect, useState } from "react";
import useFavouritesAction from "../../../../../../../CustomHooks/useFavouritesAction";
import type IFavorites from "./IFavorites";
import { Drawer } from "antd";
import type IFaviouritesCollection from "../../../../../../../Interface/DataInterface/IFavouritesCollection";
import EmptyPannel from "./EmptyPannel/EmptyPannel";
import CollectionCard from "../../../../../Card/CollectionCard/CollectionCard";
import { CiCirclePlus } from "react-icons/ci";
import { useGetAppContext } from "../../../../../../../App";

const Favorites: React.FC<IFavorites> = ({ openDrawer, closeDrawer }) => {
    const [collections, setCollections] = useState<IFaviouritesCollection[]>([]);
    const { fetchCollection, renameCollection, deleteCollection } = useFavouritesAction();
    const {changeFavoritesConfig} = useGetAppContext();

    const createCollection = () => {
        changeFavoritesConfig({
            openFavorites: true,
            uiType: "create-collection"
        });
        closeDrawer();
    }
    const handleDeleteCollection = async (
        collectionId: number
    ): Promise<boolean> => {
        const success = await deleteCollection(collectionId);
    
        if (success) {
            setCollections(previous =>
                previous.filter(collection => collection.id !== collectionId)
            );
        }
    
        return success;
    };
    const handleRenameCollection = async (
        collectionId: number,
        newName: string
    ): Promise<boolean> => {
        const success = await renameCollection(collectionId, newName);
    
        if (success) {
            setCollections(previous =>
                previous.map(collection =>
                    collection.id === collectionId
                        ? { ...collection, name: newName.trim() }
                        : collection
                )
            );
        }
    
        return success;
    };

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
                        <p onClick={createCollection} className="ml-auto cursor-pointer flex items-center gap-2 text-sm font-semibold text-[#22C55E]">
                            <CiCirclePlus className="text-lg" />
                            Add Collection
                        </p>
                    </header>
                    <section>
                    {collections.map((collection) => (
    <CollectionCard
        key={collection.id}
        name={collection.name}
        id={collection.id}
        image1={collection.image1}
        image2={collection.image2}
        image3={collection.image3}
        onRename={handleRenameCollection}
        onDelete={handleDeleteCollection}
    />
))}
                    </section>
                </>
            )}
        </Drawer>
    );
};

export default Favorites;
