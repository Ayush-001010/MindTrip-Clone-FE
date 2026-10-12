export default interface IHotelQuestionGatherResponse {
    type:"hotel-information-gather";
    questionDescription: string;
    missingFields:string[];
    questions:{
        description: string;
        type:"multiple-choice";
        options: string[];
        multiple: boolean;
    }[];
}