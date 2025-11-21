import { createAuthClient } from "better-auth/react";
import type { AppConfig } from "@saaskit/config";

export const createAuthClientInstance = (config: AppConfig) => {
  return createAuthClient({
    baseURL: config.API_URL,
    basePath: "/api/auth",
  });
};

