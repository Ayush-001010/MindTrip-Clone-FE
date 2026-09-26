import React , { useState } from "react";
import type IProfileImages from "./IProfileImages";
import type { UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";
import { IoIosImages } from "react-icons/io";

const { Dragger } = Upload;

const ProfileImages: React.FC<IProfileImages> = ({ setImages }) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [messageApi, contextHolder] = message.useMessage();

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
            setImages(info.fileList.map(file => file.originFileObj).filter(Boolean) as File[]);
            if (info.fileList.length > 0) {
                messageApi.success("Image upload successful");
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        }
    }
    return (
        <section className="w-full">
            {contextHolder}
            <Dragger
                {...props}
                showUploadList={false}
                className="!flex !min-h-[100px] !w-full !items-center !justify-center overflow-hidden !rounded-xl !border !border-dashed !border-gray-700 !bg-[#111418] !text-gray-400 transition-colors duration-300 ease-in-out hover:!border-gray-500 hover:!bg-[#151a1f] hover:!text-gray-200"
            >
                <section className="flex flex-col items-center justify-center gap-3 px-4 py-6 text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-700 bg-[#151a1f] text-gray-300">
                        <IoIosImages size={28} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-gray-200">Upload profile images</p>
                        <p className="text-xs leading-5 text-gray-500">Drag and drop your images here, or click to browse files.</p>
                    </div>
                </section>
            </Dragger>
        </section>
    );
};

export default ProfileImages;