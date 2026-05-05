// ---------------------------------------------------------------------------
// Progress data fetching and derived statistics
// ---------------------------------------------------------------------------

import { eq, desc } from "drizzle-orm";
import { db } from "@/db";
import { userProgress, figures, writingSubmissions } from "@/db/schema";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FigureProgressData {
  figureId: number;
  figureSlug: string;
  figureName: string;
  category: string;
  difficultyLevel: number;
  status: "not_started" | "in_progress" | "completed";
  exercisesCompleted: number;
  exercisesCorrect: number;
  lastPracticedAt: string | null;
  accuracy: number;
}

export interface SavedWritingData {
  id: number;
  title: string | null;
  wordCount: number;
  savedAt: string;
}

export interface ProgressSummary {
  totalExercises: number;
  totalCorrect: number;
  accuracy: number;
  figuresPracticed: number;
  savedTexts: number;
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

/**
 * Fetch all user_progress rows for a given user, joined with figure
 * metadata (name, slug, category, difficultyLevel).
 *
 * Returns an enriched array with computed accuracy and normalised status.
 * When a user has no progress yet, returns an empty array.
 */
export async function getUserProgress(
  userId: string,
): Promise<FigureProgressData[]> {
  const rows = await db
    .select({
      figureId: figures.id,
      figureSlug: figures.slug,
      figureName: figures.name,
      category: figures.category,
      difficultyLevel: figures.difficultyLevel,
      status: userProgress.status,
      exercisesCompleted: userProgress.exercisesCompleted,
      exercisesCorrect: userProgress.exercisesCorrect,
      lastPracticedAt: userProgress.lastPracticedAt,
    })
    .from(userProgress)
    .innerJoin(figures, eq(userProgress.figureId, figures.id))
    .where(eq(userProgress.userId, userId));

  return rows.map(mapRowToFigureProgressData);
}

/**
 * Fetch writing_submissions for a user, ordered by savedAt descending.
 * Returns an array with word count pre-computed.
 */
export async function getSavedWritings(
  userId: string,
): Promise<SavedWritingData[]> {
  const rows = await db
    .select({
      id: writingSubmissions.id,
      title: writingSubmissions.title,
      rawText: writingSubmissions.rawText,
      savedAt: writingSubmissions.savedAt,
    })
    .from(writingSubmissions)
    .where(eq(writingSubmissions.userId, userId))
    .orderBy(desc(writingSubmissions.savedAt));

  return rows.map(mapRowToSavedWritingData);
}

// ---------------------------------------------------------------------------
// Derived statistics
// ---------------------------------------------------------------------------

/**
 * Compute aggregate summary statistics from per-figure progress and the
 * total number of saved texts.
 *
 * All values are safe for zero/empty input:
 * - accuracy is 0 when no exercises have been attempted
 * - figuresPracticed counts only figures with at least one exercise completed
 */
export function computeProgressSummary(
  figureProgress: FigureProgressData[],
  savedTextsCount: number,
): ProgressSummary {
  const totalExercises = figureProgress.reduce(
    (sum, f) => sum + f.exercisesCompleted,
    0,
  );
  const totalCorrect = figureProgress.reduce(
    (sum, f) => sum + f.exercisesCorrect,
    0,
  );
  const figuresPracticed = figureProgress.filter(
    (f) => f.exercisesCompleted > 0,
  ).length;

  return {
    totalExercises,
    totalCorrect,
    accuracy:
      totalExercises > 0
        ? Math.round((totalCorrect / totalExercises) * 100)
        : 0,
    figuresPracticed,
    savedTexts: savedTextsCount,
  };
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

function mapRowToFigureProgressData(row: {
  figureId: number;
  figureSlug: string;
  figureName: string;
  category: string;
  difficultyLevel: number;
  status: string | null;
  exercisesCompleted: number | null;
  exercisesCorrect: number | null;
  lastPracticedAt: Date | null;
}): FigureProgressData {
  const completed = row.exercisesCompleted ?? 0;
  const correct = row.exercisesCorrect ?? 0;
  return {
    figureId: row.figureId,
    figureSlug: row.figureSlug,
    figureName: row.figureName,
    category: row.category,
    difficultyLevel: row.difficultyLevel,
    status: (row.status ?? "not_started") as FigureProgressData["status"],
    exercisesCompleted: completed,
    exercisesCorrect: correct,
    lastPracticedAt: row.lastPracticedAt
      ? row.lastPracticedAt.toISOString()
      : null,
    accuracy: completed > 0 ? Math.round((correct / completed) * 100) : 0,
  };
}

function mapRowToSavedWritingData(row: {
  id: number;
  title: string | null;
  rawText: string;
  savedAt: Date | null;
}): SavedWritingData {
  return {
    id: row.id,
    title: row.title,
    wordCount: row.rawText
      ? row.rawText.trim().split(/\s+/).filter(Boolean).length
      : 0,
    savedAt: row.savedAt
      ? row.savedAt.toISOString()
      : new Date().toISOString(),
  };
}
