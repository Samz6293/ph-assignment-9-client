import type { Metadata } from "next";
import AuthPhoto from "@/components/auth/AuthPhoto";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = {
    title: "Sign In | PizzaHub",
};

export default function SignInPage() {
    return (
        <section className="content-box pt-7 pb-16
            md:pt-10 md:pb-20 lg:pt-12 lg:pb-26">
            {/* one card: photo half + form half on desktop, form only below that */}
            <div className="flex w-full max-w-120 bg-card border mx-auto rounded-3xl overflow-hidden
                lg:max-w-none">
                <AuthPhoto quote="The oven’s on. Your usual is waiting." sub="Napoli Corner · Zindabazar, Sylhet" />

                <div className="flex flex-1 items-center justify-center p-5.5
                    md:p-9 lg:p-11">
                    <SignInForm />
                </div>
            </div>
        </section>
    )
}
