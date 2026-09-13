import React, { useState } from "react";
import type IInviteBox from "./IInviteBox";
import useTripAction from "../../../../../../customHooks/useTripAction";

const InviteBox: React.FC<IInviteBox> = ({ }) => {
    const { createInviteURL } = useTripAction();
    const [inviteURL, setInviteURL] = useState<string>("");

    const createInviteURLHandler = async () => {
        const response: any = await createInviteURL();
        if(response.success) {
            setInviteURL(response.data.url);
        }
    };
    return (
        <section className="mt-4">
            <form className="w-full" onSubmit={(e) => e.preventDefault()} aria-label="Invite user form">
                <div className="flex w-full items-center shadow-sm rounded-md overflow-hidden border border-gray-200">
                    <label htmlFor="invite-input" className="sr-only">Invite someone</label>
                    <input
                        id="invite-input"
                        className="flex-1 px-3 py-2 text-sm placeholder-gray-400 bg-white"
                        type="text"
                        disabled={true}
                        value={inviteURL}
                        placeholder="Invite URL"
                    />
                    <button
                        type="button"
                        className="bg-[#e9ecef] hover:bg-[#ced4da] text-[#000] cursor-pointer px-4 py-2 text-sm font-medium"
                        onClick={createInviteURLHandler}
                    >
                        Generate Invite URL
                    </button>
                </div>
            </form>
        </section>
    );
};

export default InviteBox;