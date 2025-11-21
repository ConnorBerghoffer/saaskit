# Deployment (Docker + Hostinger)

1. Build images locally:

```bash
docker compose build
```

2. Tag/push images to your registry (Docker Hub / GHCR) if deploying via Hostinger container service:

```bash
docker tag saaskit-api YOUR_REGISTRY/saaskit-api:latest
docker push YOUR_REGISTRY/saaskit-api:latest
# Repeat for app + web
```

3. On the Hostinger VPS/container host:

```bash
git clone <repo>
cd saaskit
cp .env.example .env # if needed
pnpm install # optional for local tooling
Docker compose up
```

4. Alternatively, copy `docker-compose.yml`, update image references, and run `docker compose up -d` on the server. Ensure ports 80/4173/8080 are exposed or proxied.

Environment variables:
- `DATABASE_URL` (api container) already defaults to internal Postgres connection defined in compose.
- Adjust `APP_ENV`, `API_URL`, `WEB_URL` via `.env` when needed.
