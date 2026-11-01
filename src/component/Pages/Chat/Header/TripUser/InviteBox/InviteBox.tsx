import React, { useState } from "react";
import type IInviteBox from "./IInviteBox";
import useTripAction from "../../../../../../CustomHooks/useTripAction";
import { BsCheck2, BsCopy } from "react-icons/bs";

const InviteBox: React.FC<IInviteBox> = ({ }) => {
    const { createInviteURL } = useTripAction();
    const [inviteURL, setInviteURL] = useState<string>("");
    const [copied, setCopied] = useState<boolean>(false);

    const createInviteURLHandler = async () => {
        const response: any = await createInviteURL();
        if(response.success) {
            setInviteURL(response.data.url);
            setCopied(false);
        }
    };

    const copyHandler = async () => {
        try {
            await navigator.clipboard.writeText(inviteURL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            setCopied(false);
        }
    };
    return (
        <section className="mt-4">
            <form className="w-full" onSubmit={(e) => e.preventDefault()} aria-label="Invite user form">
                <div className="flex w-full items-center shadow-sm rounded-md overflow-hidden border border-gray-200">
                    <label htmlFor="invite-input" className="sr-only">Invite someone</label>
                    <input
                        id="invite-input"
                        className="min-w-0 flex-1 truncate bg-white px-3 py-2 text-sm text-[#343a40] placeholder-gray-400 disabled:cursor-default"
                        type="text"
                        disabled={true}
                        value={inviteURL}
                        placeholder="Invite URL"
                    />
                    {inviteURL && (
                        <button
                            type="button"
                            aria-label={copied ? "Invite URL copied" : "Copy invite URL"}
                            title="Copy invite URL"
                            className="flex min-w-[88px] shrink-0 cursor-pointer items-center justify-center gap-1.5 self-stretch border-l border-gray-200 bg-[#e9ecef] px-3 py-2 text-sm font-medium text-[#212529] transition hover:bg-[#ced4da] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#495057] active:scale-95"
                            onClick={copyHandler}
                        >
                            {copied ? (
                                <>
                                    <BsCheck2 className="text-base" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <BsCopy className="text-sm" />
                                    Copy
                                </>
                            )}
                        </button>
                    )}
                    <button
                        type="button"
                        className="shrink-0 cursor-pointer self-stretch whitespace-nowrap border-l border-gray-200 bg-[#e9ecef] px-4 py-2 text-sm font-medium text-[#212529] transition hover:bg-[#ced4da] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#495057] active:scale-95"
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