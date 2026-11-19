import { headers } from "next/headers";
import { connection } from "next/server";
import ProfileForm from "@/components/dashboard/ProfileForm";
import { auth } from "@/lib/auth";

// reads the signed-in user on the server and fills the form with it
export default async function ProfileSettings() {
    // Better Auth reads the clock to check the session; wait for a real request first
    await connection();
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) return null;

    return <ProfileForm user={session.user} />
}
