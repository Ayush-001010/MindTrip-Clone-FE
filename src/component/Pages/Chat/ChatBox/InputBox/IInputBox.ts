export default interface IInputBox {
    value: string;
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    sendHandler: () => void;
}