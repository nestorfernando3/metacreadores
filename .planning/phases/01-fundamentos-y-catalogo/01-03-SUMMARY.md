---
phase: 01-fundamentos-y-catalogo
plan: 03
status: completed
type: execute
wave: 3
---

# Summary: Email/Password Authentication

## Objective

Implement email/password authentication using Supabase Auth with persistent sessions, protected routes, and bilingual (Spanish/English) login/signup pages.

## Requirements Satisfied

- **AUTH-01**: User can sign up with email and password ✓
- **AUTH-02**: User can log in with email and password ✓
- **AUTH-03**: User session persists across browser refresh ✓

## Files Created

### Auth Infrastructure
- `src/lib/auth/server.ts` — Supabase SSR server client with `createClient()` and `updateSession()`
- `src/lib/auth/client.ts` — Supabase browser client with `createClient()`
- `src/middleware.ts` — Chains next-intl locale middleware with Supabase session refresh

### i18n Configuration
- `src/i18n/config.ts` — Locale definitions (es/en, default: es)
- `src/i18n/routing.ts` — Routing config (as-needed prefix) + navigation re-exports
- `src/i18n/request.ts` — Request-level message loading via `getRequestConfig`
- `messages/es.json` — Spanish auth translation strings
- `messages/en.json` — English auth translation strings

### Auth Pages & Components
- `src/app/[locale]/login/page.tsx` — Login page with bilingual support
- `src/app/[locale]/signup/page.tsx` — Signup page with bilingual support
- `src/components/auth/login-form.tsx` — Client component for email/password login
- `src/components/auth/signup-form.tsx` — Client component for email/password signup
- `src/components/auth/auth-guard.tsx` — Server component for route protection

### UI Components
- `src/components/ui/button.tsx` — shadcn/ui Button component
- `src/components/ui/input.tsx` — shadcn/ui Input component

## Files Modified
- `next.config.ts` — Added next-intl plugin
- `src/app/layout.tsx` — Removed `<html>`/`<body>` tags (moved to locale layout)

## Dependencies Added
- `next-intl@4.11.0`
- `@radix-ui/react-slot`

## Verification Status

| Check | Result |
|-------|--------|
| `test -f src/middleware.ts` | ✅ |
| `test -f src/lib/auth/server.ts` | ✅ |
| `test -f src/lib/auth/client.ts` | ✅ |
| `test -f src/app/[locale]/login/page.tsx` | ✅ |
| `test -f src/app/[locale]/signup/page.tsx` | ✅ |
| `test -f src/components/auth/login-form.tsx` | ✅ |
| `test -f src/components/auth/signup-form.tsx` | ✅ |
| `grep -q "signInWithPassword" login-form.tsx` | ✅ |
| `grep -q "signUp" signup-form.tsx` | ✅ |
| `grep -q "updateSession" middleware.ts` | ✅ |
| `grep -q "next-intl" middleware.ts` | ✅ |
| `grep -q "next-intl" package.json` | ✅ |

## Threats Mitigated

| Threat | Mitigation |
|--------|------------|
| T-03-01 Spoofing | HTTPS only; Supabase handles credential hashing |
| T-03-02 Session tampering | Supabase SSR sets httpOnly/secure/sameSite cookies |
| T-03-03 Info disclosure | Generic error messages — no email enumeration |
| T-03-04 DoS | Accepted for MVP; rate limiting by Supabase Auth |
