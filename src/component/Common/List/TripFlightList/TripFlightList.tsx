import React from "react";
import type ITripFlightData from "../../../../Interface/DataInterface/ITripFlightData";
import TripFlightCard from "../../Card/TripFlightCard/TripFlightCard";

interface Props {
    flights: ITripFlightData[];
    onClose: () => void;
    onBook: (flight: ITripFlightData) => void;
}

const TripFlightList: React.FC<Props> = ({
    flights,
    onClose,
    onBook
}) => {
    return (
        <ul className="flex max-h-[60vh] flex-col gap-3 overflow-y-auto overscroll-contain scrollbar-thin pr-1">
            {flights.map((flight) => (
                <li key={flight.id ?? flight.flightId}>
                    <TripFlightCard
                        flight={flight}
                        onClose={onClose}
                        onBook={onBook}
                    />
                </li>
            ))}
        </ul>
    );
};

export default TripFlightList;