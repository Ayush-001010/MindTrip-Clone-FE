import { useSelector } from "react-redux";
import APIService from "../Services/APIService";
import { useParams } from "react-router-dom";
import type IUserInterface from "../Interface/DataInterface/IUserDetails";

const useTripAction = () => {
    const { tripId } = useParams();
    const { userName } = useSelector((state: any) => state.userDetails as IUserInterface);
    
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
    
    return { createNewTrip, fetchTripMemberDetails, createInviteURL };
};

export default useTripAction;