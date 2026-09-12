export default interface IFilters {
    minRating?: number;
    onRatingChange: (rating?: number) => void;
  }