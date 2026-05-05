import { getFigures } from "@/lib/content/figures";
import type { FigureWithExamples } from "@/lib/content/figures";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FigureCandidate {
  slug: string;
  name: string;
  nameEn?: string;
  definition: string;
  definitionEn?: string;
  category: string;
  difficultyLevel: number;
  example?: string;
  exampleEn?: string;
}

// ---------------------------------------------------------------------------
// Select 3-5 candidate figures most relevant to the given text.
// Strategy: keyword-based pre-filtering, with a fallback to the most common
// figures if no keywords match.
// ---------------------------------------------------------------------------

/**
 * Default fallback figures when keyword matching finds nothing.
 * These are the most commonly taught Spanish rhetorical figures.
 */
const DEFAULT_FALLBACK_SLUGS = [
  "metafora",
  "simil",
  "personificacion",
  "hiperbole",
  "anfora",
];

/**
 * Extract significant Spanish words from text for keyword matching.
 * Filters out common stop words and very short words.
 */
function extractKeywords(text: string, locale: "es" | "en"): string[] {
  const stopWords =
    locale === "es"
      ? [
          "el", "la", "los", "las", "un", "una", "unos", "unas", "y", "e", "o",
          "u", "de", "del", "en", "con", "por", "para", "a", "al", "como",
          "que", "es", "se", "no", "lo", "le", "su", "sus", "más", "pero",
          "si", "me", "te", "mi", "tu", "este", "esta", "esto", "eso", "esa",
          "ese", "entre", "todo", "toda", "sin", "sobre", "tras", "durante",
          "mediante", "cada", "muy", "tan", "tanto", "cuando", "donde",
          "quien", "cual", "cuyo", "aunque", "sino", "pues", "ya", "bien",
        ]
      : [
          "the", "a", "an", "and", "or", "but", "in", "on", "at", "to", "for",
          "of", "with", "by", "from", "up", "about", "into", "over", "after",
          "is", "are", "was", "were", "be", "been", "being", "have", "has",
          "had", "do", "does", "did", "will", "would", "can", "could",
          "shall", "should", "may", "might", "i", "you", "he", "she", "it",
          "we", "they", "me", "him", "her", "us", "them", "my", "your",
          "his", "its", "our", "their", "this", "that", "these", "those",
          "not", "no", "nor", "so", "very", "just", "too", "also", "if",
          "then", "than", "as", "what", "which", "who", "whom", "when",
          "where", "why", "how", "all", "each", "every", "both", "few",
          "more", "some", "any", "such", "only", "own", "same",
        ];

  return text
    .toLowerCase()
    .split(/[^a-záéíóúüñ]+/gu)
    .filter((w) => w.length > 2 && !stopWords.includes(w));
}

/**
 * Score a figure's relevance to the given keywords by matching against
 * its name, definition, and category.
 */
function scoreFigure(
  figure: FigureWithExamples,
  keywords: string[],
): number {
  const searchSpace = [
    figure.name.toLowerCase(),
    figure.definition.toLowerCase(),
    figure.category.toLowerCase(),
    ...figure.examples.map((e) => e.text.toLowerCase()),
  ].join(" ");

  return keywords.reduce((score, kw) => {
    // Direct match
    if (searchSpace.includes(kw)) return score + 2;
    // Stem match: check if keyword is contained in any word
    const words = searchSpace.split(/[^a-záéíóúüñ]+/gu);
    if (words.some((w) => w.includes(kw) || kw.includes(w))) return score + 1;
    return score;
  }, 0);
}

/**
 * Get 3-5 candidate figures most relevant to a given student text.
 * Falls back to the most common figures if keyword matching yields nothing.
 *
 * @param text - The student's text to analyze
 * @param locale - Current locale ("es" | "en")
 * @param maxCandidates - Maximum number of candidates to return (default: 5)
 */
export async function getFigureContext(
  text: string,
  locale: "es" | "en" = "es",
  maxCandidates: number = 5,
): Promise<FigureCandidate[]> {
  const allFigures = await getFigures();
  const keywords = extractKeywords(text, locale);

  // Score and sort figures by relevance
  const scored = allFigures
    .map((f) => ({
      figure: f,
      score: scoreFigure(f, keywords),
    }))
    .sort((a, b) => b.score - a.score);

  // Take top candidates (at least 3, at most maxCandidates)
  const topCandidates = scored.slice(
    0,
    Math.max(3, Math.min(maxCandidates, scored.length)),
  );

  // If scores are all 0, fall back to default slugs
  const hasAnyMatch = topCandidates.some((c) => c.score > 0);
  const selectedFigures = hasAnyMatch
    ? topCandidates.map((c) => c.figure)
    : allFigures.filter((f) => DEFAULT_FALLBACK_SLUGS.includes(f.slug));

  // Limit to maxCandidates
  const figuresToUse = selectedFigures.slice(0, maxCandidates);

  return figuresToUse.map((f) => ({
    slug: f.slug,
    name: f.name,
    nameEn: f.nameEn ?? undefined,
    definition: f.definition,
    definitionEn: f.definitionEn ?? undefined,
    category: f.category,
    difficultyLevel: f.difficultyLevel,
    example: f.examples[0]?.text ?? undefined,
    exampleEn: f.examples[0]?.textEn ?? undefined,
  }));
}

/**
 * Build a candidate list from explicitly provided figure slugs.
 * Useful when the caller already knows which figures to check.
 */
export async function getFigureContextBySlugs(
  slugs: string[],
): Promise<FigureCandidate[]> {
  const allFigures = await getFigures();
  return allFigures
    .filter((f) => slugs.includes(f.slug))
    .map((f) => ({
      slug: f.slug,
      name: f.name,
      nameEn: f.nameEn ?? undefined,
      definition: f.definition,
      definitionEn: f.definitionEn ?? undefined,
      category: f.category,
      difficultyLevel: f.difficultyLevel,
      example: f.examples[0]?.text ?? undefined,
      exampleEn: f.examples[0]?.textEn ?? undefined,
    }));
}
