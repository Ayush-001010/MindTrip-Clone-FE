import React from "react";
import { ConfigProvider, Modal, theme } from "antd";
import type IProfileForm from "./IProfileForm";
import UserProfileConfig from "../../../../../config/component/UserProfileConfig";

export const profileFormInputClass = "mt-5 w-full rounded-md border border-zinc-700 bg-zinc-800/60 px-3 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 scheme-dark focus:border-violet-400 focus:outline-none focus:ring-1 focus:ring-violet-400/50";

const ProfileForm: React.FC<IProfileForm> = ({ open, onClose, submitLabel = "Save", submitDisabled = false, footerNote, type, title: propTitle, description: propDescription, onSubmit, children, value: initialValue, onSave }) => {
    const field = type === undefined ? undefined : UserProfileConfig.fields[type];
    const title = field?.header ?? propTitle;
    const description = field?.description ?? propDescription;

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        if (type === undefined) {
            onSubmit?.(e);
            return;
        }
        e.preventDefault();
        const value = String(new FormData(e.currentTarget).get("value") ?? "").trim();
        onSave?.(value);
        onClose();
    };

    return (
        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
            token: { colorPrimary: "#8b5cf6" },
            components: { Modal: { contentBg: "#18181b", boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.5)" } },
        }}>
            <Modal
                open={open}
                onCancel={onClose}
                centered
                width={480}
                footer={null}
                title={null}
                closable={false}
                destroyOnHidden
                classNames={{ container: "overflow-hidden rounded-3xl border border-zinc-800" }}
            >
                <form onSubmit={submitHandler}>
                    <div className="max-h-[70dvh] overflow-y-auto p-5 pb-4 sm:p-6 sm:pb-5">
                        <h3 className="text-xl font-semibold tracking-tight text-zinc-100">{title}</h3>
                        {description && <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>}
                        {field?.fieldType === "text" && (
                            <input name="value" type="text" defaultValue={initialValue} autoFocus aria-label={field.header} placeholder="Type here…" className={profileFormInputClass} />
                        )}
                        {field?.fieldType === "date" && (
                            <input name="value" type="date" defaultValue={initialValue} autoFocus aria-label={field.header} className={profileFormInputClass} />
                        )}
                        {children}
                    </div>
                    <div className="flex items-center justify-between gap-4 border-t border-zinc-800 px-5 py-3 sm:px-6">
                        <div className="text-sm font-semibold text-zinc-100">{footerNote}</div>
                        <button
                            type="submit"
                            disabled={submitDisabled}
                            className="rounded-lg bg-violet-500 px-6 py-2 text-sm font-semibold text-white transition hover:bg-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 active:scale-95 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
                        >
                            {submitLabel}
                        </button>
                    </div>
                </form>
            </Modal>
        </ConfigProvider>
    );
};

export default ProfileForm;