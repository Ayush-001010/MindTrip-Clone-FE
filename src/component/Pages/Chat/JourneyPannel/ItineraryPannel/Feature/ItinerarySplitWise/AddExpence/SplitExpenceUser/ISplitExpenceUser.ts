import type ITripUserDetails from "../../../../../../../../../Interface/DataInterface/ITripUserDetails";

export default interface ISplitExpenceUser {
    users : ITripUserDetails[];
    totalAmount: number;
    splitType: "equal" | "ratio" | "percentage" | "custom";
    splitArr: {
        id: number;
        name: string;
        shareValue: string;
        isActive: boolean;
    }[];
    setSplitArr: React.Dispatch<React.SetStateAction<{
        id: number;
        name: string;
        shareValue: string;
        isActive: boolean;
    }[]>>;
    setSplitType: React.Dispatch<React.SetStateAction<"equal" | "ratio" | "percentage" | "custom">>;
}