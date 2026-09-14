import type { IQuestion } from "../../../../../Interface/DataInterface/IQuestionGatherResponse";

export default interface IQuestionGatherForm {
    questions:IQuestion[];
    sendMessageHandler: (formValues: Record<string, any>) => void;
}