export default interface ICollectionCard {
    name: string;
    id: number;
    image1: string;
    image2: string;
    image3: string;
    isNotOpenDetails?: boolean;
    onRename?: (collectionId: number, newName: string) => Promise<boolean>;
    onDelete?: (collectionId: number) => Promise<boolean>;

}