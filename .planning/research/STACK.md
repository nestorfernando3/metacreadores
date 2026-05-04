# Technology Stack

**Project:** Metacreadores — Educational web app for rhetorical figures with AI-powered tutor feedback
**Researched:** 2025-05-04
**Overall confidence:** HIGH

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|-------------|
| **Next.js** | 15.x (App Router) | Full-stack React framework | Server Components for SEO-critical content pages, API Routes for AI endpoints, file-system routing, built-in optimizations. App Router is the mature default since v14. The `/api` flag in `create-next-app` scaffolds route handlers automatically. | HIGH |
| **React** | 19.x | UI library | Ships with Next.js 15. Server Components reduce client JS. Streaming SSR for AI responses. | HIGH |
| **TypeScript** | 5.x | Type safety | Critical for a domain with structured rhetorical figure data, i18n keys, Zod validation schemas, and API contracts. Prevents bugs in Spanish/English content switching. | HIGH |

### AI & Text Analysis

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|-------------|
| **Vercel AI SDK** | 4.x (`ai` package) | Unified AI provider interface, streaming hooks | Purpose-built for Next.js. `useChat` and `useCompletion` hooks handle streaming AI responses natively. `streamText` with tool calling handles structured rhetorical analysis. Provider-agnostic — swap OpenAI→Anthropic→Gemini without rewriting. | HIGH |
| **OpenAI** | `@ai-sdk/openai` provider | Primary LLM provider (GPT-4o-mini / GPT-4o) | Best Spanish language support among frontier models. GPT-4o-mini is cost-effective for tutor feedback ($0.15/1M input tokens). `response_format` with Zod schemas enforces structured rhetorical analysis output. Use via AI SDK provider, NOT raw `openai` npm package. | HIGH |
| **Zod** | 3.x | Schema validation for AI structured output + form validation | Dual purpose: (1) Define `RhetoricalAnalysis` schema for AI SDK's `structuredOutput`, (2) Validate form inputs. Single validation library for both AI and UI layers. | HIGH |

### UI & Styling

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|-------------|
| **shadcn/ui** | Latest (CLI-managed) | Component library | Not a dependency — copies components into your codebase. Built on Radix UI (accessible by default) + Tailwind. Perfect for educational UX where accessibility is non-negotiable. Full control over markup, no lock-in. | HIGH |
| **Tailwind CSS** | 4.x | Utility-first styling | v4 uses CSS-native `@theme` config (no `tailwind.config.js`). Lightning CSS engine. Pairs perfectly with shadcn/ui. RTL-ready CSS logical properties simplify future Arabic/Hebrew support. | HIGH |
| **Radix UI** | Latest | Accessible primitives (via shadcn/ui) | Underpins shadcn/ui. Provides WAI-ARIA compliant dialogs, dropdowns, tooltips — critical for secondary school accessibility compliance. Don't use directly; access through shadcn/ui. | HIGH |

### Text Editor

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|-------------|
| **TipTap** | 2.x | Rich text editor for student writing | Built on ProseMirror — the only editor framework that can handle inline text annotation (highlighting rhetorical figures with colored spans). Extension architecture lets us add custom `FigureHighlight` marks. React composable API (`<Tiptap>` + `useEditor`) integrates cleanly with Next.js client components. Collaboration-ready (Y.js) for classroom scenarios. | HIGH |
| **@tiptap/starter-kit** | 2.x | Pre-configured editor extensions | Includes bold, italic, headings, lists — the basics students need for writing exercises. Add custom extensions on top. | HIGH |

### Internationalization

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|-------------|
| **next-intl** | 4.x | i18n for Next.js App Router | The clear winner for Next.js 15 App Router i18n. `next-i18next` is Pages Router era and being superseded. next-intl supports: Server Components, locale-prefixed routing (`/es/metáfora`, `/en/metaphor`), ICU message syntax for plurals/interpolation, type-safe translation keys, middleware for locale detection. 2.8M weekly downloads. Active maintainer. | HIGH |

### Database & Auth

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|-------------|
| **Supabase** | Latest (hosted) | PostgreSQL database + Auth + Storage + Realtime | Managed Postgres with Row Level Security. Auth handles email/password + OAuth (Google for schools). Realtime for teacher dashboard live updates. Storage for student writing samples. Generates TypeScript types from schema. Free tier sufficient for MVP. | HIGH |
| **@supabase/supabase-js** | 2.x | Client SDK | Type-safe client with generics for `Database` type. Server Component client (no cookies) vs browser client (with auth). | HIGH |
| **@supabase/ssr** | Latest | SSR auth helpers for Next.js | Handles cookie-based auth in Server Components and Middleware. Replaces deprecated `@supabase/auth-helpers-nextjs`. | HIGH |

### ORM & Data Layer

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|-------------|
| **Drizzle ORM** | Latest (`drizzle-orm` + `drizzle-kit`) | Type-safe SQL ORM | Lightweight (~7.4kb), zero-dependency, SQL-like query API. TypeScript-first — catches schema mismatches at compile time. `drizzle-kit` for migrations. Works directly with Supabase Postgres. Better DX than Prisma for this project size (no heavy engine, faster cold starts on serverless). | HIGH |
| **drizzle-kit** | 0.31.x | Schema migrations | Generate and push migrations to Supabase Postgres. `drizzle-kit push` for rapid dev, `drizzle-kit generate` + `migrate` for production. | HIGH |

### State Management

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|-------------|
| **Zustand** | 5.x | Client-side state | Minimal API. Only needed for UI state that crosses components (active figure, editor state, sidebar toggle). Server state lives in React Query / Supabase — don't duplicate in Zustand. | MEDIUM |
| **TanStack Query** | 5.x (`@tanstack/react-query`) | Server state management | Handles caching, background refetching, optimistic updates for student writing submissions and figure catalog. Avoids stale data in the tutor feedback flow. `useQuery` for catalog, `useMutation` for writing submissions. | HIGH |

### Testing

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|-------------|
| **Vitest** | 3.x | Unit + integration test runner | Vite-native, instant HMR in watch mode. Jest-compatible API. `vitest-browser-react` for component tests that run in real browsers. | HIGH |
| **Playwright** | Latest | E2E testing | Multi-browser (Chromium, Firefox, WebKit). Critical for testing AI streaming, i18n routing, and responsive mobile flows. Microsoft-maintained, excellent docs. | HIGH |
| **@testing-library/react** | Latest | Component testing utilities | Query by role/text/aria-label — aligns with accessible UI practices. Use alongside `vitest-browser-react` for realistic DOM testing. | HIGH |

### Deployment & Infrastructure

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|-------------|
| **Vercel** | N/A (hosted) | Deployment platform | Zero-config Next.js deployment. Edge functions for low-latency AI streaming. Preview deployments per PR. Serverless functions for API routes. Free tier covers MVP. | HIGH |
| **Supabase** | N/A (hosted) | Database hosting | Free tier: 500MB DB, 1GB storage, 50K auth users. Sufficient for MVP with 15-20 figures + student writings. | HIGH |

### Developer Experience

| Technology | Version | Purpose | Why | Confidence |
|------------|---------|---------|-----|-------------|
| **ESLint** | 9.x (flat config) | Linting | Next.js 15 ships with flat config. Add `eslint-config-next` for Next.js-specific rules. | HIGH |
| **Prettier** | 3.x | Code formatting | Consistent style. Pair with `prettier-plugin-tailwindcss` for class sorting. | HIGH |
| **pnpm** | 10.x | Package manager | Strict `node_modules`, fast installs, disk-efficient. Better than npm for monorepo-ready structure. | HIGH |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Framework | Next.js (App Router) | Remix | Remix is solid but smaller ecosystem. Next.js has better Vercel AI SDK integration and more community examples for educational apps. |
| Framework | Next.js | Nuxt/Vue | Project requires Spanish-language content — React ecosystem has more i18n tooling and AI streaming examples. Team should standardize on one framework. |
| AI SDK | Vercel AI SDK | Raw OpenAI SDK | Raw SDK requires manual streaming, no React hooks, provider lock-in. AI SDK gives `useChat`/`useCompletion` for free, provider swapping, and structured output via Zod. |
| AI SDK | Vercel AI SDK | LangChain.js | LangChain adds complexity without benefit for this use case. We need simple prompt → structured response, not complex chains or RAG pipelines. |
| ORM | Drizzle | Prisma | Prisma's Rust engine adds ~30MB and cold start latency. Drizzle is lighter, SQL-like (easier to debug), and has better Supabase integration docs. For a small schema, Prisma's schema-first approach is overkill. |
| ORM | Drizzle | Supabase client only | Supabase client is great for simple CRUD but lacks type-safe joins and relations. Drizzle gives us both: direct SQL access + relational queries with full types. |
| Components | shadcn/ui | MUI / Chakra | MUI has inconsistent v5→v6 migration. Chakra's CSS-in-JS adds runtime overhead. shadcn/ui gives full code ownership, Radix accessibility, and zero bundle bloat (copy what you need). |
| i18n | next-intl | next-i18next | next-i18next is Pages Router era. next-intl has first-class App Router support, Server Components, type-safe keys, and ICU message syntax. The ecosystem has clearly converged on next-intl for App Router projects. |
| Editor | TipTap | ProseMirror directly | TipTap wraps ProseMirror with a modern React API. Direct ProseMirror is 5x more code for the same result. TipTap's extension system is purpose-built for custom inline marks like figure highlighting. |
| Editor | TipTap | Slate.js | Slate is less maintained (last significant update 2023). TipTap has active releases, better React 19 support, and built-in collaboration (Y.js). Slate's custom rendering model fights React. |
| Editor | TipTap | Lexical (Meta) | Lexical is excellent but opinionated about its tree model. TipTap's extension API is more flexible for custom "rhetorical figure highlight" marks. Lexical doesn't have built-in collaboration yet. |
| Database | Supabase | PlanetScale | PlanetScale removed free tier. Supabase gives Postgres + Auth + Storage in one. Better for educational MVPs. |
| Database | Supabase | Neon | Neon is a great serverless Postgres but lacks built-in Auth and Storage. Adding those separately introduces complexity. Supabase's DX is faster for solo/small-team MVPs. |
| State | Zustand + TanStack Query | Redux Toolkit | Redux is overkill for this app's state complexity. Tutor feedback is streaming server state (TanStack Query). UI state is minimal (Zustand). No need for Redux's boilerplate. |
| Validation | Zod | Yup | Zod integrates directly with AI SDK for structured output. Yup doesn't. Using one library for both form validation AND AI schema enforcement reduces cognitive load. |

---

## Installation

```bash
# Create Next.js project
pnpm create next-app@latest metacreadores --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

# Core dependencies
cd metacreadores
pnpm add @ai-sdk/openai ai zod
pnpm add @supabase/supabase-js @supabase/ssr
pnpm add drizzle-orm postgres
pnpm add next-intl
pnpm add @tiptap/react @tiptap/starter-kit @tiptap/pm
pnpm add @tanstack/react-query
pnpm add zustand

# shadcn/ui (interactive CLI — picks Tailwind v4, default style)
pnpm dlx shadcn@latest init

# Add shadcn/ui components as needed
pnpm dlx shadcn@latest add button card dialog input tabs tooltip

# Dev dependencies
pnpm add -D drizzle-kit
pnpm add -D vitest @vitest/browser playwright @vitest/browser-playwright vitest-browser-react
pnpm add -D @testing-library/react
pnpm add -D prettier prettier-plugin-tailwindcss
```

---

## Architecture Decision Records

### ADR-001: Vercel AI SDK over Raw OpenAI SDK

**Context:** Need streaming AI responses for tutor feedback and structured output for rhetorical analysis.

**Decision:** Use Vercel AI SDK (`ai` package) with `@ai-sdk/openai` provider.

**Rationale:**
- `useChat` / `useCompletion` hooks provide streaming UI out of the box
- `streamText` with `output: Output.object({ schema })` enforces Zod-validated structured output
- Provider-agnostic: swap to `@ai-sdk/anthropic`, `@ai-sdk/google`, or `@ai-sdk/mistral` with one line change
- Built-in rate limiting, retries, and error handling
- Type-safe message history

**Consequences:** Vendor dependency on Vercel's SDK abstraction. If AI SDK stops being maintained, migration to raw providers is moderate effort. Mitigated by AI SDK's high adoption rate (100K+ weekly downloads) and Vercel's commitment.

### ADR-002: TipTap over ProseMirror/Slate/Lexical

**Context:** Students need a rich text editor where AI can highlight rhetorical figures inline (e.g., coloring a metaphor in blue).

**Decision:** Use TipTap 2.x as the editor framework.

**Rationale:**
- Custom `Mark` extension API lets us define `FigureHighlight` marks with per-figure-type styling
- React composable API (`<Tiptap>` + `useEditor`) integrates with Next.js client components
- Collaboration via Y.js built-in (for future classroom mode)
- Active maintenance, 2M+ weekly npm downloads
- ProseMirror under the hood — production-proven

**Consequences:** TipTap Pro extensions (comments, version history) require paid license. For MVP, StarterKit + custom marks suffice. Collaboration feature deferred to post-MVP.

### ADR-003: Supabase over Self-Hosted Postgres + Separate Auth

**Context:** Need database, authentication, and file storage for an educational app.

**Decision:** Use Supabase (hosted) for all backend services.

**Rationale:**
- Integrated Auth with RLS: students can only access their own writings
- Built-in Storage for writing samples/texts
- Realtime for teacher dashboard (future)
- TypeScript type generation from schema
- Free tier covers MVP scale (500MB DB, 50K users)
- Zero DevOps — solo/small team can focus on product

**Consequences:** Vendor lock-in to Supabase's API surface. Migration path exists (standard Postgres underneath). If we need to self-host later, the schema and data port out easily. Auth logic would need rewriting.

---

## Sources

- **Next.js 15**: Context7, verified App Router patterns, `create-next-app --api` flag
- **Vercel AI SDK**: Context7, verified `streamText`, `useChat`, structured output with Zod
- **OpenAI**: Context7, verified `client.chat.completions.parse` with Pydantic/Zod schemas, streaming API
- **TipTap**: Context7 + web research, verified React composable API, Mark extensions, Y.js collaboration
- **next-intl**: npm (2.8M weekly downloads), verified App Router support, ICU message syntax, v4.x
- **shadcn/ui**: Context7, verified Tailwind v4 compatibility, accessible Radix primitives
- **Drizzle ORM**: Context7, verified PostgreSQL setup, relational queries, `drizzle-kit` migrations
- **Supabase**: Context7, verified TypeScript client, auth helpers, SSR integration
- **Vitest**: Context7, verified browser mode with React, `vitest-browser-react`
- **Zustand**: Web research, verified v5.x API
- **TanStack Query**: Web research, verified v5.x with React 19 support