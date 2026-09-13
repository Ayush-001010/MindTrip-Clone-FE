import React, { useEffect, useRef } from "react";
import type IHorizontalCardList from "./IHorizontalCardList";
import useHorizontalCardList from "../../../customHooks/useHorizontalCardList";
import type IExploreTrip from "../../../Interface/DataInterface/IExploreTrip";
import ExploreTripCard from "../Card/ExploreTrip/ExploreTripCard";

const HorizontalCardList: React.FC<IHorizontalCardList> = ({ endPoint, type }) => {
    const { data, setNewPage } = useHorizontalCardList(endPoint, type);
    const scrollDiv = useRef<HTMLDivElement>(null);

    const fetchCardComponentDependOnType = (item: IExploreTrip) => {
        switch (type) {
            case "explore-trip":
                return <ExploreTripCard data={item} />
            default:
                return null;
        }
    }

    useEffect(()=>{
        // add scorll
        const div = scrollDiv.current;
        if (div) {
            const handleScroll = () => {
                const percentageCover = (div.scrollLeft / (div.scrollWidth - div.clientWidth)) * 100;
                if(percentageCover > 90) {
                    setNewPage();
                }
            };
            div.addEventListener("scroll", handleScroll);
            return () => {
                div.removeEventListener("scroll", handleScroll);
            };
        }
    },[]);

   

    return (
        <div className="flex gap-8 overflow-x-auto pb-2" ref={scrollDiv}>
            {data.map(item => (
                <React.Fragment key={item.id}>
                    {fetchCardComponentDependOnType(item)}
                </React.Fragment>
            ))}
        </div>
    );
};

export default HorizontalCardList;