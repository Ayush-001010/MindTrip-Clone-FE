import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MdOutlineCollectionsBookmark,
  MdEdit,
  MdCheck,
  MdClose,
  MdDeleteOutline,
} from "react-icons/md";
import type ICollectionCard from "./ICollectionCard";
import CollectionDetails from "./CollectionDetails/CollectionDetails";

const CollectionCard: React.FC<ICollectionCard> = ({
  name,
  id,
  image1,
  image2,
  image3,
  isNotOpenDetails,
  onRename,
  onDelete,
}) => {
  const [openCollectionDetails, setOpenCollectionDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(name);
  const [isSaving, setIsSaving] = useState(false);
  const [renameError, setRenameError] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");

  const openCollectionDetailsHandler = () => {
    if (isNotOpenDetails || isEditing) return;
  
    setOpenCollectionDetails(true);
  };

  const handleSaveRename = async () => {
    const trimmedName = editedName.trim();

    if (!trimmedName) {
      setRenameError("Collection name cannot be empty");
      return;
    }

    if (trimmedName === name.trim()) {
      setIsEditing(false);
      return;
    }

    if (!onRename) return;

    try {
      setIsSaving(true);
      setRenameError("");

      const success = await onRename(id, trimmedName);

      if (success) {
        setIsEditing(false);
      } else {
        setRenameError("Failed to rename collection");
      }
    } catch (error) {
      console.error("Error renaming collection:", error);
      setRenameError("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelRename = () => {
    setEditedName(name);
    setRenameError("");
    setIsEditing(false);
  };

  const handleDeleteCollection = async () => {
    if (!onDelete) return;

    try {
      setIsDeleting(true);
      setDeleteError("");

      const success = await onDelete(id);

      if (success) {
        setShowDeleteConfirm(false);
      } else {
        setDeleteError("Failed to delete collection. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting collection:", error);
      setDeleteError("Something went wrong while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <section className="w-full">
      {(!openCollectionDetails || isNotOpenDetails) && (
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.3 }}
          className="group flex w-full max-w-3xs flex-col items-center gap-3"
        >
          {!image1 && (
            <div
              onClick={openCollectionDetailsHandler}
              className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-white/20 bg-white/5 p-4 text-center transition-colors group-hover:border-[#22C55E]/60 group-hover:bg-white/10"
            >
              <MdOutlineCollectionsBookmark className="text-3xl text-[#22C55E]" />
              <p className="text-xs leading-snug text-white/60">
                You haven't added any places, blogs, or stays yet
              </p>
            </div>
          )}

          {image1 && (
            <div
              onClick={openCollectionDetailsHandler}
              className="grid aspect-square w-full cursor-pointer grid-cols-2 grid-rows-2 gap-1 overflow-hidden rounded-2xl"
            >
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
                  <div
                    key={i}
                    className="flex h-full w-full items-center justify-center bg-white/5"
                  >
                    <MdOutlineCollectionsBookmark className="text-xl text-white/30" />
                  </div>
                )
              )}
            </div>
          )}

          {/* Collection name and rename controls */}
          {!isEditing ? (
            <div className="flex w-full items-center justify-center gap-2">
              <p className="truncate px-1 text-base font-medium text-[#6c757d]">
                {name}
              </p>
              <div className="flex shrink-0 items-center gap-1">
                {onRename && (
                  <button
                    type="button"
                    title="Rename collection"
                    onClick={() => {
                      setEditedName(name);
                      setRenameError("");
                      setIsEditing(true);
                    }}
                    className="rounded-md p-1 text-white/60 transition hover:bg-white/10 hover:text-[#22C55E]"
                  >
                    <MdEdit size={17} />
                  </button>
                )}

                {onDelete && (
                  <button
                    type="button"
                    title="Delete collection"
                    onClick={() => {
                      setDeleteError("");
                      setShowDeleteConfirm(true);
                    }}
                    className="rounded-md p-1 text-white/60 transition hover:bg-white/10 hover:text-red-500"
                  >
                    <MdDeleteOutline size={19} />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="w-full space-y-2">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    void handleSaveRename();
                  } else if (e.key === "Escape") {
                    handleCancelRename();
                  }
                }}
                autoFocus
                maxLength={100}
                disabled={isSaving}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm text-white outline-none focus:border-[#22C55E]"
                placeholder="Enter collection name"
              />

              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={() => void handleSaveRename()}
                  disabled={isSaving}
                  title="Save"
                  className="flex items-center gap-1 rounded-md bg-[#22C55E] px-3 py-1.5 text-sm text-black transition hover:bg-[#16a34a] disabled:opacity-50"
                >
                  <MdCheck size={17} />
                  {isSaving ? "Saving..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={handleCancelRename}
                  disabled={isSaving}
                  title="Cancel"
                  className="flex items-center gap-1 rounded-md bg-white/10 px-3 py-1.5 text-sm text-white transition hover:bg-white/20"
                >
                  <MdClose size={17} />
                  Cancel
                </button>
              </div>

              {renameError && (
                <p className="text-center text-xs text-red-400">
                  {renameError}
                </p>
              )}
            </div>
          )}
          {showDeleteConfirm && (
            <div className="w-full rounded-xl border border-red-500/30 bg-red-500/10 p-3">
              <p className="text-sm font-semibold text-white">
                Delete "{name}"?
              </p>

              <p className="mt-1 text-xs text-white/60">
                All activities, hotels and blogs saved in this collection will
                also be deleted. This action cannot be undone.
              </p>

              {deleteError && (
                <p className="mt-2 text-xs text-red-400">{deleteError}</p>
              )}

              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => setShowDeleteConfirm(false)}
                  className="rounded-lg bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/20 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  disabled={isDeleting}
                  onClick={() => void handleDeleteCollection()}
                  className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          )}
        </motion.section>
      )}

      {openCollectionDetails && !isNotOpenDetails && (
        <CollectionDetails id={id} />
      )}
    </section>
  );
};

export default CollectionCard;
