FROM node:20-alpine AS build
WORKDIR /app
COPY ../../package.json ../../pnpm-workspace.yaml ../../tsconfig.base.json ../../turbo.json ./
COPY ../../pnpm-lock.yaml ./pnpm-lock.yaml
RUN corepack enable pnpm
RUN pnpm fetch
COPY ../../apps ./apps
COPY ../../packages ./packages
RUN pnpm install --offline
RUN pnpm --filter web build

FROM nginx:1.27-alpine AS runtime
COPY --from=build /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
