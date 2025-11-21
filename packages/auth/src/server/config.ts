import { betterAuth } from "better-auth";
import type { Database } from "@saaskit/db";
import type { AppConfig } from "@saaskit/config";

export interface AuthServerConfig {
  db: Database;
  config: AppConfig;
  sendEmail?: (params: {
    to: string;
    subject: string;
    html: string;
    text: string;
  }) => Promise<void>;
}

const validateAuthEnvVars = (): void => {
  const required = [
    { key: "GOOGLE_CLIENT_ID", value: process.env.GOOGLE_CLIENT_ID },
    { key: "GOOGLE_CLIENT_SECRET", value: process.env.GOOGLE_CLIENT_SECRET },
  ];

  const missing = required.filter(({ value }) => !value || value.trim() === "");

  if (missing.length > 0) {
    const missingKeys = missing.map(({ key }) => key).join(", ");
    throw new Error(
      `Missing required authentication environment variables: ${missingKeys}\n` +
        "Please set these variables in your .env file or environment."
    );
  }
};

export const createAuthServer = ({
  db,
  config,
  sendEmail,
}: AuthServerConfig) => {
  validateAuthEnvVars();

  const googleClientId = process.env.GOOGLE_CLIENT_ID!;
  const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET!;

  return betterAuth({
    database: db.pool,
    baseURL: config.API_URL,
    basePath: "/api/auth",
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      sendResetPassword: sendEmail
        ? async ({ user, url, token }, request) => {
            await sendEmail({
              to: user.email,
              subject: "Reset your password",
              html: `<p>Click the link to reset your password: <a href="${url}">${url}</a></p>`,
              text: `Click the link to reset your password: ${url}`,
            });
          }
        : undefined,
    },
    socialProviders: {
      google: {
        clientId: googleClientId,
        clientSecret: googleClientSecret,
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
};

