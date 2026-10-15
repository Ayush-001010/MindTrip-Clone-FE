import type { IHotelComment } from "../../../../../Utils/hotelComment";

export default interface IHotelCommentSection {
    comments: IHotelComment[];
    onAddComment: (comment: string) => void;
}
