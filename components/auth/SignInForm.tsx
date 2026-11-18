"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import FieldMessage from "@/components/shared/FieldMessage";

export default function SignInForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    // error messages, worked out on every render
    // sign in only checks that the password is there; the rules were checked at sign up
    const emailError = /^\S+@\S+\.\S+$/.test(email) ? "" : "Enter a valid email.";
    const passwordError = password === "" ? "Enter your password." : "";

    // errors stay hidden until the user types in that field or presses submit
    const showEmailError = (email !== "" || submitted) && emailError;
    const showPasswordError = submitted && passwordError;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitted(true);

        // stop here if anything is invalid, the errors show under the inputs
        if (emailError || passwordError) return;

        // TODO: sign in with Better Auth and redirect by role
        const formData = { email, password };
        console.log(formData);
    };

    return (
        <div className="flex flex-col gap-5.5 w-full max-w-120">
            {/* heading */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl leading-tight
                    md:text-4xl">
                    Welcome back
                </h1>
                <p className="text-md text-muted-foreground">Sign in to order and track your pizzas.</p>
            </div>

            {/* google */}
            {/* TODO: sign in with Google through Better Auth */}
            <Button size="lg" variant="outline" type="button" className="w-full">
                <Image src="/google.svg" alt="" width={18} height={18} />
                Continue with Google
            </Button>

            <FieldSeparator>or with email</FieldSeparator>

            {/* noValidate: our own checks show the errors, not the browser's popups */}
            <form onSubmit={handleSubmit} noValidate>
                <FieldGroup>
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

                    {/* password with show/hide button */}
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <InputGroup>
                            <InputGroupAddon>
                                <LockIcon strokeWidth={2.5} />
                            </InputGroupAddon>
                            <InputGroupInput id="password" name="password" type={showPassword ? "text" : "password"}
                                aria-invalid={!!showPasswordError} value={password} onChange={(e) => setPassword(e.target.value)} />
                            <InputGroupAddon align="inline-end">
                                <InputGroupButton size="icon-xs" aria-label={showPassword ? "Hide password" : "Show password"}
                                    onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOffIcon strokeWidth={2.5} /> : <EyeIcon strokeWidth={2.5} />}
                                </InputGroupButton>
                            </InputGroupAddon>
                        </InputGroup>

                        <FieldMessage message={showPasswordError} />
                    </Field>

                    <Button size="lg" type="submit" className="w-full">Sign In</Button>
                </FieldGroup>
            </form>

            {/* switch to sign up; text-destructive is the red that stays readable in dark mode */}
            <p className="text-sm text-muted-foreground text-center">
                New to PizzaHub? <Link href="/sign-up" className="text-destructive font-bold">Create an account</Link>
            </p>
        </div>
    )
}
