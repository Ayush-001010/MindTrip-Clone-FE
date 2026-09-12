import { useCallback, useEffect, useState } from "react";
import APIService from "../APIService";
import type IExplorePlace from "../../Interface/DataInterface/IExplorePlace";

type PlaceType =
  | "restaurants"
  | "things-to-do"
  | "activities"
  | "";

interface Pagination {
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

const useExplorePlaces = (
  city: string,
  type: PlaceType,
  minRating?: number
) => {
  const [data, setData] = useState<IExplorePlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPlaces = useCallback(
    async (pageNumber: number, append: boolean) => {
      if (!city || !type) {
        setData([]);
        setPage(1);
        setHasMore(true);
        return;
      }

      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        setError(null);

        const apiServiceInstance = new APIService();

        const response =
          await apiServiceInstance.getRequest<IExplorePlace[]>(
            "/api/explore/places",
            {
              city,
              type,
              page: pageNumber,
              limit: 4,
              ...(minRating !== undefined && {
                minRating,
              }),
            }
          );

        if (response.success && response.data) {
          setData((previousData) =>
            append
              ? [...previousData, ...response.data!]
              : response.data!
          );

          setPage(pageNumber);

          setHasMore(
            response.pagination?.hasMore ?? false
          );
        } else {
          if (!append) {
            setData([]);
          }

          setError(
            response.error || "Failed to fetch places"
          );
        }
      } catch (error) {
        console.error(
          "Error fetching places:",
          error
        );

        if (!append) {
          setData([]);
        }

        setError("Something went wrong");
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [city, type]
  );

  // Reset and load first page when city/type changes
  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setError(null);

    if (!city || !type) {
      return;
    }

    fetchPlaces(1, false);
  }, [city, type,minRating, fetchPlaces]);

  const loadMore = useCallback(() => {
    if (
      loading ||
      loadingMore ||
      !hasMore
    ) {
      return;
    }

    fetchPlaces(page + 1, true);
  }, [
    loading,
    loadingMore,
    hasMore,
    page,
    fetchPlaces,
  ]);

  return {
    data,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
  };
};

export default useExplorePlaces;