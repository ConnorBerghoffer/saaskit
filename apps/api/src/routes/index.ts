import type { FastifyInstance } from "fastify";

import type { AppDependencies } from "../deps";
import { validate, userSchema } from "@saaskit/validator";

const parseUser = validate(userSchema.create);

export const registerRoutes = async (
  app: FastifyInstance,
  deps: AppDependencies
) => {
  app.get("/", async () => ({
    message: "API placeholder",
    app: deps.config.APP_NAME,
  }));

  app.post("/users", async (request) => {
    const body = parseUser(request.body);

    return {
      user: { email: body.email },
      message: "User creation handled by Better Auth",
    };
  });
};
