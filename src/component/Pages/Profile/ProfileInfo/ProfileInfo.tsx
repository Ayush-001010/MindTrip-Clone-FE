import React, { useState } from "react";
import { message } from "antd";
import type IProfileInfo from "./IProfileInfo";
import BlogsStamp from "./BlogsStamp/BlogsStamp";
import PlacesStamp from "./PlacesStamp/PlacesStamp";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdOutlineWorkOutline, MdOutlineHiking, MdOutlineForest, MdOutlineDirectionsWalk, MdOutlineRestaurant, MdOutlineCoffee, MdOutlineFitnessCenter, MdOutlinePets, MdOutlineMuseum, MdNightlife } from "react-icons/md";
import { RiGlobeLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { CiMusicNote1 } from "react-icons/ci";
import { LuLanguages } from "react-icons/lu";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineCelebration } from "react-icons/md";
import { FaPersonSwimming } from "react-icons/fa6";
import { BiCameraMovie } from "react-icons/bi";
import { GiCampCookingPot, GiMusicalNotes, GiWaterPolo, GiBookmarklet } from "react-icons/gi";
import { IoGameControllerOutline } from "react-icons/io5";
import { HiOutlineCamera } from "react-icons/hi2";
import { RiShoppingBag4Line } from "react-icons/ri";
import ProfileForm, { profileFormInputClass } from "./ProfileForm/ProfileForm";

const MAX_ABOUT_LENGTH = 500;
const MAX_INTERESTS = 20;

const interestIcons: Record<string, React.ReactNode> = {
    Hiking: <MdOutlineHiking />,
    Outdoors: <MdOutlineForest />,
    Walking: <MdOutlineDirectionsWalk />,
    "Water Sports": <GiWaterPolo />,
    "Food Scenes": <MdOutlineRestaurant />,
    "Live Music": <GiMusicalNotes />,
    Photography: <HiOutlineCamera />,
    Films: <BiCameraMovie />,
    Coffee: <MdOutlineCoffee />,
    Cooking: <GiCampCookingPot />,
    "Night Life": <MdNightlife />,
    Shopping: <RiShoppingBag4Line />,
    Fitness: <MdOutlineFitnessCenter />,
    Animals: <MdOutlinePets />,
    "Local Culture": <MdOutlineMuseum />,
    Swimming: <FaPersonSwimming />,
    Gaming: <IoGameControllerOutline />,
    Reading: <GiBookmarklet />,
};

const chipBase = "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50";
type InfoType = "birthday" | "work" | "website" | "music" | "languages" | "location" | "anniversary";
type InfoRow = { icon: React.ReactNode; label: string; key: InfoType; value?: string; editPlaceholder: string };

const rowClass = "group flex items-center gap-4 border-b border-zinc-800 py-4";

const parseAnswers = (raw: string | null | undefined): Record<string, string> | null => {
    try {
        const parsed: unknown = JSON.parse(raw || "{}");
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed) || !Object.values(parsed).every((value) => typeof value === "string")) {
            throw new Error("General answers must be a JSON object containing string values.");
        }
        return Object.fromEntries(Object.entries(parsed));
    } catch (error) {
        console.error("Could not parse profile general answers:", error);
        return null;
    }
};

const ProfileInfo: React.FC<IProfileInfo> = ({ profile, mode , places , blogsDetails , changeProfileFields }) => {
    const isEdit = mode === "edit";
    const parsedAnswers = parseAnswers(profile?.genralAnswer);
    const answers = parsedAnswers ?? {};
    const [openForm, setOpenForm] = useState(false);
    const [currentType, setCurrentType] = useState<InfoType | null>(null);
    const [aboutOpen, setAboutOpen] = useState(false);
    const [aboutDraft, setAboutDraft] = useState("");
    const [interestsOpen, setInterestsOpen] = useState(false);
    const [interestDraft, setInterestDraft] = useState<string[]>([]);

    const aboutMe = profile?.aboutMe ?? "";
    const interests = (profile?.interests?.split(",") ?? []).map((item) => item.trim()).filter(Boolean);

    const clickHandler = (type: InfoType) => {
        setCurrentType(type);
        setOpenForm(true);
    };

    const openAboutEditor = () => {
        setAboutDraft(aboutMe);
        setAboutOpen(true);
    };

    const openInterestsEditor = () => {
        setInterestDraft(interests);
        setInterestsOpen(true);
    };

    const toggleInterest = (interest: string) => {
        setInterestDraft((previous) => {
            if (previous.includes(interest)) return previous.filter((item) => item !== interest);
            return previous.length >= MAX_INTERESTS ? previous : [...previous, interest];
        });
    };

    const saveAboutMe = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        changeProfileFields("aboutMe", aboutDraft.trim());
        setAboutOpen(false);
    };

    const saveInterests = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        changeProfileFields("interests", interestDraft.join(","));
        setInterestsOpen(false);
    };

    const visibleInterests = [...Object.keys(interestIcons), ...interests.filter((item) => !(item in interestIcons))];

    const rows: InfoRow[] = [
        { key: "birthday", icon: <LiaBirthdayCakeSolid />, label: "Birthday", value: profile?.birthdayDate ?? undefined, editPlaceholder: "When's your birthday? (mm/dd/yyyy)" },
        { key: "work", icon: <MdOutlineWorkOutline />, label: "Work", value: answers.work, editPlaceholder: "What do you do for work?" },
        { key: "website", icon: <RiGlobeLine />, label: "Dream destination", value: answers.website, editPlaceholder: "Where do you dream of going next?" },
        { key: "music", icon: <CiMusicNote1 />, label: "Favourite music", value: answers.music, editPlaceholder: "What's on your travel playlist?" },
        { key: "languages", icon: <LuLanguages />, label: "Languages", value: answers.languages, editPlaceholder: "Which languages do you speak?" },
        { key: "location", icon: <CiLocationOn />, label: "Home base", value: profile?.location ?? answers.location, editPlaceholder: "Where do you call home?" },
        { key: "anniversary", icon: <MdOutlineCelebration />, label: "Anniversary", value: profile?.anniversaryDate ?? answers.anniversary, editPlaceholder: "When's your anniversary?" }
    ];

    const visibleRows = isEdit ? rows : rows.filter((row) => row.value);

    return (
        <section className="w-full min-w-0 space-y-10">
            <section>
                <header>
                    <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
                        {isEdit ? "Tell fellow travelers about you" : "A little about me"}
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                        {isEdit
                            ? "Add a few details so friends and fellow travelers can get to know you. Tap any row to fill it in."
                            : "A few things that make my journeys my own."}
                    </p>
                </header>
                <ul className="mt-6 grid grid-cols-1 gap-x-10 md:grid-cols-2">
                    {visibleRows.map((row) => (
                        <li key={row.key}>
                            <button
                                type="button"
                                onClick={() => clickHandler(row.key)}
                                disabled={!isEdit}
                                className={`${rowClass} w-full text-left ${isEdit ? "cursor-pointer rounded-lg px-2 transition hover:bg-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50" : "cursor-default"}`}
                            >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-zinc-800 text-xl text-violet-300" aria-hidden>
                                    {row.icon}
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-zinc-500">{row.label}</span>
                                    <span className={`mt-0.5 block text-sm wrap-break-word ${row.value ? "text-zinc-100" : "text-zinc-500"}`}>
                                        {row.value || row.editPlaceholder}
                                    </span>
                                </span>
                                {isEdit && <IoIosArrowForward className="shrink-0 text-zinc-500 transition group-hover:translate-x-0.5 group-hover:text-zinc-200" aria-hidden />}
                            </button>
                        </li>
                    ))}
                </ul>
                <ProfileForm
                    open={openForm}
                    onClose={() => setOpenForm(false)}
                    type={currentType ?? "birthday"}
                    value={rows.find((row) => row.key === currentType)?.value ?? ""}
                    onSave={(value) => {
                        if (currentType === "birthday") changeProfileFields("birthdayDate", value);
                        else if (currentType === "anniversary") changeProfileFields("anniversaryDate", value);
                        else if (currentType === "location") changeProfileFields("location", value);
                        else if (currentType) {
                            if (!parsedAnswers) {
                                message.error("General answers could not be read. Reload your profile before editing them.");
                                return;
                            }
                            changeProfileFields("genralAnswer", (previous) => {
                                const existing = parseAnswers(previous);
                                return existing ? JSON.stringify({ ...existing, [currentType]: value }) : previous;
                            });
                        }
                    }}
                />
            </section>

            <section className="border-t border-zinc-800 pt-8">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">About me</h2>
                {isEdit ? (
                    <button
                        type="button"
                        onClick={openAboutEditor}
                        className="mt-4 block min-h-30 w-full rounded-xl border border-dashed border-zinc-700 p-4 text-left transition hover:border-violet-400 hover:bg-violet-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
                    >
                        {aboutMe ? (
                            <span className="block whitespace-pre-wrap wrap-break-word text-sm leading-6 text-zinc-200">{aboutMe}</span>
                        ) : (
                            <span className="block text-sm text-zinc-400">Write something fun and punchy.</span>
                        )}
                        <span className="mt-1 inline-block text-sm font-semibold text-zinc-100 underline underline-offset-2">
                            {aboutMe ? "Edit intro" : "Add intro"}
                        </span>
                    </button>
                ) : (
                    <p className="mt-3 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-zinc-400">
                        {aboutMe || "No information provided."}
                    </p>
                )}
                <ProfileForm
                    open={aboutOpen}
                    onClose={() => setAboutOpen(false)}
                    title="About you"
                    description="Tell us a little bit about yourself so your future travel buddies can get to know you."
                    onSubmit={saveAboutMe}
                >
                    <textarea
                        name="aboutMe"
                        autoFocus
                        rows={5}
                        maxLength={MAX_ABOUT_LENGTH}
                        value={aboutDraft}
                        onChange={(event) => setAboutDraft(event.target.value)}
                        aria-label="About you"
                        className={`${profileFormInputClass} resize-none`}
                    />
                    <p className="mt-2 text-right text-xs text-zinc-400">
                        <span className="font-semibold text-zinc-200">{MAX_ABOUT_LENGTH - aboutDraft.length}</span> characters available
                    </p>
                </ProfileForm>
            </section>

            <section className="border-t border-zinc-800 pt-8">
                <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">
                    {isEdit ? "What are you into?" : `What ${profile?.name || "they"} ${profile?.name ? "is" : "are"} into`}
                </h2>
                {isEdit && (
                    <p className="mt-2 text-sm leading-6 text-zinc-400">Pick interests you enjoy and want to show on your profile.</p>
                )}
                {interests.length > 0 ? (
                    <ul className="mt-4 flex flex-wrap gap-3">
                        {interests.map((interest) => (
                            <li key={interest} className={`${chipBase} max-w-full whitespace-normal break-words border-zinc-700 text-zinc-200`}>
                                {interestIcons[interest] && <span className="text-lg text-violet-300" aria-hidden>{interestIcons[interest]}</span>}
                                {interest}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="mt-3 text-sm text-zinc-500">{isEdit ? "Nothing picked yet." : "No interests shared yet."}</p>
                )}
                {isEdit && (
                    <button
                        type="button"
                        onClick={openInterestsEditor}
                        className="mt-4 rounded-lg border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-100 transition hover:border-violet-400 hover:bg-violet-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50 active:scale-95"
                    >
                        {interests.length > 0 ? "Edit interests" : "Add interests"}
                    </button>
                )}
                <PlacesStamp places={places} />
                <BlogsStamp blogsDetails={blogsDetails} />
                <ProfileForm
                    open={interestsOpen}
                    onClose={() => setInterestsOpen(false)}
                    title="What are you into?"
                    description="Pick some interests that you enjoy and that you want to show on your profile."
                    onSubmit={saveInterests}
                    footerNote={<>{interestDraft.length}/{MAX_INTERESTS} selected</>}
                >
                    <div className="mt-5 flex max-h-72 flex-wrap gap-3 overflow-y-auto">
                        {visibleInterests.map((interest) => {
                            const selected = interestDraft.includes(interest);
                            return (
                                <button
                                    key={interest}
                                    type="button"
                                    aria-pressed={selected}
                                    onClick={() => toggleInterest(interest)}
                                    className={`${chipBase} max-w-full whitespace-normal break-words ${selected ? "border-violet-400 bg-violet-500/15 text-white" : "border-zinc-700 text-zinc-300 hover:border-zinc-500"}`}
                                >
                                    {interestIcons[interest] && (
                                        <span className={`text-lg ${selected ? "text-violet-300" : "text-zinc-400"}`} aria-hidden>
                                            {interestIcons[interest]}
                                        </span>
                                    )}
                                    {interest}
                                </button>
                            );
                        })}
                    </div>
                </ProfileForm>
            </section>
        </section>
    );
};

export default ProfileInfo;