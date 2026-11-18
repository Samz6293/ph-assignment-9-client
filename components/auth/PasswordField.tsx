"use client";
import { useState } from "react";
import { CircleCheckIcon, CircleIcon, CircleXIcon, EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";

// password rules: the form uses these to decide if the password is valid
export const getPasswordRules = (password: string) => [
    { label: "6+ characters", passed: password.length >= 6, error: "Password needs at least 6 characters." },
    { label: "One uppercase", passed: /[A-Z]/.test(password), error: "Password needs at least one uppercase letter." },
    { label: "One lowercase", passed: /[a-z]/.test(password), error: "Password needs at least one lowercase letter." },
];

export default function PasswordField({ password, onPasswordChange, showError }: { password: string, onPasswordChange: (value: string) => void, showError: boolean }) {
    const [showPassword, setShowPassword] = useState(false);
    const rules = getPasswordRules(password);

    return (
        <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <InputGroup>
                <InputGroupAddon>
                    <LockIcon strokeWidth={2.5} />
                </InputGroupAddon>
                <InputGroupInput id="password" name="password" type={showPassword ? "text" : "password"} 
                    aria-invalid={showError} value={password} onChange={(e) => onPasswordChange(e.target.value)} />
                <InputGroupAddon align="inline-end">
                    <InputGroupButton size="icon-xs" aria-label={showPassword ? "Hide password" : "Show password"}
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOffIcon strokeWidth={2.5} /> : <EyeIcon strokeWidth={2.5} />}
                    </InputGroupButton>
                </InputGroupAddon>
            </InputGroup>

            {/* live checklist (doubles as the error message): green when passed, red once you've typed or submitted, grey before that */}
            <ul className="flex flex-wrap gap-x-3.5 gap-y-1.5 text-sm">
                {rules.map((rule) =>
                    <li key={rule.label} className={`flex items-center gap-1.5
                        ${rule.passed ? "text-success-soft-foreground" : password || showError ? "text-destructive" : "text-muted-foreground"}`}>
                        {rule.passed ?
                            <CircleCheckIcon className="size-4" strokeWidth={2.5} />
                            :
                            password || showError ? <CircleXIcon className="size-4" strokeWidth={2.5} /> : <CircleIcon className="size-4" strokeWidth={2.5} />
                        }
                        {rule.label}
                    </li>
                )}
            </ul>
        </Field>
    )
}
