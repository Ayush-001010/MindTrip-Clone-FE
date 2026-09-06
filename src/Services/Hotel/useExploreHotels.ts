import { useEffect, useState } from "react";
import APIService from "../APIService";
import type IHotel from "../../Interface/DataInterface/IHotel";

const useExploreHotels = (city: string) => {
  const [data, setData] = useState<IHotel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!city) {
      setData([]);
      return;
    }

    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiServiceInstance = new APIService();

        const response =
          await apiServiceInstance.getRequest<IHotel[]>(
            "/api/explore/hotels",
            {
              city,
            }
          );

        if (response.success && response.data) {
          setData(response.data);
        } else {
          setData([]);
          setError(
            response.error || "Failed to fetch hotels"
          );
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);

        setData([]);
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [city]);

  return {
    data,
    loading,
    error,
  };
};

export default useExploreHotels;