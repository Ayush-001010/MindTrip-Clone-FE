export default interface IFetchBlogFilter {
    page: number;
    placeName?: string;
    budget?: number;
    noOfPlaces?: number;
    profileOrTitle?: string;
    metaData?: string[];
}
