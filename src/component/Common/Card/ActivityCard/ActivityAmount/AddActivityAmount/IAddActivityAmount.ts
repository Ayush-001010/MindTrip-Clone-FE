import type React from "react";

export default interface IAddActivityAmount {
    setActivityAmount: React.Dispatch<React.SetStateAction<number | null>>;
}