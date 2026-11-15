import React, { useState } from "react";
import type IUserInvite from "./IUserInvite";
import { Modal } from "antd";
import GenrateLinkBox from "./GenrateLinkBox/GenrateLinkBox";
import MemberBox from "./MemberBox/MemberBox";
import useNotification from "../../../customHookWithUI/useNotification";

const UserInvite: React.FC<IUserInvite> = ({ openModal, closeFunc , limit, members , genrateUrl: createInviteUrl }) => {
    const [genrateUrl, setGenrateUrl] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const notification = useNotification(
        "error",
        "The limit has been reached.",
        showNotification,
        4000
    );

    const clickGenerate = async() => {
        if (members.length >= limit) {
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 1500);
            setGenrateUrl("");
            return;
        }

        const url = await createInviteUrl();
        setGenrateUrl(url);
    };

    const clickCopy = () => {
        navigator.clipboard.writeText(genrateUrl);
    };

    return (
        <Modal open={openModal}
            onCancel={closeFunc}
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
            }}>
                <main>
                    {notification}
                    <GenrateLinkBox value={genrateUrl} clickGenerate={clickGenerate} clickCopy={clickCopy} />
                    <hr/>
                    <MemberBox />
                </main>
            </Modal>
    );
};

export default UserInvite;
