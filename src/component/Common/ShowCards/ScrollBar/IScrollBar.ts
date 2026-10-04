export default interface IScrollBar {
    total: number;
    active: number;
    onChange: (page: number) => void;
}
