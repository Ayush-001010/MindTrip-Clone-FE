import React from "react";
import type IAddActivityDuration from "./IAddActivityDuration";
import { DatePicker } from "antd";

const { RangePicker } = DatePicker;

const AddActivityDuration: React.FC<IAddActivityDuration> = ({ }) => {
    return (
        <section className="flex w-full flex-col">
            <RangePicker
                className="w-full !border-gray-300 !bg-transparent [&_input]:!text-sm [&_input]:!text-gray-700 [&_.ant-picker-separator]:!text-gray-400 [&_.ant-picker-suffix]:!text-gray-400"
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                onChange={(value, dateString) => {
                    console.log('Selected Time: ', value);
                    console.log('Formatted Selected Time: ', dateString);
                }}
                onOk={(value) => {
                    console.log('onOk: ', value);
                }} />
        </section>
    );
};

export default AddActivityDuration;