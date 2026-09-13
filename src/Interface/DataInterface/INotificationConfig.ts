export default interface INotificationConfig {
    type: string;
    message: string;
    open: boolean;
    duration?: number;
}