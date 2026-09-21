import React from "react";
import type IBlogs from "./IBlogs";
import { Link } from "react-router-dom";

const Blogs: React.FC<IBlogs> = () => {
  return (
    <section>
      <section className="flex justify-end m-2">
        <Link to="/blog/create">
          <button className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">
            Create New Blog
          </button>
        </Link>
      </section>
    </section>
  );
};

export default Blogs;