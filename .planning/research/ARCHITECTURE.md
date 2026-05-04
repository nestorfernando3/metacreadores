# Architecture Research

**Domain:** Educational web app with AI text analysis for rhetorical figures
**Researched:** 2026-05-04
**Confidence:** MEDIUM-HIGH (patterns are well-established; AI integration specifics are evolving but well-documented in reference projects)

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION LAYER                            │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────────────┐  │
│  │  Learn Module │  │ Practice Module│  │   Analyze Module         │  │
│  │  (Catalog +   │  │ (Writing Exer- │  │  (Text Input + AI Ana-  │  │
│  │   Lessons)    │  │  cises)        │  │   lysis + Highlights)   │  │
│  └──────┬───────┘  └───────┬───────┘  └──────────┬───────────────┘  │
│         │                  │                      │                   │
│  ┌──────┴──────────────────┴──────────────────────┴───────────────┐ │
│  │              SHARED UI COMPONENTS (Design System)                │ │
│  │  FigureCard · TextHighlight · FeedbackPanel · ProgressTracker   │ │
│  │  LanguageSwitcher · TeacherStudentToggle · WritingEditor          │ │
│  └──────────────────────────────────────────────────────────────────┘ │
├──────────────────────────────────────────────────────────────────────┤
│                        API LAYER (Next.js API Routes)                │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────────────┐  │
│  │  Content API  │  │ Analysis API  │  │   Auth & User API        │  │
│  │  (Figures,    │  │ (Text process-│  │  (Profiles, progress,    │  │
│  │   Lessons)    │  │  ing)         │  │   teacher links)         │  │
│  └──────┬───────┘  └───────┬───────┘  └──────────┬───────────────┘  │
├─────────┴──────────────────┴──────────────────────┴──────────────────┤
│                     BUSINESS LOGIC LAYER                              │
│  ┌──────────────────┐  ┌───────────────────┐  ┌──────────────────┐  │
│  │  Content Service  │  │  Analysis Engine   │  │  Progress Service│  │
│  │  (CRUD figures,   │  │  (Prompt builder,  │  │  (Track history,  │  │
│  │   lessons, i18n) │  │   LLM orchestrate, │  │   achievements)  │  │
│  │                  │  │   response parse)  │  │                  │  │
│  └────────┬─────────┘  └───────┬───────────┘  └────────┬─────────┘  │
├───────────┴─────────────────────┴────────────────────────┴────────────┤
│                     DATA & EXTERNAL LAYER                            │
│  ┌──────────────┐  ┌───────────────┐  ┌──────────────────────────┐  │
│  │   Supabase    │  │  LLM Provider │  │   Figure Prompt          │  │
│  │   (Postgres,  │  │  (API calls   │  │   Templates               │  │
│  │    Auth, RLS, │  │   to AI model)│  │   (Versioned prompts     │  │
│  │    Realtime)  │  │               │  │    per figure type)       │  │
│  └──────────────┘  └───────────────┘  └──────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Learn Module** | Browse, read, and study rhetorical figures with definitions, examples, and explanations in Spanish | Next.js pages with server components for content, client components for interactive examples |
| **Practice Module** | Guided writing exercises where students practice specific figures | Rich text editor with figure-specific prompts, inline hints, and progressive difficulty |
| **Analyze Module** | Core differentiator — submit text, get AI-powered analysis highlighting figures with tutor-style feedback | Client-side editor → API route → Analysis Engine → LLM → structured response → annotated text display |
| **Analysis Engine** | Construct prompts, call LLM, parse structured response, identify figure locations, generate tutor feedback | Server-side service layer. Stateless orchestration (inspired by EvaluMe's architecture). Parallel specialist agents for different figure types |
| **Content Service** | Manage the catalog of 15-20 rhetorical figures with bilingual definitions, examples, and teaching notes | Supabase tables with i18n columns. Versioned content. SSG/ISR for read-heavy access |
| **Progress Service** | Track student progress, exercise history, achievements, teacher-student relationships | Supabase tables with RLS policies per role (student vs teacher). No grades — progress indicators only |
| **Auth & User API** | Authentication, role management (student/teacher), profile management | Supabase Auth with custom claims for roles. RLS policies enforce data isolation |
| **i18n Layer** | Bilingual Spanish/English interface and content delivery | next-intl with `[locale]` routing. Static UI strings in JSON message files. Database content in locale-specific columns |
| **Shared UI Components** | Reusable design system components used across all modules | React components: TextHighlight, FeedbackPanel, FigureCard, ProgressTracker, LanguageSwitcher, TeacherStudentToggle, WritingEditor |
| **LLM Provider** | External AI model that processes text and identifies rhetorical figures | OpenAI GPT-4o / Anthropic Claude API. Called via Analysis Engine with structured prompts |
| **Prompt Templates** | Versioned, tested prompts per figure type that instruct the LLM how to detect and explain each figure | Database-stored or file-based templates with prompt versioning. Tested against golden examples |

## Recommended Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── [locale]/                 # i18n route segment (es, en)
│   │   ├── (auth)/               # Auth pages (login, signup)
│   │   ├── aprender/             # Learn module routes
│   │   │   ├── page.tsx          # Figure catalog
│   │   │   └── [slug]/           # Individual figure page
│   │   ├── practicar/            # Practice module routes
│   │   │   ├── page.tsx          # Exercise selection
│   │   │   └── [exerciseId]/     # Specific exercise
│   │   ├── analizar/             # Analyze module routes
│   │   │   └── page.tsx          # Text analysis interface
│   │   ├── progreso/             # Progress dashboard
│   │   ├── docente/              # Teacher dashboard
│   │   └── layout.tsx            # Locale layout (fonts, i18n provider)
│   ├── api/                      # API routes
│   │   ├── analyze/              # Text analysis endpoint
│   │   ├── figures/              # Figure CRUD
│   │   ├── exercises/           # Exercise management
│   │   └── progress/            # Progress tracking
│   └── layout.tsx                # Root layout
├── components/                   # Shared UI components
│   ├── figures/                  # Figure display components
│   │   ├── FigureCard.tsx        # Card with figure definition
│   │   ├── FigureCatalog.tsx     # Grid/list of figures
│   │   └── FigureExample.tsx     # Interactive example
│   ├── editor/                   # Writing editor components
│   │   ├── WritingEditor.tsx     # Rich text editor wrapper
│   │   ├── HighlightLayer.tsx    # Text highlight overlay
│   │   └── FeedbackPanel.tsx     # AI tutor feedback display
│   ├── progress/                 # Progress tracking components
│   │   ├── ProgressTracker.tsx   # Visual progress indicator
│   │   └── AchievementBadge.tsx  # Achievement display
│   ├── layout/                   # Layout components
│   │   ├── LanguageSwitcher.tsx   # ES/EN toggle
│   │   └── RoleToggle.tsx        # Student/teacher view toggle
│   └── ui/                       # Base design system
│       ├── Button.tsx
│       ├── Card.tsx
│       └── ...
├── lib/                          # Business logic (shared between client/server)
│   ├── analysis/                 # Analysis Engine
│   │   ├── engine.ts             # Main orchestration
│   │   ├── prompt-builder.ts     # Construct LLM prompts
│   │   ├── response-parser.ts   # Parse structured LLM output
│   │   ├── highlighter.ts       # Map figure locations to text spans
│   │   └── specialists/          # Per-figure analysis modules
│   │       ├── metaphor.ts
│   │       ├── hyperbole.ts
│   │       └── ...
│   ├── content/                  # Content management
│   │   ├── figures.ts            # Figure data access
│   │   └── exercises.ts          # Exercise data access
│   ├── i18n/                     # Internationalization
│   │   ├── config.ts             # Locale config (es default, en secondary)
│   │   ├── routing.ts            # next-intl routing setup
│   │   └── navigation.ts         # Locale-aware navigation
│   └── progress/                 # Progress tracking logic
│       ├── tracker.ts            # Track student activity
│       └── achievements.ts       # Achievement rules
├── messages/                     # i18n translation files
│   ├── es.json                   # Spanish (primary)
│   └── en.json                   # English
├── prompts/                      # Prompt templates for AI analysis
│   ├── analyze-text.md          # Main analysis prompt
│   ├── figures/                  # Per-figure prompt supplements
│   │   ├── metaphor.md
│   │   ├── simile.md
│   │   └── ...
│   └── tutor-feedback.md         # Tutor tone formatting prompt
├── supabase/                     # Database and auth
│   ├── migrations/               # Schema migrations
│   ├── seed/                     # Seed data (figures, exercises)
│   └── types/                    # Generated Supabase types
└── types/                        # Shared TypeScript types
    ├── figure.ts                 # Figure-related types
    ├── analysis.ts               # Analysis response types
    ├── exercise.ts                # Exercise types
    └── user.ts                   # User profile types
```

### Structure Rationale

- **`app/[locale]/`**: next-intl convention. All pages nested under locale segment ensures bilingual URLs (`/es/aprender`, `/en/learn`) and server-side locale handling. Spanish (`es`) is the default locale with no URL prefix.
- **`lib/analysis/`**: Separated business logic for the AI analysis pipeline. This is the core differentiator and deserves its own module with clear boundaries. `specialists/` sub-directory follows the multi-agent pattern proven in EvaluMe and Writeo — each figure type gets its own prompt engineering.
- **`prompts/`**: Prompt templates stored as Markdown files rather than inline strings. This enables version control, iterative testing, and non-developer editing (teachers can review prompts).
- **`messages/`**: UI string translations in JSON. Database content (figure definitions, examples) stored in Supabase with locale columns — hybrid i18n approach where UI strings are static and educational content lives in the database.
- **`components/editor/`**: The text editor and highlight layer are core UX components isolated together. The highlight overlay (`HighlightLayer.tsx`) maps LLM-identified figure spans to visual highlights on the text — this is the trickiest UI interaction in the product.
- **`supabase/`**: Co-located database schema, migrations, and seed data alongside application code. Type generation happens in `supabase/types/`.

## Architectural Patterns

### Pattern 1: Stateless AI Analysis Pipeline

**What:** Each text analysis request is self-contained. The Analysis Engine constructs a prompt from the input text + figure catalog + specialist instructions, calls the LLM, parses the structured response, and returns results. No analysis state is persisted between requests except in the progress tracker.

**When to use:** Always. This is the default pattern for all analysis requests.

**Trade-offs:**
- ✅ Horizontally scalable (no server state)
- ✅ Simple to reason about and debug
- ✅ Cost-effective (pay per request, no idle compute)
- ❌ Cannot build on previous analysis context without re-sending
- ❌ Each full analysis costs a full LLM call

**Example:**
```typescript
// lib/analysis/engine.ts
export async function analyzeText(input: AnalysisInput): Promise<AnalysisResult> {
  // 1. Build prompt from text + figure catalog + specialist instructions
  const prompt = buildAnalysisPrompt(input.text, input.targetFigures);

  // 2. Call LLM with structured output request
  const response = await llmProvider.complete({
    model: 'gpt-4o',
    messages: prompt.messages,
    response_format: { type: 'json_object' },
    temperature: 0.3, // Low for consistent analysis
  });

  // 3. Parse and validate structured response
  const parsed = parseAnalysisResponse(response.content);

  // 4. Map figure locations to text spans for highlighting
  const highlights = mapHighlights(input.text, parsed.figures);

  // 5. Generate tutor-style feedback
  const feedback = buildTutorFeedback(parsed, input.text);

  return { highlights, feedback, figures: parsed.figures };
}
```

### Pattern 2: Multi-Specialist Analysis (Parallel Agents)

**What:** Instead of one monolithic LLM prompt asking "find all rhetorical figures," send parallel requests for specific figure families. Each specialist prompt is optimized for its figure type, improving detection accuracy and reducing hallucination.

**When to use:** When analysis targets are specific figures rather than "find everything." Particularly effective when the figure catalog is known (15-20 figures) and each has distinct detection patterns.

**Trade-offs:**
- ✅ Higher accuracy per figure (specialist > generalist)
- ✅ Easier prompt iteration and testing per figure
- ✅ Can parallelize requests for speed (inspired by EvaluMe's dual-agent pattern)
- ❌ More LLM calls per analysis = higher cost
- ❌ Need orchestration layer to merge results
- ❌ Response time bounded by slowest specialist

**Example:**
```typescript
// lib/analysis/engine.ts — multi-specialist orchestration
export async function analyzeWithSpecialists(
  text: string,
  targetFigures: FigureId[]
): Promise<AnalysisResult> {
  // Group figures by family for efficient batching
  const families = groupByFamily(targetFigures);

  // Run specialist analyses in parallel
  const results = await Promise.all(
    families.map(family =>
      analyzeFamily(text, family)
    )
  );

  // Merge results — deduplicate overlapping detections
  return mergeSpecialistResults(results);
}

// Each family specialist uses a focused prompt
async function analyzeFamily(text: string, family: FigureFamily): Promise<FamilyResult> {
  const prompt = buildSpecialistPrompt(text, family);
  const response = await llmProvider.complete(prompt);
  return parseSpecialistResponse(response, family);
}
```

### Pattern 3: Hybrid i18n (Static UI + Dynamic Content)

**What:** UI strings (buttons, labels, navigation) stored in JSON locale files and resolved at build/request time via next-intl. Educational content (figure definitions, examples, teaching notes) stored in Supabase with locale-specific columns and fetched server-side.

**When to use:** Always for this project. The content is educational and changes less frequently than UI, but needs editorial control (teachers should be able to modify examples).

**Trade-offs:**
- ✅ Fast UI rendering (no database call for interface text)
- ✅ Content manageable via database (teachers can update examples)
- ✅ SEO-friendly with SSG for figure pages
- ✅ Consistent with next-intl best practices
- ❌ Two content sources require coordination (adding a new UI string also needs translation files updated)
- ❌ Database content needs locale fallback (es → en for missing translations)

**Example:**
```typescript
// app/[locale]/aprender/[slug]/page.tsx
export default async function FigurePage({ params }: { params: { locale: string; slug: string } }) {
  // Server component: UI strings from next-intl (zero client bundle)
  const t = await getTranslations('figures');

  // Educational content from database (locale-aware)
  const figure = await getFigureBySlug(params.slug, params.locale);

  return (
    <FigureCard
      name={figure.name[params.locale]}     // DB content
      definition={figure.definition[params.locale]} // DB content
      learnMoreLabel={t('learnMore')}        // UI string
      practiceLabel={t('practice')}          // UI string
    />
  );
}
```

### Pattern 4: Progressive Text Highlight Overlay

**What:** The analysis results include character offsets for each detected figure. The UI renders the student's text as a base layer and overlays colored highlights at those exact offsets. Clicking a highlight reveals the tutor feedback for that figure.

**When to use:** In the Analyze module — this is the core visual interaction of the product.

**Trade-offs:**
- ✅ Direct visual feedback (student sees exactly which text was identified)
- ✅ Interactive — click any highlight for explanation
- ✅ Maps naturally to the LLM response format (start offset, end offset, figure type)
- ❌ Character offsets can misalign if text is preprocessed differently (normalization critical)
- ❌ Requires careful handling of overlapping highlights (e.g., metaphor within hyperbole)
- ❌ Mobile touch targets for short highlights need minimum size enforcement

**Example:**
```typescript
// types/analysis.ts
interface TextHighlight {
  figureId: FigureId;
  figureName: string;
  startOffset: number;
  endOffset: number;
  confidence: number;    // 0-1, for display ordering
  feedback: string;      // Tutor feedback for this specific detection
  feedbackType: 'correct' | 'forced' | 'missed' | 'suggestion';
}

// The LLM must return structured offsets, not just "the metaphor is in line 3"
// This means the prompt must instruct offset counting and the parser must validate
```

### Pattern 5: Tutor-Tone Feedback Generation

**What:** The analysis engine doesn't just identify figures — it generates explanations in a supportive, pedagogical tone (not a grading tone). This is a second-pass LLM call that reformats analysis results into readable feedback.

**When to use:** Always. This is the core product differentiator per PROJECT.md.

**Trade-offs:**
- ✅ Consistent tutor voice across all interactions
- ✅ Can be A/B tested by varying the feedback prompt
- ✅ Separates detection logic from presentation logic
- ❌ Additional LLM call per analysis (cost consideration)
- ❌ Tone can vary between LLM providers/versions

## Data Flow

### Request Flow: Text Analysis

```
Student writes text
    ↓
WritingEditor (client)
    ↓ [submit]
API Route: /api/analyze (server)
    ↓
Analysis Engine
    ├── Prompt Builder ──── Input text + figure catalog + specialist prompts
    ↓
    ├── LLM Provider ───── Parallel specialist calls (metaphor, hyperbole, etc.)
    ↓
    ├── Response Parser ── Validate structure, extract offsets & figure IDs
    ↓
    ├── Tutor Feedback ──── Second pass: convert analysis → tutor explanations
    ↓
    └── Highlight Mapper ── Map offsets to text spans for UI rendering
    ↓
Progress Tracker (store analysis history, no grades)
    ↓
Client receives: { highlights, feedback, figures }
    ↓
HighlightLayer renders annotated text
    ↓
Student clicks highlight → FeedbackPanel shows tutor explanation
```

### Request Flow: Content Browsing

```
Student navigates to /es/aprender/metafora
    ↓
Server Component (no client JS needed for read)
    ↓
getFigureBySlug('metafora', 'es') → Supabase query
    ↓
Render FigurePage with localized content
    ↓
Interactive examples loaded as client components
```

### State Management

```
┌─────────────────────────────────────────────────────┐
│                   Supabase (Source of Truth)          │
│  ┌────────────┐  ┌────────────┐  ┌────────────────┐  │
│  │  figures    │  │  exercises  │  │  user_progress │  │
│  │  (content)  │  │  (content)  │  │  (per user)    │  │
│  └─────┬──────┘  └─────┬──────┘  └───────┬────────┘  │
└────────┼───────────────┼─────────────────┼──────────┘
         │               │                 │
    Server Components   Server Comp.    Client State
    (SSG/ISR)          (SSG/ISR)      (React Query /
                                      SWR for mutations)
```

### Key Data Flows

1. **Figure Catalog Loading:** Server components fetch figure data at request time (ISR) or build time (SSG). Spanish content is primary; English serves as fallback. No client-side loading state for the catalog.

2. **Text Analysis:** Client-side form submission → API route → Analysis Engine → LLM → structured response. Response streamed back to client. Progress record created asynchronously (doesn't block response).

3. **Practice Exercise Flow:** Server component loads exercise definition → Client component renders writing editor with constraints → Submission follows the same analysis pipeline but scoped to the exercise's target figure.

4. **Teacher Dashboard:** Server component queries Supabase with RLS (teacher sees only their students' data). Real-time progress via Supabase Realtime subscriptions. No grades — only progress indicators.

5. **Language Switching:** next-intl middleware detects/redirects locale. Server components load appropriate translations. Database content fetched with locale parameter. Fallback chain: requested locale → Spanish (default) → English.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-1k users | Monolithic Next.js on Vercel. Supabase free tier. LLM API calls. Single region. Everything works as-designed. |
| 1k-10k users | Add ISR caching for figure pages. Implement response caching for repeated text submissions. Consider Edge Functions for the analysis API route. Monitor LLM API costs closely. |
| 10k-100k users | Consider caching layer (Redis/Upstash) for figure catalog. Rate limit analysis requests per user. Break out Analysis Engine into separate service (Vercel Background Function or container) if LLM call latency dominates. Add Supabase connection pooling. |
| 100k+ users | Separate the Analysis Engine into its own deployable service. Consider fine-tuned/deployed LLM instead of API calls (cost curves flip). Implement queue-based processing for analysis (in ⇢ Worker ⇢ out). Consider read replicas for Supabase. |

### Scaling Priorities

1. **First bottleneck: LLM API costs and latency.** Each analysis is 1-N LLM calls. At volume, this dominates both cost and response time. Mitigation: cache common analysis patterns, implement smart deduplication, use smaller/faster models for well-understood figures.

2. **Second bottleneck: Concurrent analysis requests.** LLM API rate limits can be hit during classroom use (30 students analyzing simultaneously). Mitigation: request queuing with progress feedback, staggered processing, and premium tier for teachers.

## Anti-Patterns

### Anti-Pattern 1: Grading-Aligned AI Output

**What people do:** Ask the LLM to grade or score student writing (e.g., "Rate this metaphor 1-10").
**Why it's wrong:** PROJECT.md explicitly states "IA es tutor, no juez" (AI is a tutor, not a judge). Scoring creates anxiety and contradicts the pedagogical model. Students will optimize for scores rather than understanding.
**Do this instead:** Design prompts to produce qualitative, explanatory feedback. "This metaphor compares X to Y, which works because... To make it even stronger, consider..." Structure the output schema to require explanation fields, not score fields.

### Anti-Pattern 2: Monolithic LLM Prompt ("Find All Figures")

**What people do:** Send one prompt asking the LLM to identify every type of rhetorical figure at once.
**Why it's wrong:** Generalist prompts produce poor detection on complex figures. The LLM tends to find what it's asked to find (confirmation bias) and misses subtle instances. Context windows get consumed by lengthy figure definitions.
**Do this instead:** Use the multi-specialist pattern. Group related figures (tropes: metaphor, metonymy, synecdoche; figures of repetition: anaphora, epistrophe) and send targeted prompts per group. Merge results with deduplication.

### Anti-Pattern 3: Client-Side LLM Calls

**What people do:** Call the LLM API directly from the browser.
**Why it's wrong:** Exposes API keys. No rate limiting. No cost control. No request queuing. No caching opportunity. CORS issues.
**Do this instead:** Route all LLM calls through server-side API routes. The Analysis Engine lives entirely on the server. Use Supabase Edge Functions or Next.js API routes.

### Anti-Pattern 4: Storing Raw LLM Output Without Structure

**What people do:** Store the LLM's natural language response as-is in the database.
**Why it's wrong:** Unstructured text can't be queried, compared, or aggregated. You lose the ability to show "you used metaphors 3 times this week" or track figure usage over time.
**Do this instead:** Enforce structured output format (JSON schema) from the LLM. Parse and validate the response before storing. Store normalized data: `{ figureId, name, startOffset, endOffset, feedback, confidence }` not `"The student used a metaphor comparing time to a river..."`.

### Anti-Pattern 5: Translating Educational Content with Machine Translation

**What people do:** Use automatic translation for all Spanish → English content.
**Why it's wrong:** Rhetorical figures are culture-specific. A metaphor in Spanish may not work in English. Literary examples lose their poetic quality. Machine translation of "metáfora" → "metaphor" is fine for labels, but example texts and explanations need human quality.
**Do this instead:** Use bilingual content model — store both Spanish and English versions of definitions, examples, and explanations. Spanish is authored first; English translations are reviewed. Fall back to Spanish for missing English if necessary, but flag it.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **LLM Provider (OpenAI/Anthropic)** | Server-side API calls via Analysis Engine. JSON mode for structured output. | Start with one provider (GPT-4o for quality, or Claude for Spanish nuance). Abstract behind an interface to allow provider switching. Cost: ~$0.01-0.05 per full analysis. |
| **Supabase Auth** | Client SDK for session management, server-side admin for role assignment. | Use custom claims for student/teacher roles. RLS policies enforce data access. |
| **Supabase Realtime** | WebSocket subscriptions for teacher dashboard live updates. | Only for teacher view — students don't need real-time updates from other students. |
| **Vercel (Hosting)** | Git-push deployment for Next.js app. |Edge Functions for analysis API if needed. ISR for figure catalog pages. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Client ↔ API Routes** | REST (fetch + JSON) | Standard Next.js API routes. Analysis uses POST, content uses GET with ISR. |
| **API Routes ↔ Analysis Engine** | Direct function calls (same process) | Not microservices. The Analysis Engine is a server-side module called directly. |
| **Analysis Engine ↔ LLM Provider** | HTTPS API calls | Abstracted behind a provider interface. Retry logic, rate limiting, and fallback needed. |
| **API Routes ↔ Supabase** | Server-side Supabase client | RLS policies enforce security. Server-side client uses service role key for admin operations (teacher dashboard). |
| **Client ↔ Supabase** | Supabase JS client | Direct client access for auth state and real-time subscriptions only. Data access through API routes. |

## Rhetorical Figure Detection: Technical Approach

Based on research into existing systems (Find your Figure, RhetAnn, LingFrame), the recommended approach for detecting rhetorical figures in Spanish text is:

### LLM-Based Detection with Structured Prompts

Unlike traditional NLP approaches (rule-based systems, fine-tuned classifiers), which require large annotated datasets that don't exist for Spanish rhetorical figures, the LLM-based approach:

1. **Requires no training data** — The LLM already understands rhetorical figures in Spanish
2. **Handles the full diversity of figures** — From the common (metáfora, hipérbole) to the obscure (anáfora, asíndeton)
3. **Provides explanations** — Not just detection labels, but tutor-quality explanations of why a figure works
4. **Adapts to student level** — Prompts can be tuned for different reading levels

The key challenge is **prompt engineering** for reliable structured output. Each figure type needs:
- A clear definition in Spanish
- Characteristic patterns to look for
- Common confusion cases (e.g., metáfora vs. símil vs. personificación)
- Output format specification (JSON schema with offsets)

### Reference Architectures Studied

| Project | Architecture | Key Takeaway |
|----------|-------------|--------------|
| **Writeo** (essay scoring) | Next.js 15 + Cloudflare Workers (Hono) + Modal for ML + LLM for feedback | Stateless orchestration, parallel specialist agents, operational modes (Turbo/Cheap) for cost control |
| **EssAI** (Google) | Streamlit frontend + Python backend + PubSub queue + Cloud Run + Gemini | Queue-based processing for classroom scalability, separate frontend/backend, AI as assistant not judge |
| **EvaluMe** | React SPA + FastAPI Python + async TaskGroup for parallel agents + stateless | Multi-specialist pattern (linguistic + argumentative agents running in parallel), privacy-first (no data retention) |
| **Find your Figure** | Flask + SQLite + RAG-enhanced ontology | RAG integration reduces hallucination, ontology provides structured domain knowledge, educational focus |
| **RhetAnn** | Web annotation tool + GPT-assisted labeling | Human-in-the-loop annotation, GPT-3.5 fine-tuned on small expert-labeled dataset achieves GPT-4 quality at 1/10 cost |

## Build Order Implications

Based on the architecture, the recommended build order for phased implementation:

1. **Phase 1 — Foundation:** Next.js + next-intl setup, Supabase schema, Auth, basic figure catalog (Learn module). *Rationale: Content is the foundation, and i18n is cheapest to set up early.*

2. **Phase 2 — Writing & Analysis:** WritingEditor component, Analysis Engine (basic single-figure detection), HighlightLayer, FeedbackPanel (Analyze module). *Rationale: This is the core differentiator. Build the simplest version first — detect one figure at a time with the specialist pattern.*

3. **Phase 3 — Practice & Integration:** Exercise system, Practice module, progress tracking, multi-figure analysis. *Rationale: Practice builds on the analysis engine. Once single-figure detection works, expand to multi-figure and exercises.*

4. **Phase 4 — Teacher & Polish:** Teacher dashboard, progress visualization, Supabase Realtime for live classroom view, prompt optimization, performance tuning. *Rationale: Teacher features depend on having student data flowing through the system.*

## Sources

- Writeo architecture: https://github.com/tre-systems/writeo — Next.js + serverless + LLM for essay scoring (HIGH confidence, open-source reference architecture)
- EssAI (Google Cloud Platform): https://github.com/GoogleCloudPlatform/essai — Python + Gemini for essay grading (HIGH confidence, Google reference)
- EvaluMe: https://medium.com/@diondcm/evalume — Multi-agent parallel analysis (MEDIUM confidence, blog post with architecture details)
- Find your Figure (COLING 2025): https://aclanthology.org/2025.coling-main.587/ — RAG-enhanced ontology for rhetorical figure annotation (HIGH confidence, peer-reviewed)
- RhetAnn: https://arxiv.org/html/2407.11827 — GPT-assisted annotation of rhetorical features (HIGH confidence, peer-reviewed)
- LingFrame: https://github.com/organvm-i-theoria/linguistic-atomization-framework — Computational rhetoric platform (MEDIUM confidence, reference for analysis modules)
- next-intl documentation: https://next-intl.dev — Internationalization for Next.js App Router (HIGH confidence, official docs)
- Supabase documentation and RLS patterns: https://supabase.com/docs — Authentication and database patterns (HIGH confidence, official docs)

---
*Architecture research for: Metacreadores — Educational app for teaching rhetorical figures with AI analysis*
*Researched: 2026-05-04*