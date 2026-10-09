import React from "react";
import type IShowTipsModel from "./IShowTipsModel";
import { Modal } from "antd";
import { motion } from "framer-motion";

const ShowTipsModel: React.FC<IShowTipsModel> = ({ openModal, closeFunc, tips }) => {
    return (
        <Modal
            open={openModal}
            onCancel={closeFunc}
            centered
            width={640}
            footer={null}
            title={null}
            rootClassName="transparent-modal"
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
            <section className="rounded-2xl bg-gradient-to-b from-gray-900/90 to-black/90 p-6 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-md">
                <header className="mb-5 flex items-center gap-3 border-b border-white/10 pb-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-500/20 text-lg ring-1 ring-indigo-400/40" aria-hidden>
                        💡
                    </span>
                    <div>
                        <h2 className="text-lg font-semibold leading-tight text-[#f8f9fa]">Travel Tips</h2>
                        <p className="text-xs text-white/50">{tips.length} {tips.length === 1 ? "tip" : "tips"} for your trip</p>
                    </div>
                </header>
                <ul className="flex max-h-[60vh] flex-col gap-3 overflow-y-auto pr-1">
                    {tips.map((tip, index) => (
                        <motion.li
                            key={index}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25, delay: index * 0.05 }}
                            className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/5 p-3 text-sm leading-6 text-white/90 transition-colors hover:bg-white/10"
                        >
                            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-500/30 text-xs font-semibold text-indigo-200">
                                {index + 1}
                            </span>
                            <span>{tip}</span>
                        </motion.li>
                    ))}
                </ul>
            </section>
        </Modal>
    )
};

export default ShowTipsModel;