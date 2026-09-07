export interface IActivity {
  activityName: string;
  description: string;
  placeName: string;
  latitude: number;
  longitude: number;
  imageUrl?: string | null;
}

export interface ISuggestedDestination {
  name: string;
  reason: string;
  bestTimeToVisit: string;
  famousFood: Array<{
    foodName: string;
    description: string;
  }>;
  popularAttractions: Array<{
    attractionName: string;
    description: string;
  }>;
  isCrowded: boolean;
  crowded: Array<{
    level: string;
    description: string;
  }>;
  activities: Array<IActivity>;
  cordinates: {
    longitude: number;
    latitude: number;
  };
}

export default interface ITripAPIResponse {
  description: string;
  type: "destination" | "activity" | "food";
  suggestedDestination: Array<ISuggestedDestination>;
}
