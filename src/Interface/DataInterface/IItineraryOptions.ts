export interface IItineraryActivity {
    time: "Morning" | "Afternoon" | "Evening" | "Whole Day";
    description: string;
    coordinates:{
        latitude: number;
        longitude: number;
    },
    cityName: string;
    activityName: string;
    crowded:{
        level: "Low" | "Medium" | "High";
        description: string;
    },
    cityType:"town"|"village"
}

export interface IItineraryDayByDay {
    day: number;
    title: string;
    activities:IItineraryActivity[];
}


export interface IItineraryPlan {
    planType: string;
    theme: string;
    itinerary:IItineraryDayByDay[];
}

export default interface IItineraryOptions {
    type:"itinerary-options";
    travelTips: string[];
    destination: string;
    description: string;
    days:number;
    assumptions: string[];
    plans: IItineraryPlan[];
}