# SaaSKit Monorepo (vNext)

Composable boilerplate for spinning up SaaS products with a Vite app, Astro marketing site, Fastify API, and shared installable packages.

## Structure

- `apps/app` – React 19 + Vite dashboard seeded with validator-backed UI
- `apps/web` – Astro marketing site pulling runtime config from shared package
- `apps/api` – Fastify server wired to shared config/db/auth/validator modules
- `packages/*` – Drop-in packages (`@saaskit/config`, `@saaskit/db`, `@saaskit/auth`, `@saaskit/validator`)
- `docs/` – Architecture and deployment references

## Requirements

- Node 20+
- pnpm 10+

## Setup

```bash
pnpm install
cp .env.example .env # adjust values as needed
```

## Development Commands

- `pnpm dev --filter app` – run the Vite dashboard (port 4317)
- `pnpm dev --filter web` – run the Astro marketing site (port 4420)
- `pnpm dev --filter api` – start Fastify with tsx watcher (port 4810)
- `pnpm dev` – run all dev servers via Turbo in parallel
- `pnpm build` – build every workspace
- `pnpm lint` – run ESLint (flat config) through Turbo

Each package/app also exposes its own `build`, `dev`, and `lint` scripts if you prefer to run them individually.

## Docker

`docker-compose.yml` defines a full stack (api/app/web/postgres). Build and start everything with:

```bash
docker compose up --build
```

Default published ports:

- API: `8080`
- App (nginx-served Vite build): `5317`
- Web (Astro static): `4173`

See `docs/DEPLOYMENT.md` for Hostinger deployment notes.
