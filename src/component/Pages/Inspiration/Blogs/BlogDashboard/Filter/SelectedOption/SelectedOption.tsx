import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import type ISelectedOption from "./ISelectedOption";
import useCommonAction from "../../../../../../../customHooks/useCommonAction";
import useBlogAction from "../../../../../../../customHooks/useBlogAction";
import Suggestion from "../../../../../../Common/Suggestion/Suggestion";
import RadioOption from "../../../../../../Common/RadioOption/RadioOption";

const budgetOptions = [
    { label: "Under 5K", value: "5000" },
    { label: "Under 10K", value: "10000" },
    { label: "Under 20K", value: "20000" },
    { label: "Under 50K", value: "50000" },
];

const numberOfPlaceOptions = [
    { label: "10 Places", value: "10" },
    { label: "20 Places", value: "20" },
    { label: "30 Places", value: "30" },
];

const SelectedOption: React.FC<ISelectedOption> = ({ selectFilterType, onCommitValue }) => {
    const [displayType, setDisplayType] = useState<"dropdown" | "checkbox" | null>(null);
    const { getPlaceName } = useCommonAction();
    const { getProfileAndTitle, searchMetaData } = useBlogAction();
    const [placeOptions, setPlaceOptions] = useState<{label: string, value: string}[]>([]);
    const [profileOptions, setProfileOptions] = useState<{label: string, value: string}[]>([]);
    const [tagOptions, setTagOptions] = useState<{label: string, value: string}[]>([]);
    const [value, setValue] = useState<string | null>(null);
    const [finalValue, setFinalValue] = useState<string | null>(null);
    const [isSearching, setIsSearching] = useState(false);

    const changeHandler = (newValue: string | null) => {
        setValue(newValue);
    };

    useEffect(() => {
        setPlaceOptions([]);
        setProfileOptions([]);
        setTagOptions([]);
        if (selectFilterType === "numberOfPlace" || selectFilterType === "budget") {
            setDisplayType("checkbox");
        } else {
            setDisplayType("dropdown");
            switch (selectFilterType) {
                default:
                    break;
            }
        }
    }, [selectFilterType]);

    useEffect(() => {
        if (selectFilterType === "numberOfPlace" || selectFilterType === "budget") return;
        if (!value) {
            setIsSearching(false);
            return;
        }
        if(!isSearching && finalValue === value) return;
        setIsSearching(true);
        const timeOutID = setTimeout(async()=>{
            switch (selectFilterType) {
                case "location":
                    const res = await getPlaceName(value as string);
                    setPlaceOptions(res.map((item: any) => ({ label: item.place_name, value: item.place_name })));
                    break;
                case "profile":
                    const profileRes = await getProfileAndTitle(value as string);
                    setProfileOptions(profileRes.map((item) => {
                        const label = [item.profile, item.title].filter(Boolean).join(" • ");
                        return { label, value: label };
                    }));
                    break;
                case "tags":
                    const tagsRes = await searchMetaData(value as string);
                    setTagOptions(tagsRes.map((item) => ({ label: item.value, value: item.value })));
                    break;
                default:
                    break;
            }
            setIsSearching(false);
        },2000);
        return () => clearTimeout(timeOutID);
    }, [value]);

    const genrateUIAccordingToDisplayType = () => {
        switch (displayType) {
            case "dropdown":
                switch (selectFilterType) {
                    case "location":
                        return (
                            <Suggestion
                                key="location"
                                value={value ?? ""}
                                onValueChange={changeHandler}
                                options={placeOptions}
                                isLoading={isSearching}
                                placeholder="Search a place..."
                                loadingText="Searching..."
                                emptyText="No places found"
                                onSelectOption={(option) => {
                                    setFinalValue(option.value);
                                    setIsSearching(false);
                                    setValue(option.value);
                                    setPlaceOptions([]);
                                    onCommitValue?.("location", option.value);
                                }}
                            />
                        );
                    case "profile":
                        return (
                            <Suggestion
                                key="profile"
                                value={value ?? ""}
                                onValueChange={changeHandler}
                                options={profileOptions}
                                isLoading={isSearching}
                                placeholder="Search profile or title..."
                                loadingText="Searching..."
                                emptyText="No matches found"
                                onSelectOption={(option) => {
                                    setFinalValue(option.value);
                                    setIsSearching(false);
                                    setValue(option.value);
                                    setProfileOptions([]);
                                    onCommitValue?.("profile", option.value);
                                }}
                            />
                        );
                    case "tags":
                        return (
                            <Suggestion
                                key="tags"
                                value={value ?? ""}
                                onValueChange={changeHandler}
                                options={tagOptions}
                                isLoading={isSearching}
                                placeholder="Search tags..."
                                loadingText="Searching..."
                                emptyText="No tags found"
                                onSelectOption={(option) => {
                                    setFinalValue(option.value);
                                    setIsSearching(false);
                                    setValue(option.value);
                                    setTagOptions([]);
                                    onCommitValue?.("tags", option.value);
                                }}
                            />
                        );
                    default:
                        return null;
                }
            case "checkbox":
                switch (selectFilterType) {
                    case "numberOfPlace":
                        return (
                            <RadioOption
                                key="numberOfPlace"
                                title="Number of Places"
                                options={numberOfPlaceOptions}
                                value={value}
                                onChange={(newValue) => {
                                    setFinalValue(newValue);
                                    setValue(newValue);
                                    onCommitValue?.("numberOfPlace", newValue);
                                }}
                            />
                        );
                    case "budget":
                        return (
                            <RadioOption
                                key="budget"
                                title="Budget"
                                options={budgetOptions}
                                value={value}
                                onChange={(newValue) => {
                                    setFinalValue(newValue);
                                    setValue(newValue);
                                    onCommitValue?.("budget", newValue);
                                }}
                            />
                        );
                    default:
                        return null;
                }
            default:
                return null;
        }
    }

    return (
        <section>
            <AnimatePresence mode="wait">
                {genrateUIAccordingToDisplayType()}
            </AnimatePresence>
        </section>
    );
};

export default SelectedOption;