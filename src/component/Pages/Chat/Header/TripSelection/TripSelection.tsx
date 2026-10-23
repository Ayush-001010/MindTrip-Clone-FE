import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type ITripSelection from "./ITripSelection";
import type { ISuggestionOption } from "../../../../Common/Suggestion/ISuggestion";
import { CiEdit } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import useTripAction from "../../../../../CustomHooks/useTripAction";
import { Select } from "antd";
import useTripSocketAction from "../../../../../customHooks/useTripSocketAction";

const actions = [
    { label: "Edit trip", icon: <CiEdit />, hover: "hover:text-[#f8f9fa]" },
    { label: "Create new trip", icon: <CiCirclePlus />, hover: "hover:text-[#6a994e]" },
];

const TripSelection: React.FC<ITripSelection> = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const {editTripName} = useTripSocketAction();
    const { fetchTripID, createNewTrip } = useTripAction();
    const [tripID, setTripID] = useState<string | null>(null);
    const [options, setOptions] = useState<ISuggestionOption[]>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editValue, setEditValue] = useState("");

    const clickHandler = (actionLabel: string) => {
        if (actionLabel === "Create new trip") {
            createNewTrip().then((response: any) => {
                console.log("Create New Trip Response: ", response);
                navigate(`/chat/${response.data.url}`);
            });
        } else if (actionLabel === "Edit trip") {
            if (!isEdit) {
                setIsEdit(true);
                options.forEach(option => {
                    if (option.value === tripID) {
                        setEditValue(option.label);
                    }
                });
            } else {
                setIsEdit(false);
                let oldTripName = options.find(option => option.value === tripID)?.label;
                if(oldTripName !== editValue) {
                    editTripName(editValue);
                    setOptions(options.map(option => option.value === tripID ? { ...option, label: editValue } : option));
                }
            }
        }
    };
    const onValueChange = (value: string) => {
        setTripID(value);
        navigate(`/chat/${value}`);

    };

    useEffect(() => {
        const path = location.pathname;
        console.log("Path    ", path);
        if (path !== '/chat') {
            setTripID(path.substring(path.lastIndexOf("/") + 1));
        }
    }, [location]);

    useEffect(() => {
        fetchTripID().then(response => {
            if (response.success && response.data) {
                setOptions((response.data as any).map((item: any) => ({
                    label: item.name || item.id,
                    value: item.id
                })))
            }
        });
    }, []);

    return (
        <section className="flex items-center gap-2">
            <section>
                {!isEdit && (
                    <Select
                        className="trip-selection-select !h-9 min-w-[200px]"
                        classNames={{ popup: { root: "trip-selection-dropdown" } }}
                        value={tripID || undefined}
                        onChange={onValueChange}
                        options={options.map(option => ({ label: option.label, value: option.value }))}
                        placeholder="You Haven’t Selected a Trip Yet"
                    />
                )}
                {isEdit && (
                    <input
                        className="trip-selection-input !h-9 min-w-[200px] border-[#6c757d] text-[#dee2e6] border-b-1"
                        value={editValue || ""}
                        onChange={(e) => setEditValue(e.target.value)}
                        placeholder="You Haven’t Selected a Trip Yet"
                    />
                )}
            </section>
            {actions.map(({ label, icon, hover }, index) => {
                if (!tripID && label === "Edit trip") return null;
                return (
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
                );
            })}
        </section>
    )
};

export default TripSelection;
