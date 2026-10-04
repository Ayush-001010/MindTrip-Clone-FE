import type IBlogData from "../../../Interface/DataInterface/IBlogData";

export default interface IShowCards {
    type : "blog" | "agent";
    data : IBlogData[];
}