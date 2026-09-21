import React, { useEffect, useState } from "react";
import type IQuestionResponse from "./IQuestionResponse";

const QuestionResponse: React.FC<IQuestionResponse> = ({ record }) => {
    const [formConfig, setFormConfig] = useState<Record<string,any>>({});

    useEffect(()=>{
        const keys = Object.keys(record);
        const config: Record<string, any> = {};
        keys.forEach(key => {
            if(key === "answerType")return;
            config[key] = { value: record[key] };
        });
        setFormConfig(config);
    },[record]);


    return (
        <section className="mt-3  border border-gray-700 p-4 rounded-lg">
            <p className="text-xs text-white/95 mb-2">
                Your Answer
            </p>
            {Object.keys(formConfig).map(key => (
                <div key={`QuestionResponse-${key}`} className="bg-white/5 border border-white/6 rounded-md p-3 mb-2">
                    <p className="text-xs text-white/95 mb-1">
                        <span>Q)</span>
                        {key}
                    </p>
                    <input className="w-full px-3 py-2 text-sm rounded-md bg-transparent border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400" type="text" value={formConfig[key].value} readOnly />
                </div>
            ))}
        </section>
    )
};

export default QuestionResponse;