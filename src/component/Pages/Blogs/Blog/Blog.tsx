import React , {useState , useEffect, createContext, useContext} from "react";
import type IBlog from "./IBlog";
import type IBlogData from "../../../../Interface/DataInterface/IBlogData";
import Header from "./Header/Header";


export interface IBlogContext {
    mode: "create" | "preview";
    blogValue : IBlogData
}

const blogContext = createContext<IBlogContext | null>(null);

export const useGetBlogContext = () => {
    const context = useContext(blogContext);
    if (!context) {
        throw new Error("useGetBlogContext must be used within a BlogContextProvider");
    }
    return context;
};

const Blog:React.FC<IBlog> = () => {
    const [mode , setMode] = useState<"create" | "preview">("preview");
    const [blogValue , setBlogValue] = useState<IBlogData | null>(null);

    useEffect(() => {
        const url = location.href;
        if(url.includes("/#/blog/create")){
            setMode("create");
            setBlogValue({
                tripTitle: "",
                tripOverview: "",
                totalSpent: 0,
                tripDuration: 0,
                noOfPlaces: 0,
                noOfActivities: 0,
                activities: [],
                hotel: {
                    name: "",
                    address: "",
                    checkInDate: "",
                    checkOutDate: "",
                    amountSpent: 0,
                    description: ""
                }
            });
        }
    },[]);

    return (
        <blogContext.Provider value={{mode, blogValue: blogValue!}}>
            <Header />
        </blogContext.Provider>
    );
};

export default Blog;