import { useCallback, useEffect, useState } from "react";
import APIService from "../APIService";
import type IHotel from "../../Interface/DataInterface/IHotel";

const useExploreHotels = (city: string) => {
  const [data, setData] = useState<IHotel[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchHotels = useCallback(
    async (pageNumber: number, append: boolean) => {
      if (!city) {
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
          await apiServiceInstance.getRequest<IHotel[]>(
            "/api/explore/hotels",
            {
              city,
              page: pageNumber,
              limit: 4,
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
            response.error || "Failed to fetch hotels"
          );
        }
      } catch (error) {
        console.error(
          "Error fetching hotels:",
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
    [city]
  );

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setError(null);

    if (!city) {
      return;
    }

    fetchHotels(1, false);
  }, [city, fetchHotels]);

  const loadMore = useCallback(() => {
    if (
      loading ||
      loadingMore ||
      !hasMore
    ) {
      return;
    }

    fetchHotels(page + 1, true);
  }, [
    loading,
    loadingMore,
    hasMore,
    page,
    fetchHotels,
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

export default useExploreHotels;