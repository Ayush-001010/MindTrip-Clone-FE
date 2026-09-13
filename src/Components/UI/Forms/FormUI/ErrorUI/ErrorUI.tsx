import React from "react";

interface IErrorUI {
    error?: string;
}

const ErrorUI: React.FunctionComponent<IErrorUI> = ({
    error
}) => {

    if (!error) {
        return null;
    }

    return (
        <span className="mt-1 text-sm text-red-500">
            {error}
        </span>
    );
};

export default ErrorUI;