import React, { useEffect, useState } from "react";
import type IMemories from "./IMemories";
import type IMemoriesData from "../../../Interface/DataInterface/IMemoriesData";
import Header from "./Header/Header";
import NotCreatedYet from "./NotCreatedYet/NotCreatedYet";
import useMemoriesAction from "../../../CustomHooks/useMemoriesAction";
import { useSelector } from "react-redux";
import MemoriesCard from "../../Common/Card/MemoriesCard/MemoriesCard";
import useCommonAction from "../../../CustomHooks/useCommonAction";

const Memories: React.FC<IMemories> = () => {
    const [buttonAnimation , setButtonAnimation] = useState<boolean>(true);
    const [isNewCreated, setIsNewCreated] = useState<boolean>(false);
    const [memoriesData , setMemoriesData] = useState<IMemoriesData[] | null>(null);
    const [imageUrl , setImageUrl] = useState<string | null>(null);
    const { fetchMemories } = useMemoriesAction();
    const { userID } = useSelector((state: any) => state.userDetails);
    const {getImages} = useCommonAction();



    useEffect(() => {
        const timeObj = setTimeout(() => {
            if(buttonAnimation)
                setButtonAnimation(false);
        }, 1000);

        return () => clearTimeout(timeObj);
    }, [buttonAnimation]);

    useEffect(() => {
        if(isNewCreated && userID) {
            fetchMemories(userID).then((data) => setMemoriesData(data));
            setIsNewCreated(false);
        }
    }, [isNewCreated]);

    useEffect(() => {
        if(userID) {
            fetchMemories(userID).then((data) => setMemoriesData(data));
            getImages("Common/crossed-swords-ezgif.com-gif-to-mp4-converter.gif").then((res:any) => {
                setImageUrl(res?.data || "");
            });
        }
    }, [userID]);

    return (
        <main className="m-4">
            <Header buttonAnimation={buttonAnimation} setIsNewCreated={setIsNewCreated} />
            <hr className="my-4 border-[#495057]" />
            {memoriesData === null || memoriesData.length === 0 ? (
                <NotCreatedYet setButtonAnimation={setButtonAnimation} />
            ) : (
                <section aria-label="Memories" className="grid grid-cols-1 justify-items-center gap-6 py-4 md:grid-cols-2 xl:grid-cols-3">
                    {memoriesData.map((memory) => (
                        <MemoriesCard imageUrl={imageUrl || ""} key={memory.id.toString() + "-Memories-List-Card"} data={memory} />
                    ))}
                </section>
            )}
        </main>
    );
};

export default Memories;