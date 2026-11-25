import React, { useEffect, useState } from "react";
import type { IAnalysicMessage } from "./IAnalysicMessage";
import useCommonAction from "../../../../../../CustomHooks/useCommonAction";
import MakerBoxConfig from "../../../../../../config/component/MakerBoxConfig";

const AnalysicMessage: React.FC<IAnalysicMessage> = () => {
    const [content, setContent] = useState<{
        content: string;
        imageUrl: string;
    }[]>(MakerBoxConfig.welcomeReelTextContent);
    const { getImages } = useCommonAction();
    const [index, setIndex] = useState<number>(0);


    useEffect(() => {
        setTimeout(() => {
            setIndex(1);
        }, 8000);
    }, [index, content]);

    const fetchImages = async () => {
        const resUrl1: { success: boolean, data?: string | undefined } = await getImages("Common/imgbin_9cd44fde6ae489ace4b2cc1c7335c50b.png");
        const resUrl2: { success: boolean, data?: string | undefined } = await getImages("Common/Firefly.png");
        if (resUrl1.success && resUrl2.success) {
            setContent(prevContent => prevContent.map((item, index) => {
                if (index === 0) {
                    return { ...item, imageUrl: resUrl1?.data || "" };
                }
                if (index === 1) {
                    return { ...item, imageUrl: resUrl2?.data || "" };
                }
                return item;
            }));
        }
    };
    useEffect(() => {
        fetchImages();
    }, []);
    return (
        <section className="flex flex-col items-center justify-center w-full h-180">
            {content.length > 0 && index === 0 && (
                <div className="mb-4 flex flex-col items-center">
                    {content[index].imageUrl && (
                        <section className="ring-2 ring-[#f5f3f4] rounded-full m-2 bg-[#242423] shadow-lg">
                            <img className="h-100 w-100 rounded-full object-cover -z-10 animate-bounce-fade-in" src={content[index].imageUrl} alt={`content-${index}`} />
                        </section>
                    )}
                    <p className="text-center text-sm text-[#adb5bd] animate-bounce-fade-in font-bold">{content[index].content}</p>
                </div>
            )}
            {content.length > 0 && index === 1 && (
                <div className="mb-4 flex flex-col items-center">
                    {content[index].imageUrl && (
                        <section className="ring-2 ring-[#f5f3f4] rounded-full m-2 bg-[#242423] shadow-lg">
                            <img className="h-100 w-100 rounded-full object-cover -z-10 animate-bounce-fade-in" src={content[index].imageUrl} alt={`content-${index}`} />
                        </section>
                    )}
                    <p className="text-center text-sm text-[#adb5bd] animate-bounce-fade-in font-bold">{content[index].content}</p>
                </div>
            )}
        </section>
    )
};

export default AnalysicMessage;