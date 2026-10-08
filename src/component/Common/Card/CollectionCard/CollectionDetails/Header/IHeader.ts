export default interface IHeader {
    onClickHandler : (str : "Activity" | "Hotel" | "Blog") => void;
    activeTab: "Activity" | "Hotel" | "Blog";
}