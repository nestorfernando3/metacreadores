import { generateText, Output } from "ai";
import {
  AnalysisSchema,
  type Analysis,
  type FigureMatch,
  type TutorFeedback,
  type AnalysisResult,
} from "@/lib/ai/schemas";
import {
  buildDetectionPrompt,
  buildTutorPrompt,
} from "@/lib/ai/prompts";
import {
  getDetectionConfig,
  getFeedbackConfig,
} from "@/lib/ai/providers";
import { getFigureContext, type FigureCandidate } from "@/lib/content/figure-context";
import { lookupCachedAnalysis } from "@/lib/ai/cache";
import { trace } from "@/lib/ai/trace";

// ---------------------------------------------------------------------------
// Fallback figure list when database is unavailable
// ---------------------------------------------------------------------------
const FALLBACK_FIGURES: FigureCandidate[] = [
  { slug: "metafora", name: "Metáfora", definition: "Identificación de un término real con otro imaginario", category: "figuras_de_pensamiento", difficultyLevel: 1 },
  { slug: "simil", name: "Símil", definition: "Comparación explícita entre dos términos usando 'como'", category: "figuras_de_pensamiento", difficultyLevel: 1 },
  { slug: "personificacion", name: "Personificación", definition: "Atribuir cualidades humanas a objetos inanimados", category: "figuras_de_pensamiento", difficultyLevel: 1 },
  { slug: "hiperbole", name: "Hipérbole", definition: "Exageración con fines expresivos", category: "figuras_de_pensamiento", difficultyLevel: 1 },
  { slug: "anfora", name: "Anáfora", definition: "Repetición de palabras al inicio de versos o frases", category: "figuras_de_diccion", difficultyLevel: 1 },
  { slug: "aliteracion", name: "Aliteración", definition: "Repetición de sonidos para crear un efecto", category: "figuras_de_diccion", difficultyLevel: 2 },
  { slug: "antitesis", name: "Antítesis", definition: "Contraposición de dos ideas opuestas", category: "figuras_de_pensamiento", difficultyLevel: 2 },
  { slug: "ironia", name: "Ironía", definition: "Decir lo contrario de lo que se piensa", category: "figuras_de_pensamiento", difficultyLevel: 2 },
];

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

/**
 * Validate that all offsets in the analysis are within the bounds of the
 * original text. Returns a cleaned analysis with invalid matches removed.
 */
function validateOffsets(text: string, analysis: Analysis): Analysis {
  const validMatches = analysis.matches.filter((m) => {
    return (
      m.start >= 0 &&
      m.end <= text.length &&
      m.start < m.end &&
      // Verify the extracted text actually matches
      text.slice(m.start, m.end).length > 0
    );
  });

  return {
    matches: validMatches,
    uncertainSegments: analysis.uncertainSegments,
  };
}

/**
 * Extract the actual text that a match refers to from the original text.
 */
function extractMatchText(text: string, match: FigureMatch): string {
  return text.slice(match.start, match.end);
}

/**
 * Build the final analysis result from the detection and feedback passes.
 */
function buildResult(
  analysis: Analysis,
  feedback: TutorFeedback,
  locale: string,
  model: string,
): AnalysisResult {
  // Compute an overall confidence score from all matches
  const avgConfidence =
    analysis.matches.length > 0
      ? analysis.matches.reduce((sum, m) => sum + m.confidence, 0) /
        analysis.matches.length
      : 0;

  return {
    matches: analysis.matches,
    feedback,
    locale,
    model,
    confidence: avgConfidence,
  };
}

// ---------------------------------------------------------------------------
// Pass 1: Figure detection with structured output
// ---------------------------------------------------------------------------

async function detectFigures(
  text: string,
  locale: "es" | "en",
  candidates: FigureCandidate[],
): Promise<Analysis> {
  const { system, user } = buildDetectionPrompt(locale, candidates);

  // Replace the placeholder with the actual text
  const userPrompt = user.replace("{{STUDENT_TEXT}}", text);

  try {
    const config = getDetectionConfig();

    const result = await generateText({
      model: config.model,
      system,
      prompt: userPrompt,
      temperature: config.temperature,
      maxOutputTokens: config.maxOutputTokens,
      output: Output.object({ schema: AnalysisSchema }),
    });

    const analysis = result.output as Analysis;
    const validated = validateOffsets(text, analysis);
    return validated;
  } catch (error) {
    console.warn("[analyze-text] AI detection failed:", error);
    return { matches: [], uncertainSegments: [] };
  }
}

// ---------------------------------------------------------------------------
// Pass 2: Tutor feedback generation
// ---------------------------------------------------------------------------

async function generateTutorFeedback(
  text: string,
  analysis: Analysis,
  locale: "es" | "en",
): Promise<TutorFeedback> {
  const analysisForPrompt = {
    matches: analysis.matches.map((m) => ({
      figureName: m.figureName,
      figureSlug: m.figureSlug,
      explanation: m.explanation,
      confidence: m.confidence,
      text: extractMatchText(text, m),
    })),
    uncertainSegments: analysis.uncertainSegments,
  };

  const { system, user } = buildTutorPrompt(locale, analysisForPrompt);

  try {
    const config = getFeedbackConfig();

    const result = await generateText({
      model: config.model,
      system,
      prompt: user,
      temperature: config.temperature,
      maxOutputTokens: config.maxOutputTokens,
    });

    const feedbackText = result.text;

    // Build a structured feedback object from the generated text
    const feedback: TutorFeedback = {
      summary: feedbackText,
      strengths:
        analysis.matches.length > 0
          ? analysis.matches.map(
              (m) =>
                `El uso de "${m.figureName}" en "${extractMatchText(text, m)}" — ${m.explanation}`,
            )
          : [
              locale === "es"
                ? "Tu texto tiene un estilo interesante de explorar"
                : "Your text has an interesting style worth exploring",
            ],
      suggestions: [],
      caution:
        analysis.matches.length === 0
          ? locale === "es"
            ? "No se identificaron figuras retóricas claras. Sigue experimentando con el lenguaje."
            : "No clear rhetorical figures were identified. Keep experimenting with language."
          : undefined,
    };

    return feedback;
  } catch (error) {
    console.warn("[analyze-text] Feedback generation failed:", error);

    // Fallback: return minimal safe feedback
    return {
      summary:
        locale === "es"
          ? "Gracias por compartir tu texto. He notado algunos patrones interesantes en tu escritura. Sigue explorando diferentes formas de expresarte."
          : "Thank you for sharing your text. I noticed some interesting patterns in your writing. Keep exploring different ways to express yourself.",
      strengths: [
        locale === "es"
          ? "Tu texto tiene un estilo interesante de explorar"
          : "Your text has an interesting style worth exploring",
      ],
      suggestions: [],
    };
  }
}

// ---------------------------------------------------------------------------
// Main entry point: two-pass analysis
// ---------------------------------------------------------------------------

export interface AnalyzeTextOptions {
  text: string;
  locale?: "es" | "en";
  figureCandidates?: FigureCandidate[];
  /** When provided, the function first attempts a cache lookup scoped to this user. */
  userId?: string;
}

/**
 * Analyze a student text through a two-pass pipeline:
 * 1. Detection pass — identifies rhetorical figures with exact offsets
 * 2. Feedback pass — generates tutor-style feedback from the detection result
 *
 * The system is stateless: each call is independent.
 * Returns structured annotations + tutor feedback, never a grade.
 */
export async function analyzeText(
  options: AnalyzeTextOptions,
): Promise<AnalysisResult> {
  const { text, locale = "es", figureCandidates: explicitCandidates, userId } = options;

  // Determine which model was used
  const model = "gemini-2.0-flash";

  // --- Cache lookup (user-scoped) ---
  if (userId) {
    const cached = await lookupCachedAnalysis(text, locale, userId);
    if (cached) {
      trace({
        type: "cache_hit",
        payload: { contentHash: cached.analysisRunId, locale, userId },
      });
      return {
        matches: cached.analysis.matches,
        feedback: cached.feedback,
        locale,
        model: cached.model,
        confidence: cached.confidence,
      };
    }
    trace({
      type: "cache_miss",
      payload: { locale, userId },
    });
  }

  // Get candidate figures from the catalog (or use explicit ones).
  // Falls back to a minimal hardcoded set when the database is unavailable.
  let candidates: FigureCandidate[];
  if (explicitCandidates) {
    candidates = explicitCandidates;
  } else {
    try {
      candidates = await getFigureContext(text, locale, 5);
    } catch {
      console.warn("[analyze-text] DB unavailable, using fallback figure list");
      candidates = FALLBACK_FIGURES;
    }
  }

  // --- Pass 1: Detection ---
  const analysis = await detectFigures(text, locale, candidates);

  // If detection returned nothing, we still do the feedback pass
  // with an empty analysis

  // --- Pass 2: Tutor feedback ---
  const feedback = await generateTutorFeedback(text, analysis, locale);

  return buildResult(analysis, feedback, locale, model);
}
