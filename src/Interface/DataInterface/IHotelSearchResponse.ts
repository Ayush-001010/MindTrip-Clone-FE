export interface IHotelRate {
    lowest: string;
    extracted_lowest: number;
}

export interface IHotelImage {
    thumbnail: string;
    original_image: string;
}

export interface IHotelDetail {
    type: string;
    name: string;
    gps_coordinates: {
        latitude: number;
        longitude: number;
    };
    rate_per_night: IHotelRate;
    total_rate: IHotelRate;
    hotel_class: string;
    extracted_hotel_class: number;
    images: IHotelImage[];
    overall_rating: number;
    reviews: number;
    ratings: unknown[];
    location_rating: number;
    reviews_breakdown: unknown[];
    amenities: string[];
    eco_certified: boolean;
}

export interface IHotel {
    description: string;
    placeName: string;
    hotel: IHotelDetail[];
}

export default interface IHotelSearchResponse {
  type: "hotel-search";
  agentDescription: string;
  hotels:Array<IHotel>
}