import { describe, it, expect } from "vitest";
import {
  computeProgressSummary,
  type FigureProgressData,
} from "./get-progress";

// ---------------------------------------------------------------------------
// computeProgressSummary
// ---------------------------------------------------------------------------

describe("computeProgressSummary", () => {
  it("returns zero stats for empty progress", () => {
    const result = computeProgressSummary([], 0);
    expect(result).toEqual({
      totalExercises: 0,
      totalCorrect: 0,
      accuracy: 0,
      figuresPracticed: 0,
      savedTexts: 0,
    });
  });

  it("returns zero stats when only figures exist but no exercises completed", () => {
    const progress: FigureProgressData[] = [
      makeFigureProgress({
        exercisesCompleted: 0,
        exercisesCorrect: 0,
      }),
    ];
    const result = computeProgressSummary(progress, 0);
    expect(result.totalExercises).toBe(0);
    expect(result.totalCorrect).toBe(0);
    expect(result.accuracy).toBe(0);
    expect(result.figuresPracticed).toBe(0);
  });

  it("computes correct total and accuracy for a single figure", () => {
    const progress: FigureProgressData[] = [
      makeFigureProgress({
        exercisesCompleted: 10,
        exercisesCorrect: 8,
      }),
    ];
    const result = computeProgressSummary(progress, 3);
    expect(result.totalExercises).toBe(10);
    expect(result.totalCorrect).toBe(8);
    expect(result.accuracy).toBe(80);
    expect(result.figuresPracticed).toBe(1);
    expect(result.savedTexts).toBe(3);
  });

  it("aggregates multiple figures", () => {
    const progress: FigureProgressData[] = [
      makeFigureProgress({
        exercisesCompleted: 5,
        exercisesCorrect: 4,
      }),
      makeFigureProgress({
        exercisesCompleted: 10,
        exercisesCorrect: 7,
      }),
      makeFigureProgress({
        exercisesCompleted: 3,
        exercisesCorrect: 3,
      }),
    ];
    const result = computeProgressSummary(progress, 5);
    expect(result.totalExercises).toBe(18);
    expect(result.totalCorrect).toBe(14);
    expect(result.accuracy).toBe(78); // Math.round(14/18 * 100) = 78
    expect(result.figuresPracticed).toBe(3);
    expect(result.savedTexts).toBe(5);
  });

  it("only counts figures with exercisesCompleted > 0 as practiced", () => {
    const progress: FigureProgressData[] = [
      makeFigureProgress({
        exercisesCompleted: 5,
        exercisesCorrect: 3,
      }),
      makeFigureProgress({
        exercisesCompleted: 0,
        exercisesCorrect: 0,
      }),
      makeFigureProgress({
        exercisesCompleted: 2,
        exercisesCorrect: 1,
      }),
    ];
    const result = computeProgressSummary(progress, 1);
    expect(result.totalExercises).toBe(7);
    expect(result.totalCorrect).toBe(4);
    expect(result.accuracy).toBe(57); // Math.round(4/7 * 100) = 57
    expect(result.figuresPracticed).toBe(2);
    expect(result.savedTexts).toBe(1);
  });

  it("handles perfect accuracy", () => {
    const progress: FigureProgressData[] = [
      makeFigureProgress({
        exercisesCompleted: 10,
        exercisesCorrect: 10,
      }),
    ];
    const result = computeProgressSummary(progress, 0);
    expect(result.accuracy).toBe(100);
  });

  it("handles zero accuracy", () => {
    const progress: FigureProgressData[] = [
      makeFigureProgress({
        exercisesCompleted: 5,
        exercisesCorrect: 0,
      }),
    ];
    const result = computeProgressSummary(progress, 0);
    expect(result.accuracy).toBe(0);
  });

  it("counts saved texts correctly", () => {
    const progress: FigureProgressData[] = [
      makeFigureProgress({
        exercisesCompleted: 3,
        exercisesCorrect: 2,
      }),
    ];
    const result = computeProgressSummary(progress, 10);
    expect(result.savedTexts).toBe(10);
  });
});

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeFigureProgress(
  overrides: Partial<FigureProgressData> = {},
): FigureProgressData {
  return {
    figureId: 1,
    figureSlug: "metafora",
    figureName: "Metáfora",
    category: "tropo",
    difficultyLevel: 1,
    status: "in_progress",
    exercisesCompleted: 0,
    exercisesCorrect: 0,
    lastPracticedAt: null,
    accuracy: 0,
    ...overrides,
  };
}
