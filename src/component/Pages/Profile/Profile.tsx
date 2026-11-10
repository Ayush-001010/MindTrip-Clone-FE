import React, { useEffect, useRef, useState } from "react";
import { message } from "antd";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import ProfileCard from "./ProfileCard/ProfileCard";
import { useParams } from "react-router-dom";
import type IProfile from "./IProfile";
import useProfile from "../../../CustomHooks/useProfile";
import { useSelector } from "react-redux";
import type IUserProfileDetailsData from "../../../Interface/DataInterface/IUserProfileDetailsData";
import type { ChangeProfileFields } from "../../../Interface/DataInterface/IUserProfileDetailsData";

const Profile: React.FC<IProfile> = () => {
    const [mode, setMode] = useState<"visit" | "edit" | undefined>(undefined);
    const { userID: loggedInUserID } = useSelector((state: any) => state.userDetails);
    const [profile, setProfile] = useState<IUserProfileDetailsData | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [readingImage, setReadingImage] = useState(false);
    const [saving, setSaving] = useState(false);
    const savingRef = useRef(false);
    const [places, setPlaces] = useState<string[]>([]);
    const [blogsDetails, setBlogsDetails] = useState<{
        blogTitle: string;
        blogId: number;
        numberOfLikes: number;
        blogImage: string;
        numberOfViews: number;
    }[]>([]);
    const { fetchUserProfile, fetchUserPlaces, fetchUserBlogsDetails, addUserDetails } = useProfile();
    const { userId } = useParams();

    const changeProfileFields: ChangeProfileFields = (key, value) => {
        setProfile((previous) => previous ? {
            ...previous,
            [key]: typeof value === "function" ? value(previous[key]) : value
        } : previous);
    };

    const saveHandler = async () => {
        if (readingImage || savingRef.current) return;
        if (!profile || !loggedInUserID) {
            message.error("Your profile has not loaded. Please try again.");
            return;
        }
        savingRef.current = true;
        setSaving(true);
        try {
            const response = await addUserDetails(String(loggedInUserID), {
            aboutMe: profile.aboutMe,
            birthdayDate: profile.birthdayDate,
            anniversaryDate: profile.anniversaryDate,
            interests: profile.interests,
            location: profile.location,
            genralAnswer: profile.genralAnswer,
            instagramUrl: profile.instagramUrl,
            userImage: profile.userImage
            }, imageFile);
            if (!response.success) {
                message.error(response.error || "Could not save your profile. Please try again.");
                return;
            }
            changeProfileFields("userImage", response.userImage ?? null);
            setImageFile(null);
            message.success("Profile saved.");
        } catch (error) {
            console.error("Saving profile failed:", error);
            message.error("Could not save your profile. Please try again.");
        } finally {
            savingRef.current = false;
            setSaving(false);
        }
    };

    const changeProfileImage = (file: File | null) => {
        if (!file || file === imageFile) return;
        setReadingImage(true);
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result !== "string") {
                message.error("Could not read the profile image. Please select it again.");
            } else {
                setImageFile(file);
                changeProfileFields("userImage", reader.result);
            }
            setReadingImage(false);
        };
        reader.onerror = () => {
            message.error("Could not read the profile image. Please select it again.");
            setReadingImage(false);
        };
        reader.onabort = () => {
            message.error("Reading the profile image was interrupted. Please select it again.");
            setReadingImage(false);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        if (userId === "about") {
            setMode("edit");
        }
        if (loggedInUserID) {
            fetchUserProfile(loggedInUserID).then((profileResponse) => {
                // handle the fetched profile here
                if (profileResponse.success) {
                    setProfile(profileResponse.data as IUserProfileDetailsData);
                }
            });
            fetchUserPlaces(loggedInUserID).then((placesResponse) => {
                if (placesResponse.success) {
                    setPlaces(placesResponse.data as string[]);
                }
            });
            fetchUserBlogsDetails(loggedInUserID).then((blogsResponse) => {
                if (blogsResponse.success) {
                    setBlogsDetails(blogsResponse.data as {
                        blogTitle: string;
                        blogId: number;
                        numberOfLikes: number;
                        blogImage: string;
                        numberOfViews: number;
                    }[]);
                }
            });
        }
    }, [loggedInUserID, mode]);

    return (
        <main className="flex h-full min-h-0 min-w-0 flex-col overflow-hidden px-4 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <section className="min-w-0 shrink-0">
                <p className="wrap-break-word text-3xl font-semibold text-[#f8f9fa] sm:text-4xl">
                    About {userId === "about" ? "me" : profile?.name}
                </p>
            </section>
            <section inert={saving} className="mt-6 grid min-h-0 min-w-0 flex-1 grid-cols-1 grid-rows-[auto_minmax(0,1fr)] items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:grid-rows-1">
                <ProfileCard imageFile={imageFile} onImageChange={changeProfileImage} changeProfileFields={changeProfileFields} profile={profile} mode={mode === "edit" ? "edit" : "visit"} />
                <section className="h-full min-h-0 min-w-0 overflow-y-auto overscroll-contain pr-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <ProfileInfo changeProfileFields={changeProfileFields} profile={profile} mode={mode === "edit" ? "edit" : "view"} places={places} blogsDetails={blogsDetails} />
                </section>
            </section>
            {mode === "edit" && (
                <section className="flex justify-end items-end mt-6">
                    <button type="button" disabled={readingImage || saving} onClick={saveHandler} className="border-1 border-[#e0aaff] px-4 py-2 rounded text-[#e0aaff] font-semibold hover:bg-[#e0aaff] hover:text-[#1a1a1a] cursor-pointer disabled:cursor-wait disabled:opacity-50">
                        {saving ? "Saving..." : readingImage ? "Preparing image..." : "Done"}
                    </button>
                </section>
            )}
        </main>
    );
};

export default Profile;