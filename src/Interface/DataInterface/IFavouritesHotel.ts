export interface IFavouritesHotel {
    id?: number;
    collectionId?: number;
    placeName: string;
    hotelName: string;
    hotelImage: string;
    hotelDescription: string;
    longitude: number;
    latitude: number;
    rating: number;
    reviews: number;
    link: string;
    price: number;
}