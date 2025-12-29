# Backend - ARCHIVED

This backend is no longer deployed. Content has been migrated to frontend markdown files.

## What happened?

All reviews and trail events have been exported to static markdown files in the frontend:
- Reviews: `apps/frontend/src/content/reviews/*.md`
- Races: `apps/frontend/src/content/races/*.md`

## Re-export data

If you need to export the data again:

```bash
cd apps/backend
pnpm install
pnpm tsx scripts/export-to-markdown.ts
```

## Database

The SQLite database is preserved at `prisma/dev.db` (72KB, 18 reviews + 20 trail events).
