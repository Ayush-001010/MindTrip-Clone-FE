import type IUserProfileDetailsData from "../../../Interface/DataInterface/IUserProfileDetailsData";

export default interface IUserInvite {
    openModal: boolean;
    closeFunc: () => void;
    limit: number;
    members : IUserProfileDetailsData[];
    genrateUrl: () => Promise<string>;
}