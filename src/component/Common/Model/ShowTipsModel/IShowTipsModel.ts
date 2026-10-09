export default interface IShowTipsModel {
    openModal: boolean;
    closeFunc: () => void;
    tips: string[];
}