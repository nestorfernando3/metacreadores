# Phase 1 Context: Fundamentos y Catálogo

## Domain

Phase 1 delivers the foundational infrastructure and content catalog for Metacreadores. Students can explore and learn rhetorical figures, and users can securely access their accounts. This phase establishes the technical stack, authentication, i18n, database schema, and the initial catalog of 15-20 essential rhetorical figures with real literature examples.

## Decisions

### Architecture
- **Framework:** Next.js 15 (App Router) — Server Components, API Routes, native streaming
- **Database:** Supabase (Postgres + Auth + Storage) with Drizzle ORM for type-safe queries
- **i18n:** next-intl v4 with Spanish as default (no URL prefix), English as secondary
- **UI:** shadcn/ui + Tailwind CSS
- **Testing:** Vitest 3 + Playwright

### Authentication
- **Method:** Email/password via Supabase Auth
- **Session:** Persistent across browser refreshes
- **Privacy:** COPPA/FERPA/GDPR compliant from day 1, anonymous mode available

### Content
- **Figures:** 15-20 essential rhetorical figures (metáfora, símil, hipérbole, personificación, aliteración, etc.)
- **Examples:** Real literature examples, not invented ones — must cover ≥3 Spanish-speaking regions
- **Format:** Each figure includes definition, real-world examples, historical/literary context

### AI Integration (Foundation Only)
- **Provider:** Groq (primary) with Gemini fallback
- **Pattern:** Stateless multi-specialist AI (detection and feedback as separate passes)
- **Tone:** Tutor, never judge — no evaluative language ("correcto/incorrecto")

### Technical Decisions
- **Editor:** TipTap (ProseMirror-based) for future Phase 2 writing feature — scaffold now
- **Responsive:** Mobile-first design, works on phone and desktop
- **Data:** Educational content in Supabase with locale columns (hybrid i18n)

## Canonical References

- `.planning/PROJECT.md` — Project context and core value
- `.planning/REQUIREMENTS.md` — v1 requirements (CATALOG-01–05, AUTH-01–03)
- `.planning/research/STACK.md` — Technology stack recommendations
- `.planning/research/ARCHITECTURE.md` — Architecture patterns
- `.planning/research/PITFALLS.md` — Domain pitfalls and prevention

## Code Context

Greenfield project — no existing codebase to reuse.

## Deferred Ideas

- Levels of mastery per figure (Phase 3)
- Teacher dashboard (Phase 4)
- Real-world text analysis (paste any text — Phase 2+)
- Gamification — deliberately excluded (overjustification risk)

---
*Created: 2025-05-04*
*Phase: 1 — Fundamentos y Catálogo*