"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FieldMessage from "@/components/shared/FieldMessage";
import ImageUpload from "@/components/shared/ImageUpload";
import { categories } from "@/lib/menu";
import { createMenuItem, updateMenuItem } from "@/lib/vendor";
import { MyMenuItem } from "@/lib/types";

// one form for Add and Edit: with an item it starts filled in and saves changes instead of creating
// isAtLimit: a Free vendor with 3 active items; the banner above explains it and the button stays off
// onSaved: lets the Edit dialog close itself after a successful save
export default function MenuItemForm({ item, isAtLimit = false, onSaved }: { item?: MyMenuItem, isAtLimit?: boolean, onSaved?: () => void }) {
    const [itemName, setItemName] = useState(item?.itemName ?? "");
    const [category, setCategory] = useState(item?.category ?? "");
    const [description, setDescription] = useState(item?.description ?? "");
    const [price, setPrice] = useState(item ? String(item.price) : "");
    const [location, setLocation] = useState(item?.location ?? "");
    const [images, setImages] = useState<string[]>(item?.images ?? []);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // the same rules the server checks, worked out on every render
    const itemNameError = itemName.trim() === "" ? "Enter the item's name." : "";
    const categoryError = category === "" ? "Choose a category." : "";
    const descriptionError = description.trim().length < 10 ? "Describe the item in at least 10 characters." : "";
    const priceError = !(Number(price) > 0) ? "Enter a price above 0." : "";
    const locationError = location.trim() === "" ? "Enter the area and city." : "";
    const imagesError = images.length === 0 ? "Add at least one photo." : "";

    // errors stay hidden until the user types in that field or presses submit
    const showItemNameError = (itemName !== "" || submitted) && itemNameError;
    const showDescriptionError = (description !== "" || submitted) && descriptionError;
    const showPriceError = (price !== "" || submitted) && priceError;
    const showLocationError = (location !== "" || submitted) && locationError;
    const showCategoryError = submitted && categoryError;
    const showImagesError = submitted && imagesError;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);
        if (itemNameError || categoryError || descriptionError || priceError || locationError || imagesError) return;

        setLoading(true);
        const data = {
            itemName: itemName.trim(),
            category,
            description: description.trim(),
            price: Number(price),
            location: location.trim(),
            images,
        };
        const isDone = item ? await updateMenuItem(item._id, data) : await createMenuItem(data);
        setLoading(false);
        if (!isDone) return;

        // edit: close the dialog and show the new pending status
        if (item) {
            onSaved?.();
            router.refresh();
            return;
        }

        // add: empty form for the next item; refresh re-checks the Free plan banner
        setSubmitted(false);
        setItemName("");
        setCategory("");
        setDescription("");
        setPrice("");
        setLocation("");
        setImages([]);
        router.refresh();
    };

    return (
        // as a page it sits in a card; inside the Edit dialog the dialog is the card
        <form onSubmit={handleSubmit} noValidate className={`flex flex-col gap-6
            ${!item && "bg-card border p-5 rounded-2xl md:p-7"}`}>
            <FieldGroup className="gap-4">
                <Field>
                    <FieldLabel htmlFor="itemName">Item Name</FieldLabel>
                    <Input id="itemName" placeholder="e.g. Margherita" aria-invalid={!!showItemNameError}
                        value={itemName} onChange={(e) => setItemName(e.target.value)} />
                    <FieldMessage message={showItemNameError} />
                </Field>

                {/* category + price side by side from tablet up */}
                <div className="grid grid-cols-1 gap-4
                    md:grid-cols-2">
                    <Field>
                        <FieldLabel htmlFor="category">Category</FieldLabel>
                        {/* value null shows the placeholder; onValueChange gives the picked category */}
                        <Select value={category || null} onValueChange={(value) => setCategory(value ?? "")}>
                            <SelectTrigger id="category" className="w-full" aria-invalid={!!showCategoryError}>
                                <SelectValue placeholder="Choose a category" />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((item) =>
                                    <SelectItem key={item} value={item}>{item}</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                        <FieldMessage message={showCategoryError} />
                    </Field>

                    <Field>
                        <FieldLabel htmlFor="price">Price (৳)</FieldLabel>
                        <Input id="price" type="number" inputMode="decimal" min="1" placeholder="e.g. 450" aria-invalid={!!showPriceError}
                            value={price} onChange={(e) => setPrice(e.target.value)} />
                        <FieldMessage message={showPriceError} />
                    </Field>
                </div>

                <Field>
                    <FieldLabel htmlFor="description">Description</FieldLabel>
                    <Textarea id="description" placeholder="What's on it, size, anything a customer should know" aria-invalid={!!showDescriptionError}
                        value={description} onChange={(e) => setDescription(e.target.value)} />
                    <FieldMessage message={showDescriptionError} />
                </Field>

                <Field>
                    <FieldLabel htmlFor="location">Location</FieldLabel>
                    <Input id="location" placeholder="Area, city (e.g. Zindabazar, Sylhet)" aria-invalid={!!showLocationError}
                        value={location} onChange={(e) => setLocation(e.target.value)} />
                    <FieldMessage message={showLocationError} />
                </Field>

                <Field>
                    <FieldLabel>Photos</FieldLabel>
                    <ImageUpload value={images} onChange={setImages} isInvalid={!!showImagesError} />
                    <FieldMessage message={showImagesError} />
                </Field>
            </FieldGroup>

            {item && <p className="text-sm text-muted-foreground">Saving sends this item back to an admin for review.</p>}

            <Button size="lg" type="submit" disabled={loading || isAtLimit} className="w-full
                md:w-auto md:self-end">
                {loading ? <><Spinner /> Sending…</> : item ? "Save and resubmit" : "Send for review"}
            </Button>
        </form>
    )
}
