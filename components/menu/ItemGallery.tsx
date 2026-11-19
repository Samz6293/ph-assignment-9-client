"use client";
import { useState } from "react";
import Image from "next/image";

// big photo + thumbnails; clicking a thumbnail shows it big
export default function ItemGallery({ images, alt }: { images: string[], alt: string }) {
    const [selected, setSelected] = useState(0);

    return (
        <div className="flex flex-col gap-3">
            <div className="relative aspect-4/3 bg-placeholder rounded-3xl overflow-hidden">
                <Image src={images[selected]} alt={alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>

            {images.length > 1 &&
                <div className="grid grid-cols-4 gap-3">
                    {images.map((image, index) =>
                        <button key={image} type="button" onClick={() => setSelected(index)} aria-label={`Show photo ${index + 1}`}
                            className={`relative aspect-square bg-placeholder border-2 rounded-xl overflow-hidden
                            ${selected === index ? "border-primary" : "border-transparent"}
                            hover:border-primary/60`}>
                            <Image src={image} alt="" fill sizes="120px" className="object-cover" />
                        </button>
                    )}
                </div>
            }
        </div>
    )
}
