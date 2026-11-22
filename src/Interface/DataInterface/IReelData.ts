export default interface IReelData {
    id : number;
    script:string;
    placeNames: string;
    videoKey: string | null;
    blogId: string | null;
    blogTitle: string | null;
    blogDescription: string | null;
    userName: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
}