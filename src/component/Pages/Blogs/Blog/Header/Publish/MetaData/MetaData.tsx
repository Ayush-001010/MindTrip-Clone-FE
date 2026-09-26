import React, { useEffect, useState } from "react";
import type IMetaData from "./IMetaData";
import useBlogAction from "../../../../../../../customHooks/useBlogAction";
import { Select } from "antd";

const MetaData: React.FC<IMetaData> = ({ saveMetadata }) => {
    const { getMetaData } = useBlogAction();
    const [metaDataOptions, setMetaDataOptions] = useState([]);
    const [selectedMetaData, setSelectedMetaData] = useState([]);

    useEffect(() => {
        getMetaData().then((response : any) => {
            if(response.success && response.data){
                setMetaDataOptions(response.data.map((item: any) => {
                    return {label : item , value: item};
                }));
            }
        });
    }, []);
    return (
        <section className="flex flex-col gap-4 text-[#dee2e6]">
            <h2 className="text-lg font-semibold">Choose Blog Metadata</h2>
            <p className="text-sm leading-relaxed text-gray-300">
                Before you publish, please choose the metadata that best matches your blog. For example, if your blog is about bike riding, select "Bike Riding." This helps us share your blog with people who are most likely to enjoy it.
            </p>
            <Select
                mode="multiple"
                options={metaDataOptions}
                value={selectedMetaData}
                onChange={(value) => setSelectedMetaData(value)}
                placeholder="Select metadata"
                className="w-full [&_.ant-select-arrow]:!text-gray-400 [&_.ant-select-selection-item]:!border-gray-600 [&_.ant-select-selection-item]:!bg-[#212529] [&_.ant-select-selection-item]:!text-gray-200 [&_.ant-select-selection-placeholder]:!text-gray-500 [&_.ant-select-selector]:!rounded-md [&_.ant-select-selector]:!border-gray-700 [&_.ant-select-selector]:!bg-transparent [&_.ant-select-selector]:!shadow-none"
                popupClassName="!bg-[#001219] !border !border-gray-700 [&_.ant-select-item]:!bg-transparent [&_.ant-select-item]:!text-gray-400 [&_.ant-select-item-option-active]:!text-[#e9ecef] [&_.ant-select-item-option-selected]:!text-[#fff] [&_.ant-select-item-option-selected]:!font-semibold"
            />
            <button
                type="button"
                disabled={!selectedMetaData.length}
                onClick={() => saveMetadata(selectedMetaData)}
                className="ml-auto rounded-md bg-white px-5 py-2 text-sm font-medium text-[#001219] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Save Metadata
            </button>
        </section>
    );
};

export default MetaData;