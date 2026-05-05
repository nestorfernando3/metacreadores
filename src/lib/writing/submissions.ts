import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import {
  writingSubmissions,
  analysisRuns,
  type NewWritingSubmission,
  type NewAnalysisRun,
  type WritingSubmission,
  type AnalysisRun,
} from "@/db/schema";

// ---------------------------------------------------------------------------
// Writing submissions
// ---------------------------------------------------------------------------

export type SaveSubmissionInput = {
  userId: string;
  rawText: string;
  locale?: string;
  title?: string;
};

/**
 * Persist a new writing submission for the given user.
 * Returns the newly created submission row.
 */
export async function saveSubmission(
  input: SaveSubmissionInput,
): Promise<WritingSubmission> {
  const [row] = await db
    .insert(writingSubmissions)
    .values({
      userId: input.userId,
      rawText: input.rawText,
      locale: input.locale ?? "es",
      title: input.title ?? null,
    })
    .returning();

  return row;
}

/**
 * Load all submissions for a given user, most recent first.
 */
export async function listSubmissions(
  userId: string,
  limit = 50,
): Promise<WritingSubmission[]> {
  return db
    .select()
    .from(writingSubmissions)
    .where(eq(writingSubmissions.userId, userId))
    .orderBy(desc(writingSubmissions.savedAt))
    .limit(limit);
}

/**
 * Load a single submission by id, only if it belongs to the given user.
 */
export async function getSubmission(
  id: number,
  userId: string,
): Promise<WritingSubmission | null> {
  const [row] = await db
    .select()
    .from(writingSubmissions)
    .where(
      eq(writingSubmissions.id, id) &&
        eq(writingSubmissions.userId, userId),
    )
    .limit(1);

  return row ?? null;
}

// ---------------------------------------------------------------------------
// Analysis runs (persisted as part of the save flow)
// ---------------------------------------------------------------------------

export type SaveAnalysisRunInput = {
  submissionId: number;
  model: string;
  locale: string;
  contentHash: string;
  confidence?: number;
  analysisJson?: unknown;
  feedbackJson?: unknown;
};

/**
 * Persist an analysis run linked to a submission.
 */
export async function saveAnalysisRun(
  input: SaveAnalysisRunInput,
): Promise<AnalysisRun> {
  const [row] = await db
    .insert(analysisRuns)
    .values({
      submissionId: input.submissionId,
      model: input.model,
      locale: input.locale,
      contentHash: input.contentHash,
      confidence: input.confidence ?? 0,
      analysisJson: input.analysisJson ?? null,
      feedbackJson: input.feedbackJson ?? null,
    })
    .returning();

  return row;
}
