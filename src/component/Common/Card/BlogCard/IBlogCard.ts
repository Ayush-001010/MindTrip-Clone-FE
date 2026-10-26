import type IBlogData from "../../../../Interface/DataInterface/IBlogData";

export default interface IBlogCard {
    blogData : IBlogData;
    following: number[];
    setFollowing: React.Dispatch<React.SetStateAction<number[]>>;
    likeBlogIds: number[];
    setLikeBlogIds: React.Dispatch<React.SetStateAction<number[]>>;
}