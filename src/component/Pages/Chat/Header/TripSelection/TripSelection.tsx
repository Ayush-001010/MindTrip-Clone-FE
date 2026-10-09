import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type ITripSelection from "./ITripSelection";
import Suggestion from "../../../../Common/Suggestion/Suggestion";
import type { ISuggestionOption } from "../../../../Common/Suggestion/ISuggestion";
import { CiEdit } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import useTripAction from "../../../../../CustomHooks/useTripAction";

const actions = [
    { label: "Edit trip", icon: <CiEdit />, hover: "hover:text-[#f8f9fa]" },
    { label: "Create new trip", icon: <CiCirclePlus />, hover: "hover:text-[#6a994e]" },
];

const TripSelection: React.FC<ITripSelection> = () => {
    const location = useLocation();
    const { fetchTripID , createNewTrip } = useTripAction();
    const [tripID, setTripID] = useState<string | null>(null);
    const [options , setOptions] = useState<ISuggestionOption[]>([]);
    const [changeHandlerTrigger , setChangeHandlerTrigger] = useState(false);

    const clickHandler = (actionLabel: string) => {
        if(actionLabel === "Create new trip"){
            createNewTrip().then(response => {
                console.log("Create New Trip Response: ", response);
                setChangeHandlerTrigger(prev => !prev);
            });
        }
    };  
    const onValueChange = (value: string) => {
        setTripID(value);
        setChangeHandlerTrigger(prev => !prev);
    };

    const onSelectOption = (option: ISuggestionOption) => {
        setTripID(option.value);
    };

    useEffect(() => {
        const path = location.pathname;
        console.log("Path    ", path);
        if (path !== '/chat') {
            setTripID(path.substring(path.lastIndexOf("/") + 1));
        }
    }, [location]);

    useEffect(() => {
        setTimeout(() => {
            fetchTripID().then(response => {
                if(!changeHandlerTrigger) return;
                console.log("Fetched Trip IDs: ", response);
                if(response.success && response.data){
                    setOptions((response.data as any).map((item:any) => ({
                        label:item.name,
                        value:item.id
                    })))
                }
            });
        }, 3000);
    }, [changeHandlerTrigger]);

    return (
        <section className="flex items-center gap-2">
            <Suggestion value={tripID || ""} onValueChange={onValueChange} options={options} onSelectOption={onSelectOption} placeholder="You Haven’t Selected a Trip Yet" />
            {actions.map(({ label, icon, hover }, index) => (
                <motion.button
                    key={label}
                    onClick={() => clickHandler(label)}
                    type="button"
                    title={label}
                    aria-label={label}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.15 + index * 0.1 }}
                    whileHover={{ scale: 1.15, rotate: index === 0 ? -8 : 90 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#495057] bg-[#242423] text-xl text-[#d6d6d6] transition-colors duration-200 hover:border-[#adb5bd] ${hover}`}
                >
                    {icon}
                </motion.button>
            ))}
        </section>
    )
};

export default TripSelection;
