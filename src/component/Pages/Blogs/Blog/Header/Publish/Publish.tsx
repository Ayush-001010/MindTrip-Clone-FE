import React, { useState } from "react";
import type IPublish from "./IPublish";
import { Modal } from "antd";
import MetaData from "./MetaData/MetaData";
import Profile from "./Profile/Profile";

const Publish: React.FC<IPublish> = ({ isOpen, onClose }) => {
    const [step , setStep] = useState(1);
    const [metadata, setMetadata] = useState([]);

    const saveMetadata = (metadata: any) => {
        setMetadata(metadata);
        setStep(1);
    };
    console.log("Metadata saved", metadata);

    return (
        <Modal width={step===1 ? 620 : undefined} centered open={isOpen} onCancel={onClose} styles={{
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
        }} footer={null}>
            <section>
                {step === 0 && <MetaData saveMetadata={saveMetadata} />}
                {step === 1 && <Profile />}
            </section>
        </Modal>
    );
};

export default Publish;