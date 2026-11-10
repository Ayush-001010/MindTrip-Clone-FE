export default interface IBlogsStamp {
    blogsDetails: {
        blogTitle: string;
        blogId: number;
        numberOfLikes: number;
        blogImage: string;
        numberOfViews: number;
    }[];
}