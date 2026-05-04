---
phase: 01-fundamentos-y-catalogo
plan: 04
type: summary
wave: 3
status: completed
---

# Plan 01-04 Summary: Curate and Seed Catalog of Rhetorical Figures

## Completed Tasks

### Task 1: Content Service Layer
- **Created:** `src/lib/content/figures.ts`
- **Exports:**
  - `getFigures()` — all figures with examples, ordered by name
  - `getFigureBySlug(slug)` — single figure by slug
  - `getFiguresByCategory(category)` — filtered by category
  - `searchFigures(query)` — search by name or definition
  - `getDifficultyLevels()` — count per difficulty level
  - `getCategories()` — distinct categories
- Uses Drizzle relational queries with `with: { examples: true }`

### Task 2: Seed Data for 20 Rhetorical Figures
- **Created:** `src/db/seed-data.ts` (1171 lines)
- **20 figures included:**

| # | Slug | Name | Category | Difficulty |
|---|------|------|----------|-----------|
| 1 | metafora | Metáfora | figuras_de_pensamiento | 1 |
| 2 | simil | Símil | figuras_de_pensamiento | 1 |
| 3 | hiperbole | Hipérbole | figuras_de_pensamiento | 1 |
| 4 | personificacion | Personificación | figuras_de_pensamiento | 1 |
| 5 | aliteracion | Aliteración | figuras_de_diccion | 2 |
| 6 | onomatopeya | Onomatopeya | figuras_de_diccion | 1 |
| 7 | hiperbaton | Hipérbaton | figuras_de_diccion | 2 |
| 8 | anafora | Anáfora | figuras_de_diccion | 2 |
| 9 | paralelismo | Paralelismo | figuras_de_diccion | 2 |
| 10 | oximoron | Oxímoron | figuras_de_pensamiento | 2 |
| 11 | antitesis | Antítesis | figuras_de_pensamiento | 2 |
| 12 | eufemismo | Eufemismo | figuras_de_pensamiento | 2 |
| 13 | ironia | Ironía | figuras_de_pensamiento | 3 |
| 14 | sinestesia | Sinestesia | figuras_de_pensamiento | 3 |
| 15 | metonimia | Metonimia | figuras_de_pensamiento | 2 |
| 16 | sinecdoque | Sínécdoque | figuras_de_pensamiento | 3 |
| 17 | polisindeton | Polisíndeton | figuras_de_diccion | 3 |
| 18 | asindeton | Asíndeton | figuras_de_diccion | 3 |
| 19 | anacoluto | Anacoluto | figuras_de_diccion | 3 |
| 20 | paronomasia | Paronomasia | figuras_de_diccion | 2 |

- **Each figure includes:**
  - Definition in Spanish and English
  - Historical/literary context in Spanish and English (CATALOG-05)
  - 2-3 real literary examples with author, work, explanation (CATALOG-01, CATALOG-03)

### Task 3: Seed Scripts
- **Created:** `src/db/seed.ts` — inserts figures and examples via Drizzle
- **Created:** `src/db/verify-seed.ts` — verifies figure count, regional diversity, difficulty and category distribution
- **Updated:** `package.json` — added `db:seed` and `db:verify` scripts

## Regional Diversity (11 regions covered)

| Region | Example Authors |
|--------|----------------|
| España | Calderón, Quevedo, Cervantes, Góngora, Garcilaso, Machado, Lope de Vega, San Juan de la Cruz, Santa Teresa, Zorrilla, Valle-Inclán, Bécquer |
| México | Octavio Paz, Sor Juana Inés de la Cruz, Juan Rulfo, Jaime Sabines |
| Argentina | Jorge Luis Borges, Julio Cortázar, Alfonsina Storni, Alejandra Pizarnik |
| Chile | Pablo Neruda, Gabriela Mistral |
| Perú | César Vallejo |
| Colombia | Gabriel García Márquez |
| Uruguay | Mario Benedetti |
| Cuba | José Martí, José Lezama Lima |
| Nicaragua | Rubén Darío |
| Guatemala/México | Augusto Monterroso |
| México/EE.UU. | Tomás Rivera |

## Verification Results

| Check | Result |
|-------|--------|
| `test -f src/lib/content/figures.ts` | ✅ PASS |
| `test -f src/db/seed-data.ts` | ✅ PASS |
| `test -f src/db/seed.ts` | ✅ PASS |
| `test -f src/db/verify-seed.ts` | ✅ PASS |
| `grep -c "slug:" src/db/seed-data.ts` | ✅ 20 figures (1 interface + 20 entries) |
| Content service exports | ✅ getFigures, getFigureBySlug, getFiguresByCategory, searchFigures |
| npm scripts | ✅ db:seed, db:verify |
| Regions ≥ 3 | ✅ 11 regions |
| seed-data.ts ≥ 200 lines | ✅ 1171 lines |

## Usage

To seed the database (requires running Postgres with DATABASE_URL configured):

```bash
npm run db:seed
```

To verify seed data:

```bash
npm run db:verify
```

## Files Created/Modified

| File | Action | Description |
|------|--------|-------------|
| `src/lib/content/figures.ts` | Created | Content service layer with 6 query functions |
| `src/db/seed-data.ts` | Created | 20 figures with definitions, context, and real examples |
| `src/db/seed.ts` | Created | Seed script using Drizzle ORM |
| `src/db/verify-seed.ts` | Created | Verification script for seed integrity |
| `package.json` | Modified | Added `db:seed` and `db:verify` scripts |
