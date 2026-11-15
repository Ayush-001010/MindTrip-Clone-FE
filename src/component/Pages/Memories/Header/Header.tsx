import React, { useEffect, useRef, useState } from "react";
import type IHeader from "./IHeader";
import { useSelector } from "react-redux";
import useMemoriesAction from "../../../../CustomHooks/useMemoriesAction";
import { Tooltip } from "antd";
import { CiEdit } from "react-icons/ci";
import { motion, useReducedMotion } from "framer-motion";
import useNotification from "../../../../customHookWithUI/useNotification";

const Header: React.FC<IHeader> = ({ buttonAnimation , setIsNewCreated }) => {
    const { userID } = useSelector((state: any) => state.userDetails);
    const { fetchMemoriesLeft , createNewMemory } = useMemoriesAction();
    const [memoriesLeft, setMemoriesLeft] = useState<number | null>(null);
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const memoryNameInput = useRef<HTMLInputElement>(null);
    const shouldReduceMotion = useReducedMotion();
    const inputRevealTransition = {
        duration: shouldReduceMotion ? 0 : 0.65,
        ease: "easeInOut" as const,
    };
    const [showNotification, setShowNotification] = useState(false);
    const [notificationType, setNotificationType] = useState<"success" | "error">("success");
    const [notifocationMessage, setNotificationMessage] = useState("");
    const [memoryName, setMemoryName] = useState("");

    const notification = useNotification(
        notificationType,
        notifocationMessage,
        showNotification,
        4000,
        "top-left"
    );


    const createNewMemoryHandler = async () => {
        if(memoryName.trim() === "") {
            setNotificationType("error");
            setNotificationMessage("Kindly fill in the memory name.");
            setShowNotification(true);
            return;
        }
        const response = await createNewMemory(userID, memoryName);
        if(response) {
            setNotificationType("success");
            setNotificationMessage("Memory created successfully.");
            setShowNotification(true);
            setMemoryName("");
            setIsCreating(false);
            setIsNewCreated(true);
        } else {
            setNotificationType("error");
            setNotificationMessage("Failed to create memory.");
            setShowNotification(true);
        }
    }

    const clickHandler = () => {
        if(isCreating) return;
        setIsCreating(true);
    }

    useEffect(() => {
        console.log(userID);
        if (userID) {
            fetchMemoriesLeft(userID).then((memoriesLeft) => {
                console.log(memoriesLeft);
                setMemoriesLeft(memoriesLeft);
            });
        }
    }, [userID]);

    return (
        <header className="flex flex-wrap justify-between items-center gap-4">
            {notification}
            <section className="text-[#ced4da] text-md font-medium">
                <Tooltip title="You can create or join up to 5 memories on a single account.">
                    <span>
                        Memories left: {memoriesLeft !== null ? memoriesLeft === 0 ? "No memories left" : memoriesLeft : "Loading..."}
                    </span>
                </Tooltip>
            </section>
            {memoriesLeft !== null && memoriesLeft > 0 && !isCreating && (
                <section>
                    {buttonAnimation ?
                        <button onClick={clickHandler} className={`bg-[#161a1d]  p-2 rounded ring-1 ring-[#ced4da] shadow-xs text-[#e9ecef] cursor-pointer hover:bg-[#1f2225] shadow-[#ced4da] animate-jelly`}>
                            Create Memory
                        </button> :
                        <button onClick={clickHandler} className="bg-[#161a1d]  p-2 rounded ring-1 ring-[#ced4da] shadow-xs text-[#e9ecef] cursor-pointer hover:bg-[#1f2225] shadow-[#ced4da]">
                            Create Memory
                        </button>
                    }
                </section>
            )}
            {isCreating && memoriesLeft !== null && memoriesLeft > 0 && (
                <section className="relative w-full sm:w-72">
                    <motion.input
                        ref={memoryNameInput}
                        value={memoryName}
                        onChange={(e) => setMemoryName(e.target.value)}
                        type="text"
                        name="memoryName"
                        aria-label="Memory name"
                        placeholder="Name your memory"
                        initial={{ clipPath: "inset(0 0 0 100%)" }}
                        animate={{ clipPath: "inset(0 0 0 0%)" }}
                        transition={inputRevealTransition}
                        onAnimationComplete={() => memoryNameInput.current?.focus()}
                        className="w-full rounded-md border border-zinc-700 bg-transparent py-2 pr-3 pl-10 text-sm text-zinc-100 placeholder:text-zinc-500 transition-colors hover:border-zinc-500 focus-visible:border-violet-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-violet-400/50"
                    />
                    <motion.span
                        initial={{ x: "100%" }}
                        animate={{ x: "0%" }}
                        transition={inputRevealTransition}
                        className="pointer-events-none absolute inset-y-0 right-8 left-3 flex items-center text-zinc-400"
                    >
                        <button
                            type="button"
                            aria-label="Create memory"
                            onClick={createNewMemoryHandler}
                            className="pointer-events-auto shrink-0 cursor-pointer rounded hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                        >
                            <CiEdit aria-hidden="true" className="size-5 hover:animate-swing" />
                        </button>
                    </motion.span>
                </section>
            )}
        </header>
    );
};

export default Header;