import type IQuestionGatherResponse from "../../../../Interface/DataInterface/IQuestionGatherResponse";
import type IHotelQuestionGatherResponse from "../../../../Interface/DataInterface/IHotelQuestionGatherResponse";

export default interface IQuestionGatherResponseInterface {
    data: IQuestionGatherResponse | IHotelQuestionGatherResponse;
}