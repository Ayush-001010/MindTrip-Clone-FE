import React, { useEffect, useState } from "react";
import type IBlogWorkCard from "./IBlogWorkCard";
import { ConfigProvider, Modal, theme, Tooltip } from "antd";
import useBlogAction from "../../../../CustomHooks/useBlogAction";
import type { IBlogWorkData } from "../../../../Interface/DataInterface/IBlogData";
import { BsJournalText } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import BlogsStamp from "../../../Pages/Profile/ProfileInfo/BlogsStamp/BlogsStamp";
import { useSelector } from "react-redux";
import { IoIosAddCircleOutline } from "react-icons/io";



const BlogWorkCard: React.FC<IBlogWorkCard> = ({ open, onClose }) => {
    const { fetchUserBlogWork, createBlogWork  } = useBlogAction();
    const [data, setData] = useState<IBlogWorkData[]>([]);
    const { userID } = useSelector((state: any) => state.userDetails);


    const handleAddBlogWork = async () => {
        if (!userID) return;
        const response = await createBlogWork();
        if (response.success) {
            fetchUserBlogWork().then(res => {
                if (res.success && res.data) {
                    setData(res.data);
                }
            });
        }
    };

    useEffect(() => {
        if (!userID) return;
        fetchUserBlogWork().then(response => {
            if (response.success && response.data) {
                setData(response.data);
            }
        });
    }, [userID]);


    return (
        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
            token: { colorPrimary: "#8b5cf6" },
            components: { Modal: { contentBg: "#04080f", boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.55)" } },
        }}>
            <Modal
                open={open}
                onCancel={onClose}
                centered
                width={640}
                footer={null}
                title={null}
                destroyOnHidden
                closeIcon={
                    <span className="flex size-9 items-center justify-center rounded-full text-zinc-400 transition duration-200 hover:bg-zinc-800 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50">
                        <IoClose className="size-5" aria-hidden="true" />
                    </span>
                }
                aria-label="Your travel journal"
                classNames={{
                    mask: "bg-[#04080f] backdrop-blur-sm",
                    container: "overflow-hidden rounded-3xl border border-zinc-700/80 p-0 shadow-2xl shadow-black/60",
                }}
            >
                <section className="max-h-[82dvh] overflow-y-auto bg-[#04080f]">
                    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-zinc-700/70 bg-[#04080f] px-5 py-4 backdrop-blur-md sm:px-8">
                        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-500/10 text-violet-300">
                            <BsJournalText className="size-5" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 pr-10">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-violet-300">Travel Journal</p>
                            <p className="mt-1 truncate text-sm text-zinc-400">
                                {data.length === 1 ? "1 travel story" : `${data.length} travel stories`}
                            </p>
                        </div>
                    </header>
                    <div className="px-1">
                        <p className="flex justify-end mt-3 mr-2 cursor-pointer">
                            <Tooltip title="Add a new travel story">
                                <IoIosAddCircleOutline onClick={handleAddBlogWork} className="size-6  text-violet-300 hover:animate-jelly" aria-hidden="true" />
                            </Tooltip>
                        </p>
                        <BlogsStamp
                            key={`Blog-work-${data[0]?.id}`}
                            blogsDetails={data.map(item => ({
                                blogTitle: item.title || "",
                                blogId: item.blogId,
                                numberOfLikes: 0,
                                blogImage: "",
                                numberOfViews: 0
                            }))}
                            isWorkInProgress={true}
                        />
                    </div>
                </section>
            </Modal>
        </ConfigProvider>
    );
};

export default BlogWorkCard;