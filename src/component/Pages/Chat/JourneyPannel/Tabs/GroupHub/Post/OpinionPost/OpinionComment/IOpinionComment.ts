import type IOpinionCommentData from '../../../../../../../../../Interface/DataInterface/IOpinionComment';

export default interface IOpinionComment {
    postId: string;
    comments?: IOpinionCommentData[];
}
