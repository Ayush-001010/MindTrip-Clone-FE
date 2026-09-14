import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type IQuestionGatherResponseInterface from "./IQuestionGatherResponse";
import QuestionGatherForm from "./QuestionGatherForm/QuestionGatherForm";
import { useChatContext } from "../../../Pages/Chat/Chat";

const QuestionGatherResponse: React.FC<IQuestionGatherResponseInterface> = ({ data }) => {
    const { questionDescription } = data;
    const {sendMessageHandler} = useChatContext();
    const [loading, setLoading] = useState(false);

    const sendMessageHandlerFormForm = (formValues: Record<string, any>) => {
        // Implement the message sending logic here
        console.log(formValues);
        sendMessageHandler(JSON.stringify({answerType:"question-gather" , ...formValues}));
    };

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => setLoading(false), 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section className="mt-8">
            <motion.p className="text-sm text-white/95 mb-2 max-w-prose" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.02 } } }} initial="hidden" animate="show">
                {questionDescription.split("").map((ch, i) => (
                    <motion.span key={i} className="inline-block" variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}>
                        {ch === " " ? "\u00A0" : ch}
                    </motion.span>
                ))}
            </motion.p>

            <section className="mt-3 border border-gray-700 p-4 rounded-lg">
                {loading ? (
                    <div className="mt-3 flex items-center gap-3 text-sm text-gray-300" aria-live="polite">
                        <svg className="h-5 w-5 text-sky-400 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        <span className="text-gray-300">Generating form…</span>
                    </div>
                ) : (
                    <QuestionGatherForm questions={data.questions} sendMessageHandler={sendMessageHandlerFormForm} />
                )}
            </section>
        </section>
    );
};

export default QuestionGatherResponse;