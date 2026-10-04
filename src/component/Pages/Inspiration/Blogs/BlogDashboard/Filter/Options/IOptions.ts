export default interface IOptions {
    setSelectFilterType: React.Dispatch<React.SetStateAction<"location" | "profile" | "tags" | "budget" | "numberOfPlace" | null>>;
}