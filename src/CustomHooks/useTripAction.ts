import { useSelector } from "react-redux";
import APIService from "../Services/APIService";
import { useParams } from "react-router-dom";
import type IUserInterface from "../Interface/DataInterface/IUserDetails";
import type ITripExpense from "../Interface/DataInterface/ITripExpense";
import type ITripSplitWiseAnalytics from "../Interface/DataInterface/ITripSplitWiseAnalytics";
import type { IHotelDataInterface } from "../Interface/CommonInterface";

const useTripAction = () => {
    const { tripId } = useParams();
    const { userName , userID } = useSelector((state: any) => state.userDetails as IUserInterface);

    const fetchHotelDetails = async (city: string) => {
        const apiServiceInstance = new APIService();
        const baseURL = "/api/explore/hotels?city="+city+"&page=1&limit=10";
        const response = await apiServiceInstance.getRequest<IHotelDataInterface[]>(baseURL);
        return response;
    }
    
    const createNewTrip = async () => {
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.postRequest<{url:string}>("/trip/createNewTrip",{
            "userID" : "123"
        })
        return response;
    }

    const fetchTripMemberDetails = async () => {
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.postRequest<{members: Array<any>}>("/trip/fetchTripMemberDetails",{
            "tripID": tripId
        });
        return response;
    }

    const createInviteURL = async () => {
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.postRequest<{ success: boolean; data: { url: string } }>("/trip/createUserInvite",{
            "tripID": tripId,
            "inviteUserBy": userName
        });
        return response;
    }
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
    }

    const fetchTripAnalytics = async () => {
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.postRequest<ITripSplitWiseAnalytics>("/trip/fetchTripAnalytics",{
            "tripID": tripId,
            "userID": userID || 2
        });
        return response;
    }
    
    return { createNewTrip, fetchTripMemberDetails, createInviteURL, joinTrip, fetchTripAnalytics, fetchExpenses, fetchHotelDetails };
};

export default useTripAction;