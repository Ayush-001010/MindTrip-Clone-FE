import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdOutlineCollectionsBookmark } from "react-icons/md";
import type ICollectionCard from "./ICollectionCard";
import CollectionDetails from "./CollectionDetails/CollectionDetails";

const CollectionCard: React.FC<ICollectionCard> = ({ name, id, image1, image2, image3 }) => {
    const [openCollectionDetails, setOpenCollectionDetails] = useState(false);

    const openCollectionDetailsHandler = () => {
        setOpenCollectionDetails(true);
    };

    return (
        <section className="w-full">
            {!openCollectionDetails && (
                <motion.section
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    className="group flex w-full cursor-pointer flex-col gap-3 items-center w-full max-w-3xs"
                >
                    {!image1 && (
                        <div className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 p-4 text-center transition-colors group-hover:border-[#22C55E]/60 group-hover:bg-white/10">
                            <MdOutlineCollectionsBookmark className="text-3xl text-[#22C55E]" />
                            <p className="text-xs leading-snug text-white/60">
                                You haven't added any places, blogs, or stays yet
                            </p>
                        </div>
                    )}
                    {image1 && (
                        <div onClick={openCollectionDetailsHandler} className="grid aspect-square w-full grid-cols-2 grid-rows-2 gap-1 overflow-hidden rounded-2xl">
                            <img
                                src={image1}
                                alt={`${name} 1`}
                                className="row-span-2 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            {[image2, image3].map((img, i) =>
                                img ? (
                                    <img
                                        key={i}
                                        src={img}
                                        alt={`${name} ${i + 2}`}
                                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div key={i} className="flex h-full w-full items-center justify-center bg-white/5">
                                        <MdOutlineCollectionsBookmark className="text-xl text-white/30" />
                                    </div>
                                )
                            )}
                        </div>
                    )}

                    <p className="truncate px-1 text-[#6c757d] text-base font-medium">{name}</p>
                </motion.section>
            )}
            {openCollectionDetails && <CollectionDetails id={id} />}
        </section>
    );
};

export default CollectionCard;
