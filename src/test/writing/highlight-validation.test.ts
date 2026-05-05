import { describe, it, expect } from "vitest";
import { validateHighlights } from "@/components/writing/analysis-highlights";
import type { FigureMatch } from "@/lib/ai/schemas";

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

function makeMatch(overrides: Partial<FigureMatch> = {}): FigureMatch {
  return {
    figureSlug: "simil",
    figureName: "Símil",
    start: 0,
    end: 5,
    confidence: 0.85,
    explanation: "Comparación explícita",
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("validateHighlights", () => {
  it("keeps valid matches", () => {
    const matches = [makeMatch({ start: 3, end: 10 })];
    const result = validateHighlights(matches, "Hello world this is text");
    expect(result).toHaveLength(1);
  });

  it("removes matches where start >= end", () => {
    const matches = [
      makeMatch({ start: 5, end: 3 }),
      makeMatch({ start: 5, end: 5 }),
    ];
    const result = validateHighlights(matches, "Hello world");
    expect(result).toHaveLength(0);
  });

  it("removes matches with negative start", () => {
    const matches = [makeMatch({ start: -1, end: 3 })];
    const result = validateHighlights(matches, "Hello world");
    expect(result).toHaveLength(0);
  });

  it("removes matches where end exceeds text length", () => {
    const matches = [makeMatch({ start: 5, end: 100 })];
    const result = validateHighlights(matches, "Hello");
    expect(result).toHaveLength(0);
  });

  it("removes matches with non-finite offsets", () => {
    const matches = [
      makeMatch({ start: Infinity, end: 5 }),
      makeMatch({ start: NaN, end: 5 }),
    ];
    const result = validateHighlights(matches, "Hello");
    expect(result).toHaveLength(0);
  });

  it("handles empty matches array", () => {
    const result = validateHighlights([], "Hello");
    expect(result).toHaveLength(0);
  });

  it("handles empty text string", () => {
    const matches = [makeMatch({ start: 0, end: 1 })];
    const result = validateHighlights(matches, "");
    expect(result).toHaveLength(0);
  });

  it("keeps a match spanning the entire text", () => {
    const matches = [makeMatch({ start: 0, end: 11 })];
    const result = validateHighlights(matches, "Hello world");
    expect(result).toHaveLength(1);
  });

  it("filters out-of-bounds while keeping valid ones", () => {
    const matches = [
      makeMatch({ start: 0, end: 5, figureSlug: "valid" }),
      makeMatch({ start: 10, end: 999, figureSlug: "invalid" }),
      makeMatch({ start: -5, end: 3, figureSlug: "negative" }),
    ];
    const result = validateHighlights(matches, "Hello world example");
    expect(result).toHaveLength(1);
    expect(result[0]!.figureSlug).toBe("valid");
  });
});
