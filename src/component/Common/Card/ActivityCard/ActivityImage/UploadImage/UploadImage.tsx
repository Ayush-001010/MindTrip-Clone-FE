import React, { useState } from "react";
import type IUploadImage from "./IUploadImage";
import type { UploadFile, UploadProps } from 'antd';
import { message, Upload } from 'antd';
import { IoIosImages } from "react-icons/io";
import { useGetActivityCardData } from "../../ActivityCard";
import { useGetBlogContext } from "../../../../../Pages/Blog/Blog";

const { Dragger } = Upload;

const UploadImage: React.FC<IUploadImage> = ({ setImageFiles }) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { saveChangeToBlog } = useGetBlogContext();
    const { indexNumber } = useGetActivityCardData();

    const props: UploadProps = {
        name: 'file',
        multiple: true,
        accept: 'image/*',
        fileList,
        beforeUpload(file) {
            if (!file.type.startsWith('image/')) {
                messageApi.error(`${file.name} is not an image file.`);
                return Upload.LIST_IGNORE;
            }
            return false;
        },
        onChange(info) {
            setFileList(info.fileList);
            const files = info.fileList.map(file => file.originFileObj).filter(Boolean) as File[];
            setImageFiles(files);
            // keep raw File objects here, saveBlog needs them to upload to S3 before replacing with real URLs
            saveChangeToBlog("activities", files, indexNumber, "images");
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        }
    }
    return (
        <section className="h-full w-full p-1">
            {contextHolder}
            <Dragger
                {...props}
                className="!flex !h-full !w-full !items-center !justify-center cursor-pointer rounded-lg border border-dashed !border-[#adb5bd]/40 !text-[#adb5bd] transition-colors duration-300 ease-in-out hover:!border-[#000814] hover:!bg-[#000814] hover:!text-white"
            >
                <section className="flex items-center justify-center">
                    <IoIosImages size={50} />
                </section>
            </Dragger>
        </section>
    );
};

export default UploadImage;