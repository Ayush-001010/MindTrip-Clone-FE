import type moment from "moment";

export default interface IShowActivityDuration {
    value: [moment.Moment, moment.Moment] | null;
}