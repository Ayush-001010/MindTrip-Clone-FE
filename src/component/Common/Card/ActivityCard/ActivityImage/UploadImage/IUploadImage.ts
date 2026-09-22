import React from "react";

export default interface IUploadImage {
    setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
}