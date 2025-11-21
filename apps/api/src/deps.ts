import type { AppConfig } from "@saaskit/config";
import { getConfig } from "@saaskit/config";
import type { Database } from "@saaskit/db";
import { createDatabase } from "@saaskit/db";

export interface AppDependencies {
  config: AppConfig;
  db: Database;
}

export const createDependencies = (): AppDependencies => {
  const config = getConfig();
  const db = createDatabase(config.DATABASE_URL);

  return { config, db };
};
