"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CameraIcon, MailIcon, StoreIcon, UserRoundIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import PasswordField, { getPasswordRules } from "@/components/auth/PasswordField";
import RolePicker from "@/components/auth/RolePicker";
import FieldMessage from "@/components/shared/FieldMessage";
import { googleSignIn, signUpUser } from "@/lib/user";

export default function SignUpForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [role, setRole] = useState<"customer" | "vendor">("customer");
    const [businessName, setBusinessName] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const router = useRouter();

    // error messages, worked out on every render
    const failedRule = getPasswordRules(password).find((rule) => !rule.passed);
    const nameError = name.trim().length < 3 ? "Name needs at least 3 characters." : "";
    const emailError = /^\S+@\S+\.\S+$/.test(email) ? "" : "Enter a valid email.";
    const passwordError = failedRule ? failedRule.error : "";
    const imageError = image && image.size > 2 * 1024 * 1024 ? "Image must be 2 MB or smaller." : "";
    const businessNameError = role === "vendor" && businessName.trim().length < 2 ? "Enter your restaurant's name." : "";

    // errors stay hidden until the user types in that field or presses submit
    const showNameError = (name !== "" || submitted) && nameError;
    const showEmailError = (email !== "" || submitted) && emailError;
    const showPasswordError = (password !== "" || submitted) && passwordError;
    const showBusinessNameError = (businessName !== "" || submitted) && businessNameError;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);

        // stop here if anything is invalid, the errors show under the inputs
        if (nameError || emailError || passwordError || imageError || businessNameError) return;

        setLoading(true);
        const formData = { name, email, password, image, role, businessName: role === "vendor" ? businessName.trim() : undefined };
        const success = await signUpUser(formData);

        // TODO: redirect to the user's dashboard once the dashboards exist
        if (success) router.push("/");
        else setLoading(false);
    };

    // Google sends the browser to its own page, the spinner stays until it leaves
    const handleGoogle = async () => {
        setGoogleLoading(true);
        await googleSignIn();
        setGoogleLoading(false);
    };

    return (
        <div className="flex flex-col gap-5.5 w-full max-w-120">
            {/* heading */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl leading-tight
                    md:text-4xl">
                    Create your account
                </h1>
                <p className="text-md text-muted-foreground">Order from local pizzerias, or list your own.</p>
            </div>

            {/* google: new Google accounts start as customers, since Google can't send a role */}
            <Button size="lg" variant="outline" type="button" onClick={handleGoogle} disabled={googleLoading} className="w-full">
                {googleLoading ?
                    <><Spinner /> Opening Google…</>
                    :
                    <><Image src="/google.svg" alt="" width={18} height={18} /> Continue with Google</>
                }
            </Button>

            <FieldSeparator>or with email</FieldSeparator>

            {/* noValidate: our own checks show the errors, not the browser's popups */}
            <form onSubmit={handleSubmit} noValidate>
                <FieldGroup>
                    {/* full name */}
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <InputGroup>
                            <InputGroupAddon>
                                <UserRoundIcon strokeWidth={2.5} />
                            </InputGroupAddon>
                            <InputGroupInput id="name" name="name" autoFocus
                                aria-invalid={!!showNameError} value={name} onChange={(e) => setName(e.target.value)} />
                        </InputGroup>

                        <FieldMessage message={showNameError} />
                    </Field>

                    {/* email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <InputGroup>
                            <InputGroupAddon>
                                <MailIcon strokeWidth={2.5} />
                            </InputGroupAddon>
                            <InputGroupInput id="email" name="email" type="email" 
                                aria-invalid={!!showEmailError} value={email} onChange={(e) => setEmail(e.target.value)} />
                        </InputGroup>

                        <FieldMessage message={showEmailError} />
                    </Field>

                    <PasswordField password={password} onPasswordChange={setPassword} showError={!!showPasswordError} />

                    {/* profile image: the label opens the hidden file input */}
                    <Field>
                        <span className="text-sm font-semibold">Profile Image <span className="text-muted-foreground font-normal">(optional)</span></span>
                        <label className={`flex items-center gap-3.5 border-2 border-dashed px-3.5 py-3 rounded-lg cursor-pointer
                            ${imageError && "border-destructive"}
                            hover:border-primary`}>
                            <input type="file" name="image" accept="image/png, image/jpeg" onChange={(e) => setImage(e.target.files?.[0] ?? null)} className="sr-only" />
                            <span className="flex items-center justify-center size-11 shrink-0 bg-secondary text-muted-foreground rounded-full">
                                <CameraIcon className="size-5" strokeWidth={2.5} />
                            </span>
                            <span className="flex-1 min-w-0 text-sm text-muted-foreground truncate">{image ? image.name : "PNG or JPG, up to 2 MB"}</span>
                            <span className="text-sm font-semibold">Upload</span>
                        </label>

                        <FieldMessage message={imageError} />
                    </Field>

                    <RolePicker role={role} onRoleChange={setRole} />

                    {/* vendors also name their restaurant */}
                    {role === "vendor" &&
                        <Field>
                            <FieldLabel htmlFor="businessName">Business Name</FieldLabel>
                            <InputGroup>
                                <InputGroupAddon>
                                    <StoreIcon strokeWidth={2.5} />
                                </InputGroupAddon>
                                <InputGroupInput id="businessName" name="businessName" placeholder="Napoli Corner"
                                    aria-invalid={!!showBusinessNameError} value={businessName} onChange={(e) => setBusinessName(e.target.value)} />
                            </InputGroup>

                            <FieldMessage message={showBusinessNameError} />
                        </Field>
                    }

                    <Button size="lg" type="submit" disabled={loading} className="w-full">
                        {loading ? <><Spinner /> Creating account…</> : "Create account"}
                    </Button>
                </FieldGroup>
            </form>

            {/* switch to sign in; text-destructive is the red that stays readable in dark mode */}
            <p className="text-sm text-muted-foreground text-center">
                Already have an account? <Link href="/sign-in" className="text-destructive font-bold">Sign In</Link>
            </p>
        </div>
    )
}
