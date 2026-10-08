import React from "react";
import type IFavouritesCard from "./IFavouritesCard";

const FavouritesCard : React.FC<IFavouritesCard> = ({ imageUrl, title, description, address, price }) => {
    return (
        <section className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="aspect-[16/9] overflow-hidden bg-slate-200">
                <img
                    src={imageUrl}
                    alt={title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
            </div>
            <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-4">
                <h2 className="line-clamp-1 text-base font-semibold text-slate-900">{title}</h2>
                <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">{description}</p>
                {address && <p className="mt-auto text-xs font-medium text-slate-500">{address}</p>}
                {price !== undefined && (
                    <p className="mt-auto text-base font-semibold text-emerald-600">{price}</p>
                )}
            </div>
        </section>
    )
};

export default FavouritesCard;
