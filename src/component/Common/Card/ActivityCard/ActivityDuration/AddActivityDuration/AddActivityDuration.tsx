import React from "react";
import type IAddActivityDuration from "./IAddActivityDuration";
import { TimePicker } from "antd";
import type { Dayjs } from "dayjs";
import type { Moment } from "moment";
import { useGetBlogContext } from "../../../../../Pages/Blogs/Blog/Blog";
import { useGetActivityCardData } from "../../ActivityCard";

const { RangePicker } = TimePicker;

const AddActivityDuration: React.FC<IAddActivityDuration> = ({ setValue }) => {
    const { saveChangeToBlog } = useGetBlogContext();
    const { indexNumber } = useGetActivityCardData();

    const changeHandler = (value: [Dayjs | null, Dayjs | null] | null) => {
        setValue(value as unknown as [Moment, Moment] | null);
        console.log(`Selected time range: ${value?.[0]?.format("HH:mm")} - ${value?.[1]?.format("HH:mm")}`);
        const time1 = value?.[0]?.format("HH:mm");
        const time2 = value?.[1]?.format("HH:mm");
        if(time1 && time2) {
            saveChangeToBlog("activities", `${time1} - ${time2}` , indexNumber , "time");
        }
    };
    return (
        <section className="flex w-full flex-col my-2">
            <RangePicker
                className="!h-[20px] w-[350px] !rounded-none !border-0 !border-b !border-gray-300 !bg-transparent !px-0 !shadow-none hover:!border-gray-400 [&_.ant-picker-separator]:!text-[#e9ecef] [&_.ant-picker-suffix]:!text-[#e9ecef] [&_input]:!text-sm [&_input]:!font-medium [&_input]:!text-[#e9ecef] [&_input]:placeholder:!text-[#e9ecef]"
                format="HH:mm"
                onChange={changeHandler}
                onOk={changeHandler} />
        </section>
    );
};

export default AddActivityDuration;