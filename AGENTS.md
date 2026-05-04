# Metacreadores — Project Guide

## Project Overview

Software educativo que enseña figuras retóricas y literarias a estudiantes de secundaria en español. La IA actúa como tutor que analiza los textos del estudiante, resalta figuras retóricas inline, y explica por qué funcionan o se sienten forzadas — nunca califica.

**Core Value:** La IA como lector experto que analiza el texto del estudiante y le explica por qué una figura funciona o se siente forzada — retroalimentación tipo tutor, no calificación.

## Current State

- **Phase:** 1 of 4 (Fundamentos y Catálogo)
- **Status:** Ready to plan
- **Last update:** 2025-05-04

## Technology Stack

- **Framework:** Next.js 15 (App Router)
- **AI:** Vercel AI SDK + Groq/Gemini (API keys configured)
- **Editor:** TipTap (ProseMirror-based, supports custom inline marks)
- **Database:** Supabase (Postgres + Auth + Storage)
- **ORM:** Drizzle
- **i18n:** next-intl v4 (Spanish default, English secondary)
- **UI:** shadcn/ui + Tailwind CSS
- **Testing:** Vitest 3 + Playwright

## Architecture Notes

- **Stateless multi-specialist AI pattern:** Detection and feedback generation are separate passes
- **Hybrid i18n:** Static UI strings in JSON files, educational content in Supabase with locale columns
- **Privacy by default:** COPPA/FERPA/GDPR compliant from day 1, anonymous mode available
- **Tutor tone enforcement:** AI must never use evaluative language ("correcto/incorrecto"). Prompt engineering + output filtering required.

## Key Constraints

1. **No calificación automática** — la IA es tutor, no juez
2. **15-20 figuras esenciales** primero, no catálogo exhaustivo
3. **Web responsive** — no app nativa inicialmente
4. **Bilingüe español/inglés** — español es el idioma primario del contenido
5. **Sin gamificación con puntos/badges** — riesgo de sobrejustificación en escritura creativa

Store API keys in .env.local (already in .gitignore). Never commit secrets.

## Workflow

This project uses GSD (Get Shit Done) workflow:
- **Mode:** YOLO (auto-approve, execute directly)
- **Granularity:** Standard (5-8 phases)
- **Parallelization:** Enabled
- **Agents:** Research + Plan Check + Verifier enabled

## Critical Risks

1. **AI hallucination in literary analysis** — Spanish rhetorical figures lack training data; requires structured output validation
2. **Tutor-to-judge drift** — LLMs default to evaluative language; needs aggressive prompt engineering
3. **Spanish NLP gaps** — No annotated datasets for Spanish figures exist; LLM-based detection is the only viable path
4. **Regional variation** — Examples must cover ≥3 Spanish-speaking regions

## Next Step

Run `/gsd-discuss-phase 1` to gather context and clarify approach for Phase 1: Fundamentos y Catálogo.

---
*Generated: 2025-05-04*
*Update this file when project context changes*