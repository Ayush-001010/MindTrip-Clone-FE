import type IUserProfileDetailsData from "../../../../Interface/DataInterface/IUserProfileDetailsData";
import type { ChangeProfileFields } from "../../../../Interface/DataInterface/IUserProfileDetailsData";

export default interface IProfileInfo {
    profile:IUserProfileDetailsData | null;
    mode : "view" | "edit";
    places : string[];
    blogsDetails: {
        blogTitle: string;
        blogId: number;
        numberOfLikes: number;
        blogImage: string;
        numberOfViews: number;
    }[];
    changeProfileFields: ChangeProfileFields;
}