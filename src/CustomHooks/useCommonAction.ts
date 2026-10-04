import axios from "axios";
import APIService from "../Services/APIService";
import type { IPlaceOption } from "../component/Common/Card/ActivityCard/ActivityPlaceName/ActivityPlaceName";

const useCommonAction = () => {
  const getImages = async (key: string) => {
    const apiInstance = new APIService();
    const response = await apiInstance.getRequest(
      `/common/someRandomImages?type=${key}`,
    );
    return response;
  };

  const getPlaceName = async (placeName: string) => {
    const response = await axios.get(
      `https://api.maptiler.com/geocoding/${placeName}.json?key=gvBWK8FAy2ynzJcqqJV7&limit=10`,
    );
    const { features } = response.data;
    const options: IPlaceOption[] = [];
    features.forEach((feature: any) => {
      options.push({
        place_name: feature.place_name,
        longitude: feature.geometry.coordinates[0],
        latitude: feature.geometry.coordinates[1],
      });
    });
    return options;
  };
  return { getImages, getPlaceName };
};

export default useCommonAction;
