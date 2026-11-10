export default interface IUserFriend {
    friendDetails : IFriendDetails[];
    pendingFriendRequests : IFriendDetails[];
    searchData? : IFriendDetails[];
}

export interface IFriendDetails {
    id : string;
    createdAt: Date;
    aboutMe : string;
    status? : "Friend" | "Pending" | "Reject";
    name : string;
    userImage: string;
    numberOfTrips : number;
    numberOfBlogs : number;
}