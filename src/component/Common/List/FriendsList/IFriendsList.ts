import type { IFriendDetails } from "../../../../Interface/DataInterface/IUserFriend";

export default interface IFriendsList {
    friendsData : IFriendDetails[] | null;
    type?: "search";
}