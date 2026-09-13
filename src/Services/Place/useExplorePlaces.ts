import { useEffect, useState } from "react";
import APIService from "../APIService";
import type IPlace from "../../Interface/DataInterface/IExplorePlace";


const useExplorePlaces = (
  city: string,
  type: "restaurants" | "things-to-do" | ""
) => {
  const [data, setData] = useState<IPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city || !type) {
      setData([]);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiServiceInstance = new APIService();

        const response = await apiServiceInstance.getRequest<IPlace[]>(
          "/api/explore/places",
          {
            city,
            type,
          }
        );

        if (response.success && response.data) {
          setData(response.data);
        } else {
          setData([]);
          setError(response.error || "Failed to fetch places");
        }
      } catch (error) {
        console.error("Error fetching places:", error);
        setData([]);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [city, type]);

  return {
    data,
    loading,
    error,
  };
};

export default useExplorePlaces;