import React from "react";
import type IHotel from "./IHotel";
import { Modal } from "antd";
import { useGetBlogContext } from "../../Blog";
import AddHotel from "./AddHotel/AddHotel";

const Hotel: React.FC<IHotel> = ({ open, onClose }) => {
    const { mode } = useGetBlogContext();
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
            {mode === "create" && <AddHotel />}
        </Modal>
    );
};

export default Hotel;