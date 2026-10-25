import type IOpinionComment from "../Interface/DataInterface/IOpinionComment";

export interface IOpinionCommentNode extends IOpinionComment {
    replies: IOpinionCommentNode[];
}

/**
 * Builds a nested reply tree from the flat comment list returned by the backend,
 * linking each comment to its parent via `parentCommentId`.
 */
export const buildOpinionCommentTree = (comments: IOpinionComment[]): IOpinionCommentNode[] => {
    const nodeById = new Map<number, IOpinionCommentNode>();
    comments.forEach((comment) => nodeById.set(comment.id, { ...comment, replies: [] }));

    const roots: IOpinionCommentNode[] = [];
    nodeById.forEach((node) => {
        if (node.parentCommentId !== null && nodeById.has(node.parentCommentId)) {
            nodeById.get(node.parentCommentId)!.replies.push(node);
        } else {
            roots.push(node);
        }
    });

    return roots;
};
