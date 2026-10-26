import React, { useState } from "react";
import type IBlogDashboard from "./IBlogDashboard";
import type IBlogFilters from "./IBlogFilters";
import Filter from "./Filter/Filter";
import BlogList from "./BlogList/BlogList";

const BlogDashboard: React.FC<IBlogDashboard> = () => {
    const [filters, setFilters] = useState<IBlogFilters>({});

    return (
        <section className="mt-10">
            <Filter onFiltersChange={setFilters} />
            <BlogList filters={filters} />
        </section>
    );
};

export default BlogDashboard;