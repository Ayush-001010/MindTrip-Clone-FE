import React , {useEffect, useState} from "react";
import type IMemberBox from "./IMemberBox";
import useCommonAction from "../../../../../../CustomHooks/useCommonAction";
import { useSelector } from "react-redux";

const MemberBox : React.FC<IMemberBox> = ({ members }) => {
    const { getImages , fetchUserFriends , addFriend} = useCommonAction();
    const {userID} = useSelector((state: any) => state.userDetails)
    const [imageUrls , setImageUrls] = useState<string[]>([]);
    const [userRequests, setUserRequests] = useState<{userId:number,status:string,friendId:number,createdAt:string,friendName:string,updatedAt:string}[]>([]);

    const fetchImages = async () => {
        const urls: string[] = [];
        await Promise.all(
            members.map(async (member) => {
                if (member.userImage) {
                    const res = await getImages(member.userImage);
                    urls.push(res.data || "");
                } else {
                    urls.push("");
                }
            })
        );
        setImageUrls(urls);
    };
    console.log(userID);

    useEffect(() => {
        fetchImages();
        fetchUserFriends().then((res) => {
            console.log(res);
            setUserRequests(res.data || []);
        });
    }, [members]);
    return (
        <section className="mt-4">
            <p className="text-sm font-semibold text-white mb-2">Members</p>
            <ul className="space-y-2">
                {members?.map(member => {
                    const name = member?.userName || "Unknown";
                    const initials = name
                        ? `${name[0].toUpperCase()}${name.length > 1 ? name[name.length - 1].toUpperCase() : ""}`
                        : "?";
                    return (
                        <li className="flex items-center gap-3 p-2 rounded-md hover:bg-white/5" key={member.userId}>
                            {member?.userImage ? (
                                <img
                                    src={imageUrls[members.indexOf(member)] || member.userImage}
                                    alt={name}
                                    className="flex-none w-10 h-10 rounded-full object-cover"
                                />
                            ) : (
                                <div className="flex-none w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
                                    <span className="text-sm leading-none">{initials}</span>
                                </div>
                            )}
                            <div className="min-w-0">
                                <p className="text-sm text-white truncate">{name}</p>
                                <p className="text-xs text-gray-400 truncate">{member?.userEmail}</p>
                            </div>
                            {(userID !== member.userId.toString()) && <div className="flex cursor-pointer w-full justify-end">
                                {userRequests.some(request => request.friendId === parseInt(member.userId)) ? (
                                    <span className="text-sm text-gray-400">Request Sent</span>
                                ) : (
                                    <button onClick={() => addFriend(parseInt(member.userId))} className="p-2 rounded-lg bg-[#212529] ring ring-[#adb5bd] text-[#adb5bd]">
                                        Add Friend
                                    </button>
                                )}
                            </div>}
                        </li>
                    );
                })}
            </ul>
        </section>
    );
};

export default MemberBox;