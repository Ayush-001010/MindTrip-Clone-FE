
import React, { useEffect, useState } from "react";
import { Modal } from "antd";
import { FaPlane } from "react-icons/fa";
import type ITripFlightData from "../../../../Interface/DataInterface/ITripFlightData";
import { useChatContext } from "../../../Pages/Chat/Chat";
import useTripAction from "../../../../CustomHooks/useTripAction";
import TripFlightList from "../../List/TripFlightList/TripFlightList";

interface Props {
    open: boolean;
    onClose: () => void;
}

const ShowBookedFlightsModel: React.FC<Props> = ({
    open,
    onClose
}) => {
    const { bookFlightHandler } = useChatContext();
    const { fetchTripFlightDetails } = useTripAction();

    const [flights, setFlights] = useState<ITripFlightData[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) return;

        setLoading(true);

        fetchTripFlightDetails()
            .then(response => {
                setFlights(response.data ?? []);
            })
            .catch(error => {
                console.error("Error fetching flights:", error);
                setFlights([]);
            })
            .finally(() => setLoading(false));

    }, [open]);

    return (
        <Modal
            open={open}
            onCancel={onClose}
            centered
            width={640}
            footer={null}
            title={null}
            rootClassName="transparent-modal"
            styles={{
                mask: {
                    background: "rgba(0, 0, 0, 0.55)",
                    backdropFilter: "blur(8px)",
                },
                container: {
                    background: "transparent",
                    padding: 0,
                    boxShadow: "none",
                },
                body: {
                    padding: 0,
                    background: "transparent",
                },
                header: {
                    display: "none",
                },
                footer: {
                    display: "none",
                },
            }}
            closeIcon={<span className="text-white text-lg">x</span>}
        >
            <main className="rounded-2xl bg-gradient-to-b from-gray-900/90 to-black/90 p-8 text-white shadow-2xl ring-1 ring-white/10">

                <header className="flex items-center gap-3 border-b border-white/10 pb-4">
                    <FaPlane className="text-2xl text-blue-400" />
                    <div>
                        <h2 className="text-xl font-semibold">
                            My Flights
                        </h2>
                        <p className="mt-1 text-sm text-white/50">
                            Your saved flight selections
                        </p>
                    </div>
                </header>

                {loading ? (
                    <p className="py-10 text-center text-white/50">
                        Loading your flights...
                    </p>
                ) : flights.length > 0 ? (
                    <section className="pt-4">
                        <TripFlightList
                            flights={flights}
                            onClose={onClose}
                            onBook={bookFlightHandler}
                        />
                    </section>
                ) : (
                    <section className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                        <span className="text-3xl">✈️</span>
                        <p className="text-sm text-white/60">
                            You haven't booked any flights yet
                        </p>
                    </section>
                )}
            </main>
        </Modal>
    );
};

export default ShowBookedFlightsModel;
