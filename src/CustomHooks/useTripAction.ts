import APIService from "../Services/APIService";

const useTripAction = () => {
    
    const createNewTrip = async () => {
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.postRequest<{url:string}>("/trip/createNewTrip",{
            "userID" : "123"
        })
        return response;
    }

    return { createNewTrip };
};

export default useTripAction;