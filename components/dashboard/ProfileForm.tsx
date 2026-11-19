"use client";
import { useState } from "react";
import { CameraIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import FieldMessage from "@/components/shared/FieldMessage";
import UserAvatar from "@/components/shared/UserAvatar";
import { updateProfile } from "@/lib/user";
import { uploadImage } from "@/lib/upload";

interface ProfileUser {
    name: string
    email: string
    image?: string | null
    role: string
    businessName?: string | null
    subscriptionPlan?: string | null
}

// editable: photo, name, business name (vendors); read-only: email, role, plan
export default function ProfileForm({ user }: { user: ProfileUser }) {
    const [name, setName] = useState(user.name);
    const [businessName, setBusinessName] = useState(user.businessName ?? "");
    const [image, setImage] = useState(user.image ?? null);
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);

    const isVendor = user.role === "vendor";
    const nameError = name.trim().length < 3 ? "Name needs at least 3 characters." : "";
    const businessNameError = isVendor && businessName.trim().length < 2 ? "Enter your restaurant's name." : "";

    // the new photo uploads straight away; it's only saved to the account with "Save changes"
    const handlePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file) return;
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Photo is too big", { description: "Choose one of 2 MB or less." });
            return;
        }

        setUploading(true);
        const url = await uploadImage(file);
        setUploading(false);

        if (!url) toast.error("Couldn't upload your photo", { description: "Check your connection and try again." });
        else setImage(url);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (nameError || businessNameError) return;

        setSaving(true);
        await updateProfile({ name: name.trim(), image, businessName: isVendor ? businessName.trim() : undefined });
        setSaving(false);
    };

    const readOnly = [
        { label: "Email", value: user.email },
        { label: "Role", value: user.role },
        ...(isVendor ? [{ label: "Plan", value: user.subscriptionPlan ?? "free" }] : []),
    ];

    return (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6 bg-card border p-5 rounded-2xl
            md:p-7">
            {/* photo: the label opens the hidden file input */}
            <div className="flex items-center gap-4">
                <UserAvatar name={name || user.name} image={image} className="size-20" textClassName="text-2xl" />
                <label className={`flex items-center gap-2 bg-background border text-sm font-semibold px-4 py-2.5 rounded-full cursor-pointer
                    ${uploading && "opacity-60"}
                    hover:border-primary`}>
                    {uploading ? <Spinner /> : <CameraIcon className="size-4" strokeWidth={2.5} />}
                    {uploading ? "Uploading…" : "Change photo"}
                    <input type="file" accept="image/png, image/jpeg, image/webp" onChange={handlePhoto} disabled={uploading} className="sr-only" />
                </label>
            </div>

            <FieldGroup className="gap-4">
                <Field>
                    <FieldLabel htmlFor="name">Name</FieldLabel>
                    <Input id="name" aria-invalid={!!nameError} value={name} onChange={(e) => setName(e.target.value)} />
                    <FieldMessage message={nameError} />
                </Field>

                {isVendor &&
                    <Field>
                        <FieldLabel htmlFor="businessName">Business name</FieldLabel>
                        <Input id="businessName" aria-invalid={!!businessNameError} value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                        <FieldMessage message={businessNameError} />
                    </Field>
                }
            </FieldGroup>

            {/* can't be changed here: label, value on the line below */}
            <dl className="flex flex-col gap-3 bg-background border text-sm p-4 rounded-2xl">
                {readOnly.map((item) =>
                    <div key={item.label} className="flex flex-col gap-0.5">
                        <dt className="text-muted-foreground">{item.label}</dt>
                        <dd className="font-semibold capitalize wrap-break-word">{item.value}</dd>
                    </div>
                )}
            </dl>

            <Button size="lg" type="submit" disabled={saving || uploading} className="w-full
                md:w-auto md:self-end">
                {saving ? <><Spinner /> Saving…</> : "Save changes"}
            </Button>
        </form>
    )
}
