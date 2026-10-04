import type IBlogFilters from "../IBlogFilters";

export default interface IFilter {
    onFiltersChange?: (filters: IBlogFilters) => void;
}