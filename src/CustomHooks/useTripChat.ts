import { useEffect, useState } from "react";
import type IMessageTrip from "../Interface/DataInterface/IMessageTrip";
import APIService from "../Services/APIService";
import type ITripAPIResponse from "../Interface/DataInterface/ITripAPIResponse";
import { useParams } from "react-router-dom";

const useTripChat = () => {
    const [messages, setMessages] = useState<IMessageTrip[]>([]);
    const { tripId } = useParams();

    const chatWithCopilotHandler = async (message: string) => {
        setMessages(prevMessages => [
            ...prevMessages,
            {
                ID: (prevMessages.length + 1).toString(),
                userID: "1234",
                tripID: tripId,
                message: message,
                timestamp: new Date(),
            }
        ]);

        const apiServiceInstance = new APIService();

        const response = await apiServiceInstance.postRequest<ITripAPIResponse>(
            "/copilot/ItineraryChat",
            {
                userMessage: message,
                tripID: tripId
            }
        );

        if (response.success) {
            setMessages(prevMessages => {
                const lastIndex = prevMessages.length - 1;
                const lastMessage = prevMessages[lastIndex];

                const updatedLastMessage = {
                    ...lastMessage,
                    response: response.data
                };

                return [
                    ...prevMessages.slice(0, lastIndex),
                    updatedLastMessage
                ];
            });
        }
    };

    const fetchMessages = async () => {
        const apiServiceInstance = new APIService();

        const response = await apiServiceInstance.postRequest<IMessageTrip[]>(
            "/copilot/fetchTripChat",
            {
                tripID: tripId,
                userID: "123"
            }
        );

        if (
            response.success &&
            response.data &&
            response.data.length > 0
        ) {
            setMessages(response.data);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [tripId]);

    return {
        chatWithCopilotHandler,
        fetchMessages,
        messages
    };
};

export default useTripChat;