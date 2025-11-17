FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app
# Copy monorepo root files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
# Copy backend app
COPY apps/backend ./apps/backend
RUN pnpm install --frozen-lockfile --filter backend
# Run commands from backend directory
WORKDIR /app/apps/backend
RUN pnpm db:generate
RUN pnpm build

FROM base
WORKDIR /app
# Copy monorepo root files
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
# Copy backend app
COPY apps/backend/package.json ./apps/backend/package.json
COPY apps/backend/prisma ./apps/backend/prisma
RUN pnpm install --prod --frozen-lockfile --filter backend
WORKDIR /app/apps/backend
# Copy generated Prisma Client from build stage
COPY --from=build /app/apps/backend/src/generated ./src/generated
COPY --from=build /app/apps/backend/dist ./dist

ENV NODE_ENV=production
EXPOSE 8080

CMD ["pnpm", "start"]
