---
phase: 03-practica-y-progreso
plan: 02
type: summary
wave: 2
completed: true
---

# Wave 2 Summary — Progress Dashboard

## What was built

### 1. Data fetching layer
**`src/lib/exercises/get-progress.ts`** — New file with:
- `getUserProgress(userId)` — fetches `user_progress` rows joined with `figures` table, returns enriched progress per figure with computed accuracy
- `getSavedWritings(userId)` — fetches `writing_submissions` ordered by `savedAt` desc, returns entries with pre-computed word counts
- `computeProgressSummary()` — pure function that derives aggregate stats (total exercises, accuracy %, figures practiced, saved texts count) from per-figure data
- Safe defaults for empty/zero states

### 2. Enhanced ExerciseProgress component
**`src/components/exercises/exercise-progress.tsx`** — Updated:
- **Backward compatible**: original `progress: FigureProgress[]` prop still works unchanged (renders `LegacyProgress`)
- **Full dashboard mode**: when `extendedProgress`, `stats`, and `savedWritings` props are provided:
  - Overall stats bar (4 cards: total exercises, accuracy %, figures practiced, saved texts)
  - Per-figure grid with status badge (completed/in-progress/not-started), completion count, color-coded accuracy bar, last practiced date
  - Empty state with friendly message and link to exercises
- Bilingual support (es/en) via `locale` prop

### 3. Progress page
**`src/app/[locale]/progress/page.tsx`** — New server component:
- Auth guard: redirects to `/login` if user is not authenticated
- Fetches progress data and saved writings in parallel via `Promise.all`
- Passes data to `ExerciseProgress` client component
- Responsive layout: main content (stats + grid) on left 2/3, saved writings sidebar on right 1/3
- Stacks vertically on mobile

### 4. Locale strings
- **`messages/es.json`**: Added `progress.*` section with Spanish translations
- **`messages/en.json`**: Added `progress.*` section with English translations
  - Overview stats labels, per-figure statuses, saved writings labels, empty state messages

### 5. Tests
**`src/lib/exercises/get-progress.test.ts`** — New file with 8 tests:
- Empty progress returns zero stats
- Zero exercises (not started) returns zeros
- Single figure with mixed accuracy
- Aggregation across multiple figures
- Only counts practiced figures (`exercisesCompleted > 0`)
- Perfect accuracy (100%)
- Zero accuracy (0%)
- Saved texts count propagated correctly

## Verification
- `npm test`: 96 tests passed across 9 test files
- `npm run build`: Compiled successfully (progress page shows at `/progress` route)
