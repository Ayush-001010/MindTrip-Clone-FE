import type IBlogData from "../../../../Interface/DataInterface/IBlogData";
import type { IBlogActivite } from "../../../../Interface/DataInterface/IBlogData";

export const BLOG_FPS = 30;
export const BLOG_DURATION_IN_FRAMES = 90 * BLOG_FPS;
const INTRO_DURATION_IN_FRAMES = 6 * BLOG_FPS;

export interface BlogDaySlide {
    photo?: string | File;
    placeName: string;
    time: string;
    description: string;
    amountSpent: number;
}

export interface BlogDay {
    day: number;
    slides: BlogDaySlide[];
    amountSpent: number;
}

type TimelineActivity = Pick<IBlogActivite, "day" | "placeName" | "time" | "description" | "amountSpent"> & {
    images: (string | File)[];
    sideActivities: TimelineActivity[];
};

export type IAnimationVideoType = {
    durationInFrames: number;
    from: number;
} & (
    | { type: "start" | "caseFile" }
    | { type: "day"; content: BlogDay }
);

export const buildBlogTimeline = (
    blog: Pick<IBlogData, "travel" | "tripDuration"> & { activities: TimelineActivity[] },
): IAnimationVideoType[] => {
    const days = new Map<number, BlogDay>();
    const getDay = (day: number) => {
        let content = days.get(day);
        if (!content) {
            content = { day, slides: [], amountSpent: 0 };
            days.set(day, content);
        }
        return content;
    };

    for (let day = 1; day <= Math.max(1, blog.tripDuration); day++) {
        getDay(day);
    }

    const addActivity = (activity: TimelineActivity, day: number) => {
        const content = getDay(day);
        const amountSpent = activity.amountSpent ?? 0;
        const description = activity.description?.trim() || "No description added.";
        const details = {
            placeName: activity.placeName?.trim() ?? "",
            time: activity.time?.trim() ?? "",
            description,
            amountSpent,
        };
        const photos: (string | File)[] = activity.images ?? [];
        content.amountSpent += amountSpent;
        content.slides.push(...(photos.length > 0
            ? photos.map((photo) => ({ photo, ...details }))
            : [details]));

        for (const sideActivity of activity.sideActivities ?? []) {
            addActivity(sideActivity, day);
        }
    };

    for (const activity of blog.activities ?? []) {
        addActivity(activity, activity.day);
    }
    for (const travel of blog.travel ?? []) {
        const content = getDay(travel.day);
        content.amountSpent += travel.amountSpent ?? 0;
        content.slides.push({
            placeName: "",
            time: travel.time?.trim() ?? "",
            description: travel.description?.trim() || "No travel description added.",
            amountSpent: travel.amountSpent ?? 0,
        });
    }

    const orderedDays = [...days.values()].sort((a, b) => a.day - b.day);
    const totalSlides = orderedDays.reduce((total, day) => total + Math.max(1, day.slides.length), 0);
    const contentStart = 2 * INTRO_DURATION_IN_FRAMES;
    const contentFrames = BLOG_DURATION_IN_FRAMES - contentStart;
    const scenes: IAnimationVideoType[] = [
        { type: "start", from: 0, durationInFrames: INTRO_DURATION_IN_FRAMES },
        { type: "caseFile", from: INTRO_DURATION_IN_FRAMES, durationInFrames: INTRO_DURATION_IN_FRAMES },
    ];
    let completedSlides = 0;
    let from = contentStart;
    for (const content of orderedDays) {
        completedSlides += Math.max(1, content.slides.length);
        const end = contentStart + Math.round(contentFrames * completedSlides / totalSlides);
        scenes.push({ type: "day", content, from, durationInFrames: end - from });
        from = end;
    }
    return scenes;
};
