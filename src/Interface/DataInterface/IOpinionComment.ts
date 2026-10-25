export default interface IOpinionComment {
    id: number;
    comment: string;
    parentCommentId: number | null;
    userName: string;
    createdAt?: string;
    updatedAt?: string;
    opinionId?: number;
}
