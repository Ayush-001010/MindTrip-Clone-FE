import type IImportantDateResponse from "../../../Interface/DataInterface/IImportantDateResponse";

export default interface ICalendar{
    date : IImportantDateResponse[];
    rangeClickHandler : (startDate: Date, endDate: Date , type : "long-weekend" | "long-birthday-weekend" | "long-anniversary-weekend" | "birthday" | "anniversary") => void;
}