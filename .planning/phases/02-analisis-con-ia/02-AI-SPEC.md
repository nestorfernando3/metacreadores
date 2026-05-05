# AI-SPEC — Phase 2: Análisis con IA

> AI design contract for the tutor analysis engine. Consumed by planning and verification.

---

## 1. System Classification

**System Type:** Hybrid (Content Generation + Conversational Tutor)

**Description:**
Students write or paste text in Spanish and the system identifies rhetorical figures, highlights them inline, and explains why they work or feel forced in tutor tone. Good behavior means the system is accurate, specific, and supportive without grading or shaming the student.

**Critical Failure Modes:**
1. Hallucinating figures that are not supported by the text
2. Using evaluative language or sounding like a grader instead of a tutor
3. Returning incorrect text offsets, breaking inline highlighting
4. Confidently mislabeling ambiguous literary devices
5. Ignoring regional Spanish variation in examples and explanations

---

## 1b. Domain Context

**Industry Vertical:** Education

**User Population:** Secondary school students writing and analyzing Spanish text; teachers may review outputs later, but Phase 2 is student-facing.

**Stakes Level:** Medium

**Output Consequence:** Students may change their writing based on the feedback. Bad outputs can mislead learning, discourage creativity, or teach incorrect literary analysis.

### What Domain Experts Evaluate Against

| Dimension | Good | Bad | Stakes | Source |
|-----------|------|-----|--------|--------|
| Figure identification | Labels are plausible, text-backed, and specific | Unsupported or overconfident labels | High | Literature teacher |
| Pedagogical value | Explains *why* a figure works and how to improve | Vague praise or generic advice | High | Writing coach |
| Tone | Supportive, curious, non-judgmental | "Correcto/incorrecto", score-like language | High | Classroom teacher |
| Cultural relevance | Examples and explanations fit Spanish-speaking contexts | One-size-fits-all Spanish or region-blind examples | Medium | Curriculum specialist |
| Inline fidelity | Highlight spans match the text exactly | Off-by-one / misaligned spans | High | Product QA |

### Known Failure Modes in This Domain

- False positives on figurative language that is actually ordinary phrasing
- Ambiguous cases treated as certainty instead of probability
- Tutor voice drifting into evaluation or correction language
- Overexplaining when a student only needs one clear reason
- Examples chosen from outside the student’s dialect or literary context

### Regulatory / Compliance Context

- COPPA, FERPA, and GDPR privacy-by-default concerns apply
- Student writing may contain sensitive personal information
- The system should minimize data retention and avoid unnecessary logging of raw text

### Domain Expert Roles for Evaluation

| Role | Responsibility |
|------|---------------|
| Spanish literature teacher | Label gold examples and judge figure accuracy |
| Writing coach | Judge feedback tone and usefulness |
| Curriculum designer | Validate age-appropriateness and progression |
| Product QA | Check inline span accuracy and schema validity |

---

## 2. Framework Decision

**Selected Framework:** Vercel AI SDK 5.x (`ai` + provider packages)

**Version:** `ai@5.x`, `@ai-sdk/groq`, `@ai-sdk/google`

**Rationale:**
The project is a Next.js 15 TypeScript app, so the Vercel AI SDK gives the simplest native fit for streaming, structured outputs, and provider-agnostic model selection. It supports the exact pattern this phase needs: a detection pass that returns typed annotations and a feedback pass that streams tutor language back to the UI.

**Alternatives Considered:**

| Framework | Ruled Out Because |
|-----------|------------------|
| LangChain | Adds abstraction without a clear need for this phase; more surface area than necessary |
| LangGraph | Strong for stateful workflows, but Phase 2 is a mostly stateless two-pass pipeline |
| OpenAI Agents SDK | Too provider-specific for Groq/Gemini commitments |
| Claude Agent SDK | Vendor lock-in and code-agent orientation do not match the tutor use case |

**Vendor Lock-In Accepted:** No

---

## 3. Framework Quick Reference

### Installation
```bash
npm install ai @ai-sdk/groq @ai-sdk/google zod
```

### Core Imports
```typescript
import { generateText, streamText, Output } from "ai";
import { groq } from "@ai-sdk/groq";
import { google } from "@ai-sdk/google";
import { z } from "zod";
```

### Entry Point Pattern
```typescript
import { generateText, Output } from "ai";
import { groq } from "@ai-sdk/groq";
import { z } from "zod";

export async function POST(req: Request) {
  const { text, locale } = await req.json();

  const result = await generateText({
    model: groq("llama-3.3-70b-versatile"),
    system: `Analyze Spanish student writing as a tutor. Never grade.`,
    prompt: text,
    output: Output.object({
      schema: z.object({
        matches: z.array(
          z.object({
            figureSlug: z.string(),
            start: z.number(),
            end: z.number(),
            confidence: z.number(),
            explanation: z.string(),
          }),
        ),
      }),
    }),
  });

  return Response.json(result.output);
}
```

### Key Abstractions

| Concept | What It Is | When You Use It |
|---------|-----------|-----------------|
| `generateText` | One-shot structured analysis call | Detection pass and short tutor explanations |
| `streamText` | Streaming response for the feedback panel | Live tutor feedback in the UI |
| `Output.object` | Schema-backed structured output | Figure matches, offsets, feedback payloads |
| Provider adapters | Groq / Gemini model wrappers | Swap providers without changing app code |
| `zod` schemas | Runtime validation + TypeScript inference | Enforce analysis contract |

### Common Pitfalls
1. Sending the full catalog of figures instead of only the relevant candidates
2. Mixing detection and pedagogy into one prompt, which reduces reliability
3. Not validating offsets before rendering inline highlights
4. Letting the model invent certainty for ambiguous devices
5. Using a high temperature for the detection pass

### Recommended Project Structure
```
project/
├── src/lib/ai/
│   ├── schemas.ts
│   ├── prompts/
│   │   ├── detect-figures.ts
│   │   └── tutor-feedback.ts
│   ├── detect-figures.ts
│   ├── generate-feedback.ts
│   ├── catalog-context.ts
│   └── cache.ts
├── src/app/api/ai/
│   ├── analyze/route.ts
│   └── feedback/route.ts
└── src/components/analysis/
    ├── highlight-layer.tsx
    └── feedback-panel.tsx
```

---

## 4. Implementation Guidance

**Model Configuration:**
- Detection pass: Groq primary, low temperature (`0.2`), short max tokens, structured output only
- Feedback pass: Groq primary, slightly warmer temperature (`0.35-0.4`), stream to the UI
- Fallback: Gemini when Groq is unavailable or confidence is too low
- Use the locale from the current route to keep explanations in Spanish or English

**Core Pattern:**
- Pass 1: detect candidate figures and return a typed annotation list with offsets and confidence
- Pass 2: rewrite the structured findings into tutor feedback, preserving the non-evaluative voice
- Keep the detection and feedback prompts separate so they can fail independently

**Tool Use:**
- No autonomous tools in the model loop for Phase 2
- Any figure definitions/examples needed for context should be prepared by the app from the database before the call
- Use only the smallest relevant figure subset, not the full catalog

**State Management:**
- No conversational memory is required for the detection path
- Persist analysis results only when the student explicitly saves them
- Cache by text hash + locale + catalog version to reduce repeated cost

**Context Window Strategy:**
- Include the student text, the 3-5 most likely candidate figures, and the minimal figure definitions/examples needed to ground the prompt
- Trim any prior conversation into a short summary before each call
- Never send the full figure catalog or the entire student history

---

## 4b. AI Systems Best Practices

### Structured Outputs with Zod
```typescript
import { z } from "zod";

export const FigureMatchSchema = z.object({
  figureSlug: z.string(),
  figureName: z.string(),
  start: z.number().int().nonnegative(),
  end: z.number().int().nonnegative(),
  confidence: z.number().min(0).max(1),
  explanation: z.string(),
  alternative?: z.string().optional(),
});

export const AnalysisSchema = z.object({
  matches: z.array(FigureMatchSchema),
  uncertainSegments: z.array(
    z.object({
      text: z.string(),
      reason: z.string(),
    }),
  ),
});

export const TutorFeedbackSchema = z.object({
  summary: z.string(),
  strengths: z.array(z.string()),
  suggestions: z.array(z.string()),
  caution: z.string().optional(),
});
```

```typescript
const result = await generateText({
  model: groq("llama-3.3-70b-versatile"),
  prompt: studentText,
  output: Output.object({ schema: AnalysisSchema }),
});
```

### Async-First Design
- Use `generateText` for the detection pass because it returns typed results you can validate immediately
- Use `streamText` for the feedback panel so the student sees progress quickly
- Retry validation failures once with a smaller context window, then fall back to a safe response

### Prompt Engineering Discipline
- Separate system prompts for detection and tutoring
- Detection prompt: precise, conservative, offset-aware
- Feedback prompt: encouraging, specific, non-judgmental, no numeric score
- Avoid prompt bloat; include only the current text and the few figure candidates that matter

### Context Window Management
- Pre-filter the figure catalog by keyword and category before calling the model
- Cache catalog snippets by locale and figure slug
- Summarize prior feedback when the user edits and re-runs analysis

### Cost and Latency Budget
- Target detection latency: under 2s for typical passages
- Target feedback latency: under 3s for the first streamed token
- Cache repeated analyses by content hash
- Use Groq for the default path and Gemini only when needed

---

## 5. Evaluation Strategy

### Dimensions

| Dimension | Rubric (Pass/Fail or 1-5) | Measurement Approach | Priority |
|-----------|--------------------------|---------------------|----------|
| Figure detection accuracy | Pass if the correct figure is found for the majority of gold examples | Human + LLM judge | Critical |
| Inline offset fidelity | Pass if highlighted spans exactly match the intended text | Code | Critical |
| Tutor tone appropriateness | 1-5, with 4+ required | Human review + calibrated LLM judge | High |
| Hallucination rate | Fail on unsupported figure claims | Human + code checks | Critical |
| Output structure validity | Pass if schema validates | Code | Critical |
| Regional relevance | Pass if examples and explanations fit the intended region | Human review | High |

### Eval Tooling

**Primary Tool:** Promptfoo + Arize Phoenix

**Setup:**
```bash
npm install -D promptfoo
# Tracing will use Arize Phoenix via the app's instrumentation layer
```

**CI/CD Integration:**
```bash
npx promptfoo eval --config promptfoo.yml
```

### Reference Dataset

**Size:** 20 examples to start

**Composition:**
- 8 clear single-figure examples
- 4 ambiguous examples where the model should be cautious
- 4 region-diverse examples from different Spanish-speaking countries
- 4 creative-writing examples with richer metaphoric language

**Labeling:**
- Primary labels from a Spanish literature teacher
- Secondary calibration from a writing coach
- LLM judge only after it has been calibrated against human labels

---

## 6. Guardrails

### Online (Real-Time)

| Guardrail | Trigger | Intervention |
|-----------|---------|--------------|
| Low confidence | `confidence < 0.55` | Mark as tentative and avoid certainty language |
| Evaluative language | Output contains `correcto`, `incorrecto`, numeric score, or grading terms | Rewrite or regenerate as tutor feedback |
| Invalid offsets | Start/end outside text bounds | Block highlight rendering and retry once |
| Schema failure | Structured output does not validate | Regenerate with reduced context; otherwise safe fallback |
| Unsupported claim | Figure label not supported by text evidence | Flag as ambiguous and explain uncertainty |

### Offline (Flywheel)

| Metric | Sampling Strategy | Action on Degradation |
|--------|------------------|----------------------|
| False positives | Sample outputs with many highlights and user edits | Tighten prompts and catalog context |
| Tone drift | Sample outputs with words like "deberías" / "correcto" / "incorrecto" | Update tutor prompt and add filters |
| Hallucination rate | Sample low-confidence and long-form outputs | Increase evidence requirements |
| Regional mismatch | Sample outputs across multiple locales | Add region-specific examples to context |

---

## 7. Production Monitoring

**Tracing Tool:** Arize Phoenix

**Key Metrics to Track:**
- Analysis success rate
- Schema-valid output rate
- Tutor-tone violation rate
- Average latency per pass
- Fallback rate from Groq to Gemini

**Alert Thresholds:**
- Tutor-tone violations > 5% over a rolling day
- Schema validation failures > 2% over a rolling day
- p95 latency > 3s for the detection pass
- Fallback rate > 20% over a rolling day

**Smart Sampling Strategy:**
- Prioritize low-confidence analyses
- Sample outputs with many highlighted spans
- Sample repeated analyses of edited student text
- Sample cases from each supported Spanish-speaking region

---

## Checklist

- [ ] System type classified
- [ ] Critical failure modes identified (≥ 3)
- [ ] Domain context researched
- [ ] Regulatory/compliance context identified
- [ ] Domain expert roles defined
- [ ] Framework selected with rationale documented
- [ ] Alternatives considered and ruled out
- [ ] Framework quick reference written
- [ ] AI systems best practices written
- [ ] Evaluation dimensions grounded in domain rubric ingredients
- [ ] Each eval dimension has a concrete rubric
- [ ] Eval tooling selected
- [ ] Reference dataset spec written
- [ ] CI/CD eval integration specified
- [ ] Online guardrails defined
- [ ] Production monitoring configured
