import { betterAuth } from "better-auth";
import { createDatabase } from "./packages/db/src/index";
import { getConfig } from "./packages/config/src/index";

const config = getConfig();
const db = createDatabase(config.DATABASE_URL);

export const auth = betterAuth({
  database: db.pool,
  baseURL: config.API_URL,
  basePath: "/api/auth",
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 128,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
  },
  trustedOrigins: [
    config.WEB_URL,
    config.API_URL,
    "http://localhost:4317",
    "http://localhost:4420",
    "http://localhost:4810",
  ].filter(Boolean),
});

