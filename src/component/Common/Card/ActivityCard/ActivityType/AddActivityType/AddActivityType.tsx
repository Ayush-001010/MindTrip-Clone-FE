import React from "react";
import type IAddActivityType from "./IAddActivityType";

const AddActivityType: React.FC<IAddActivityType> = ({}) => {
    return (
        <section className="flex w-full flex-col">
            <select className="w-fit max-w-full rounded-md border border-gray-300 px-2 py-1 text-sm text-gray-700 outline-none">
                <option>Attraction</option>
                <option>Trek</option>
            </select>
        </section>
    );
};

export default AddActivityType;