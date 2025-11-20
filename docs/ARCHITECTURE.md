# Architecture Plan

- `apps/app`: Vite + React application (product dashboard)
- `apps/web`: Astro marketing site
- `apps/api`: Fastify API
- `packages/config`: shared runtime config + env parsing
- `packages/db`: Drizzle + Postgres client
- `packages/auth`: Better Auth configuration + client/server helpers
- `packages/validator`: Zod schemas + helpers

Each package must be installable independently (published to npm) so the scaffolded monorepo only links them via `workspace:*` while still working when consumed externally.
