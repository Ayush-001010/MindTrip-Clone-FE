import { useState , useEffect } from "react";
import { TiUserAdd } from "react-icons/ti";
import { MdOutlineNotificationImportant } from "react-icons/md";

export const notificationTypeArray = ["userJoin","alert"];

const useNotification = (type: typeof notificationTypeArray[number] , message: string , open: boolean , duration?: number) => {
    const [isOpen, setIsOpen] = useState(open);

    const genratedUI = () => {
        switch(type) {
            case "userJoin":
                return (
                    <div role="status" aria-live="polite" className="fixed top-4 right-4 z-50">
                        <div className="flex items-start gap-3 bg-white/95 backdrop-blur-sm px-4 py-3 shadow-lg rounded-lg border border-gray-200 text-sm text-gray-800 max-w-xs">
                            <div className="text-2xl text-green-600 mt-0.5">
                                <TiUserAdd />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{message}</p>
                                <p className="text-xs text-gray-500 mt-0.5">joined the conversation</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                                aria-label="Close notification"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                );
            case "alert":
                return (
                    <div role="status" aria-live="polite" className="fixed top-4 right-4 z-50">
                        <div className="flex items-start gap-3 bg-yellow-100 px-4 py-3 shadow-lg rounded-lg border border-yellow-200 text-sm text-yellow-800 max-w-xs">
                            <div className="text-2xl text-yellow-600 mt-0.5">
                                <MdOutlineNotificationImportant />
                            </div>
                            <div className="flex-1">
                                <p className="font-medium text-yellow-900">{message}</p>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="ml-2 text-yellow-400 hover:text-yellow-600 focus:outline-none"
                                aria-label="Close notification"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    }
    useEffect(()=>{
        const timeObj = setTimeout(()=>{
            setIsOpen(false);
        }, duration || 3000);
        setIsOpen(open);
        return () => clearTimeout(timeObj);
    },[open])
    return (
        <>
        {isOpen && (
            <div>
                {genratedUI()}
            </div>
        )}
        </>
    )
};


export default useNotification;