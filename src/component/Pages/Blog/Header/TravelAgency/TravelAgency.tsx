import React, { useState } from "react";
import { useGetBlogContext } from "../../../Blog/Blog";
import type ITravelAgency from "./ITravelAgency";
import { Modal } from "antd";

const TravelAgency: React.FC<ITravelAgency> = ({ isOpen, onClose }) => {
    const [websiteLink, setWebsiteLink] = useState("");
    const { saveChangeToBlog } = useGetBlogContext();

    const submitHandler = () => {
        onClose();
        saveChangeToBlog("bookingURL", websiteLink);
    };

    return (
        <Modal centered open={isOpen} onCancel={onClose} styles={{
            mask: {
                background: "rgba(0, 0, 0, 0.55)",
                backdropFilter: "blur(8px)",
            },
            container: {
                background: "#001219",
                padding: 0,
                boxShadow: "none",
            },
            body: {
                padding: "16px",
            },
            header: {
                display: "none",
            },
            footer: {
                display: "none",
            },
        }} footer={null}>
            <section className="flex flex-col gap-4 text-[#fff]">
                <h2 className="text-lg font-semibold">Partner with Mindtrip</h2>
                <p className="text-sm leading-relaxed text-gray-300">
                    Welcome to Mindtrip! You can share your travel blogs and add your booking website link on our platform. This helps users discover your content, read your blogs, and seamlessly visit your booking website.
                </p>
                <input
                    type="text"
                    value={websiteLink}
                    onChange={(e) => setWebsiteLink(e.target.value)}
                    placeholder="Enter your booking website link"
                    className="w-full rounded-md bg-transparent px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none transition focus:ring-2 focus:ring-sky-400 border border-gray-700"
                />
                <button
                    type="button"
                    disabled={!websiteLink.trim()}
                    onClick={submitHandler}
                    className="ml-auto rounded-md bg-white px-5 py-2 text-sm font-medium text-[#001219] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    Submit
                </button>
            </section>
        </Modal>
    );
};

export default TravelAgency;