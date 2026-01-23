FROM oven/bun:1.3.2-alpine AS base

FROM base AS build
WORKDIR /app
# Copy monorepo root files
COPY bun.lock bunfig.toml package.json ./
# Copy frontend app
COPY apps/frontend ./apps/frontend
RUN bun install --frozen-lockfile --filter frontend
# Astro DB with libSQL (Turso) for --remote build
ARG ASTRO_DB_REMOTE_URL
ARG ASTRO_DB_APP_TOKEN
ENV ASTRO_DB_REMOTE_URL=$ASTRO_DB_REMOTE_URL
ENV ASTRO_DB_APP_TOKEN=$ASTRO_DB_APP_TOKEN
# Backend API URL for runtime fetching
ARG PUBLIC_API_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL
# Run build from frontend directory
WORKDIR /app/apps/frontend
RUN bun run build

FROM base
WORKDIR /app
# Copy monorepo root files
COPY bun.lock bunfig.toml package.json ./
# Copy frontend app package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
RUN bun install --production --frozen-lockfile --ignore-scripts --filter frontend
WORKDIR /app/apps/frontend
COPY --from=build /app/apps/frontend/dist ./dist

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080
# Set PUBLIC_API_URL for runtime SSR
ARG PUBLIC_API_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL
EXPOSE 8080

CMD ["node", "./dist/server/entry.mjs"]
