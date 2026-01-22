FROM oven/bun:1-alpine AS base

FROM base AS build
WORKDIR /app
# Copy monorepo root files
COPY bun.lock bunfig.toml package.json ./
# Copy backend app
COPY apps/backend ./apps/backend
RUN bun install --frozen-lockfile --filter backend
# Run commands from backend directory
WORKDIR /app/apps/backend
# Provide dummy DATABASE_URL for prisma generate (doesn't connect, just generates client)
ENV DATABASE_URL="postgresql://placeholder:placeholder@localhost:5432/placeholder"
RUN bun run db:generate
RUN bun run build

FROM base
WORKDIR /app
# Copy monorepo root files
COPY bun.lock bunfig.toml package.json ./
# Copy backend app
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/backend/prisma ./apps/backend/prisma
RUN bun install --production --frozen-lockfile --filter backend
WORKDIR /app/apps/backend
# Copy dist and generated Prisma Client from build stage
COPY --from=build /app/apps/backend/dist ./dist
COPY --from=build /app/apps/backend/src/generated ./dist/generated

ENV NODE_ENV=production
EXPOSE 8080

CMD ["sh", "-c", "bun run db:push --accept-data-loss && bun run start"]
