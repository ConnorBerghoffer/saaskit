import type { BetterAuthOptions } from "better-auth";
import type { Database } from "@saaskit/db";

export const createCheckEmailHandler = (db: Database) => {
  return async (email: string): Promise<boolean> => {
    try {
      const result = await db.pool.query(
        "SELECT id FROM user WHERE email = $1 LIMIT 1",
        [email]
      );
      return result.rows.length > 0;
    } catch {
      return false;
    }
  };
};

export const registerCheckEmailRoute = (
  app: {
    post: (path: string, handler: (req: any, reply: any) => Promise<any>) => void;
    log?: { error: (error: unknown, message: string) => void };
  },
  db: Database
) => {
  const checkEmail = createCheckEmailHandler(db);

  app.post("/api/auth/check-email", async (request: any, reply: any) => {
    try {
      const { email } = request.body as { email?: string };

      if (!email || typeof email !== "string") {
        return reply.status(400).send({ error: "Email is required" });
      }

      const exists = await checkEmail(email);
      return reply.send({ exists });
    } catch (error) {
      if (app.log) {
        app.log.error(error, "Error checking email");
      }
      return reply.status(500).send({ error: "Internal server error" });
    }
  });
};

