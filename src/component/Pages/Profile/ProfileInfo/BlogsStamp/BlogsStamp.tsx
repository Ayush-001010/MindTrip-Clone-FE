import React from "react";
import { Link } from "react-router-dom";
import { BsJournalText, BsHeart, BsEye } from "react-icons/bs";
import type IBlogsStamp from "./IBlogsStamp";

const BlogsStamp: React.FC<IBlogsStamp> = ({ blogsDetails }) => {
    return (
        <section className="mt-8 border-t border-zinc-800 pt-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">Stories I've shared</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">Travel memories, one story at a time.</p>
            {blogsDetails.length === 0 ? (
                <p className="mt-4 text-sm text-zinc-500">No blog stamps yet.</p>
            ) : (
                <ul
                    tabIndex={0}
                    aria-label="Blog stamps, scroll horizontally to see more"
                    className="mt-5 flex min-w-0 snap-x snap-proximity gap-5 overflow-x-auto overscroll-x-contain rounded-lg px-2 pt-3 pb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
                >
                    {blogsDetails.map((blog, index) => (
                        <li key={blog.blogId} className="w-48 shrink-0 snap-start sm:w-52">
                            <Link
                                to={`/inspiration/blog/${blog.blogId}`}
                                aria-label={`Read ${blog.blogTitle}`}
                                className="group block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
                            >
                                <div className={`relative h-36 w-full text-violet-300 transition duration-200 group-hover:-translate-y-1 group-hover:rotate-0 group-hover:text-violet-200 group-focus-visible:rotate-0 motion-reduce:transform-none ${index % 2 === 0 ? "-rotate-1" : "rotate-1"}`}>
                                    <svg viewBox="0 0 224 128" preserveAspectRatio="none" className="absolute inset-0 size-full" fill="none" aria-hidden="true">
                                        <rect x="4" y="4" width="216" height="120" rx="8" fill="currentColor" fillOpacity="0.07" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                                        <rect x="10" y="10" width="204" height="108" rx="4" stroke="currentColor" strokeOpacity="0.25" />
                                    </svg>
                                    <div className="relative flex h-full min-w-0 flex-col px-5 py-4">
                                        <div className="flex items-center justify-between border-b border-violet-300/15 pb-2 text-[9px] font-semibold uppercase tracking-[0.18em]">
                                            <span>Travel journal</span>
                                            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                                        </div>
                                        <p className="mt-2 line-clamp-2 text-sm font-semibold leading-5 text-zinc-100 wrap-anywhere">{blog.blogTitle}</p>
                                        <div className="mt-auto flex items-end justify-between pt-2">
                                            <span className="text-[9px] font-semibold uppercase tracking-widest opacity-75">Story stamp</span>
                                            <BsJournalText className="size-8 shrink-0" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-4 line-clamp-2 min-h-10 text-center text-sm leading-5 text-zinc-200 transition group-hover:text-violet-300 wrap-anywhere" title={blog.blogTitle}>
                                    {blog.blogTitle}
                                </p>
                            </Link>
                            <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-400">
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-2.5 py-1" aria-label={`${blog.numberOfLikes} likes`}>
                                    <BsHeart className="text-violet-300/80" aria-hidden="true" />
                                    {blog.numberOfLikes.toLocaleString()}
                                </span>
                                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-2.5 py-1" aria-label={`${blog.numberOfViews} views`}>
                                    <BsEye aria-hidden="true" />
                                    {blog.numberOfViews.toLocaleString()}
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default BlogsStamp;