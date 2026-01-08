# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

pnpm monorepo for podcast website. Frontend (Astro), backend (Hono + Prisma + SQLite). Episodes fetched from RSS feed, cached.

## Architecture

### Frontend (apps/frontend)
- Astro SSR mode w/ Node adapter
- RSS episodes from `starpod.config.ts` cached to `.cache/`
- Astro DB (Turso/libSQL) for episode metadata (hosts, guests, sponsors)
- Pages: dynamic `[episode].astro`, races, static pages
- `src/lib/rss.ts`: RSS parsing, image optimization, caching

### Backend (apps/backend)
- Hono API: `/api/reviews`, `/api/trail-events`, `/api/health`
- Prisma ORM + SQLite (`prisma/dev.db`)
- Routes in `src/routes/`

## Commands

### Dev
```bash
pnpm dev                 # all apps
pnpm dev:frontend        # frontend only
pnpm dev:backend         # backend only
```

### Build
```bash
pnpm build               # builds frontend (includes astro check)
pnpm build:frontend      # same
pnpm build:backend       # backend build
```

### Database

#### Frontend (Astro DB/Turso)
```bash
pnpm --filter frontend db:seed                    # seed Astro DB
ASTRO_DB_REMOTE_URL="..." ASTRO_DB_APP_TOKEN="..." pnpm astro db push  # push schema to Turso
```

#### Backend (Prisma)
```bash
pnpm --filter backend db:push      # push schema
pnpm --filter backend db:generate  # generate client
pnpm --filter backend db:seed      # seed data
```

### Lint/Format
```bash
pnpm check              # lint + prettier check
pnpm fix                # fix lint + prettier
```

### Test
```bash
pnpm test               # runs all tests
pnpm --filter frontend test:unit   # vitest
pnpm --filter frontend test:e2e    # playwright
```

## Deployment (Fly.io)

Manual from monorepo root:
```bash
# Backend
flyctl deploy --config apps/backend/fly.toml --dockerfile apps/backend/Dockerfile

# Frontend (requires Turso credentials)
flyctl deploy \
  --config apps/frontend/fly.toml \
  --dockerfile apps/frontend/Dockerfile \
  --build-arg ASTRO_DB_REMOTE_URL="$(turso db show laufendentdecken --url)" \
  --build-arg ASTRO_DB_APP_TOKEN="..."
```

Auto-deploy via GitHub Actions on push to `main`. See `DEPLOY.md` for full setup.

### Turso Setup
```bash
turso db create laufendentdecken
turso db show laufendentdecken --url
turso db tokens create laufendentdecken
```

## Development Verification Process

**CRITICAL: Always use the `verify` agent (Task tool w/ subagent_type=verify) after any dev work to test changes via Chrome MCP.**

## Key Files

- `starpod.config.ts`: Podcast RSS feed, hosts, platforms
- `apps/frontend/db/config.ts`: Astro DB schema
- `apps/backend/prisma/schema.prisma`: Backend DB schema
- `astro.config.mjs`: Server output, Node adapter, fonts, redirects
