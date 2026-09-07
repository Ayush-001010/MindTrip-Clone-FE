import { useEffect, useState } from "react";
import APIService from "../Services/APIService";
import type IExploreTrip from "../Interface/DataInterface/IExploreTrip";

const useHorizontalCardList = (endPoint: string, type: "explore-trip") => {
  const [data, setData] = useState<IExploreTrip[]>([]);
  const [pageNo, setPageNo] = useState<number>(1);

  const fetchData = async () => {
    switch (type) {
      case "explore-trip":
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.getRequest<IExploreTrip[]>(
          endPoint,
          { pageNo: pageNo.toString() },
        );
        const { success, data } = response;
        if (success && data) {
            if (pageNo === 1) {
              setData(data);
            } else {
              setData((prevData) => [...prevData, ...data]);
            }
        }
        break;
    }
  };
  const setNewPage = () => setPageNo((prevPageNo) => prevPageNo + 1);

  useEffect(() => {
    fetchData();
  }, [endPoint, type, pageNo]);

  return { data, setNewPage };
};

export default useHorizontalCardList;
