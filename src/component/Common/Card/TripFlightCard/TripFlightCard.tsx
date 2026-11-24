
import React from "react";
import type ITripFlightData from "../../../../Interface/DataInterface/ITripFlightData";
import BookedFlightCard from "../BookedFlightCard/BookedFlightCard";
import UnbookedFlightCard from "../UnbookedFlightCard/UnbookedFlightCard";


interface Props {
    flight: ITripFlightData;
    onClose: () => void;
    onBook: (flight: ITripFlightData) => void;
}

const TripFlightCard: React.FC<Props> = ({
    flight,
    onClose,
    onBook
}) => {
    return flight.isBooked
        ? <BookedFlightCard flight={flight} onClose={onClose} />
        : <UnbookedFlightCard
            flight={flight}
            onClose={onClose}
            onBook={onBook}
        />;
};

export default TripFlightCard;
