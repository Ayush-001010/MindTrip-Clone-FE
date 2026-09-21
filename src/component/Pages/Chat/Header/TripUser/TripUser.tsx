import React, { useEffect, useState } from "react";
import type ITripUser from "./ITripUser";
import { Modal } from "antd";
import useTripAction from "../../../../../CustomHooks/useTripAction";
import InviteBox from "./InviteBox/InviteBox";
import MemberBox from "./MemberBox/MemberBox";
import CloseBox from "./CloseBox/CloseBox";

const TripUser: React.FC<ITripUser> = ({ open, onClose }) => {
    const { fetchTripMemberDetails } = useTripAction();
    const [members, setMembers] = useState<Array<{
        userId: string;
        userName: string;
        userEmail: string;
    }>>([]);

    const fetchMembers = async () => {
        const response : any = await fetchTripMemberDetails();
        if(response.success) {
            setMembers(response.data);
        }
    };

    useEffect(() => {
        if (open) {
            fetchMembers();
        }
    }, [open]);
    return (
        <Modal open={open} footer={null} closable={false} centered>
            <section className="bg-[#161a1d] h-100 rounded-lg border-none p-4">
                <CloseBox onClose={onClose} />
                <InviteBox />
                <MemberBox members={members} />
            </section>
        </Modal>
    )
};

export default TripUser;