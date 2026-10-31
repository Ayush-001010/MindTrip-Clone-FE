import axios from "axios";
import APIService from "../Services/APIService";
import type { IPlaceOption } from "../component/Common/Card/ActivityCard/ActivityPlaceName/ActivityPlaceName";
import { useSelector } from "react-redux";
import type IUserInterface from "../Interface/DataInterface/IUserDetails";
import { useCallback } from "react";

const useCommonAction = () => {
  const { userID } = useSelector((state: any) => state.userDetails as IUserInterface);

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
  
  const fetchUserDetails = async () => {
    const apiInstance = new APIService();
    const response = await apiInstance.getRequest(`/common/fetchUserDetails`,{
      userID : userID || 2,
    });
    return response;
  };


  const fetchUserFriends = async () => {
    const apiInstance = new APIService();
    const response = await apiInstance.getRequest(`/common/fetchUserFriends`,{
      userID : userID || 2,
    });
    return response;
  };

  const fetchUserFollowing = useCallback(async () => {
    console.log("Fetching user following for userID:", userID);
    const apiInstance = new APIService();
    const response = await apiInstance.getRequest(`/common/fetchUserFollowing`,{
      userID : userID || 2,
    });
    return response;
  }, [userID]);

  const fetchUserFollowers = async () => {
    const apiInstance = new APIService();
    const response = await apiInstance.getRequest(`/common/fetchUserFollowers`,{
      userID : userID || 2,
    });
    return response;
  };

  const updateUserDetails = async (details: { anniversaryDate?: string; birthdayDate?: string; holidayDate?: string }) => {
    const apiInstance = new APIService();
    const response = await apiInstance.postRequest(`/common/updateUserDetails`, {
      userID: userID || 2,
      data : {
        ...details
      }
    });
    return response;
  };

  const followUser = async (followingUserID: number) => {
    const apiInstance = new APIService();
    const response = await apiInstance.postRequest(`/user/follow`, {
      userID: userID || 2,
      followingUserID,
    });
    return response;
  }; 

  const userLikedBlogs = useCallback(async () => {
    const apiInstance = new APIService();
    const response = await apiInstance.getRequest(`/user/liked-blogs`, {
      userID: userID || 2,
    });
    return response;
  }, [userID]);

  const dislikeBlog = async (blogID: number) => {
    const apiInstance = new APIService();
    const response = await apiInstance.postRequest(`/user/dislike  `, {
      userID: userID || 2,
      blogID,
    });
    return response;
  };

  const likeBlog = async (blogID: number) => {
    const apiInstance = new APIService();
    const response = await apiInstance.postRequest(`/user/like`, {
      userID: userID || 2,
      blogID,
    });
    return response;
  };

  const userActivity = async (activity: "blog" | "place" | "dislike" | "like" | "search", blogId?: number, place?: string) => {
    const apiInstance = new APIService();
    const response = await apiInstance.postRequest(`/user/activity`, {
      userID: userID || 2,
       activity, 
       blogId : blogId || null, 
       place : place || undefined
    });
    return response;
  };


  return { getImages, getPlaceName, fetchUserDetails, fetchUserFriends, fetchUserFollowing, fetchUserFollowers, updateUserDetails, followUser, userLikedBlogs, dislikeBlog, likeBlog, userActivity };
};

export default useCommonAction;
