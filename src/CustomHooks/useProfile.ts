import APIService from "../Services/APIService";
import type IUserProfileDetailsData from "../Interface/DataInterface/IUserProfileDetailsData";

export type ProfileDetailsPayload = Pick<IUserProfileDetailsData,
    "aboutMe" | "birthdayDate" | "anniversaryDate" | "interests" | "location" | "genralAnswer" | "instagramUrl" | "userImage">;

const useProfile = () => {
    const apiInstance = new APIService();

    const fetchUserProfile = async (userId: string) => {
        const response = await apiInstance.getRequest(`/common/fetchUserDetails?userID=${userId}`);
        return response;
    }

    const fetchUserPlaces = async (userId: string) => {
        const response = await apiInstance.getRequest(`/common/fetchUserPlaces?userID=${userId}`);
        return response;
    }

    const fetchUserBlogsDetails = async (userId: string) => {
        const response = await apiInstance.getRequest(`/common/fetchUserBlogDetails?userID=${userId}`);
        return response;
    }

    const addUserDetails = async (userId: string, userDetails: ProfileDetailsPayload, imageFile: File | null = null): Promise<{ success: boolean; error?: string; userImage?: string | null }> => {
        const details = { ...userDetails };
        if (imageFile) {
            const key = `Profile/${encodeURIComponent(userId)}/${crypto.randomUUID()}-${imageFile.name}`;
            const uploadURL = await apiInstance.postRequest<string>("/common/getUploadedFileURL", {
                contentType: imageFile.type,
                key,
            });
            if (!uploadURL.success || typeof uploadURL.data !== "string" || !uploadURL.data) {
                return { success: false, error: uploadURL.error || "Could not prepare the profile image upload." };
            }
            const upload = await apiInstance.uploadFileToS3(uploadURL.data, imageFile, imageFile.type);
            if (!upload.success) {
                console.error("Profile image upload failed:", upload.error);
                return { success: false, error: "Could not upload your profile image. Your details were not saved." };
            }
            details.userImage = key;
        } else if (details.userImage?.startsWith("data:") || details.userImage?.startsWith("blob:")) {
            return { success: false, error: "Please select your profile image again before saving." };
        }
        const response = await apiInstance.postRequest(`/common/addUserDetails`, {
            userDetails:details, userId});
        return { ...response, userImage: details.userImage };
    }

    return { fetchUserProfile, fetchUserPlaces, fetchUserBlogsDetails, addUserDetails };
}

export default useProfile;