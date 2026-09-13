import { Modal } from "antd";
import type IShowInfoModel from "./IShowInfoModel";
import React from "react";

const ShowInfoModel: React.FC<IShowInfoModel> = ({ open, closeHandler, title, content }) => {
    return (
        <Modal
            open={open}
            onCancel={closeHandler}
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
            <div className="rounded-xl bg-black/65 p-4 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
                {title ? <h2 className="mb-2 text-lg font-semibold">{title}</h2> : null}
                {typeof content === "string" ? <p className="m-0 text-sm leading-6 text-white/90">{content}</p> : content}
            </div>
        </Modal>
    );
};

export default ShowInfoModel;
