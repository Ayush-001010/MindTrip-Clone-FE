import React , {useState, useEffect} from "react";
import type IBlogNewsFeed from "./IBlogNewsFeed";
import type IBlogData from "../../../Interface/DataInterface/IBlogData";
import Header from "./Header/Header";
import TextBanner from "./TextBanner/TextBanner";
import useBlogAction from "../../../customHooks/useBlogAction";
import ShowCards from "../../Common/ShowCards/ShowCards";
import BlogDashboard from "./BlogDashboard/BlogDashboard";

const BlogNewsFeed : React.FC<IBlogNewsFeed> = () => {
    const { getTopFiveBlogs } = useBlogAction();
    const [topFiveBlogs, setTopFiveBlogs] = useState<IBlogData[]>([]);

    useEffect(() => {
        getTopFiveBlogs().then(response => {
            console.log(response);
            if(response.success && response.data){
            setTopFiveBlogs(response.data as IBlogData[]);
            }
        });
    }, []);
    return (
        <main className="p-4">
            <Header />
            <section className="mt-4 flex">
                <TextBanner />
                <section className="mx-4 w-full flex items-center justify-center">
                    <ShowCards type="blog" data={topFiveBlogs}/>
                </section>
            </section>
            <section>
                <BlogDashboard />
            </section>
        </main>
    );
};

export default BlogNewsFeed;