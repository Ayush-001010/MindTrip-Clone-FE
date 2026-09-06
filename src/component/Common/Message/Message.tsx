import React, { useRef } from "react";
import type IIMessage from "./IMessage";
import moment from "moment";
import { LuBot } from "react-icons/lu";
import { RiUser3Fill } from "react-icons/ri";
import type ITripAPIResponse from "../../../Interface/DataInterface/ITripAPIResponse";
import DestinationResponse from "./DestinationResponse/DestinationResponse";

const Message: React.FC<IIMessage> = ({ data }) => {
    const { message, timestamp, response } = data;
    const formattedTimestamp = moment(timestamp).format("HH:mm DD'YY");
    const assistantBubbleClassName = useRef("max-w-[88%] rounded-[1.6rem] rounded-bl-md border border-slate-200/90 bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(241,245,249,0.94))] px-4 py-3.5 text-slate-800 shadow-[0_20px_40px_rgba(148,163,184,0.16)] ring-1 ring-sky-200/70 backdrop-blur-sm sm:max-w-[74%]");

    const generateAssistantResponse = (response: ITripAPIResponse)=> {
        response = JSON.parse(response as unknown as string) as ITripAPIResponse;
        switch (response.type) {
            case "destination": return <DestinationResponse data={response} />;
            default: return null;
        }
    }

    return (
        <section className="mt-5 flex w-full flex-col gap-3 px-3 py-2">
            <section className="flex w-full justify-end">
                <div className="flex max-w-[88%] items-end gap-2.5 sm:max-w-[74%]">
                    <div className="max-w-full rounded-[1.6rem] rounded-br-md border border-sky-200/80 bg-[linear-gradient(145deg,rgba(224,242,254,0.96),rgba(186,230,253,0.9))] px-4 py-3.5 text-slate-800 shadow-[0_20px_40px_rgba(125,211,252,0.18)] ring-1 ring-white/80 backdrop-blur-sm">
                        <p className="text-sm font-medium leading-6 text-slate-800">
                            {message}
                        </p>
                        <p className="mt-3 text-[0.68rem] font-medium tracking-[0.16em] text-slate-500">
                            {formattedTimestamp}
                        </p>
                    </div>
                    <span className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-sky-200/80 bg-white/90 text-sky-700 shadow-[0_10px_20px_rgba(148,163,184,0.14)] backdrop-blur-sm">
                        <RiUser3Fill className="h-4 w-4" />
                    </span>
                </div>
            </section>
            <div className="w-full">
                {!response && (
                    <section className="flex w-full justify-start">
                        <div className="flex max-w-[88%] items-end gap-2.5 sm:max-w-[74%]">
                            <span className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-sky-200/80 bg-sky-50 text-sky-700 shadow-[0_10px_24px_rgba(125,211,252,0.16)] backdrop-blur-sm">
                                <LuBot className="h-4 w-4" />
                            </span>
                            <div className={assistantBubbleClassName.current}>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2.5 shadow-inner shadow-slate-200/70">
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.55)] [animation-delay:-0.28s]"></span>
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)] [animation-delay:-0.14s]"></span>
                                        <span className="h-2 w-2 animate-bounce rounded-full bg-indigo-400 shadow-[0_0_12px_rgba(129,140,248,0.42)]"></span>
                                    </div>
                                    <div className="h-7 w-px bg-gradient-to-b from-sky-400/45 via-slate-300/40 to-transparent"></div>
                                    <div className="flex gap-1.5 pt-0.5">
                                        <span className="h-1.5 w-5 rounded-full bg-sky-400/65"></span>
                                        <span className="h-1.5 w-3 rounded-full bg-slate-300"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                {response && (
                    <section className="mt-1 flex w-full justify-start">
                        <div className="flex max-w-[88%] items-end gap-2.5 sm:max-w-[74%]">
                            <span className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-sky-200/80 bg-sky-50 text-sky-700 shadow-[0_10px_24px_rgba(125,211,252,0.16)] backdrop-blur-sm">
                                <LuBot className="h-4 w-4" />
                            </span>
                            <div className={assistantBubbleClassName.current}>
                                <div className="mb-3 h-px w-14 bg-gradient-to-r from-sky-400/45 via-cyan-300/35 to-transparent"></div>
                                <div className="text-sm font-medium leading-6 text-slate-700">
                                    {generateAssistantResponse(response)}
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </section>
    );
};

export default Message;