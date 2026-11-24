import assert from "node:assert/strict";
import test from "node:test";
import type { IBlogActivite } from "../src/Interface/DataInterface/IBlogData";
import { BLOG_DURATION_IN_FRAMES, BLOG_FPS, buildBlogTimeline } from "../src/component/Pages/Blog/Animation/blogTimeline.ts";

const activity = (values: Partial<IBlogActivite> = {}): IBlogActivite => ({
    index: 1,
    type: "activity",
    day: 1,
    placeName: "",
    activityType: "",
    time: "",
    description: "An afternoon by the sea.",
    tips: [],
    coordinates: { latitude: 0, longitude: 0 },
    images: [],
    sideActivities: [],
    amountSpent: 0,
    itemOrder: [],
    userID: "",
    ...values,
});

test("fills exactly 90 seconds with consecutive intro and day scenes, including rounding", () => {
    const scenes = buildBlogTimeline({ tripDuration: 7, activities: [], travel: [] });
    assert.deepEqual(scenes.slice(0, 2).map((scene) => [scene.type, scene.from, scene.durationInFrames]), [
        ["start", 0, 180],
        ["caseFile", 180, 180],
    ]);
    let end = 0;
    for (const scene of scenes) {
        assert.equal(scene.from, end);
        assert.ok(Number.isInteger(scene.durationInFrames) && scene.durationInFrames > 0);
        end += scene.durationInFrames;
    }
    assert.equal(end, BLOG_DURATION_IN_FRAMES);
    assert.equal(end / BLOG_FPS, 90);
});

test("orders days numerically and gives each photo time without counting its spending twice", () => {
    const scenes = buildBlogTimeline({
        tripDuration: 2,
        activities: [
            activity({ day: 2, images: ["second-day.jpg"], amountSpent: 50 }),
            activity({ day: 1, images: ["first.jpg", "second.jpg", "third.jpg"], amountSpent: 120 }),
        ],
        travel: [],
    });
    const days = scenes.filter((scene) => scene.type === "day");
    assert.deepEqual(days.map((scene) => scene.content.day), [1, 2]);
    assert.equal(days[0].durationInFrames, days[1].durationInFrames * 3);
    assert.deepEqual(days[0].content.slides.map((slide) => slide.photo), ["first.jpg", "second.jpg", "third.jpg"]);
    assert.equal(days[0].content.amountSpent, 120);
    assert.ok(days[0].content.slides.every((slide) => slide.description === "An afternoon by the sea." && slide.amountSpent === 120));
});

test("includes side activities and day-linked travel descriptions and expenses", () => {
    const scenes = buildBlogTimeline({
        tripDuration: 1,
        activities: [activity({
            amountSpent: 100,
            sideActivities: [activity({ day: 0, description: "A quick snack.", amountSpent: 25 })],
        })],
        travel: [{ type: "travel", time: "", activityNumber: 1, day: 1, travelType: "bus", description: "Bus to the beach.", amountSpent: 40 }],
    });
    const scene = scenes.find((item) => item.type === "day");
    assert.ok(scene?.type === "day");
    assert.equal(scene.content.amountSpent, 165);
    assert.deepEqual(scene.content.slides.map((slide) => slide.description), [
        "An afternoon by the sea.", "A quick snack.", "Bus to the beach.",
    ]);
});

test("keeps empty days and zero-cost entries visible and includes days beyond the declared duration", () => {
    const scenes = buildBlogTimeline({
        tripDuration: 2,
        activities: [activity({ day: 3, description: "", images: [], amountSpent: 0 })],
        travel: [],
    });
    const days = scenes.filter((scene) => scene.type === "day");
    assert.deepEqual(days.map((scene) => scene.content.day), [1, 2, 3]);
    assert.equal(days[0].content.slides.length, 0);
    assert.deepEqual(days[2].content.slides, [{ placeName: "", time: "", description: "No description added.", amountSpent: 0 }]);
    const empty = buildBlogTimeline({ tripDuration: 0, activities: [], travel: [] });
    assert.equal(empty.length, 3);
    assert.equal(empty[2].from + empty[2].durationInFrames, BLOG_DURATION_IN_FRAMES);
});

test("preserves uploaded files for the day photo renderer", () => {
    const file = new File(["photo"], "trip.png", { type: "image/png" });
    const scenes = buildBlogTimeline({
        tripDuration: 1,
        activities: [{ ...activity(), images: [file] }],
        travel: [],
    });
    const scene = scenes.find((item) => item.type === "day");
    assert.ok(scene?.type === "day");
    assert.equal(scene.content.slides[0].photo, file);
});

test("keeps the correct place and time on each activity photo, side activity and travel entry", () => {
    const scenes = buildBlogTimeline({
        tripDuration: 1,
        activities: [activity({
            placeName: " Lakeside ",
            time: "09:00 - 10:30",
            images: ["first.jpg", "second.jpg"],
            sideActivities: [activity({ placeName: "Cafe", time: "11:00 - 11:30" })],
        })],
        travel: [{ type: "travel", time: "12:00 - 13:00", activityNumber: 1, day: 1, travelType: "bus", description: "Return journey.", amountSpent: 40 }],
    });
    const scene = scenes.find((item) => item.type === "day");
    assert.ok(scene?.type === "day");
    assert.deepEqual(scene.content.slides.map(({ placeName, time }) => ({ placeName, time })), [
        { placeName: "Lakeside", time: "09:00 - 10:30" },
        { placeName: "Lakeside", time: "09:00 - 10:30" },
        { placeName: "Cafe", time: "11:00 - 11:30" },
        { placeName: "", time: "12:00 - 13:00" },
    ]);
});
