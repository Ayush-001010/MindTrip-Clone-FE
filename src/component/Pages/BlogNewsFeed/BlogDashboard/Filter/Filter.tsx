import React, { useEffect, useState } from "react";
import type IFilter from "./IFilter";
import type IBlogFilters from "../IBlogFilters";
import type { SelectFilterType } from "./SelectedOption/ISelectedOption";
import Options from "./Options/Options";
import SelectedOption from "./SelectedOption/SelectedOption";

const Filter: React.FC<IFilter> = ({ onFiltersChange }) => {
    const [selectFilterType, setSelectFilterType] = useState<SelectFilterType>(null);
    const [filters, setFilters] = useState<IBlogFilters>({});

    useEffect(() => {
        onFiltersChange?.(filters);
    }, [filters]);

    const commitValue = (filterType: Exclude<SelectFilterType, null>, value: string) => {
        setFilters((prev) => {
            const next = { ...prev };
            switch (filterType) {
                case "location":
                    next.placeName = value || undefined;
                    break;
                case "profile":
                    next.profileOrTitle = value || undefined;
                    break;
                case "tags":
                    next.metaData = value ? [value] : undefined;
                    break;
                case "budget":
                    next.budget = value ? Number(value) : undefined;
                    break;
                case "numberOfPlace":
                    next.noOfPlaces = value ? Number(value) : undefined;
                    break;
            }
            return next;
        });
    };

    return (
        <section className="flex justify-between">
            <SelectedOption selectFilterType={selectFilterType} onCommitValue={commitValue} />
            <Options setSelectFilterType={setSelectFilterType} />
        </section>
    );
};

export default Filter;