"use client";
import { useState } from "react";
import Image from "next/image";
import { ImagePlusIcon, XIcon } from "lucide-react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { uploadImage } from "@/lib/upload";

const maxImages = 4;
const maxSize = 5 * 1024 * 1024;

// picks photos, uploads each one to ImgBB straight away, and gives the form the list of URLs
// value/onChange: the form owns the list, this component only adds to it and removes from it
export default function ImageUpload({ value, onChange, isInvalid }: { value: string[], onChange: (urls: string[]) => void, isInvalid?: boolean }) {
    const [uploadingCount, setUploadingCount] = useState(0);
    const spaceLeft = maxImages - value.length - uploadingCount;

    const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        // clears the input, so picking the same photo again after removing it still fires onChange
        e.target.value = "";

        if (files.length > spaceLeft) {
            toast.error("Too many photos", { description: `You can add ${spaceLeft} more (up to ${maxImages} in total).` });
        }

        const accepted = files.slice(0, spaceLeft).filter((file) => {
            if (file.size <= maxSize) return true;
            toast.error(`${file.name} is too big`, { description: "Choose a photo of 5 MB or less." });
            return false;
        });
        if (accepted.length === 0) return;

        // Promise.all: uploads them at the same time and waits for all of them
        setUploadingCount(accepted.length);
        const urls = await Promise.all(accepted.map((file) => uploadImage(file)));
        setUploadingCount(0);

        const uploaded = urls.filter((url) => url !== null);
        if (uploaded.length < accepted.length) {
            toast.error("Some photos didn't upload", { description: "Check your connection and add them again." });
        }
        onChange([...value, ...uploaded]);
    };

    const handleRemove = (url: string) => onChange(value.filter((image) => image !== url));

    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-4 gap-2">
                {/* uploaded photos; the first one is the cover on menu cards */}
                {value.map((url, index) =>
                    <div key={url} className="relative aspect-square bg-placeholder rounded-xl overflow-hidden">
                        <Image src={url} alt={`Photo ${index + 1}`} fill sizes="120px" className="object-cover" />
                        {index === 0 &&
                            <span className="absolute bottom-1.5 left-1.5 bg-background/90 text-xs font-bold px-2 py-0.5 rounded-full">Cover</span>
                        }
                        <button type="button" onClick={() => handleRemove(url)} aria-label={`Remove photo ${index + 1}`}
                            className="absolute top-1.5 right-1.5 flex items-center justify-center size-7 bg-background/90 rounded-full
                            hover:bg-background">
                            <XIcon className="size-4" strokeWidth={2.5} />
                        </button>
                    </div>
                )}

                {/* one placeholder per photo still uploading */}
                {Array.from({ length: uploadingCount }, (_, index) =>
                    <div key={index} className="flex flex-col items-center justify-center gap-1.5 aspect-square bg-muted text-xs text-muted-foreground font-semibold rounded-xl">
                        <Spinner />
                        Uploading…
                    </div>
                )}

                {/* add tile: the label opens the hidden file input */}
                {spaceLeft > 0 &&
                    <label className={`flex flex-col items-center justify-center gap-1.5 aspect-square bg-card border-2 border-dashed text-xs text-muted-foreground font-semibold text-center rounded-xl cursor-pointer
                        ${isInvalid && "border-destructive"}
                        hover:border-primary hover:text-primary`}>
                        <ImagePlusIcon className="size-5" strokeWidth={2.5} />
                        Add photo
                        <input type="file" accept="image/png, image/jpeg, image/webp" multiple onChange={handleFiles}
                            disabled={uploadingCount > 0} className="sr-only" />
                    </label>
                }
            </div>

            <p className="text-xs text-muted-foreground">PNG, JPG or WEBP, up to 5 MB each. Up to {maxImages} photos; the first is the cover.</p>
        </div>
    )
}
