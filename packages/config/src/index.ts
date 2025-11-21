import { z } from "zod";

const isDevelopment = process.env.NODE_ENV !== "production";

const configSchema = z.object({
  APP_NAME: z.string().default("saaskit"),
  APP_ENV: z.enum(["development", "production", "test"]).default("development"),
  API_URL: z.string().default("http://localhost:4810"),
  WEB_URL: z.string().default("http://localhost:4420"),
  DATABASE_URL: isDevelopment
    ? z
        .string()
        .default("postgresql://postgres:postgres@localhost:5432/saaskit")
    : z.string().min(1, "DATABASE_URL is required"),
  PORT: z.coerce.number().default(4810),
});

export type AppConfig = z.infer<typeof configSchema>;

let cachedConfig: AppConfig | null = null;

export const getConfig = (env: NodeJS.ProcessEnv = process.env): AppConfig => {
  if (cachedConfig) return cachedConfig;

  const parsed = configSchema.safeParse(env);

  if (!parsed.success) {
    const errors = parsed.error.errors
      .map((err) => `${err.path.join(".")}: ${err.message}`)
      .join("\n");
    throw new Error(`Invalid environment variables:\n${errors}`);
  }

  cachedConfig = parsed.data;
  return cachedConfig;
};

export const validateAuthEnv = (): void => {
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
