import type IBlogData from "./IBlogData";

export default interface IFetchBlogResult {
    blogs: IBlogData[];
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
}
