import React, { useState, useEffect } from "react";
import type IPoll from "./IPoll";
import { useChatContext } from "../../../../../Chat";
import SentBox from "../SentBox/SentBox";

const POLL_OPTIONS = [1, 2, 3, 4];

const Poll : React.FC<IPoll> = () => {
    const [title, setTitle] = useState("");
    const [options, setOptions] = useState(Array(POLL_OPTIONS.length).fill(""));
    const {createAction,sendNewMessage} = useChatContext();

    const submitHandler = async () => {
        if(!sendNewMessage) return;

        sendNewMessage("poll",{content: title,options: options});
        
        console.log("Poll submitted");
    };
    useEffect(() => {
        if (createAction) {
            if(createAction.type === "poll") {
                setTitle(createAction.title || "");
                setOptions([
                    createAction.option1 ?? "",
                    createAction.option2 ?? "",
                    createAction.option3 ?? "",
                    createAction.option4 ?? ""
                ])
            }
        }
    }, [createAction]);
    
    return (
        <section className="flex w-full flex-col gap-2 p-2">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Type your poll question..."
                className="h-12 w-full rounded-[1.45rem] border border-slate-200/90 px-4 text-[0.98rem] font-medium text-[#fff] outline-none transition-all duration-200 placeholder:text-[#e9ecef]"
            />
            <section className="grid grid-cols-2 gap-2 pl-2">
                {POLL_OPTIONS.map((option) => (
                    <div key={option} className="flex items-center gap-2">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#343a40] text-xs font-semibold text-[#ced4da]">
                            {option}
                        </span>
                        <input
                            type="text"
                            value={options[option - 1]}
                            onChange={(e) => {
                                const newOptions = [...options];
                                newOptions[option - 1] = e.target.value;
                                setOptions(newOptions);
                            }}
                            placeholder={`Option ${option}`}
                            className="h-9 w-full rounded-[1.1rem] border border-slate-200/70 bg-transparent px-3 text-sm text-[#fff] outline-none transition-all duration-200 placeholder:text-[#e9ecef]/80 focus:border-slate-200"
                        />
                    </div>
                ))}
            </section>
            <div className="flex justify-end">
                <SentBox submitHandler={submitHandler}/>
            </div>
        </section>
    )
}

export default Poll;