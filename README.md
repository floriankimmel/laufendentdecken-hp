# Laufend Entdecken Monorepo

Monorepo containing frontend (Astro) and backend (Hono) applications.

## Structure

```
laufendentdecken-hp/
├── apps/
│   ├── frontend/     # Astro frontend application
│   └── backend/      # Hono backend API (SQLite + Prisma)
├── package.json      # Root workspace configuration
└── pnpm-workspace.yaml
```

## Tech Stack

### Frontend
- Astro
- Preact
- TailwindCSS
- Valibot

### Backend
- Hono (web framework)
- Prisma (ORM)
- SQLite (database)
- Valibot (validation)
- TypeScript

## Commands

### Development
```bash
# Run all apps
pnpm dev

# Run specific app
pnpm dev:frontend
pnpm dev:backend
```

### Build
```bash
# Build all apps
pnpm build

# Build specific app
pnpm build:frontend
pnpm build:backend
```

### Database
```bash
# Backend commands (run from root or apps/backend)
pnpm --filter backend db:push      # Push schema to database
pnpm --filter backend db:generate  # Generate Prisma Client
pnpm --filter backend db:seed      # Seed database with sample data
```

### Other
```bash
pnpm lint    # Lint all apps
pnpm test    # Test all apps
```

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up backend database:
   ```bash
   cd apps/backend
   pnpm db:push    # Creates database
   pnpm db:seed    # Seeds sample data
   ```

3. Start development:
   ```bash
   pnpm dev
   ```

Frontend: http://localhost:4321
Backend: http://localhost:3001

## API Endpoints

### Reviews
- `GET /api/reviews` - List all reviews
- `GET /api/reviews/:id` - Get single review
- `POST /api/reviews` - Create review
- `PATCH /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Trail Events
- `GET /api/trail-events` - List all trail events
- `GET /api/trail-events/:id` - Get single trail event
- `POST /api/trail-events` - Create trail event
- `PATCH /api/trail-events/:id` - Update trail event
- `DELETE /api/trail-events/:id` - Delete trail event

### Health
- `GET /api/health` - Health check endpoint
