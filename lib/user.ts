import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { uploadImage } from "@/lib/upload";
import { SignUpData } from "@/lib/types";

// creates the account (Better Auth signs the user in straight after)
export async function signUpUser(data: SignUpData) {
    try {
        // the photo is optional; upload it first so the account gets its URL
        let image: string | undefined;
        if (data.image) {
            const url = await uploadImage(data.image);
            if (!url) {
                toast.error("Couldn't upload your photo", { description: "Try another image, or skip it for now." });
                return false;
            }
            image = url;
        }

        const { error } = await authClient.signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            image,
            role: data.role,
            businessName: data.businessName,
        });

        // Better Auth's own message, e.g. when the email is already taken
        if (error) {
            toast.error("Couldn't create your account", { description: error.message || "Please try again." });
            return false;
        }

        toast.success("Account created", { description: `Welcome to PizzaHub, ${data.name.split(" ")[0]}.` });
        return true;
    }
    catch {
        toast.error("Couldn't create your account", { description: "Check your connection and try again." });
        return false;
    }
}

// ends the session; useSession updates the navbar straight away
export async function signOutUser() {
    try {
        const { error } = await authClient.signOut();

        if (error) {
            toast.error("Couldn't sign you out", { description: error.message || "Please try again." });
            return false;
        }

        toast.success("Signed out", { description: "See you next time." });
        return true;
    }
    catch {
        toast.error("Couldn't sign you out", { description: "Check your connection and try again." });
        return false;
    }
}

// sends the browser to Google; it only comes back here if starting that failed
export async function googleSignIn() {
    try {
        const { error } = await authClient.signIn.social({ provider: "google", callbackURL: "/" });

        if (error) {
            toast.error("Couldn't open Google", { description: error.message || "Please try again." });
        }
    }
    catch {
        toast.error("Couldn't open Google", { description: "Check your connection and try again." });
    }
}
