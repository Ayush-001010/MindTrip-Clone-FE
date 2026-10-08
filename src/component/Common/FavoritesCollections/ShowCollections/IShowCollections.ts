export default interface IShowCollections {
    addFavoritesItem: (collectionId: number) => Promise<void>;
}