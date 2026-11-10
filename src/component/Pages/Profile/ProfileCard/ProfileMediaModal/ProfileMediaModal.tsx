import React, { useEffect, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import ProfileForm, { profileFormInputClass } from "../../ProfileInfo/ProfileForm/ProfileForm";

interface ProfileMediaModalProps {
    imageUrl: string;
    imageFile: File | null;
    instagramUrl: string;
    onClose: () => void;
    onSave: (imageFile: File | null, instagramUrl: string) => void;
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const imageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

const ProfileMediaModal: React.FC<ProfileMediaModalProps> = ({ imageUrl, imageFile, instagramUrl, onClose, onSave }) => {
    const [file, setFile] = useState(imageFile);
    const preview = imageUrl;
    const [instagram, setInstagram] = useState(instagramUrl);
    const [imageError, setImageError] = useState("");
    const [instagramError, setInstagramError] = useState("");
    const [crop, setCrop] = useState({ x: 0.5, y: 0.5, zoom: 1 });
    const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);
    const [saving, setSaving] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dragRef = useRef<{ x: number; y: number } | null>(null);
    const activeRef = useRef(true);

    useEffect(() => {
        activeRef.current = true;
        return () => { activeRef.current = false; };
    }, []);

    useEffect(() => {
        if (!file) return;
        let active = true;
        const url = URL.createObjectURL(file);
        const image = new Image();
        image.onload = () => { if (active) setLoadedImage(image); };
        image.onerror = () => {
            if (active) setImageError("This image could not be loaded. Please choose another image.");
        };
        image.src = url;
        return () => { active = false; URL.revokeObjectURL(url); };
    }, [file]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !loadedImage) return;
        const context = canvas.getContext("2d");
        if (!context) {
            setImageError("Image cropping is unavailable in this browser.");
            return;
        }
        const size = Math.min(loadedImage.naturalWidth, loadedImage.naturalHeight) / crop.zoom;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(loadedImage,
            (loadedImage.naturalWidth - size) * crop.x,
            (loadedImage.naturalHeight - size) * crop.y,
            size, size, 0, 0, canvas.width, canvas.height);
    }, [loadedImage, crop]);

    const selectImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files?.[0];
        if (!selected) return;
        if (!imageTypes.has(selected.type) || selected.size > MAX_IMAGE_SIZE) {
            setImageError("Choose a JPG, PNG, or WebP image no larger than 5 MB.");
            event.target.value = "";
            return;
        }
        setImageError("");
        setLoadedImage(null);
        setCrop({ x: 0.5, y: 0.5, zoom: 1 });
        setFile(selected);
    };

    const dragImage = (event: React.PointerEvent<HTMLCanvasElement>) => {
        const previous = dragRef.current;
        if (!previous || !loadedImage) return;
        const size = Math.min(loadedImage.naturalWidth, loadedImage.naturalHeight) / crop.zoom;
        const scale = size / event.currentTarget.getBoundingClientRect().width;
        const horizontalRange = loadedImage.naturalWidth - size;
        const verticalRange = loadedImage.naturalHeight - size;
        const dx = event.clientX - previous.x;
        const dy = event.clientY - previous.y;
        setCrop((current) => ({
            ...current,
            x: horizontalRange > 0 ? Math.min(1, Math.max(0, current.x - dx * scale / horizontalRange)) : 0.5,
            y: verticalRange > 0 ? Math.min(1, Math.max(0, current.y - dy * scale / verticalRange)) : 0.5,
        }));
        dragRef.current = { x: event.clientX, y: event.clientY };
    };

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (imageError || saving || (file && !loadedImage)) return;
        const value = instagram.trim();
        if (value) {
            let url: URL;
            try {
                url = new URL(value);
            } catch {
                setInstagramError("Enter a complete Instagram URL, such as https://www.instagram.com/yourname/.");
                return;
            }
            if (url.protocol !== "https:" || !["instagram.com", "www.instagram.com"].includes(url.hostname) || url.username || url.password || !url.pathname.split("/").filter(Boolean).length) {
                setInstagramError("Use an HTTPS Instagram profile link.");
                return;
            }
        }
        setInstagramError("");
        if (!file) {
            onSave(null, value);
            onClose();
            return;
        }
        const canvas = canvasRef.current;
        if (!canvas) {
            setImageError("The crop preview is not ready. Please select your image again.");
            return;
        }
        setSaving(true);
        canvas.toBlob((blob) => {
            if (!activeRef.current) return;
            setSaving(false);
            if (!blob) {
                setImageError("Could not crop your image. Please try again.");
                return;
            }
            const croppedFile = new File([blob], `${file.name.replace(/\.[^.]+$/, "")}-cropped.png`, { type: "image/png" });
            onSave(croppedFile, value);
            onClose();
        }, "image/png");
    };

    return (
        <ProfileForm
            open
            onClose={onClose}
            title="Your profile photo & Instagram"
            description="Add a face to your travels and let fellow travelers find you on Instagram."
            onSubmit={submitHandler}
            footerNote={saving ? "Preparing your photo..." : "Click Done on your profile to save changes."}
            submitDisabled={saving || Boolean(imageError) || Boolean(file && !loadedImage)}
        >
            <div className="mt-5 flex flex-col items-center gap-4">
                <div className="flex size-60 max-w-full items-center justify-center overflow-hidden rounded-full border-2 border-violet-400/60 bg-zinc-800 text-sm text-zinc-400">
                    {file ? (
                        <canvas
                            ref={canvasRef}
                            width={512}
                            height={512}
                            aria-label="Profile photo crop preview. Drag to reposition or use the controls below."
                            className="size-full touch-none cursor-grab active:cursor-grabbing"
                            onPointerDown={(event) => {
                                event.currentTarget.setPointerCapture(event.pointerId);
                                dragRef.current = { x: event.clientX, y: event.clientY };
                            }}
                            onPointerMove={dragImage}
                            onPointerUp={() => { dragRef.current = null; }}
                            onPointerCancel={() => { dragRef.current = null; }}
                            onLostPointerCapture={() => { dragRef.current = null; }}
                        />
                    ) : preview ? (
                        <img src={preview} alt="Profile photo preview" className="size-full object-cover" onError={() => setImageError("This image could not be loaded. Please choose another image.")} />
                    ) : (
                        <span>No photo yet</span>
                    )}
                </div>
                {file && (
                    <fieldset disabled={!loadedImage || saving} className="w-full space-y-3 disabled:opacity-50">
                        <p className="text-center text-xs text-zinc-400">Drag the photo to choose what appears inside the circle.</p>
                        {([
                            { key: "zoom", label: "Zoom", min: 1, max: 3 },
                            { key: "x", label: "Horizontal position", min: 0, max: 1 },
                            { key: "y", label: "Vertical position", min: 0, max: 1 },
                        ] as const).map(({ key, label, min, max }) => (
                            <label key={key} className="block text-xs text-zinc-300">
                                {label}
                                <input type="range" min={min} max={max} step={0.01} value={crop[key]}
                                    onChange={(event) => setCrop((current) => ({ ...current, [key]: Number(event.target.value) }))}
                                    className="mt-1 block w-full accent-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50" />
                            </label>
                        ))}
                        <button type="button" onClick={() => setCrop({ x: 0.5, y: 0.5, zoom: 1 })} className="rounded-md px-2 py-1 text-xs text-violet-300 hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50">
                            Reset crop
                        </button>
                    </fieldset>
                )}
                <label className="w-full">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Profile photo</span>
                    <input
                        type="file"
                        disabled={saving}
                        accept="image/jpeg,image/png,image/webp"
                        onChange={selectImage}
                        aria-invalid={Boolean(imageError)}
                        aria-describedby="profile-photo-help"
                        className="mt-2 block w-full rounded-lg border border-dashed border-zinc-700 p-3 text-xs text-zinc-300 file:mr-3 file:cursor-pointer file:rounded-md file:border-0 file:bg-zinc-800 file:px-3 file:py-2 file:text-violet-300 hover:border-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/50"
                    />
                </label>
                <p id="profile-photo-help" className="w-full text-xs text-zinc-400">JPG, PNG, or WebP. Maximum 5 MB.</p>
                {imageError && <p role="alert" className="w-full text-sm text-violet-300">{imageError}</p>}
            </div>
            <label className="mt-5 block">
                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    <FaInstagram aria-hidden="true" /> Instagram profile link
                </span>
                <input
                    type="url"
                    value={instagram}
                    onChange={(event) => { setInstagram(event.target.value); setInstagramError(""); }}
                    placeholder="https://www.instagram.com/yourname/"
                    aria-invalid={Boolean(instagramError)}
                    aria-describedby={instagramError ? "profile-instagram-error" : undefined}
                    className={profileFormInputClass}
                />
            </label>
            {instagramError && <p id="profile-instagram-error" role="alert" className="mt-2 text-sm text-violet-300">{instagramError}</p>}
        </ProfileForm>
    );
};

export default ProfileMediaModal;
