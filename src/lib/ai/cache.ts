import { createHash } from "node:crypto";
import { eq, and } from "drizzle-orm";
import { db } from "@/db";
import { analysisRuns, writingSubmissions } from "@/db/schema";
import type { AnalysisResult, Analysis } from "@/lib/ai/schemas";

// ---------------------------------------------------------------------------
// Catalog version — bump this when the figure catalog changes significantly
// so cached analyses are invalidated.
// ---------------------------------------------------------------------------
export const CATALOG_VERSION = "v1";

// ---------------------------------------------------------------------------
// Deterministic content hash
// ---------------------------------------------------------------------------

/**
 * Normalize text for hashing: trim whitespace, collapse runs of whitespace
 * into a single space, and lowercase.
 */
export function normalizeText(raw: string): string {
  return raw.trim().replace(/\s+/g, " ").toLowerCase();
}

/**
 * Compute a deterministic SHA-256 hash of the normalized text combined with
 * the locale and catalog version.  Returns the first 16 hex chars (64-bit
 * security is enough for cache keys).
 */
export function computeContentHash(
  text: string,
  locale: string,
): string {
  const normalized = normalizeText(text);
  const raw = `${normalized}::${locale}::${CATALOG_VERSION}`;
  return createHash("sha256").update(raw, "utf-8").digest("hex").slice(0, 16);
}

/**
 * Build the full cache key used for lookups.  This is just the contentHash
 * for database queries (combined with locale); for a Redis-like key we also
 * include the catalog version.
 */
export function buildCacheKey(
  text: string,
  locale: string,
): string {
  return computeContentHash(text, locale);
}

// ---------------------------------------------------------------------------
// Determine if a cached analysis can be reused.
// Rules: same contentHash + locale, and the cached entry belongs to the
// same authenticated user (via the submission's userId).
// ---------------------------------------------------------------------------

export interface CachedAnalysisResult {
  analysis: Analysis;
  feedback: AnalysisResult["feedback"];
  model: string;
  confidence: number;
  analysisRunId: number;
}

/**
 * Try to find a cached analysis run for the given text, locale, and user.
 * Returns `null` when no suitable cache entry exists.
 *
 * This is a best-effort lookup — it never throws.
 */
export async function lookupCachedAnalysis(
  text: string,
  locale: string,
  userId: string,
): Promise<CachedAnalysisResult | null> {
  try {
    const hash = buildCacheKey(text, locale);

    // Find the most recent analysis run for this user + content hash + locale.
    // We join through writing_submissions to scope by userId.
    const rows = await db
      .select({
        id: analysisRuns.id,
        model: analysisRuns.model,
        confidence: analysisRuns.confidence,
        analysisJson: analysisRuns.analysisJson,
        feedbackJson: analysisRuns.feedbackJson,
      })
      .from(analysisRuns)
      .innerJoin(
        writingSubmissions,
        eq(analysisRuns.submissionId, writingSubmissions.id),
      )
      .where(
        and(
          eq(writingSubmissions.userId, userId),
          eq(analysisRuns.locale, locale),
          eq(analysisRuns.contentHash, hash),
        ),
      )
      .orderBy(analysisRuns.createdAt)
      .limit(1);

    if (rows.length === 0) return null;

    const row = rows[0];
    if (!row.analysisJson || !row.feedbackJson) return null;

    return {
      analysis: row.analysisJson as unknown as Analysis,
      feedback: row.feedbackJson as unknown as AnalysisResult["feedback"],
      model: row.model,
      confidence: row.confidence ?? 0,
      analysisRunId: row.id,
    };
  } catch (err) {
    console.warn("[cache] lookup failed:", err);
    return null;
  }
}
