import { createAuthServer } from "@saaskit/auth/server";
import { createDatabase } from "@saaskit/db";
import { getConfig } from "@saaskit/config";

const config = getConfig();
const db = createDatabase(config.DATABASE_URL);

export const auth = createAuthServer({
  db,
  config,
});

