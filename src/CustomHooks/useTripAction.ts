import { useSelector } from "react-redux";
import APIService from "../Services/APIService";
import { useNavigate, useParams } from "react-router-dom";
import type IUserInterface from "../Interface/DataInterface/IUserDetails";
import type ITripExpense from "../Interface/DataInterface/ITripExpense";
import type ITripSplitWiseAnalytics from "../Interface/DataInterface/ITripSplitWiseAnalytics";
import type { IHotelDataInterface } from "../Interface/CommonInterface";
import type ITripHotelData from "../Interface/DataInterface/ITripHotel";

const useTripAction = () => {
    const { tripId } = useParams();
    const { userName , userID } = useSelector((state: any) => state.userDetails as IUserInterface);
    const navigate = useNavigate();

    const fetchHotelDetails = async (city: string) => {
        const apiServiceInstance = new APIService();
        const baseURL = "/api/explore/hotels?city="+city+"&page=1&limit=10";
        const response = await apiServiceInstance.getRequest<IHotelDataInterface[]>(baseURL);
        return response;
    };
    
    const createNewTrip = async () => {
        const apiServiceInstance = new APIService();
        console.log("User ID : ", userID);

        const response = await apiServiceInstance.postRequest<{url:string}>("/trip/createNewTrip",{
            "userID" : userID
        })
        if(response && response.data?.url){
            const url = response.data.url;
            navigate(`/chat/${url}`);
        }
    };

    const fetchTripMemberDetails = async () => {
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.postRequest<{members: Array<any>}>("/trip/fetchTripMemberDetails",{
            "tripID": tripId
        });
        return response;
    };

    const createInviteURL = async () => {
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.postRequest<{ success: boolean; data: { url: string } }>("/trip/createUserInvite",{
            "tripID": tripId,
            "inviteUserBy": userName
        });
        return response;
    };

    const joinTrip = async (tripID: string) => {
        const apiServiceInstance = new APIService();
    
        const response = await apiServiceInstance.postRequest<null>(
            "/trip/joinTrip",
            {
                tripID
            }
        );
    
        return response;
    };

    const fetchExpenses = async () => {
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.postRequest<ITripExpense[]>("/trip/fetchTripExpenses",{
            "tripID": tripId,
            "userID": userID || 2
        });
        return response;
    };

    const fetchTripAnalytics = async () => {
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.postRequest<ITripSplitWiseAnalytics>("/trip/fetchTripAnalytics",{
            "tripID": tripId,
            "userID": userID || 2
        });
        return response;
    };

    const fetchTripID =  async () => {
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.getRequest("/trip/fetchTripIDs" ,{ "userId":  3 });
        return response;
    };

    const fetchImportanDates = async () => {
        const apiInstance = new APIService();
        const response = await apiInstance.getRequest("/trip/getImportantDates",{
            "userID" : userID || 2
        });
        return response;
    };

    const fetchTripHotelDetails = async () => {
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.getRequest<ITripHotelData[]>("/trip/fetchTripHotelDetails",{
            "base62": tripId || 0
        });
        return response;
    };

    const isUserTripAdmin = async () => {
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.getRequest<boolean>("/trip/isUserTripAdmin",
            {
                base62: tripId || "",
                userID: userID || 2
            }
        );
        console.log("Is user trip admin response:", tripId , userID, response);
        return response;
    };

    const fetchOldGroupHubPost = async () => {
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.getRequest("/trip/fetchOldGroupHubPost",{
            base62: tripId || ""
        });
        return response;
    }

    const likeOrDislikeGroupHubPost = async (postID: string, like: boolean) => {
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.postRequest<any>("/trip/likeOrDislikePollOption",{
            "optionID": postID,
            like
        });
        return response;
    }
    
    return { createNewTrip , fetchTripID, fetchTripMemberDetails, createInviteURL, joinTrip, fetchTripAnalytics, fetchExpenses, fetchHotelDetails, fetchImportanDates, fetchTripHotelDetails , isUserTripAdmin , fetchOldGroupHubPost , likeOrDislikeGroupHubPost };
};

export default useTripAction;