export default interface IPollOption {
    id: number;
    content: string;
    likeCount: number;
    disLikeCount: number;
    createdAt?: string;
    updatedAt?: string;
    groupPostId?: number;
}
