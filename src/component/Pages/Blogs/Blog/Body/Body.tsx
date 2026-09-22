import React from "react";
import type IBody from "./IBody";
import { useGetBlogContext } from "../Blog";
import Map from "../../../../Common/Map/Map";
import Activity from "./Activity/Activity";

const Body: React.FC<IBody> = () => {
    const {blogValue} = useGetBlogContext();

    return (
        <div className="w-full flex p-4">
            <section className="w-1/2">
                {blogValue?.activities.map((_, index) => (
                    <Activity key={index} designArr={[
                        {type:"overview"}
                    ]} />
                ))}
            </section>
            <section className="w-1/2 shadow-lg rounded-lg p-2 h-[630px] bg-[#212529]">
                <Map/>
            </section>
        </div>
    );
};

export default Body;