import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosImages } from "react-icons/io";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import type IBlogList from "./IBlogList";
import type IBlogData from "../../../../../../Interface/DataInterface/IBlogData";
import useBlogAction from "../../../../../../customHooks/useBlogAction";
import BlogCard from "../../../../../Common/Card/BlogCard/BlogCard";

const BlogList: React.FC<IBlogList> = ({ filters }) => {
    const { fetchBlogs } = useBlogAction();
    const [blogs, setBlogs] = useState<IBlogData[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(false);
    const filtersRef = useRef(filters);

    useEffect(() => {
        let cancelled = false;

        const filtersChanged = filtersRef.current !== filters;
        filtersRef.current = filters;

        // When filters change mid-pagination, reset to page 1 and let the
        // resulting page update re-trigger this effect for the actual fetch.
        if (filtersChanged && page !== 1) {
            setPage(1);
            return;
        }

        const loadBlogs = async () => {
            setIsLoading(true);
            setHasError(false);
            const response = await fetchBlogs({ page, ...filters });
            if (cancelled) return;

            if (response.success && response.data) {
                setBlogs(response.data.blogs);
                setTotalPages(response.data.totalPages || 1);
            } else {
                setBlogs([]);
                setTotalPages(1);
                setHasError(true);
            }
            setIsLoading(false);
        };

        loadBlogs();
        return () => {
            cancelled = true;
        };
    }, [filters, page]);

    return (
        <section className="mt-8 flex w-full flex-col items-center gap-6">
            {isLoading ? (
                <div className="flex flex-col items-center gap-3 py-16 text-[#9a9a9a]">
                    <AiOutlineLoading3Quarters className="animate-spin text-3xl" />
                    <p className="text-sm">Loading blogs...</p>
                </div>
            ) : hasError ? (
                <div className="flex flex-col items-center gap-2 py-16 text-[#9a9a9a]">
                    <p className="text-sm">Something went wrong while fetching blogs.</p>
                </div>
            ) : blogs.length === 0 ? (
                <div className="flex flex-col items-center gap-3 py-16 text-[#9a9a9a]">
                    <IoIosImages className="text-4xl" />
                    <p className="text-sm">No blogs found. Try adjusting your filters.</p>
                </div>
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div
                        key={page}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="grid max-h-[640px] w-full grid-cols-1 justify-items-center gap-6 overflow-y-auto overscroll-contain px-2 py-1 sm:grid-cols-2 lg:grid-cols-3 [scrollbar-color:#495057_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#495057] [&::-webkit-scrollbar-track]:bg-transparent"
                    >
                        {blogs.map((blog, index) => (
                            <motion.div
                                key={`${blog.tripTitle}-${index}`}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                            >
                                <BlogCard blogData={blog} />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            )}

            {!isLoading && !hasError && totalPages > 1 && (
                <div className="flex items-center gap-4 text-sm text-[#d6d6d6]">
                    <button
                        type="button"
                        disabled={page <= 1}
                        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#495057] bg-[#242423] transition-colors duration-200 hover:bg-[#3a3a39] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <IoChevronBack />
                    </button>
                    <p>
                        Page {page} of {totalPages}
                    </p>
                    <button
                        type="button"
                        disabled={page >= totalPages}
                        onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
                        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#495057] bg-[#242423] transition-colors duration-200 hover:bg-[#3a3a39] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <IoChevronForward />
                    </button>
                </div>
            )}
        </section>
    );
};

export default BlogList;
