import React, { useEffect, useState } from "react";
import type IHotel from "./IHotel";
import { Modal } from "antd";
import { useGetBlogContext } from "../../Blog";
import AddHotel from "./AddHotel/AddHotel";
import type { IBlogHotel } from "../../../../../../Interface/DataInterface/IBlogData";
import ShowHotel from "./ShowHotel/ShowHotel";

const Hotel: React.FC<IHotel> = ({ open, onClose }) => {
    const { blogValue, addingHotel } = useGetBlogContext();
    const [hotelDetails , setHotelDetails] = useState<IBlogHotel[]>([]);
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        setHotelDetails(blogValue?.hotel ?? []);
    }, [blogValue]);

    const addHotel = (hotel: IBlogHotel) => {
        addingHotel(hotel);
        setHotelDetails((prev) => [...prev, hotel]);
        setIsAdding(false);
    };

    return (
        <Modal open={open} onCancel={onClose} centered styles={{
            mask: {
                background: "rgba(0, 0, 0, 0.55)",
                backdropFilter: "blur(8px)",
            },
            container: {
                background: "#001219",
                padding: 0,
                boxShadow: "none",
            },
            body: {
                padding: "16px",
            },
            header: {
                display: "none",
            },
            footer: {
                display: "none",
            },
        }}>
            {isAdding ? (
                <AddHotel submitHotel={addHotel} />
            ) : (
                <ShowHotel hotelDetails={hotelDetails} onAddNewHotel={() => setIsAdding(true)} />
            )}
        </Modal>
    );
};

export default Hotel;