export default interface IFilters {
    minRating?: number;
    onRatingChange: (rating?: number) => void;
  
    activityType?: string;
    onActivityTypeChange?: (type: string) => void;
  
    showActivityType?: boolean;
  }