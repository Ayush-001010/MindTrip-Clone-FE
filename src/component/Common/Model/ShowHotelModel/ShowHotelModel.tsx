import React from "react";
import type IShowHotelModel from "./IShowHotelModel";
import { Modal } from "antd";
import { IoSearch } from "react-icons/io5";
import { useChatContext } from "../../../Pages/Chat/Chat";

const ShowHotelModel: React.FC<IShowHotelModel> = ({ open, onClose }) => {
    const { searchHotelHandler } = useChatContext();
    const searchHotel = () => {
        onClose();
        if(searchHotelHandler) {
            searchHotelHandler();
        }
    }

    return (
        <Modal open={open} onCancel={onClose} centered width={640} footer={null} title={null} rootClassName="transparent-modal"
            styles={{
                mask: {
                    background: "rgba(0, 0, 0, 0.55)",
                    backdropFilter: "blur(8px)",
                },
                container: {
                    background: "transparent",
                    padding: 0,
                    boxShadow: "none",
                },
                body: {
                    padding: 0,
                    background: "transparent",
                },
                header: {
                    display: "none",
                },
                footer: {
                    display: "none",
                },
            }}
            closeIcon={<span className="text-white text-lg">x</span>}
        >
            <main className="rounded-2xl bg-gradient-to-b from-gray-900/90 to-black/90 p-10 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
                <header className="flex justify-end border-b border-white/10  pb-4">
                    <button onClick={searchHotel} className="flex items-center gap-2 rounded-full bg-indigo-500/20 px-4 py-2 text-sm font-medium text-indigo-200 ring-1 ring-indigo-400/40 transition-colors hover:bg-indigo-500/30">
                        Find hotels for your trip
                        <IoSearch className="text-base" />
                    </button>
                </header>
                <section className="flex flex-col items-center justify-center gap-2 py-10 text-center">
                    <span className="text-3xl" aria-hidden>
                        🏨
                    </span>
                    <p className="m-0 text-sm leading-6 text-white/60">You haven&apos;t selected any hotels yet</p>
                </section>
            </main>
        </Modal>
    );
};

export default ShowHotelModel;