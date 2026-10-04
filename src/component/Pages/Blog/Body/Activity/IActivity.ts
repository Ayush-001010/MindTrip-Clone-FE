// import type IActivityDesignInterface from "../../../../../../Interface/ConfigInterface/IActivityDesignInterface/IActivityDesignInterface";
import type { IBlogActivite } from "../../../../../Interface/DataInterface/IBlogData";

export default interface IActivity{
    // designArr : IActivityDesignInterface[];
    blogActivity: IBlogActivite;
    indexNumber: number;
}