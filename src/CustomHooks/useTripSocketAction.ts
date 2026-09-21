import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import type IUserInterface from "../Interface/DataInterface/IUserDetails";
import type INotificationConfig from "../Interface/DataInterface/INotificationConfig";
import type IMessageTrip from "../Interface/DataInterface/IMessageTrip";
import type IFinalItineraryResponse from "../Interface/DataInterface/IFinalItineraryResponse";
import APIService from "../Services/APIService";

const useTripSocketAction = () => {
  const [notificationConfig, setNotificationConfig] =
    useState<INotificationConfig>({
      open: false,
      type: "",
      message: "",
      duration: undefined,
    });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<IMessageTrip>>([]);
  const [finalItinerary, setFinalItinerary] =
    useState<IFinalItineraryResponse | null>(null);

  const [isFinalItineraryReceived, setIsFinalItineraryReceived] =
    useState<boolean>(false);

  const { tripId } = useParams();

  const userDetails = useSelector(
    (state: any) => state.userDetails as IUserInterface
  );

  const SERVER_URL = "http://localhost:3000";

  const socketRef = useRef<ReturnType<typeof io> | null>(null);
  const userNameRef = useRef(userDetails.userName);

  useEffect(() => {
    userNameRef.current = userDetails.userName;
  }, [userDetails.userName]);

  /*
   * Create only one socket connection
   */
  useEffect(() => {
    const socket = io(SERVER_URL);

    socketRef.current = socket;

    socket.on("room:joined", (data: { userName: string }) => {
      const { userName } = data;

      if (userName !== userNameRef.current) {
        setNotificationConfig({
          open: true,
          type: "userJoin",
          message: userName,
          duration: 3000,
        });
      }
    });

    socket.on("room:oldChatDetails", (oldMessages: any) => {
      const { response } = oldMessages;

      if (!response?.data) {
        return;
      }

      response.data.forEach((message: any) => {
        const obj: IMessageTrip = {
          ID: `${message.id}-messageKey`,
          userID: message.userID,
          tripID: message.tripID,
          message: message.message,
          timestamp: new Date(message.messageDate),
          response: message.response?.trim()
            ? JSON.parse(message.response)
            : null,
        };

        if (obj.response && obj.response.type === "final-itinerary") {
          setIsFinalItineraryReceived(true);
        }

        setMessages((prevMessages) => [...prevMessages, obj]);
      });
    });

    socket.on("room:chat-response", (response) => {
      const { data } = response;

      console.log(data);

      setMessages((prevMessages) => [...prevMessages, data]);

      setIsLoading(false);
    });

    socket.on("room:setTripStartAndEnd-response", (response) => {
      const { startDate, endDate } = response;

      console.log("Received trip dates from server:", response);

      setFinalItinerary((prev) => {
        if (!prev) {
          return prev;
        }

        return {
          ...prev,
          startDate: new Date(startDate),
          endDate: new Date(endDate),
        };
      });

      setNotificationConfig({
        open: true,
        type: "alert",
        message: "Trip dates have been updated",
        duration: 3000,
      });
    });

    socket.on("room:setTripBudget-response", (response) => {
      const { budget } = response;

      console.log("Received trip budget from server:", budget);

      setNotificationConfig({
        open: true,
        type: "alert",
        message: "Trip budget has been updated",
        duration: 3000,
      });
    });

    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  /*
   * Join the current trip room
   */
  useEffect(() => {
    const socket = socketRef.current;

    if (!socket || !tripId || !userDetails.userName) {
      return;
    }

    socket.emit("room:join", {
      tripID: tripId,
      userID: "123",
      userName: userDetails.userName,
    });

    socket.emit("room:fetchOldChat", {
      tripID: tripId,
      userID: "123",
    });
  }, [tripId, userDetails.userName]);

  const setTripDate = (startDate: Date, endDate: Date) => {
    if (!tripId || !socketRef.current) {
      return;
    }

    console.log("Setting trip dates:", {
      startDate,
      endDate,
    });

    socketRef.current.emit("room:setTripStartAndEnd", {
      tripID: tripId,
      startDate,
      endDate,
    });
  };

  const setTripBudget = (budget: number) => {
    if (!tripId || !socketRef.current) {
      return;
    }

    socketRef.current.emit("room:setTripBudget", {
      tripID: tripId,
      budget,
    });
  };

  const sendMessageHandler = async (userPrompt: string) => {
    if (!tripId || !socketRef.current) {
      return;
    }

    socketRef.current.emit("room:chat", {
      tripID: tripId,
      userPrompt,
    });

    setIsLoading(true);
  };

  const getFinalItinerary = async () => {
    if (!tripId) {
      return;
    }

    const apiServiceInstance = new APIService();

    const response = await apiServiceInstance.postRequest<any>(
      "/trip/fetchFinalItinerary",
      {
        tripID: tripId,
      }
    );

    console.log(response);

    if (response && response.data) {
      console.log("Processed trip itinerary dates:", response.data);

      setFinalItinerary({
        ...(JSON.parse(response.data.tripItinerary) as IFinalItineraryResponse),

        countUserOnTrip: response.data.countUserOnTrip,

        startDate: response.data.startDate,

        endDate: response.data.endDate,

        budget: response.data.budget,
      });
    }
  };

  useEffect(() => {
    if (isFinalItineraryReceived) {
      getFinalItinerary();
    }
  }, [isFinalItineraryReceived, tripId]);

  return {
    notificationConfig,
    sendMessageHandler,
    messages,
    isLoading,
    finalItinerary,
    setTripDate,
    setTripBudget,
  };
};

export default useTripSocketAction;
