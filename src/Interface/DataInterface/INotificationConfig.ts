import type { notificationPositions, notificationTypeArray } from "../../customHookWithUI/useNotification";

export default interface INotificationConfig {
    type: string;
    message: string;
    open: boolean;
    duration?: number;
}

export interface INotifyConfig {
    type : typeof notificationTypeArray[number],
    message: string,
    open: boolean,
    duration?: number,
    pos?: keyof typeof notificationPositions
}