import type { Metadata } from "next";
import AuthPhoto from "@/components/auth/AuthPhoto";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
    title: "Sign Up | PizzaHub",
};

export default function SignUpPage() {
    return (
        <section className="content-box pt-7 pb-16
            md:pt-10 md:pb-20 lg:pt-12 lg:pb-26">
            {/* one card: photo half + form half on desktop, form only below that */}
            <div className="flex w-full max-w-120 bg-card border mx-auto rounded-3xl overflow-hidden
                lg:max-w-none">
                <AuthPhoto quote="Your neighbourhood’s best ovens, in one place." sub="Local pizzerias and pizza lovers, one hub." />

                <div className="flex flex-1 items-center justify-center p-5.5
                    md:p-9 lg:p-11">
                    <SignUpForm />
                </div>
            </div>
        </section>
    )
}
