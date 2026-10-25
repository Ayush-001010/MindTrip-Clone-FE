import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Collapse, ConfigProvider, theme } from 'antd';
import { HiOutlineChatBubbleLeftRight } from 'react-icons/hi2';
import { LuSend } from 'react-icons/lu';
import type IOpinionComment from './IOpinionComment';
import type IUserInterface from '../../../../../../../../../Interface/DataInterface/IUserDetails';
import type IOpinionCommentData from '../../../../../../../../../Interface/DataInterface/IOpinionComment';
import { buildOpinionCommentTree } from '../../../../../../../../../Utils/opinionComment';
import CommentItem from './CommentItem/CommentItem';
import { useChatContext } from '../../../../../../Chat';

const OpinionComment: React.FC<IOpinionComment> = ({ postId, comments }) => {
    const [commentList, setCommentList] = useState<IOpinionCommentData[]>(comments ?? []);
    const [commentText, setCommentText] = useState("");
    const { addCommentOnOpinion } = useChatContext();
    const userDetails = useSelector((state: any) => state.userDetails as IUserInterface);

    useEffect(() => {
        setCommentList(comments ?? []);
    }, [comments]);

    const postComment = async (commentText: string, parentCommentId: number | null) => {
        if (!addCommentOnOpinion) return;

        const optimisticComment: IOpinionCommentData = {
            id: Date.now(),
            comment: commentText,
            parentCommentId,
            userName: userDetails.userName || "You",
            createdAt: new Date().toISOString(),
        };
        setCommentList((prev) => [...prev, optimisticComment]);

        const response = await addCommentOnOpinion(postId, commentText, parentCommentId?.toString());
        if (!response?.success) {
            // Revert the optimistic comment if the request failed.
            setCommentList((prev) => prev.filter((comment) => comment.id !== optimisticComment.id));
        }
    };

    const addCommentHandler = () => {
        if (!commentText.trim()) return;

        postComment(commentText.trim(), null);
        setCommentText("");
    };

    const addReplyHandler = (parentCommentId: number, replyText: string) => {
        postComment(replyText, parentCommentId);
    };

    const commentTree = buildOpinionCommentTree(commentList);

    return (
        <ConfigProvider
            theme={{
                algorithm: theme.darkAlgorithm,
                token: { colorBgContainer: "transparent", colorBorder: "#343a40", borderRadius: 10 },
            }}
        >
            <Collapse
                ghost
                size="small"
                items={[
                    {
                        key: "comments",
                        label: (
                            <span className="flex items-center gap-1.5 text-xs font-medium text-[#adb5bd]">
                                <HiOutlineChatBubbleLeftRight size={14} />
                                {commentList.length} comment{commentList.length !== 1 ? "s" : ""}
                            </span>
                        ),
                        children: (
                            <div className="flex flex-col gap-2">
                                {commentTree.length > 0 && (
                                    <div className="flex flex-col gap-2">
                                        {commentTree.map((comment) => (
                                            <CommentItem key={comment.id} comment={comment} onReply={addReplyHandler} />
                                        ))}
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={commentText}
                                        onChange={(e) => setCommentText(e.target.value)}
                                        onKeyDown={(e) => e.key === "Enter" && addCommentHandler()}
                                        placeholder="Write a comment..."
                                        className="h-9 w-full rounded-full border border-white/10 bg-white/[0.03] px-3 text-xs text-white outline-none transition-colors duration-200 placeholder:text-[#868e96] focus:border-white/20"
                                    />
                                    <button
                                        type="button"
                                        onClick={addCommentHandler}
                                        className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#ced4da] text-[#343a40] transition duration-300 hover:bg-[#343a40] hover:text-white"
                                    >
                                        <LuSend size={14} />
                                    </button>
                                </div>
                            </div>
                        ),
                    },
                ]}
            />
        </ConfigProvider>
    );
};

export default OpinionComment;
