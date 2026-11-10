import type IUserProfileDetailsData from "../../../../Interface/DataInterface/IUserProfileDetailsData";
import type { ChangeProfileFields } from "../../../../Interface/DataInterface/IUserProfileDetailsData";

export default interface IProfileCard {
    profile: IUserProfileDetailsData | null;
    mode: "visit" | "edit";
    changeProfileFields: ChangeProfileFields;
    imageFile: File | null;
    onImageChange: (file: File | null) => void;
}