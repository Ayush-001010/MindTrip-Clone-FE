export default interface IUserProfileDetailsData {
    id : number;
    aboutMe : string | null;
    anniversaryDate : string | null;
    birthdayDate : string | null;
    createdAt : string;
    email : string;
    genralAnswer : string | null;
    googleId : string | null;
    holidayDate : string;
    interests : string | null;
    location : string | null;
    name : string;
    notifyNotes : string | null;
    numberOfBlogs : number | null;
    numberOfTrips : number | null;
    password : string;
    updatedAt : string;
    userImage : string | null;
    instagramUrl?: string | null;
}

export type ChangeProfileFields = <K extends keyof IUserProfileDetailsData>(
    key: K,
    value: IUserProfileDetailsData[K] | ((previous: IUserProfileDetailsData[K]) => IUserProfileDetailsData[K])
) => void;