import React from "react";
import { FaUmbrellaBeach } from "react-icons/fa6";
import { BsCamera } from "react-icons/bs";
import { CiMountain1 } from "react-icons/ci";
import type IPlacesStamp from "./IPlacesStamp";

const mountainPlaces = new Set(["tamhini", "manali", "solang", "jibhi", "tirthan"]);

const PlacesStamp: React.FC<IPlacesStamp> = ({ places }) => {
    const uniquePlaces = [...new Set(places.map((place) => place.trim()).filter(Boolean))];

    return (
        <section className="mt-8 border-t border-zinc-800 pt-8">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-100">Where I've been</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">A collection of places from my travels.</p>

            {uniquePlaces.length === 0 ? (
                <p className="mt-4 text-sm text-zinc-500">No travel stamps yet.</p>
            ) : (
                <ul
                    tabIndex={0}
                    aria-label="Travel stamps, scroll horizontally to see more"
                    className="mt-5 flex min-w-0 snap-x snap-proximity gap-5 overflow-x-auto overscroll-x-contain rounded-lg px-2 pt-3 pb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
                >
                    {uniquePlaces.map((place, index) => {
                        const parts = place.split(",").map((part) => part.trim()).filter(Boolean);
                        const name = parts[0];
                        const country = parts.length > 1 ? parts[parts.length - 1] : "";
                        const locationParts = parts.map((part) => part.toLowerCase());
                        const isMountain = mountainPlaces.has(locationParts[0]);
                        const isBeach = locationParts.some((part) => part === "ratnagiri" || part === "ratnagiri taluka");
                        const Icon = isMountain ? CiMountain1 : isBeach ? FaUmbrellaBeach : BsCamera;
                        const category = isMountain ? "Mountain" : isBeach ? "Beach" : "City";
                        const stampColor = isMountain ? "text-[#a3c9a8]" : isBeach ? "text-[#e2bf8d]" : "text-[#bcb1dc]";

                        return (
                            <li key={place} className="w-44 shrink-0 snap-start sm:w-48" aria-label={`${place} — ${category} stamp`}>
                                <div className={`relative h-32 w-full ${stampColor} ${isMountain ? "" : index % 2 === 0 ? "-rotate-2" : "rotate-2"}`}>
                                    <svg viewBox="0 0 224 128" preserveAspectRatio="none" className="absolute inset-0 size-full" fill="none" aria-hidden="true">
                                        {isMountain ? (
                                            <polygon points="4,64 38,4 186,4 220,64 186,124 38,124" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                                        ) : (
                                            <rect x="4" y="4" width="216" height="120" rx={isBeach ? 18 : 8} fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="2" />
                                        )}
                                    </svg>
                                    <div className={`relative flex h-full min-w-0 flex-col justify-between py-4 ${isMountain ? "px-9" : "px-5"}`}>
                                        <p className={`line-clamp-2 text-sm font-semibold leading-5 wrap-anywhere ${isMountain ? "text-center" : ""}`}>{name}</p>
                                        <div className="relative flex flex-1 items-end justify-center pt-2">
                                            <span className="absolute bottom-0 left-0 max-w-12 text-[10px] font-semibold uppercase tracking-widest wrap-anywhere">
                                                {country === "India" ? "IN" : country}
                                            </span>
                                            <Icon className="size-12 shrink-0" aria-hidden="true" />
                                        </div>
                                    </div>
                                </div>
                                <p className="mt-3 text-center text-sm text-zinc-200 wrap-anywhere">
                                    {[name, country].filter(Boolean).join(", ")}
                                </p>
                                <p className="mt-1 text-center text-xs text-zinc-500">{category}</p>
                            </li>
                        );
                    })}
                </ul>
            )}
        </section>
    );
};

export default PlacesStamp;