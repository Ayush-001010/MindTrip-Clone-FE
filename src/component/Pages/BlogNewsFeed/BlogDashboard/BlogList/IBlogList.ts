import type IBlogFilters from "../IBlogFilters";

export default interface IBlogList {
    filters: IBlogFilters;
    following: number[];
    setFollowing: React.Dispatch<React.SetStateAction<number[]>>;
    likeBlogIds: number[];
    setLikeBlogIds: React.Dispatch<React.SetStateAction<number[]>>;
}
