import type IBlogData from "../Interface/DataInterface/IBlogData";
import APIService from "../Services/APIService";

const useBlogAction = () => {
    const getMetaData = async () => {
        const apiInstance = new APIService();
        const response = await apiInstance.getRequest("/common/getMetaDataForBlog");
        return response;
    };

    const saveBlog = async (blogData: IBlogData , profileName: string , profileIcon: string , images: File[] , metaData: string[]) => {
        console.log(blogData, profileName, profileIcon, images, metaData);
        const apiInstance = new APIService();
        const profileImages: string[] = [];
        for (const file of images) {
            let { name: fileName = "", type: fileType = "" } = file;
            console.log(fileName, fileType);
            fileName = "Blog/" + fileName
            const fileUploadResponse = await apiInstance.postRequest("/common/getUploadedFileURL", {
                contentType:fileType,
                key:fileName,
            });
            profileImages.push(fileName);
            console.log(fileUploadResponse);
            if(fileUploadResponse.success) {
                const url = fileUploadResponse.data as string;
                const uploadResponse = await apiInstance.uploadFileToS3(url, file, fileType);
                console.log(uploadResponse);
            }
        }
        blogData.profileImages = profileImages;
        blogData.profileTitle = profileName;
        blogData.profileIcon = profileIcon;
        blogData.metaData = metaData;
        await Promise.all(blogData.activities.map(async (activity) => {
            const imageURLs: string[] = [];
            // Perform any asynchronous operations for each activity if needed
            await Promise.all(activity.images.map(async (image : any) => {
                // Perform any asynchronous operations for each image if needed
                let { name: fileName = "", type: fileType = "" } = image;
                fileName = "Blog/" + fileName;
                const fileUploadResponse = await apiInstance.postRequest("/common/getUploadedFileURL", {
                    contentType: fileType,
                    key: fileName,
                });
                imageURLs.push(fileName);
                console.log(fileUploadResponse);
                if (fileUploadResponse.success) {
                    const url = fileUploadResponse.data as string;
                    const uploadResponse = await apiInstance.uploadFileToS3(url, image, fileType);
                    console.log(uploadResponse);
                }
            }));
            activity.images = imageURLs;

            await Promise.all(activity.sideActivities.map(async (sideActivity) => {
                // Perform any asynchronous operations for each side activity if needed

                const sideImageURLs: string[] = [];
                await Promise.all(sideActivity.images.map(async (image : any) => {
                    // Perform any asynchronous operations for each image of the side activity if needed
                    let { name: fileName = "", type: fileType = "" } = image;
                    fileName = "Blog/" + fileName;
                    const fileUploadResponse = await apiInstance.postRequest("/common/getUploadedFileURL", {
                        contentType: fileType,
                        key: fileName,
                    });
                    sideImageURLs.push(fileName);
                    console.log(fileUploadResponse);
                    if (fileUploadResponse.success) {
                        const url = fileUploadResponse.data as string;
                        const uploadResponse = await apiInstance.uploadFileToS3(url, image, fileType);
                        console.log(uploadResponse);
                    }
                }));
                sideActivity.images = sideImageURLs;
            }));
        }));

        const saveResponse = await apiInstance.postRequest("/blog/create", {blogData});
        return saveResponse;
    };
    
    

    return { getMetaData, saveBlog };
}

export default useBlogAction;