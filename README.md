# Metacreadores

**Aprende figuras retóricas con IA como tutor**

Metacreadores es un software educativo para estudiantes de secundaria que enseña figuras retóricas y literarias en español. La IA actúa como un tutor que analiza los textos del estudiante, resalta figuras retóricas inline, y explica por qué funcionan o se sienten forzadas — nunca califica.

## Web App

[https://metacreadores.vercel.app](https://metacreadores.vercel.app)

## Tech Stack

| Layer | Stack |
|-------|-------|
| Framework | Next.js 15 (App Router) |
| AI | Vercel AI SDK + Groq (primary) + Gemini (fallback) |
| Editor | TipTap (ProseMirror) |
| Database | Supabase (Postgres) |
| ORM | Drizzle |
| i18n | next-intl (es/en) |
| UI | shadcn/ui + Tailwind CSS |
| Testing | Vitest |

## Features

### Phase 1: Catálogo de Figuras
- 20 figuras retóricas esenciales con definiciones y ejemplos
- 55+ ejemplos de literatura real de 11 países hispanohablantes
- Autenticación con email y contraseña (Supabase Auth)
- Internacionalización español/inglés
- Diseño responsive mobile + desktop

### Phase 2: Análisis con IA
- Editor TipTap para escribir textos con formato básico
- Motor de IA en dos pasos: detección de figuras + retroalimentación tutor
- Resaltado inline de figuras con offsets exactos
- Panel de retroalimentación con fortalezas y sugerencias
- Guardado de textos y caché de análisis

### Phase 3: Práctica y Progreso
- 40 ejercicios interactivos (identificación + completado)
- Retroalimentación inmediata en tono tutor
- Generación de ejercicios por IA adaptados al nivel
- Dashboard de progreso por figura
- Seguimiento de ejercicios completados y precisión

### Phase 4: Modo Docente
- Dashboard docente con vista de clase
- Progreso individual por estudiante
- Asignación de figuras a estudiantes
- Vista de textos guardados por alumno

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm test           # 121 tests
npm run build      # production build
npm run db:seed    # seed figure catalog + exercises
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `DATABASE_URL` | Postgres connection string |
| `GROQ_API_KEY` | Groq API key (AI primary) |
| `GOOGLE_GENERATIVE_AI_API_KEY` | Google AI key (AI fallback) |

## Routes

| Path | Description |
|------|-------------|
| `/` → `/es/write` | Home (redirige al editor) |
| `/es/write` | Editor de escritura con análisis IA |
| `/es/exercises` | Ejercicios prácticos de figuras |
| `/es/progress` | Dashboard de progreso personal |
| `/es/teacher` | Panel del docente |
| `/es/login` / `/es/signup` | Autenticación |
| `/en/write` | English: Writing editor |

## License

ISC
