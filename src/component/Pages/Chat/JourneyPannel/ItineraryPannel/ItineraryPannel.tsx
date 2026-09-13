import React from "react";
import type IItineraryPannel from "./IItineraryPannel";
import { Collapse } from 'antd';
import LabelHeader from "./LabelHeader/LabelHeader";
import Itinerary from "./Itinerary/Itinerary";

const ItineraryPannel: React.FC<IItineraryPannel> = () => {
    const itinerary = [
        {
            key: 1,
            label: <LabelHeader text="Day 1" />,
            children: <Itinerary/>,
        },
        {
            key: 2,
            label: <LabelHeader text="Day 2" />,
            children: <Itinerary/>,
        },
        {
            key: 3,
            label: <LabelHeader text="Day 3" />,
            children: <Itinerary/>,
        },
        {
            key: 4,
            label: <LabelHeader text="Day 4" />,
            children: <Itinerary/>,
        },
        {
            key: 5,
            label: <LabelHeader text="Day 5" />,
            children: <Itinerary/>,
        }
    ];

    return (
        <section>
            <Collapse
                bordered={false}
                defaultActiveKey={['1']}
                items={itinerary}
                expandIconPosition="end"
                style={{ backgroundColor: 'transparent', border: 'none' }}
                className="itinerary-collapse rounded-lg shadow-md text-white!"
            />
        </section>
    );
};

export default ItineraryPannel;