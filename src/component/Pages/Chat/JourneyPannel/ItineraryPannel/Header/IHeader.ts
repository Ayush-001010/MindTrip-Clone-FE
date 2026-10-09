export default interface IHeader {
    title: string;
    startDate: Date | null;
    endDate: Date | null;
    countUserOnTrip: number;
    budget: number | null;
    setFeatureSelected: React.Dispatch<React.SetStateAction<"ItineraryEdit" | "ItineraryPhotos" | "ItinerarySplitWise" | "Itinerary">>;
}