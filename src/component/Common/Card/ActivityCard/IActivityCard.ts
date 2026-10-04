import type { IBlogActivite } from "../../../../Interface/DataInterface/IBlogData";

export default interface IActivityCard{
    indexNumber: number;
    blogActivity:IBlogActivite;
    itSubActivity: boolean;
}