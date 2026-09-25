import type moment from "moment";

export default interface IAddActivityDuration {
    setValue: React.Dispatch<React.SetStateAction<[moment.Moment, moment.Moment] | null>>;
}