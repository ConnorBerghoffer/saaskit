import Fastify from "fastify";
import type { FastifyRequest, FastifyReply } from "fastify";

import { createDependencies } from "./deps";
import { registerRoutes } from "./routes";
import { createAuthServer, registerCheckEmailRoute } from "@saaskit/auth/server";
import { getConfig, validateAuthEnv } from "@saaskit/config";

const isDevelopment = process.env.NODE_ENV !== "production";

const loggerConfig = isDevelopment
  ? {
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
          colorize: true,
          singleLine: false,
        },
      },
      level: "info",
    }
  : {
      level: process.env.LOG_LEVEL || "info",
    };

export const buildServer = async (deps = createDependencies()) => {
  const app = Fastify({
    logger: loggerConfig,
    disableRequestLogging: false,
    requestIdLogLabel: "reqId",
    requestIdHeader: "x-request-id",
  });

  app.addHook("onRequest", async (request) => {
    request.log.info(
      { method: request.method, url: request.url },
      "incoming request"
    );
  });

  app.addHook("onResponse", async (request, reply) => {
    request.log.info(
      {
        method: request.method,
        url: request.url,
        statusCode: reply.statusCode,
      },
      "request completed"
    );
  });

  app.get("/health", async () => {
    await deps.db.pool.query("SELECT 1");
    return { status: "ok" };
  });

  const auth = createAuthServer({
    db: deps.db,
    config: deps.config,
  });

  app.route({
    method: ["GET", "POST"],
    url: "/api/auth/*",
    async handler(request: FastifyRequest, reply: FastifyReply) {
      try {
        const url = new URL(request.url, `http://${request.headers.host}`);
        const headers = new Headers();
        Object.entries(request.headers).forEach(([key, value]) => {
          if (value) headers.append(key, value.toString());
        });

        const req = new Request(url.toString(), {
          method: request.method,
          headers,
          body: request.body ? JSON.stringify(request.body) : undefined,
        });

        const response = await auth.handler(req);
        reply.status(response.status);
        response.headers.forEach((value: string, key: string) => {
          reply.header(key, value);
        });
        const body = await response.text();
        return reply.send(body || null);
      } catch (error) {
        app.log.error(error, "Auth handler error");
        return reply.status(500).send({ error: "Internal server error" });
      }
    },
  });

  registerCheckEmailRoute(app, deps.db);

  await app.register(async (instance) => {
    await registerRoutes(instance, deps);
  });

  return { app, deps };
};

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    getConfig();
    validateAuthEnv();
  } catch (error) {
    console.error("❌ Environment validation failed:");
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }

  buildServer().then(({ app, deps }) => {
    const port = deps.config.PORT;
    app.listen({ port, host: "0.0.0.0" }).catch((err) => {
      app.log.error(err);
      process.exit(1);
    });
  });
}
