import { z } from "zod";

// ---------------------------------------------------------------------------
// FigureMatchSchema — a single detected figure with exact text offsets
// ---------------------------------------------------------------------------
export const FigureMatchSchema = z.object({
  figureSlug: z.string().min(1, "figureSlug is required"),
  figureName: z.string().min(1, "figureName is required"),
  start: z.number().int().nonnegative("start offset must be >= 0"),
  end: z.number().int().nonnegative("end offset must be >= 0"),
  confidence: z.number().min(0).max(1, "confidence must be between 0 and 1"),
  explanation: z.string().min(1, "explanation is required"),
  alternative: z.string().optional(),
});

export type FigureMatch = z.infer<typeof FigureMatchSchema>;

// ---------------------------------------------------------------------------
// AnalysisSchema — structured result of the detection pass
// ---------------------------------------------------------------------------
export const AnalysisSchema = z.object({
  matches: z.array(FigureMatchSchema),
  uncertainSegments: z.array(
    z.object({
      text: z.string(),
      reason: z.string(),
    }),
  ),
});

export type Analysis = z.infer<typeof AnalysisSchema>;

// ---------------------------------------------------------------------------
// TutorFeedbackSchema — non-evaluative tutor feedback for the student
// ---------------------------------------------------------------------------
export const TutorFeedbackSchema = z.object({
  summary: z.string().min(1, "summary is required"),
  strengths: z.array(z.string()).min(1, "at least one strength is required"),
  suggestions: z.array(z.string()),
  caution: z.string().optional(),
});

export type TutorFeedback = z.infer<typeof TutorFeedbackSchema>;

// ---------------------------------------------------------------------------
// AnalysisResultSchema — complete response shape from the analysis pipeline
// ---------------------------------------------------------------------------
export const AnalysisResultSchema = z.object({
  matches: z.array(FigureMatchSchema),
  feedback: TutorFeedbackSchema,
  locale: z.string(),
  model: z.string(),
  confidence: z.number().min(0).max(1),
});

export type AnalysisResult = z.infer<typeof AnalysisResultSchema>;

// ---------------------------------------------------------------------------
// Request body schema for the analyze API route
// ---------------------------------------------------------------------------
export const AnalyzeRequestSchema = z.object({
  text: z.string().min(1, "text is required").max(10000, "text too long"),
  locale: z.string().default("es"),
  figureCandidates: z
    .array(
      z.object({
        slug: z.string(),
        name: z.string(),
        nameEn: z.string().optional(),
        definition: z.string(),
        definitionEn: z.string().optional(),
        category: z.string(),
        difficultyLevel: z.number(),
        example: z.string().optional(),
        exampleEn: z.string().optional(),
      }),
    )
    .optional(),
});

export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>;
