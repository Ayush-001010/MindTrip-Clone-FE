import React, { useState, useEffect, createContext, useContext } from "react";
import CommonConfig from "../../../../config/CommonConfig";
import Body from "./Body/Body";
import type IBlog from "./IBlog";
import type IBlogData from "../../../../Interface/DataInterface/IBlogData";
import Header from "./Header/Header";
import PageWheel from "./PageWheel/PageWheel";
import SpeedDial from "./SpeedDial/SpeedDial";

export interface IBlogContext {
    mode: "create" | "preview";
    blogValue: IBlogData;
    itemAddToActivity: (activity: "Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes") => void;
    itemToAdd: "Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes" | null;
}

const blogContext = createContext<IBlogContext | null>(null);

export const useGetBlogContext = () => {
    const context = useContext(blogContext);
    if (!context) {
        throw new Error("useGetBlogContext must be used within a BlogContextProvider");
    }
    return context;
};

const Blog: React.FC<IBlog> = () => {
    const [mode, setMode] = useState<"create" | "preview">("preview");
    const [blogValue, setBlogValue] = useState<IBlogData | null>(null);
    const [itemToAdd, setItemToAdd] = useState<"Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes" | null>(null);

    const itemAddToActivity = (activity: "Activity" | "Tips" | "Side-Activity" | "Travel" | "Images" | "Notes") => {
        if (activity === "Activity") {
            addBlogActivityItem();
        } else {
            setItemToAdd(activity);
        }
    }

    const addBlogActivityItem = () => {
        setBlogValue((prev: IBlogData | null) => {
            if (!prev) return prev;
            return {
                ...prev,
                activities: [...prev.activities, CommonConfig.initialActivityValue]
            } as IBlogData;
        });
    }

    useEffect(() => {
        const url = location.href;
        if (url.includes("/#/blog/create")) {
            setMode("create");
            setBlogValue(CommonConfig.initialBlogValue);
        }
    }, []);

    return (
        <blogContext.Provider value={{ mode, blogValue: blogValue!, itemAddToActivity, itemToAdd }}>
            <Header />
            <Body />
            <section className="static">
                <PageWheel />
            </section>
            <SpeedDial />
        </blogContext.Provider>
    );
};

export default Blog;