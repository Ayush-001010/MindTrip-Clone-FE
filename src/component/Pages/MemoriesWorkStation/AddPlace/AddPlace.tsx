import React, { useEffect, useState } from "react";
import useCommonAction from "../../../../CustomHooks/useCommonAction";
import type IAddPlace from "./IAddPlace";
import AutoSuggestion from "../../../Common/AutoSuggestion/AutoSuggestion";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useGetMemoriesWorkStationContext } from "../MemoriesWorkStation";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";

const AddPlace: React.FC<IAddPlace> = ({ open , setOpen }) => {
    const reduceMotion = useReducedMotion();
    const [value, setValue] =   useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const { fetchPlaceName } = useCommonAction();
    const {changePlaces , memoriesData , setNotifyConfig } = useGetMemoriesWorkStationContext();

    const selectHandler = (value: string , type: "Add" | "Remove") => {
        if(type === "Add") {
            setSelectedValues((selected) => selected.includes(value) ? selected : [...selected, value]);
            setValue("");
            setSuggestions([]);
        } else if(type === "Remove") {
            setSelectedValues((selected) => selected.filter(v => v !== value));
        }
    };
    const changeHandler = async (value: string) => {
        setValue(value);
    };

    const changePlaceHandler = () => {
        if(selectedValues.length === 0) {
            setNotifyConfig({ type: "alert", message: "Please select at least one place", open: true , pos:"top-left" });
            return;
        }
        if(selectedValues.join(",") === memoriesData?.place) {
            setNotifyConfig({ type: "alert", message: "No changes detected", open: true , pos:"top-left" });
            return;
        }
        changePlaces(selectedValues);
        setOpen(false);
    };

    useEffect(() => {
        const timeout = setTimeout(async () => {
            if(!value || value.trim() === "") {
                setSuggestions([]);
                return;
            }
            const response = await fetchPlaceName(value);
            console.log("Place Name " ,response);
            setSuggestions(response?.data?.features.map((f : any) => f.place_name) || []);
        },800);

        return () => clearTimeout(timeout);
    },[value]);

    useEffect(() => {
        // Addresses use ", " internally; changePlaces joins separate addresses with ",".
        const places = (memoriesData?.place ?? "").split(/,(?=\S)/).map((place) => place.trim()).filter(Boolean);
        setSelectedValues([...new Set(places)]);
    }, [memoriesData?.place , open]);

    return (
        <AnimatePresence initial={false}>
            {open && (

                <motion.section
                    key="place-search"
                    id="add-place-search"
                    aria-label="Add places"
                    initial={{ width: 0, opacity: 0, x: reduceMotion ? 0 : 12 }}
                    animate={{ width: "100%", opacity: 1, x: 0 }}
                    exit={{ width: 0, opacity: 0, x: reduceMotion ? 0 : 8 }}
                    transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
                    className="relative min-w-0 max-w-md flex"
                >
                    <div onClick={() => setOpen(false)} className="mx-2 ring-1 ring-[#d90429] text-[#d90429] hover:bg-[#d90429] hover:!text-[#fff] cursor-pointer p-2 flex items-center justify-center rounded-lg h-10 w-10">
                        <IoIosCloseCircleOutline />
                    </div>
                    <div onClick={changePlaceHandler} className="mx-2 ring-1 ring-[#74c69d] cursor-pointer text-[#74c69d] hover:bg-[#74c69d] hover:!text-[#fff] p-2 flex items-center justify-center rounded-lg h-10 w-10">
                        <IoIosCheckmarkCircleOutline />
                    </div>
                    <AutoSuggestion changeHandler={changeHandler} value={value} suggestions={suggestions} selectHandler={selectHandler} isMultiSelect={true} selectedValues={selectedValues} />
                </motion.section>
            )}
        </AnimatePresence>
    );
};

export default AddPlace;