import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { jwt } from "better-auth/plugins";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";
import { attachDatabasePool } from "@vercel/functions";

// serverSelectionTimeoutMS: if MongoDB can't be reached, fail after 5 seconds instead of the default 30
const client = new MongoClient(process.env.DATABASE_URI!, { serverSelectionTimeoutMS: 5000 });
// on Vercel: closes idle connections cleanly before the function pauses (Vercel's documented fix for database pools)
attachDatabasePool(client);
// connect before Better Auth's first query: if the first connection is only half open when Vercel pauses the
// function, the driver closes it for good and every later request fails with "Topology is closed"
// if MongoDB is briefly unreachable while this instance starts, an uncaught failure would stop this whole file
// from loading, and the instance would answer every request with a 500 until Vercel replaced it.
// after a failed connect the driver does NOT reconnect by itself (queries fail with "Topology is closed"),
// so we call connect() again every 5 seconds until it works
async function connectWithRetry() {
    try {
        await client.connect();
    }
    catch (error) {
        console.error("MongoDB connect failed; trying again in 5 seconds", error);
        setTimeout(connectWithRetry, 5000);
    }
}
await connectWithRetry();
const db = client.db("pizza-hub");

export const auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
    user: {
        modelName: "users",
        additionalFields: {
            role: {
                type: ["customer", "vendor", "admin"],
                defaultValue: "customer",
                input: true,
            },
            // set by an admin through the server; input: false so nobody can sign up already "unblocked" or blocked
            isBlocked: {
                type: "boolean",
                defaultValue: false,
                input: false,
            },
            // free / premium; only the Stripe webhook changes it, so input: false
            subscriptionPlan: {
                type: ["free", "premium"],
                defaultValue: "free",
                input: false,
            },
            // vendors only: no default, so customers never get this field
            businessName: {
                type: "string",
                required: false,
                input: true,
            },
        },
    },
    // gives the signed-in user a short-lived token (15 min) that the Express server can verify
    plugins: [jwt()],
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    if (user.role === "admin") {
                        throw new APIError("BAD_REQUEST", { message: "Choose Customer or Vendor to sign up." });
                    }
                },
            },
            // role needs input: true so sign-up can set it, which also lets /update-user change it;
            // without this, any user could make themselves an admin. Roles change only in the database.
            update: {
                before: async (data) => {
                    if ("role" in data) {
                        throw new APIError("BAD_REQUEST", { message: "Your role can't be changed." });
                    }
                },
            },
        },
    },
});
