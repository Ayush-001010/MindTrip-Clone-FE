import React from "react";
import QuestionGatherResponse from "./QuestionGatherResponse/QuestionGatherResponse";
import { motion } from "framer-motion";
import type IIMessage from "./IMessage";
import moment from "moment";
import { LuBot } from "react-icons/lu";
import type ITripAPIResponse from "../../../Interface/DataInterface/ITripAPIResponse";
import DestinationResponse from "./DestinationResponse/DestinationResponse";
import type IQuestionGatherResponse from "../../../Interface/DataInterface/IQuestionGatherResponse";
import UserMessage from "./UserMessage/UserMessage";
import Loader from "./Loader/Loader";
import type IItineraryOptions from "../../../Interface/DataInterface/IItineraryOptions";
import ItineraryOptions from "./ItineraryOptions/ItineraryOptions";

const Message: React.FC<IIMessage> = ({ data }) => {
    const { message, timestamp, response } = data;
    const formattedTimestamp = moment(timestamp).format("HH:mm DD/MM/YY");

    const generateAssistantResponse = (response: ITripAPIResponse | IQuestionGatherResponse | IItineraryOptions) => {
        if (typeof response === "string") {
            response = JSON.parse(response as unknown as string) as ITripAPIResponse;
        }
        switch (response.type) {
            case "destination": return <DestinationResponse data={response} />;
            case "question-gather": return <QuestionGatherResponse data={response} />;
            case "itinerary-options": return <ItineraryOptions itineraryOptions={response} />;
            default: return null;
        }
    }
    const assistantVariant = {
        hidden: { opacity: 0, y: 8 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <section className="mt-5 flex w-full flex-col gap-3 px-3 py-2">
            <UserMessage message={message} />
            <div className="w-full">
                {!response && (
                    <section className="flex w-full justify-start">
                        <div className="flex max-w-[88%] items-end gap-2.5 sm:max-w-[74%]">
                            <span className="mb-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-sky-200/80 bg-sky-50 text-sky-700 shadow-[0_10px_24px_rgba(125,211,252,0.16)] backdrop-blur-sm">
                                <LuBot className="h-4 w-4" />
                            </span>
                            <Loader />
                        </div>
                    </section>
                )}
                {(response && response.type !== "final-itinerary") && (
                    <>
                        <motion.section className="mt-1 flex w-full justify-start" variants={assistantVariant} initial="hidden" animate="show" transition={{ duration: 0.32 }}>
                            <div className="flex max-w-[88%] items-end gap-2.5 sm:max-w-[74%]">
                                <span className="mb-1 border p-2 rounded-lg bg-[#dee2e6] opacity-80 shadow-lg text-[#000]">
                                    <LuBot className="h-4 w-4" />
                                </span>
                                <div>
                                    <div className="mb-3 h-px w-14"></div>
                                    <div>
                                        {generateAssistantResponse(response)}
                                    </div>
                                </div>
                            </div>
                        </motion.section>
                        <div>
                            <motion.p className="text-[10px] ml-12 mt-2 text-[#fff]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>{formattedTimestamp}</motion.p>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Message;