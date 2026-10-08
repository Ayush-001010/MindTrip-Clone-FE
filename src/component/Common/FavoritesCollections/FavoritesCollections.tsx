import React from "react";
import type IFavoritesCollections from "./IFavoritesCollections";
import { Modal } from "antd";
import CreateCollections from "./CreateCollections/CreateCollections";
import ShowCollections from "./ShowCollections/ShowCollections";

const FavoritesCollections: React.FC<IFavoritesCollections> = ({ open, onClose, uiType , addFavoritesItem }) => {
    console.log(uiType);
    return (
        <Modal open={open} onCancel={onClose} footer={null}
            title={null}
            centered
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
            }}>
            <div className="rounded-2xl bg-black/65 p-6 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
                {uiType === "create-collection" && <CreateCollections onClose={onClose} />}
                {uiType === "show-collection-for-add-purpose" && <ShowCollections addFavoritesItem={addFavoritesItem} />}
            </div>
        </Modal>
    )
};

export default FavoritesCollections;