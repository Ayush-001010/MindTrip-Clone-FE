export default interface ITripHotelData {
    id?: number;
    name: string;
    latitude: number;
    longitude: number;
    rating: number;
    reviews: number;
    price: number;
    image: string;
    amenities: string;
    base62?: string;
    isBooked?: boolean;
    toDate?: Date;
    fromDate?: Date;
    likeCount?: number;
    dislikeCount?: number;
    comment?: string;
}