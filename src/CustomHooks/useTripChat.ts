import { useEffect, useState } from "react";
import type IMessageTrip from "../Interface/DataInterface/IMessageTrip";
import APIService from "../Services/APIService";
import type ITripAPIResponse from "../Interface/DataInterface/ITripAPIResponse";

const useTripChat = () => {
    const [messages , setMessages] = useState<IMessageTrip[]>([]);

    const chatWithCopilotHandler = async (message : string) => {
        console.log("Sending message to copilot: ", message);
        setMessages(prevMessages => [...prevMessages, {
            ID: (prevMessages.length + 1).toString(),
            userID: "1234",
            tripID: "1234",
            message: message,
            timestamp: new Date(),
        }]);
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.postRequest<ITripAPIResponse>("/copilot/ItineraryChat",{
            userMessage: message,
            tripID:"1234"
        });
        console.log("Response from copilot: ", response);
        if(response.success){
            setMessages(prevMessages =>{
                const lastIndex = prevMessages.length - 1;
                const lastMessage = prevMessages[lastIndex];
                const updatedLastMessage = {
                    ...lastMessage,
                    response: response.data
                };
                return [...prevMessages.slice(0, lastIndex), updatedLastMessage];
            });
        }
    }

    const fetchMessages = async () => {
        const apiServiceInstance = new APIService();
        const response = await apiServiceInstance.postRequest<IMessageTrip[]>("/copilot/fetchTripChat",{
            tripID:"1234",
            userID:"123"
        });
        if(response.success && response.data){
            console.log("Fetched messages: ", JSON.parse(response.data[0].response as unknown as string));
            setMessages(response.data);
        }
    }

    useEffect(() => {
        fetchMessages();
    },[]);

    return { chatWithCopilotHandler, fetchMessages, messages };
};

export default useTripChat;