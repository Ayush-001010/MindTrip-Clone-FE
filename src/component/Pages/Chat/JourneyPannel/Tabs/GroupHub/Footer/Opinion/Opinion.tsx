import React, { useEffect, useState } from 'react';
import type IOpinion from './IOpinion';
import SentBox from '../SentBox/SentBox';
import { useChatContext } from '../../../../../Chat';

const Opinion: React.FC<IOpinion> = () => {
    const { createAction, sendNewMessage } = useChatContext();
    const [opinionText, setOpinionText] = useState("");

    const imageUrl = createAction?.type === "opinion" ? createAction.imageUrl : undefined;
    const title = createAction?.type === "opinion" ? createAction.title : undefined;

    useEffect(() => {
        if (imageUrl) {
            setOpinionText("");
        }
    }, [imageUrl]);

    const submitHandler = async () => {
        if (!sendNewMessage) return;

        if (imageUrl) {
            if (!title) return;
            sendNewMessage("opinion", { content: title, imageUrl });
            return;
        }

        if (!opinionText.trim()) return;
        sendNewMessage("opinion", { content: opinionText });
        setOpinionText("");
    };

    return (
        <section className="flex w-full flex-col gap-2 p-2">
            {imageUrl ? (
                <div className="flex flex-col gap-1.5 rounded-xl border border-sky-400/30 bg-sky-400/5 p-2">
                    <span className="w-fit rounded-full bg-sky-400/15 px-2 py-0.5 text-[0.65rem] font-semibold tracking-wide text-sky-300 uppercase">
                        Asking opinion
                    </span>
                    <div className="relative flex h-24 w-full items-end overflow-hidden rounded-lg shadow-inner">
                        <img
                            src={imageUrl}
                            alt={title || "Opinion"}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                        {title && (
                            <p className="relative z-10 line-clamp-2 p-2.5 pr-14 text-xs leading-snug font-medium text-white">
                                {title}
                            </p>
                        )}
                        <div className="absolute top-2 right-2 z-10">
                            <SentBox submitHandler={submitHandler} />
                        </div>
                    </div>
                </div>
            ) : (
                <section className="flex w-full items-center gap-3">
                    <input
                        type="text"
                        value={opinionText}
                        onChange={(e) => setOpinionText(e.target.value)}
                        placeholder="Type your opinion..."
                        className="h-12 w-full rounded-[1.45rem] border border-slate-200/90 px-4 text-[0.98rem] text-[#fff] outline-none transition-all duration-200 placeholder:text-[#e9ecef]"
                    />
                    <SentBox submitHandler={submitHandler} />
                </section>
            )}
        </section>
    );
};

export default Opinion;
