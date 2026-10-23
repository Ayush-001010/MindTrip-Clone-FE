export default interface ISentBox {
    submitHandler: () => Promise<void> | void;
}