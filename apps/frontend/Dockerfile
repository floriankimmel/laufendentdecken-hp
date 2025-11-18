FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app
# Copy monorepo root files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
# Copy frontend app
COPY apps/frontend ./apps/frontend
RUN pnpm install --frozen-lockfile --filter frontend
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
RUN pnpm build

FROM base
WORKDIR /app
# Copy monorepo root files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
# Copy frontend app package.json
COPY apps/frontend/package.json ./apps/frontend/package.json
RUN pnpm install --prod --frozen-lockfile --filter frontend
WORKDIR /app/apps/frontend
COPY --from=build /app/apps/frontend/dist ./dist

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=8080
EXPOSE 8080

CMD ["node", "./dist/server/entry.mjs"]
