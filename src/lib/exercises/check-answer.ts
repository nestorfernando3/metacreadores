// ---------------------------------------------------------------------------
// Answer checking for exercises
// ---------------------------------------------------------------------------

export interface CheckAnswerResult {
  correct: boolean;
  userAnswer: string;
  correctAnswer: string;
}

/**
 * Normalize a string for comparison: trim, lowercase, collapse internal whitespace.
 */
export function normalize(input: string): string {
  return input.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Check a multiple-choice answer (exact match against correctAnswer).
 */
export function checkMultipleChoice(
  userAnswer: string,
  correctAnswer: string,
): CheckAnswerResult {
  const normalized = normalize(userAnswer);
  const expected = normalize(correctAnswer);
  return {
    correct: normalized === expected,
    userAnswer: normalized,
    correctAnswer: expected,
  };
}

/**
 * Check a completion (fill-in-the-blank) answer — normalized match.
 */
export function checkCompletion(
  userAnswer: string,
  correctAnswer: string,
): CheckAnswerResult {
  const normalized = normalize(userAnswer);
  const expected = normalize(correctAnswer);
  return {
    correct: normalized === expected,
    userAnswer: normalized,
    correctAnswer: expected,
  };
}

/**
 * Check an answer based on exercise type.
 */
export function checkAnswer(
  type: "identification" | "completion",
  userAnswer: string,
  correctAnswer: string,
): CheckAnswerResult {
  if (!userAnswer || !correctAnswer) {
    return {
      correct: false,
      userAnswer: normalize(userAnswer ?? ""),
      correctAnswer: normalize(correctAnswer ?? ""),
    };
  }

  switch (type) {
    case "identification":
      return checkMultipleChoice(userAnswer, correctAnswer);
    case "completion":
      return checkCompletion(userAnswer, correctAnswer);
  }
}
