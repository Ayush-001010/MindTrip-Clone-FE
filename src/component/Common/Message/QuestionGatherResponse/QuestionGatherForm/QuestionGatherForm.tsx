
import React, { useState } from "react";
import type IQuestionGatherForm from "./IQuestionGatherForm";
import { Checkbox, Radio } from "antd";

const QuestionGatherForm: React.FC<IQuestionGatherForm> = ({
    questions,
    sendMessageHandler,
}) => {
    const [formValues, setFormValues] = useState<Record<string, any>>({});

    const handleSubmit = () => {
        const finalValues = { ...formValues };
    
        questions.forEach((question) => {
            if (question.type === "counter" && finalValues[question.description] === undefined) {
                finalValues[question.description] = question.defaultValue ?? question.min ?? 0;
            }
        });
    
        sendMessageHandler(finalValues);
    };
    const updateValue = (description: string, value: any) => {
        setFormValues((prev) => ({
            ...prev,
            [description]: value,
        }));
    };

    return (
        <section className="space-y-4">
            {questions.map((question, qIdx) => {
                const {
                    description,
                    type,
                    options,
                } = question;

                const min = question.min ?? 0;
                const max = question.max ?? 9;
                const defaultValue = question.defaultValue ?? min;

                return (
                    <div
                        key={qIdx}
                        className="bg-white/5 border border-white/6 rounded-md p-3"
                    >
                        <p className="text-sm text-white/95 mb-2">
                            {description}
                        </p>

                        {/* TEXT INPUT */}
                        {type === "text" && (
                            <input
                                aria-label={description}
                                className="w-full px-3 py-2 text-sm rounded-md bg-transparent border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400"
                                type="text"
                                placeholder="Your answer"
                                onChange={(e) =>
                                    updateValue(description, e.target.value)
                                }
                            />
                        )}

                        {/* DATE INPUT */}
                        {type === "date" && (
                            <input
                                aria-label={description}
                                className="w-full px-3 py-2 text-sm rounded-md bg-transparent border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
                                type="date"
                                min={new Date().toISOString().split("T")[0]}
                                onChange={(e) =>
                                    updateValue(description, e.target.value)
                                }
                            />
                        )}

                        {/* PASSENGER COUNTER */}
                        {type === "counter" && (
                            <div className="flex items-center justify-between max-w-[220px]">
                                <button
                                    type="button"
                                    onClick={() => {
                                        const current =
                                            Number(formValues[description] ?? defaultValue);
                                        if (current > min) {
                                            updateValue(description, String(current - 1));
                                        }
                                    }}
                                    disabled={
                                        Number(formValues[description] ?? defaultValue) <= min
                                    }
                                    className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    −
                                </button>

                                <span className="text-white text-base font-medium min-w-[24px] text-center">
                                    {formValues[description] ?? defaultValue}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => {
                                        const current =
                                            Number(formValues[description] ?? defaultValue);
                                        if (current < max) {
                                            updateValue(description, String(current + 1));
                                        }
                                    }}
                                    disabled={
                                        Number(formValues[description] ?? defaultValue) >= max
                                    }
                                    className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-white hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed"
                                >
                                    +
                                </button>
                            </div>
                        )}

                        {/* MULTIPLE CHOICE */}
                        {type === "multiple-choice" && (
                            <Checkbox.Group
                                onChange={(checkedValues) =>
                                    updateValue(description, checkedValues)
                                }
                            >
                                <div className="flex flex-col gap-2">
                                    {options?.map((option, idx) => (
                                        <label
                                            key={option ?? idx}
                                            className="flex items-center gap-2 text-sm text-gray-200"
                                        >
                                            <Checkbox value={option} />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </Checkbox.Group>
                        )}

                        {/* SINGLE CHOICE */}
                        {type === "single-choice" && (
                            <Radio.Group
                                onChange={(e) =>
                                    updateValue(description, e.target.value)
                                }
                            >
                                <div className="flex flex-col gap-2">
                                    {options?.map((option, idx) => (
                                        <label
                                            key={option ?? idx}
                                            className="flex items-center gap-2 text-sm text-gray-200"
                                        >
                                            <Radio value={option} />
                                            <span>{option}</span>
                                        </label>
                                    ))}
                                </div>
                            </Radio.Group>
                        )}
                    </div>
                );
            })}

            {/* SUBMIT */}
            <div className="mt-3 flex justify-end">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-[#003566] shadow-lg text-white rounded-lg hover:bg-[#002244] transition-colors cursor-pointer"
                >
                    Submit
                </button>
            </div>
        </section>
    );
};

export default QuestionGatherForm;
