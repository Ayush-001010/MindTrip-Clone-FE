import type React from "react";

interface ProfileFormBase {
    open: boolean;
    onClose: () => void;
    submitLabel?: string;
    submitDisabled?: boolean;
    footerNote?: React.ReactNode;
}

type IProfileForm = ProfileFormBase & ({
    type: "birthday" | "work" | "website" | "music" | "languages" | "location" | "anniversary";
    title?: never;
    description?: never;
    onSubmit?: never;
    children?: never;
    value?: string;
    onSave: (value: string) => void;
} | {
    type?: never;
    value?: never;
    onSave?: never;
    title: string;
    description?: string;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    children: React.ReactNode;
});

export type { IProfileForm as default };