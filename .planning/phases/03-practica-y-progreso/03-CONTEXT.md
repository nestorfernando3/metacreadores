# Phase 3 Context: Práctica y Progreso

## Domain

Phase 3 delivers the practice loop: students exercise figure identification and completion, receive immediate feedback, and track their progress. The phase closes the learn → practice → analyze cycle by adding structured practice between the catalog (Phase 1) and the AI tutor (Phase 2).

## Decisions

### Product Behavior
- **Exercise types:** identification (pick the figure in a text) and completion (fill in the missing figure)
- **Feedback:** immediate after each answer, non-grading explanation of why the answer works
- **Difficulty:** exercises are tagged with difficulty level; adaptivity comes from ordering, not dynamic scaling (v1)
- **Progress tracking:** increment counters in `user_progress` on each correct/incorrect answer

### Technical Constraints
- Reuse the existing `exercises` and `user_progress` tables from the Phase 1 schema
- Seed exercises for all 20 figures from the catalog
- Keep exercise UI calm and focused, matching the tutor tone (no scores, no badges)
- Mobile-first responsive layout

### Deferred
- EXER-05: AI-generated exercise texts (separate wave)
- Adaptive difficulty based on student performance (v2)
- Mastery levels per figure (v2)

---

*Created: 2025-05-04*
*Phase: 3 — Práctica y Progreso*
