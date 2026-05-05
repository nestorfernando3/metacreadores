import { describe, it, expect } from "vitest";
import { checkAnswer, checkMultipleChoice, checkCompletion, normalize } from "./check-answer";

// ---------------------------------------------------------------------------
// normalize
// ---------------------------------------------------------------------------

describe("normalize", () => {
  it("trims whitespace", () => {
    expect(normalize("  hello  ")).toBe("hello");
  });

  it("lowercases", () => {
    expect(normalize("Hello World")).toBe("hello world");
  });

  it("collapses internal whitespace", () => {
    expect(normalize("hello   world")).toBe("hello world");
  });

  it("handles empty string", () => {
    expect(normalize("")).toBe("");
  });

  it("handles accented characters", () => {
    expect(normalize("  Metáfora  ")).toBe("metáfora");
  });
});

// ---------------------------------------------------------------------------
// checkMultipleChoice
// ---------------------------------------------------------------------------

describe("checkMultipleChoice", () => {
  it("returns correct=true when answers match exactly", () => {
    const result = checkMultipleChoice("Metáfora", "Metáfora");
    expect(result.correct).toBe(true);
    expect(result.userAnswer).toBe("metáfora");
    expect(result.correctAnswer).toBe("metáfora");
  });

  it("returns correct=true when answers match after normalization", () => {
    const result = checkMultipleChoice("  Metáfora  ", "Metáfora");
    expect(result.correct).toBe(true);
  });

  it("returns correct=false for different answers", () => {
    const result = checkMultipleChoice("Símil", "Metáfora");
    expect(result.correct).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// checkCompletion
// ---------------------------------------------------------------------------

describe("checkCompletion", () => {
  it("returns correct=true for exact match", () => {
    const result = checkCompletion("primavera", "primavera");
    expect(result.correct).toBe(true);
  });

  it("returns correct=true after normalization (trim, lowercase)", () => {
    const result = checkCompletion("  Primavera  ", "primavera");
    expect(result.correct).toBe(true);
  });

  it("returns correct=false for different word", () => {
    const result = checkCompletion("verano", "primavera");
    expect(result.correct).toBe(false);
  });

  it("handles multi-word answers", () => {
    const result = checkCompletion("  cric cric cric  ", "cric cric cric");
    expect(result.correct).toBe(true);
  });

  it("returns correct=false for empty answer", () => {
    const result = checkCompletion("", "primavera");
    expect(result.correct).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// checkAnswer (dispatcher)
// ---------------------------------------------------------------------------

describe("checkAnswer", () => {
  it("dispatches to checkMultipleChoice for identification", () => {
    const result = checkAnswer("identification", "Metáfora", "Metáfora");
    expect(result.correct).toBe(true);
  });

  it("dispatches to checkCompletion for completion", () => {
    const result = checkAnswer("completion", "primavera", "primavera");
    expect(result.correct).toBe(true);
  });

  it("returns correct=false for null/undefined user answer", () => {
    const result = checkAnswer("identification", "", "Metáfora");
    expect(result.correct).toBe(false);
  });

  it("returns correct=false for null/undefined correct answer", () => {
    const result = checkAnswer("identification", "Metáfora", "");
    expect(result.correct).toBe(false);
  });

  it("returns normalized answers in result", () => {
    const result = checkAnswer("completion", "  Cric Cric  ", "cric cric");
    expect(result.correct).toBe(true);
    expect(result.userAnswer).toBe("cric cric");
    expect(result.correctAnswer).toBe("cric cric");
  });
});
