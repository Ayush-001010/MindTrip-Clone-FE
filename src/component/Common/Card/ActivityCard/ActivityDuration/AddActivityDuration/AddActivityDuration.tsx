import React from "react";
import type IAddActivityDuration from "./IAddActivityDuration";
import { TimePicker } from "antd";

const { RangePicker } = TimePicker;

const AddActivityDuration: React.FC<IAddActivityDuration> = ({ setValue }) => {
    return (
        <section className="flex w-full flex-col my-2">
            <RangePicker
                className="!h-[20px] w-[350px] !rounded-none !border-0 !border-b !border-gray-300 !bg-transparent !px-0 !shadow-none hover:!border-gray-400 [&_.ant-picker-separator]:!text-[#e9ecef] [&_.ant-picker-suffix]:!text-[#e9ecef] [&_input]:!text-sm [&_input]:!font-medium [&_input]:!text-[#e9ecef] [&_input]:placeholder:!text-[#e9ecef]"
                format="HH:mm"
                onChange={(value) => {
                    setValue(value as [moment.Moment, moment.Moment] | null);
                }}
                onOk={(value) => {
                    console.log('onOk: ', value);
                    setValue(value as [moment.Moment, moment.Moment] | null);
                }} />
        </section>
    );
};

export default AddActivityDuration;