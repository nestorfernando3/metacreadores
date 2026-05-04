---
phase: 01-fundamentos-y-catalogo
plan: 02
type: summary
wave: 2
created: 2025-05-04
status: complete
---

# Plan 01-02 Summary: Database Schema & Migration

## Objective

Define and configure the database schema for Metacreadores using Drizzle ORM with Supabase PostgreSQL.

## Files Created/Modified

| File | Action | Purpose |
|------|--------|---------|
| `src/db/schema.ts` | **Created** | Full Drizzle schema with 6 tables, relations, and type exports |
| `drizzle.config.ts` | **Created** | Drizzle Kit configuration pointing to schema |
| `src/db/migrate.ts` | **Created** | Programmatic migration runner using `tsx` |
| `src/db/index.ts` | **Modified** | Added `export type DB` for type-safe queries |
| `package.json` | **Modified** | Updated `db:migrate` to use `tsx`, added `db:studio` |
| `drizzle/0000_white_sleeper.sql` | **Generated** | Initial migration SQL (6 tables, all FK constraints) |

## Schema Overview

### Tables Created

| Table | Columns | Foreign Keys | Purpose |
|-------|---------|-------------|---------|
| `auth.users` | 1 | — | Supabase Auth reference table (for FK constraints) |
| `profiles` | 6 | `id → auth.users.id` | Extended user profiles linked to auth |
| `figures` | 12 | — (unique slug) | Rhetorical figures catalog (15-20 figures) |
| `figure_examples` | 11 | `figure_id → figures.id` | Literary examples with regional diversity |
| `exercises` | 9 | `figure_id → figures.id` | Practice exercises (schema only — Phase 3) |
| `user_progress` | 9 | `user_id → profiles.id`, `figure_id → figures.id` | Learning progress tracking (schema only — Phase 3) |

### Key Design Decisions

- **Hybrid i18n**: All content tables include `_en` suffix columns for English translations alongside Spanish originals
- **Relations defined**: `figures → examples` (one-to-many), `figures → exercises` (one-to-many), `user_progress → profiles + figures` (many-to-one)
- **Cascading deletes**: All foreign keys use `ON DELETE CASCADE` to maintain referential integrity
- **Type exports**: Full TypeScript types inferred via `$inferSelect` / `$inferInsert` for all 5 domain tables

## Verification Results

| Check | Result |
|-------|--------|
| `src/db/schema.ts` exists | ✅ |
| `drizzle.config.ts` exists | ✅ |
| `src/db/migrate.ts` exists | ✅ |
| `profiles` in schema | ✅ |
| `figures` in schema | ✅ |
| `figure_examples` in schema | ✅ |
| `exercises` in schema | ✅ |
| `user_progress` in schema | ✅ |
| Migration SQL generated | ✅ (1 file) |
| `db:generate` script | ✅ |
| `db:migrate` script | ✅ |
| `pgTable` used | ✅ (7 times) |
| Schema ≥ 80 lines | ✅ (171 lines) |
| `import * as schema` in index.ts | ✅ |

## Next Steps

- Continue to Plan 01-03 (seed data for figures catalog)
- Apply migrations when a real Supabase project is connected (`DATABASE_URL`)
- Follow with Plan 01-04 (auth setup) and Plan 01-05 (i18n configuration)
