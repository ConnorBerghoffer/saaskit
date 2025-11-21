# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY ../../package.json ../../pnpm-workspace.yaml ../../tsconfig.base.json ../../turbo.json ./
COPY ../../pnpm-lock.yaml ./pnpm-lock.yaml
RUN corepack enable pnpm
RUN pnpm fetch
COPY ../../apps ./apps
COPY ../../packages ./packages
RUN pnpm install --offline
RUN pnpm --filter api build

# Runtime stage
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/apps/api/dist ./dist
COPY --from=build /app/apps/api/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
EXPOSE 8080
CMD ["node", "dist/server.js"]
