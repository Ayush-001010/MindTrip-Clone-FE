import type React from "react";

export interface ISuggestionOption {
    label: string;
    value: string;
}

export default interface ISuggestion {
    value: string;
    onValueChange: (value: string) => void;
    options: ISuggestionOption[];
    onSelectOption: (option: ISuggestionOption) => void;
    isLoading?: boolean;
    placeholder?: string;
    loadingText?: string;
    emptyText?: string;
    icon?: React.ReactNode;
    className?: string;
}
