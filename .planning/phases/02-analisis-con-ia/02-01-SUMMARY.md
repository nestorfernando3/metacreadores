# Phase 2, Wave 1 Summary: AI Tutor Analysis Engine

**Date:** 2025-05-04
**Plan:** 02-01-PLAN.md
**Status:** ✅ Complete

## What was built

The AI tutor analysis engine with a stateless two-pass pipeline for detecting rhetorical figures and generating tutor-style feedback.

### Files Created

| File | Purpose |
|------|---------|
| `src/lib/ai/schemas.ts` | Zod schemas: `FigureMatchSchema`, `AnalysisSchema`, `TutorFeedbackSchema`, `AnalysisResultSchema`, `AnalyzeRequestSchema` with TypeScript type exports |
| `src/lib/ai/prompts.ts` | `buildDetectionPrompt(locale, candidates)` and `buildTutorPrompt(locale, analysis)` — both enforce tutor tone, ban grading language, require exact offsets |
| `src/lib/ai/providers.ts` | `createGroqModel()`, `createGoogleModel()`, config getters with `temperature` and `maxOutputTokens`, fallback detection helpers |
| `src/lib/content/figure-context.ts` | `getFigureContext(text, locale, max?)` — keyword-based relevance scoring that selects 3-5 figure candidates from the catalog, with fallback to 5 most common figures |
| `src/lib/ai/analyze-text.ts` | `analyzeText(options)` — two-pass pipeline: Pass 1 uses `generateText` + `Output.object({ schema: AnalysisSchema })` for detection, Pass 2 generates tutor feedback. Includes offset validation, safe fallback on failure |
| `src/app/api/ai/analyze/route.ts` | `POST /api/ai/analyze` — accepts `{ text, locale, figureCandidates? }`, validates with `AnalyzeRequestSchema`, returns structured `{ matches, feedback, locale, model, confidence }` |

### Test Files Created

| File | Tests |
|------|-------|
| `src/lib/ai/analyze-text.test.ts` | 19 tests covering schema validation, analysis pipeline, fallback behavior, and tutor-tone guardrails |
| `src/app/api/ai/analyze/route.test.ts` | 7 tests covering valid/invalid requests, error handling, parameter passing |

### Key Design Decisions

1. **Two-pass stateless pipeline:** Detection (Pass 1) and feedback (Pass 2) are separate `generateText` calls. Each call is independent — no conversational memory.
2. **Structured output with `Output.object`:** Detection pass uses Zod schema validation for typed, predictable results.
3. **Offset validation:** All spans are validated against the original text before returning; invalid offsets are filtered out.
4. **Safe fallback:** If the primary model (Groq) fails, we try Gemini; if both fail, we return `{ matches: [], uncertainSegments: [] }` with a graceful tutor-friendly message.
5. **Prompt guardrails:** Both system prompts explicitly ban "correcto", "incorrecto", scoring, and evaluative language through rule-based instructions.
6. **Candidate pre-filtering:** The AI never sees the full catalog — only 3-5 relevant figures based on keyword scoring.

## Verification Results

```
✓ src/lib/ai/schemas.ts          — contains FigureMatchSchema
✓ src/lib/ai/prompts.ts          — contains Tutor tone enforcement
✓ src/lib/ai/providers.ts        — Groq + Gemini adapters
✓ src/lib/content/figure-context.ts — getFigureContext exported
✓ src/lib/ai/analyze-text.ts     — uses Output.object
✓ src/app/api/ai/analyze/route.ts — analysis endpoint
✓ 26/26 tests pass
```

## Dependencies Added

- `ai@6.0.175`
- `@ai-sdk/groq`
- `@ai-sdk/google`
- `zod`

## Files Modified

- `package.json` — added AI SDK dependencies
- `vitest.config.ts` — added `@/` path alias resolution for tests

## Next Steps

- Connect the API endpoint to the TipTap editor UI
- Add streaming for the feedback pass
- Implement text highlight rendering from the analysis matches
- Add analysis persistence and user history
