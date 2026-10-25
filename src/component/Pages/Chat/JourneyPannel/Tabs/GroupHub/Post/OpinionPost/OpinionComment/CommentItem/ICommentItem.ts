import type { IOpinionCommentNode } from '../../../../../../../../../../Utils/opinionComment';

export default interface ICommentItem {
    comment: IOpinionCommentNode;
    onReply: (parentCommentId: number, replyText: string) => void;
}
