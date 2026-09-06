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
    activities: Array<{
        activityName: string;
        description: string;
    }>;
    cordinates:{
        longitude: number;
        latitude: number;
    }
}

export default interface ITripAPIResponse {
    description: string;
    type:"destination" | "activity" | "food";
    suggestedDestination: Array<ISuggestedDestination>;
}
