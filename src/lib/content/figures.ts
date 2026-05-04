import { db } from "@/db";
import { figures, figureExamples } from "@/db/schema";
import { eq, or, ilike, asc, sql } from "drizzle-orm";
import type { Figure, FigureExample } from "@/db/schema";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type FigureWithExamples = Figure & {
  examples: FigureExample[];
};

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/**
 * Get all figures ordered alphabetically, with their examples.
 */
export async function getFigures(): Promise<FigureWithExamples[]> {
  return db.query.figures.findMany({
    with: { examples: true },
    orderBy: [asc(figures.name)],
  }) as Promise<FigureWithExamples[]>;
}

/**
 * Get a single figure by its slug, with examples.
 */
export async function getFigureBySlug(
  slug: string,
): Promise<FigureWithExamples | undefined> {
  const result = await db.query.figures.findFirst({
    where: eq(figures.slug, slug),
    with: { examples: true },
  });
  return result as FigureWithExamples | undefined;
}

/**
 * Get all figures belonging to a category, with examples.
 */
export async function getFiguresByCategory(
  category: string,
): Promise<FigureWithExamples[]> {
  return db.query.figures.findMany({
    where: eq(figures.category, category),
    with: { examples: true },
    orderBy: [asc(figures.name)],
  }) as Promise<FigureWithExamples[]>;
}

/**
 * Search figures by name or definition (Spanish).
 */
export async function searchFigures(
  query: string,
): Promise<FigureWithExamples[]> {
  const pattern = `%${query}%`;
  return db.query.figures.findMany({
    where: or(ilike(figures.name, pattern), ilike(figures.definition, pattern)),
    with: { examples: true },
    orderBy: [asc(figures.name)],
  }) as Promise<FigureWithExamples[]>;
}

/**
 * Get difficulty level counts (for filtering UI).
 */
export async function getDifficultyLevels(): Promise<
  { difficultyLevel: number; count: number }[]
> {
  const result = await db
    .select({
      difficultyLevel: figures.difficultyLevel,
      count: sql<number>`count(*)::int`,
    })
    .from(figures)
    .groupBy(figures.difficultyLevel)
    .orderBy(figures.difficultyLevel);

  return result;
}

/**
 * Get all unique categories.
 */
export async function getCategories(): Promise<string[]> {
  const result = await db
    .selectDistinct({ category: figures.category })
    .from(figures)
    .orderBy(figures.category);

  return result.map((r) => r.category);
}
