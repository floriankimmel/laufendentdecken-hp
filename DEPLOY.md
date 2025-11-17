# Deployment Guide - Fly.io

## Prerequisites

1. Install [flyctl](https://fly.io/docs/hands-on/install-flyctl/)
2. Create a Fly.io account: `flyctl auth signup`
3. Login: `flyctl auth login`

## Initial Setup

### 1. Create Fly.io Apps

```bash
# Create backend app
cd apps/backend
flyctl apps create laufendentdecken-backend

# Create frontend app
cd apps/frontend
flyctl apps create laufendentdecken-frontend
```

### 2. Configure Secrets

#### Backend
```bash
cd apps/backend
flyctl secrets set DATABASE_URL="your-database-url"
flyctl secrets set NODE_ENV="production"
```

#### Frontend
```bash
cd apps/frontend
# Configure Turso database connection (see section 3 below)
flyctl secrets set ASTRO_DB_REMOTE_URL="libsql://your-database.turso.io"
flyctl secrets set ASTRO_DB_APP_TOKEN="your-turso-token"
```

### 3. Set Up Databases

#### Backend Database (PostgreSQL)
- Set up PostgreSQL on Fly.io: `flyctl postgres create`
- Or use managed service (Supabase, Neon, etc.)
- Update DATABASE_URL secret

#### Frontend Database (Astro DB with Turso)
Astro Studio was discontinued. Use Turso (libSQL) instead:

1. Create account: https://turso.tech
2. Install Turso CLI: `brew install tursodatabase/tap/turso` (or see [docs](https://docs.turso.tech/cli/installation))
3. Login: `turso auth login`
4. Create database: `turso db create laufendentdecken`
5. Get URL: `turso db show laufendentdecken --url`
6. Create token: `turso db tokens create laufendentdecken`
7. Set fly secrets with URL and token from steps 5-6

### 4. Configure GitHub Actions

Add secrets to GitHub repo (Settings > Secrets and variables > Actions):

1. `FLY_API_TOKEN` - Generate: `flyctl tokens create deploy`
2. `ASTRO_DB_REMOTE_URL` - From Turso: `turso db show laufendentdecken --url`
3. `ASTRO_DB_APP_TOKEN` - From Turso: `turso db tokens create laufendentdecken`

## Manual Deployment

Run from monorepo root:

### Backend
```bash
flyctl deploy --config apps/backend/fly.toml --dockerfile apps/backend/Dockerfile
```

### Frontend
```bash
# Pass Turso credentials as build args
flyctl deploy \
  --config apps/frontend/fly.toml \
  --dockerfile apps/frontend/Dockerfile \
  --build-arg ASTRO_DB_REMOTE_URL="$(turso db show laufendentdecken --url)" \
  --build-arg ASTRO_DB_APP_TOKEN="your-turso-token"
```

## Automatic Deployment

Push to `main` branch triggers automatic deployment via GitHub Actions.

The workflow:
1. Deploys backend first
2. Then deploys frontend
3. Can be manually triggered from Actions tab

## Configuration Files

- `apps/backend/fly.toml` - Backend fly.io config
- `apps/backend/Dockerfile` - Backend container image
- `apps/frontend/fly.toml` - Frontend fly.io config
- `apps/frontend/Dockerfile` - Frontend container image
- `.github/workflows/deploy.yml` - CI/CD workflow

## Notes

### Astro Adapter
Frontend uses `@astrojs/node` adapter configured in `astro.config.mjs` for Fly.io deployment.

### Astro DB
Astro DB now uses libSQL (Turso) instead of the discontinued Astro Studio. The `--remote` flag in build scripts fetches the schema from your Turso database.

## Monitoring

- Backend logs: `flyctl logs -a laufendentdecken-backend`
- Frontend logs: `flyctl logs -a laufendentdecken-frontend`
- Status: `flyctl status -a <app-name>`
- Dashboard: https://fly.io/dashboard

## Troubleshooting

- Check logs: `flyctl logs -a <app-name>`
- SSH into machine: `flyctl ssh console -a <app-name>`
- Restart app: `flyctl apps restart <app-name>`
