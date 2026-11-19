import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, jwtClient } from "better-auth/client/plugins";
import type { auth } from "@/lib/auth";

export const authClient = createAuthClient({
    plugins: [inferAdditionalFields<typeof auth>(), jwtClient()],
});

// the signed-in user's token for the Express server, fetched in the browser (uses the session cookie)
export async function getClientToken() {
    const { data } = await authClient.token();
    return data?.token;
}
