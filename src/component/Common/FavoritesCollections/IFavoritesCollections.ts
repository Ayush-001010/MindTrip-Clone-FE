export default interface IFavoritesCollections {
    open: boolean;
    onClose: () => void;
    uiType: "create-collection" | "show-collection-for-add-purpose" | undefined;
    addFavoritesItem: (collectionId: number) => Promise<void>;
}