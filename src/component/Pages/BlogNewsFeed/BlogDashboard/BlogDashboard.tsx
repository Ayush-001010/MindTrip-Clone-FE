import React, { useEffect, useState } from "react";
import type IBlogDashboard from "./IBlogDashboard";
import type IBlogFilters from "./IBlogFilters";
import Filter from "./Filter/Filter";
import BlogList from "./BlogList/BlogList";
import useCommonAction from "../../../../customHooks/useCommonAction";

const BlogDashboard: React.FC<IBlogDashboard> = () => {
    const [filters, setFilters] = useState<IBlogFilters>({});
    const [following, setFollowing] = useState<number[]>([]);
    const [likeBlogIds, setLikeBlogIds] = useState<number[]>([]);
    const { fetchUserFollowing, userLikedBlogs} = useCommonAction();

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUserFollowing().then( (res : any) => {
                if (res.success) {
                    setFollowing(res.data.map((item: any) => item.followingUserId));
                }
            });
            userLikedBlogs().then((res: any) => {
                if (res.success) {
                    console.log("User liked blogs:", res.data);
                    setLikeBlogIds(res.data);
                }
            });
        }, 1500);
        return () => clearTimeout(timer);
    }, [fetchUserFollowing, userLikedBlogs]);

    return (
        <section className="mt-10">
            <Filter onFiltersChange={setFilters} />
            <BlogList filters={filters} following={following} setFollowing={setFollowing} likeBlogIds={likeBlogIds} setLikeBlogIds={setLikeBlogIds} />
        </section>
    );
};

export default BlogDashboard;