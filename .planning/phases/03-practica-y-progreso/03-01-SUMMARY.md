# Phase 3 Wave 1 — Summary

**Wave:** 1 (Exercise Engine)
**Date:** 2025-05-04

## What was built

### 1. Exercise seed data (`src/db/seed-exercises.ts`)
- 40 exercises: 2 per figure (1 identification + 1 completion)
- Identification exercises: show a text, student picks the figure from 4 options
- Completion exercises: show a partial text, student fills in missing word/phrase
- Difficulty levels aligned with each figure's `difficultyLevel` (1=10, 2=18, 3=12 exercises)
- Uses real literary examples from the existing seed data (Neruda, Quevedo, Sor Juana, etc.)

### 2. Updated seed script (`src/db/seed.ts`)
- Imports `seedExercises` from `seed-exercises.ts`
- After seeding figures and examples, maps exercise slugs to figure IDs and inserts exercises
- Handles missing figures gracefully with a warning

### 3. Exercise components (`src/components/exercises/`)
- **`exercise-card.tsx`** — Container with figure badge, type badge (Identificar/Completar), question text, and slot for answer area
- **`identification-exercise.tsx`** — Multiple choice radio-button style, highlights selection, shows correct/incorrect after answer
- **`completion-exercise.tsx`** — Text input with autofocus, shows correct answer on incorrect
- **`exercise-feedback.tsx`** — Calm tutor-tone feedback (never "correcto/incorrecto"), per-figure custom messages in both languages
- **`exercise-progress.tsx`** — Overall progress bar + per-figure completion list

### 4. Exercise page (`src/app/[locale]/exercises/page.tsx`)
- Lists 40 exercises grouped by difficulty level (Principiante/Intermedio/Avanzado)
- Click an exercise card to start it; shows one at a time
- After answering, shows immediate feedback via the feedback component
- Tracks answered/correct state per exercise
- Progress sidebar showing per-figure completion
- Responsive layout (single column mobile, wider on desktop with sidebar)
- All exercise data embedded for zero-dependency demo mode

### 5. Answer checking (`src/lib/exercises/check-answer.ts`)
- `checkAnswer(type, userAnswer, correctAnswer)` — dispatches by type
- `checkMultipleChoice` — exact normalized match
- `checkCompletion` — normalized match (trim, lowercase, collapse spaces)
- `normalize()` — reusable string normalizer
- Returns `{ correct, userAnswer, correctAnswer }`

### 6. Progress tracking (`src/lib/exercises/track-progress.ts`)
- `trackProgress(currentProgress, isCorrect)` — increments counters, updates timestamp
- `createInitialProgress()` — creates default zero state
- Returns current progress state

### 7. Locale strings
- Added `exercises` section to both `messages/es.json` and `messages/en.json`
- Includes titles, descriptions, difficulty labels, type labels, feedback messages in tutor tone

### 8. Tests
- **`src/lib/exercises/check-answer.test.ts`** — 18 tests covering normalize, multiple choice, completion, edge cases
- **`src/lib/exercises/track-progress.test.ts`** — 6 tests covering increment logic, accumulation, timestamp updates

## Verification

| Check | Result |
|-------|--------|
| `npm test` (88 tests) | ✅ Passed (24 new exercise tests + 64 existing) |
| `npm run build` | ✅ Compiled successfully, no errors |
| Exercises page route | ✅ `ƒ /[locale]/exercises` (7.28 kB) |
| Seed exercises file | ✅ `src/db/seed-exercises.ts` — 40 exercises |
| Check answer module | ✅ `checkAnswer` exported from `src/lib/exercises/check-answer.ts` |
| Track progress module | ✅ `exercisesCompleted` in `src/lib/exercises/track-progress.ts` |

## Files Created/Modified

| File | Action |
|------|--------|
| `src/db/seed-exercises.ts` | Created — 40 exercise seed data |
| `src/db/seed.ts` | Modified — added exercise seeder |
| `src/components/exercises/exercise-card.tsx` | Created |
| `src/components/exercises/identification-exercise.tsx` | Created |
| `src/components/exercises/completion-exercise.tsx` | Created |
| `src/components/exercises/exercise-feedback.tsx` | Created |
| `src/components/exercises/exercise-progress.tsx` | Created |
| `src/app/[locale]/exercises/page.tsx` | Created |
| `src/lib/exercises/check-answer.ts` | Created |
| `src/lib/exercises/track-progress.ts` | Created |
| `src/lib/exercises/check-answer.test.ts` | Created |
| `src/lib/exercises/track-progress.test.ts` | Created |
| `messages/es.json` | Modified — added exercise locale strings |
| `messages/en.json` | Modified — added exercise locale strings |
| `.planning/phases/03-practica-y-progreso/03-01-SUMMARY.md` | Created — this file |

## Next Steps (Wave 2)
- EXER-05: AI-generated exercise texts
- Adaptive difficulty based on student performance
- Mastery levels per figure
- Persist progress to user_progress table via API
