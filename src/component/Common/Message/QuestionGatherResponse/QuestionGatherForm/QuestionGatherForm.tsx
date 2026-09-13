import React from "react";
import type IQuestionGatherForm from "./IQuestionGatherForm";
import { Radio } from "antd";

const QuestionGatherForm: React.FC<IQuestionGatherForm> = ({ questions }) => {
    return (
        <section className="space-y-4">
            {questions.map(({ description, type, options }, qIdx) => (
                <div key={qIdx} className="bg-white/5 border border-white/6 rounded-md p-3">
                    <p className="text-sm text-white/95 mb-2">{description}</p>

                    {type === "text" && (
                        <input
                            aria-label={description}
                            className="w-full px-3 py-2 text-sm rounded-md bg-transparent border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                            type="text"
                            placeholder="Your answer"
                        />
                    )}

                    {type === "multiple-choice" && (
                        <div className="flex flex-col gap-2">
                            <Radio.Group>
                                {options?.map((option, idx) => (
                                    <label key={option ?? idx} className="flex items-center gap-2 text-sm text-gray-200">
                                        <Radio value={option} />
                                        <span>{option}</span>
                                    </label>
                                ))}
                            </Radio.Group>
                        </div>
                    )}
                </div>
            ))}
        </section>
    );
};

export default QuestionGatherForm;