# Research Summary: Metacreadores

**Project:** Metacreadores — Educational web app for rhetorical figures with AI-powered tutor feedback
**Domain:** EdTech / NLP / Spanish-language secondary education
**Researched:** 2026-05-04
**Confidence:** MEDIUM-HIGH

---

## Executive Summary

Metacreadores is an AI-powered educational web application designed to teach rhetorical and literary figures to secondary school students in Spanish. Its core differentiator is an "AI tutor" that analyzes student writing, highlights rhetorical figures inline, and provides qualitative, supportive feedback — never scores or grades. Research across the competitive landscape (NoRedInk, Quill.org, Wordwall, Artie) confirms that while identification exercises and figure catalogs are table stakes, no existing Spanish-language tool offers AI-powered tutor-style writing analysis. The recommended build approach follows a modern React full-stack pattern: Next.js 15 with App Router, Vercel AI SDK with OpenAI GPT-4o, TipTap for rich text with inline highlighting, Supabase for backend services, and Drizzle ORM for type-safe data access.

The recommended implementation proceeds in four phases: (1) Foundation — content catalog, auth, and internationalization; (2) Core AI Differentiator — the text analysis engine with single-figure detection and tutor-tone feedback; (3) Practice & Integration — exercises, progress tracking, and multi-figure analysis; and (4) Teacher & Polish — dashboards and performance tuning. This ordering ensures the "learn → practice → analyze" cycle is complete end-to-end before any external launch, validating the core pedagogical thesis early.

Key risks identified are AI hallucination in literary analysis (where the LLM confidently presents incorrect interpretations), "tutor-to-judge drift" (where feedback gradually becomes evaluative), Spanish NLP gaps for rhetorical figures, and student data privacy compliance (COPPA/FERPA/GDPR). Mitigation strategies include structured output validation, adversarial prompt testing, privacy-by-default architecture, and a "minimal data" mode that allows anonymous usage without accounts.

---

## Key Findings

### Recommended Stack

Research strongly converges on a modern React/TypeScript full-stack with serverless deployment. Next.js 15 App Router is the mature default, with first-class support for Server Components (ideal for SEO-critical figure catalog pages), API Routes (for AI endpoints), and streaming SSR (for AI responses). The Vercel AI SDK provides `useChat`/`useCompletion` hooks and structured output via Zod schemas — critical for enforcing consistent rhetorical analysis format. OpenAI's GPT-4o-mini offers the best Spanish language support among frontier models at low cost ($0.15/1M input tokens). TipTap 2.x (built on ProseMirror) is the only editor framework capable of inline text annotation with custom marks, essential for the highlight overlay UX. Supabase provides managed PostgreSQL, Auth, Storage, and Realtime in one service — ideal for solo/small-team MVPs. Drizzle ORM is lighter and more SQL-like than Prisma, with better Supabase integration. See [STACK.md](STACK.md) for full technology matrix, alternatives considered, and installation commands.

**Core technologies:**
- **Next.js 15** (App Router) — Full-stack React framework with Server Components, API Routes, file-system routing, built-in optimizations. Mature default since v14.
- **Vercel AI SDK 4.x** — Unified AI provider interface with `useChat`/`useCompletion` hooks, streaming, structured output via Zod. Provider-agnostic.
- **OpenAI GPT-4o / GPT-4o-mini** — Primary LLM provider. Best Spanish support among frontier models. Cost-effective for tutor feedback. Accessed via AI SDK provider, NOT raw SDK.
- **TipTap 2.x** — Rich text editor built on ProseMirror. Extension architecture enables custom `FigureHighlight` marks for inline annotation. Collaboration-ready (Y.js).
- **Supabase** — Managed PostgreSQL + Auth + Storage + Realtime. Row Level Security, TypeScript type generation, free tier for MVP.
- **Drizzle ORM** — Lightweight (~7.4kb), zero-dependency, SQL-like query API. TypeScript-first with `drizzle-kit` for migrations.
- **next-intl 4.x** — i18n for Next.js App Router. Supports Server Components, locale-prefixed routing, ICU message syntax, type-safe keys. 2.8M weekly downloads.
- **shadcn/ui + Tailwind CSS 4.x** — Copy-based component library (no dependency lock-in). Built on Radix UI (accessible by default). Tailwind v4 uses CSS-native `@theme`.

### Expected Features

The feature landscape divides cleanly into table stakes (must-have), differentiators (should-have), and anti-features (explicitly avoid). Missing table stakes makes the product feel incomplete; differentiators justify adoption over competitors like Wordwall or Educaplay; anti-features protect the core pedagogical mission. See [FEATURES.md](FEATURES.md) for full feature matrix, competitor analysis, and dependency graph.

**Must have (table stakes):**
- **Figure catalog with definitions & examples** — Every competitor starts here. Students need a reference. Start with 15-20 essential figures (metáfora, símil, hipérbole, personificación, etc.).
- **Interactive identification exercises** — Quiz-style "which figure is this?" is the bare minimum. Multiple-choice, matching, classification. Adaptive difficulty is table stakes in 2025.
- **Writing practice with guided prompts** — Without writing practice, the tool is just a flashcard app. Prompts must be contextual ("Write a metaphor describing a sunset").
- **Progress tracking (student view)** — Students expect to see mastery levels (struggling → beginning → approaching → proficient).
- **Mobile-responsive web** — Students primarily use phones. CSS media queries + responsive layout. No native app needed initially.
- **Bilingual interface (Spanish/English)** — Interface toggle. Content remains Spanish-primary.

**Should have (competitive differentiators):**
- **AI tutor analysis of student writing** — The CORE differentiator. No existing Spanish-language tool does this. AI reads text, highlights figures, explains *why they work* or *why they feel forced*.
- **Tutor-tone feedback (not scores)** — Removes grading anxiety. Feedback sounds like a supportive teacher: "This metaphor is vivid because X. Consider Y to make it even stronger."
- **"Forzado vs. Efectivo" feedback** — When a figure is awkward, AI explains *why* it feels forced and suggests how to strengthen it.
- **Contextual figure discovery** — AI shows *where* in the text the figure is, *what effect* it creates, and *how* it connects to the student's intent.
- **Real-world text analysis** — Analyze song lyrics, news headlines, social media posts — not just textbook passages.

**Defer (v2+):**
- **Personalized learning path** — Requires usage data from exercises. Build after tracking is in place.
- **Teacher dashboard** — Start student-facing only. Teachers can see student work in v2.
- **Native mobile apps (iOS/Android)** — Responsive web reaches 95%+ of users. Mobile apps double development cost.
- **Exhaustive 80+ figure catalog** — More figures ≠ better learning. Quality over quantity. Expand based on usage data.

### Architecture Approach

The architecture follows a 4-layer pattern: Presentation (Learn / Practice / Analyze modules), API (Next.js API Routes), Business Logic (Analysis Engine, Content Service, Progress Service), and Data & External (Supabase, LLM Provider, Prompt Templates). The Analysis Engine is the core differentiator and deserves its own module with clear boundaries. Key patterns include: (1) Stateless AI Analysis Pipeline — each request is self-contained, horizontally scalable; (2) Multi-Specialist Analysis — parallel targeted prompts per figure family for higher accuracy; (3) Hybrid i18n — static UI strings in JSON via next-intl, educational content in Supabase with locale columns; (4) Progressive Text Highlight Overlay — LLM returns character offsets, UI renders colored highlights with click-to-reveal feedback; and (5) Tutor-Tone Feedback Generation — a second-pass LLM call that reformats analysis into supportive, pedagogical language. See [ARCHITECTURE.md](ARCHITECTURE.md) for full system overview, component responsibilities, project structure, data flows, and scaling considerations.

**Major components:**
1. **Learn Module** — Browse, read, and study rhetorical figures. Server components for content, client components for interactive examples.
2. **Practice Module** — Guided writing exercises with figure-specific prompts, inline hints, progressive difficulty. Rich text editor with constraints.
3. **Analyze Module** — Core differentiator. Client-side editor → API route → Analysis Engine → LLM → structured response → annotated text display with inline highlights.
4. **Analysis Engine** — Construct prompts, call LLM (parallel specialists), parse structured response, map offsets to text spans, generate tutor feedback. Stateless orchestration.
5. **Content Service** — Manage figure catalog with bilingual definitions, examples, teaching notes. Supabase tables with i18n columns. SSG/ISR for read-heavy access.
6. **Progress Service** — Track student activity, exercise history, achievements. Supabase with RLS per role. No grades — progress indicators only.

### Critical Pitfalls

Research identified 10 pitfalls across critical and moderate severity. The top 5 are existential risks that could invalidate the product's value proposition or create legal liability. See [PITFALLS.md](PITFALLS.md) for full descriptions, warning signs, prevention strategies, recovery costs, and phase mapping.

1. **AI Hallucination Presenting False Literary Analysis as Fact** — LLMs generate plausible-sounding but potentially incorrect literary analysis. In Spanish, there's virtually no supervised training data for rhetorical figure detection. The AI may confabulate explanations, misidentify figures, or confuse related concepts (synecdoche vs. metonymy). *Avoid:* Design prompts with explicit uncertainty constraints; cross-reference against curated catalog; add confidence indicators; build validation layer; include "spot the error" exercises.

2. **Spanish NLP and Rhetorical Analysis Gap** — NLP models are trained predominantly on English/news corpora, not Spanish literary texts. Challenges include gendered nouns affecting metaphor mapping, regional vocabulary variations, and lack of large-scale annotated Spanish rhetorical corpora. *Avoid:* Use LLMs rather than fine-tuned NLP models; build regional variation notes into catalog; validate each of 15-20 core figures manually with diverse Spanish literary examples.

3. **Tutor-Turned-Judge Drift** — Despite "AI as tutor, not judge" philosophy, feedback can drift toward evaluative language ("weak," "incorrect," "3/10"). This shifts student motivation from learning to gaming scores, invalidating the core differentiation. *Avoid:* Ban evaluative language in system prompts; build output filter for grading-adjacent terms; design feedback as questions rather than statements; enforce tutor voice via adversarial QA.

4. **Student Data Privacy and Compliance** — Student writing is personally expressive and potentially revealing. COPPA (under-13), FERPA (US educational records), and GDPR (EU/Spain) apply. Schools will refuse adoption without compliance. *Avoid:* Privacy-by-default architecture; minimize data sent to external LLMs; anonymize text before API calls; don't use student data for model training; include parent consent flows; design "minimal data" mode with anonymous usage.

5. **Overjustification Effect from Gamification** — Points, badges, and leaderboards can erode intrinsic motivation for creative writing. When rewards plateau, motivation crashes below baseline. *Avoid:* If gamification is used, align with mastery (completion → next challenge) not points; use progress tracking rather than rewards; design for autonomy, competence, relatedness (Self-Determination Theory); never tie extrinsic rewards to creative output quality.

---

## Implications for Roadmap

Based on combined research, the recommended phase structure follows the dependency chain: content foundation → core AI analysis → practice integration → teacher polish. This ordering ensures the "learn → practice → analyze → feedback" loop is complete end-to-end before any external launch, which research shows is critical for EdTech adoption (AIR 2013: "rolling out technology before software is fully functional" is a top failure mode).

### Phase 1: Foundation
**Rationale:** Content is the foundation — without figure catalog and definitions, nothing else matters. i18n is cheapest to set up early before pages multiply. Auth and database schema must be in place before user data flows.
**Delivers:** Next.js + next-intl project setup, Supabase schema (figures, exercises, users, progress), auth flows (student/teacher roles), basic figure catalog with 15-20 essential figures, responsive layout shell, mobile-first design system.
**Addresses (from FEATURES.md):** Figure catalog, interactive identification exercises, clear student-friendly Spanish explanations, mobile-responsive web, bilingual interface foundation.
**Avoids (from PITFALLS.md):** Incomplete cycle before launch, mobile responsive as afterthought, privacy non-compliance (design privacy in from day 1), regional Spanish bias (diversify examples from day 1).

### Phase 2: Core AI Differentiator
**Rationale:** This is the product's reason to exist. The AI tutor analysis must ship as early as possible to validate the "tutor not grader" thesis. Building it on top of the Phase 1 foundation ensures the content catalog feeds into the analysis prompts.
**Delivers:** TipTap WritingEditor with custom `FigureHighlight` marks, Analysis Engine with single-figure detection (start with 3-5 core figures), tutor-tone feedback generation, HighlightLayer overlay, FeedbackPanel, `/api/analyze` endpoint, structured output validation, prompt templates as versioned Markdown files.
**Uses (from STACK.md):** TipTap 2.x, Vercel AI SDK, OpenAI GPT-4o-mini, Zod for structured output, shadcn/ui components.
**Implements (from ARCHITECTURE.md):** Analysis Engine (stateless pipeline), Tutor-Tone Feedback Generation pattern, Progressive Text Highlight Overlay pattern.
**Avoids (from PITFALLS.md):** AI hallucination (validation layer, confidence indicators), tutor-turned-judge drift (system prompt constraints, output filter), Spanish NLP gap (manual validation of 3-5 core figures with diverse examples).

### Phase 3: Practice & Integration
**Rationale:** Practice builds on the analysis engine. Once single-figure detection works, expand to multi-figure via the Multi-Specialist pattern, then wrap exercises around it. Progress tracking closes the loop.
**Delivers:** Exercise system with figure-specific prompts, Practice module routes, multi-figure analysis (parallel specialists), progress tracking (student view), mastery levels, personalized learning path (basic — recommend next figure based on proximity), writing iteration history.
**Implements (from ARCHITECTURE.md):** Multi-Specialist Analysis pattern, Practice Module, Progress Service.
**Avoids (from PITFALLS.md):** Overjustification effect (mastery-based progress, no points/leaderboards), content quality degradation (quality gates for each new figure), incomplete cycle (full loop validated before adding features).

### Phase 4: Teacher & Polish
**Rationale:** Teacher features depend on student data flowing through the system. Only build after student experience is validated. Performance tuning and prompt optimization happen here.
**Delivers:** Teacher dashboard with class overview, individual student progress, identify struggling students, Supabase Realtime for live classroom view, prompt optimization based on usage data, performance tuning (caching, Edge Functions), bilingual content expansion (English toggle).
**Implements (from ARCHITECTURE.md):** Teacher dashboard, Supabase Realtime subscriptions, scaling optimizations (ISR caching, response caching).
**Avoids (from PITFALLS.md):** Teacher vs. student dual-mode conflict (distinct modes, student-first), content quality at scale (expert review gates).

### Phase Ordering Rationale

- **Content before analysis:** The Analysis Engine's prompts depend on the figure catalog definitions and examples. Without curated content, AI prompts have no grounding.
- **Single-figure before multi-figure:** The Multi-Specialist pattern is powerful but adds orchestration complexity. Validate the core pipeline with one figure first.
- **Student before teacher:** Teachers' #1 requirement is that students actually use the tool. Building teacher dashboards before student experience is validated is a common EdTech anti-pattern.
- **Privacy from day 1:** COPPA/FERPA/GDPR compliance must be designed into the data architecture, not bolted on later. The "minimal data" mode (anonymous analysis without accounts) should work in Phase 1.
- **Mobile-first throughout:** Secondary students primarily use phones. Each phase must validate mobile usability, not just desktop.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 2 (Core AI Differentiator):** Complex integration. AI prompt engineering for Spanish rhetorical figures is a niche domain with sparse documentation. The Multi-Specialist pattern requires testing per figure family. Needs `/gsd-research-phase` to validate prompt templates against real Spanish literary texts.
- **Phase 3 (Practice & Integration):** Adaptive learning algorithms for personalized paths require research into mastery-based sequencing. The "forzado vs. efectivo" feedback mechanism needs validation with student writing samples.

Phases with standard patterns (skip research-phase):
- **Phase 1 (Foundation):** Next.js 15, next-intl, Supabase, and Drizzle ORM are well-documented with established patterns. shadcn/ui components are copy-paste ready. No research needed beyond standard docs.
- **Phase 4 (Teacher & Polish):** Teacher dashboards and real-time subscriptions are standard Supabase patterns. Performance tuning follows well-known Next.js/Vercel optimization guides.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Technologies are mature, well-documented, and widely adopted. Vercel AI SDK, next-intl, Supabase, and Drizzle have strong communities. Versions verified via Context7 and official docs. |
| Features | HIGH | Competitor analysis is clear. Table stakes and differentiators are well-defined based on direct examination of NoRedInk, Quill.org, Wordwall, Artie, and academic research. Anti-features align with pedagogical best practices. |
| Architecture | MEDIUM-HIGH | Standard patterns (stateless API, hybrid i18n, layered architecture) are well-established. AI integration specifics (structured output, prompt engineering, highlight overlay) are documented in reference projects (Writeo, EvaluMe, EssAI) but require validation with Spanish text. |
| Pitfalls | MEDIUM-HIGH | EdTech pitfalls are extensively documented (AIR, EdSurge, Edutopia). Spanish NLP gaps verified in peer-reviewed literature (Sanchez-Bayona, Kühn & Mitrović, ACL). AI hallucination risks are extensively documented. Some mitigation strategies (validation layer, tutor-tone filter) need implementation validation. |

**Overall confidence:** MEDIUM-HIGH

The core uncertainty is not *whether* the stack works, but *how well* the AI analysis performs on Spanish rhetorical figures in practice. The LLM-based approach is the right strategy given the lack of Spanish training data, but prompt engineering accuracy and tutor-tone consistency require iterative testing with real student texts. Privacy compliance is a known requirement with clear mitigation paths, but needs legal review for specific jurisdictional details.

### Gaps to Address

- **AI accuracy on Spanish rhetorical figures:** Needs validation with a curated test set of 50+ Spanish literary passages across diverse regions. Target: ≥80% accuracy on validated test set before launch. *Handle during Phase 2 planning with adversarial testing and red-team exercises.*
- **Regional Spanish variation coverage:** The figure catalog must include examples from ≥3 Spanish-speaking regions (e.g., Mexico, Argentina, Spain). Needs engagement with regional literature experts. *Handle during Phase 1 content creation; flag each figure for regional diversity.*
- **Tutor-tone consistency:** Requires ongoing prompt tuning and output auditing. The boundary between "supportive" and "patronizing" or "evaluative" is subtle. *Handle during Phase 2 with educator review of 100+ sample outputs and adversarial testing.*
- **COPPA/FERPA/GDPR legal review:** The privacy-by-default architecture is correct, but specific consent flows, data processing addendums, and breach notification procedures need legal counsel. *Handle during Phase 1 before any user data collection.*
- **Content creation process:** Each of the 15-20 essential figures needs: definition, 3+ literary examples from diverse traditions, 2+ student-facing explanations at different levels, practice prompts. This is significant editorial work. *Handle during Phase 1 by defining a content creation workflow with quality gates.*
- **LLM cost modeling:** Each analysis is 1-N LLM calls. At classroom scale (30 students analyzing simultaneously), costs and rate limits become concerns. *Handle during Phase 2 with cost estimation and rate-limiting design.*

---

## Sources

### Primary (HIGH confidence)
- **Next.js 15 / React 19 docs** — App Router patterns, Server Components, API Routes, streaming
- **Vercel AI SDK docs** — `streamText`, `useChat`, structured output with Zod, provider architecture
- **OpenAI API docs** — GPT-4o streaming, `response_format` with JSON/Zod schemas, Spanish language capabilities
- **TipTap docs** — React composable API, Mark extensions, inline annotation, Y.js collaboration
- **next-intl docs** — App Router i18n, Server Component support, ICU message syntax, type-safe keys
- **Supabase docs** — TypeScript client, Auth helpers, SSR integration, RLS patterns, Realtime
- **Drizzle ORM docs** — PostgreSQL setup, relational queries, `drizzle-kit` migrations
- **Writeo architecture** (github.com/tre-systems/writeo) — Next.js + serverless + LLM for essay scoring; stateless orchestration, parallel specialist agents
- **Find your Figure** (COLING 2025, aclanthology.org) — RAG-enhanced ontology for rhetorical figure annotation; peer-reviewed
- **RhetAnn** (arXiv:2407.11827) — GPT-assisted annotation of rhetorical features; peer-reviewed

### Secondary (MEDIUM confidence)
- **EvaluMe** (medium.com/@diondcm/evalume) — Multi-agent parallel analysis architecture; blog post with implementation details
- **EssAI** (Google Cloud Platform, github.com/GoogleCloudPlatform/essai) — Queue-based processing for classroom scalability
- **LingFrame** (github.com/organvm-i-theoria/linguistic-atomization-framework) — Computational rhetoric platform; reference for analysis modules
- **NoRedInk, Quill.org, Wordwall, Educaplay** — Competitor feature analysis via direct product examination
- **AIR (2013)** — *Six Common Pitfalls of Ed-Tech Programs*; validated EdTech failure modes
- **Kühn & Mitrović (2024)** — *Ten Challenges of Computational Detection of Rhetorical Figures*; ACL FigLang Workshop
- **Sanchez-Bayona (2021)** — *MegaLite: A New Spanish Literature Corpus for NLP Tasks*; Spanish NLP gaps
- **Hanus & Fox (2015)** — Gamification decreases intrinsic motivation in educational contexts
- **6b Education (2024)** — *Building Privacy-Compliant Systems: EdTech Development Under GDPR, COPPA, and FERPA*

### Tertiary (LOW confidence — needs validation)
- **UEx Study on teaching rhetoric via sports headlines** — Validated real-world text approach for ESO, but single study with 4,025 headlines; needs broader validation
- **Faculty Focus (2025)** — *Mitigating Hallucinations in LLMs for Community College Classrooms* — practical but anecdotal
- **University of Michigan (2026)** — *FeedbackWriter study* — AI-mediated feedback with 88% TA agreement; preprint, not yet peer-reviewed
- **ACL (2022) Cross-Cultural NLP Challenges** — Spanish dialectal variation in PLMs; general finding, not specific to rhetorical figures

---

*Research completed: 2026-05-04*
*Ready for roadmap: yes*
*Next step: Requirements definition (use `/gsd-new-milestone` or `/gsd-spec-phase`)*
