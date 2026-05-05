# Phase 2 Context: Análisis con IA

## Domain

Phase 2 delivers the core differentiator: students write text and receive AI feedback that highlights rhetorical figures inline and explains why they work or feel forced. The system must behave like a tutor, not a judge, and support the learning loop established in Phase 1.

## Decisions

### Product Behavior
- **Core interaction:** student pastes or writes text, the AI identifies figures, highlights them inline, and explains the effect in tutor tone.
- **Tone:** never grade, score, or use evaluative language like "correcto/incorrecto".
- **Scope:** start with single-figure detection before any multi-figure or comparative analysis.
- **Persistence:** saved texts belong to the student account and can be revisited later.

### AI Stack
- **Primary integration layer:** Vercel AI SDK (TypeScript, Next.js-native streaming and structured output)
- **Model providers:** Groq primary, Gemini fallback
- **Orchestration pattern:** stateless multi-specialist passes
  - pass 1: detect figures and produce structured annotations
  - pass 2: rewrite structured findings into tutor feedback

### Output Contract
- **Structured detection output:** figure name, offset ranges, confidence, explanation, and suggested alternative when applicable
- **Presentation layer:** inline highlights in the editor plus a feedback panel with explanatory text
- **Safety:** ambiguous cases should be phrased as possibilities, not certainties

### Evaluation Priorities
- Hallucination control in Spanish literary analysis
- Tutor-to-judge drift prevention
- Fidelity of inline highlight offsets
- Output structure validity
- Regional Spanish variation in examples and explanations

### Technical Constraints
- **Language:** TypeScript / Next.js only for the app layer
- **Privacy:** no student text should leave the system except through the AI provider pathway needed for analysis
- **Latency:** keep analysis fast enough for interactive writing

## Canonical References

- `.planning/PROJECT.md` — project vision and core value
- `.planning/REQUIREMENTS.md` — v1 scope for writing and AI feedback
- `.planning/ROADMAP.md` — Phase 2 goal and requirement mapping
- `.planning/research/SUMMARY.md` — research synthesis for AI stack, architecture, and pitfalls
- `.planning/phases/01-fundamentos-y-catalogo/01-CONTEXT.md` — phase 1 decisions that carry forward

## Deferred Ideas

- Multi-figure analysis and comparative feedback (future expansion)
- Teacher review of student texts (Phase 4)
- Adaptive recommendation engine for next practice (Phase 3)

---
*Created: 2025-05-04*
*Phase: 2 — Análisis con IA*
