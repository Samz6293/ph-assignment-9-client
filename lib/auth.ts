import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { jwt } from "better-auth/plugins";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.DATABASE_URI!);
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
        },
    },
});
