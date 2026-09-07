export default interface IShowInfoModel {
    title: string;
    content: string;
    closeHandler: () => void;
    open: boolean;
}