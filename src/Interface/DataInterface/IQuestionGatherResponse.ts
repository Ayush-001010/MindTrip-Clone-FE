export interface IQuestion {
    description: string;
    multiple: boolean;
    options: Array<string>;
    purpose?: string;
    required?: boolean;
    type: "text" | "single-choice" | "multiple-choice" | "date" | "counter";
    min?: number;
    max?: number;
    defaultValue?: number;
}

export default interface IQuestionGatherResponse {
    type:
        | "question-gather"
        | "favourite-information-gather-round1"
        | "favourite-information-gather-round2";

    missingFields?: Array<string>;
    questionDescription: string;
    questions: Array<IQuestion>;
}