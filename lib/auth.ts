import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
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
        },
    },
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
