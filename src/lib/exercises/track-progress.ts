// ---------------------------------------------------------------------------
// Progress tracking for exercises
// ---------------------------------------------------------------------------

export interface ProgressState {
  exercisesCompleted: number;
  exercisesCorrect: number;
  lastPracticedAt: string | null;
}

/**
 * Track an exercise attempt by updating progress counters.
 *
 * In a real environment this writes to the database. For now it returns
 * the derived progress state so callers can persist it.
 *
 * @param currentProgress - Current progress state (from user_progress row or default)
 * @param isCorrect - Whether the answer was correct
 * @returns Updated progress state
 */
export function trackProgress(
  currentProgress: Pick<
    ProgressState,
    "exercisesCompleted" | "exercisesCorrect" | "lastPracticedAt"
  >,
  isCorrect: boolean,
): ProgressState {
  return {
    exercisesCompleted: currentProgress.exercisesCompleted + 1,
    exercisesCorrect:
      currentProgress.exercisesCorrect + (isCorrect ? 1 : 0),
    lastPracticedAt: new Date().toISOString(),
  };
}

/**
 * Build a default progress state for a figure that hasn't been practiced yet.
 */
export function createInitialProgress(): ProgressState {
  return {
    exercisesCompleted: 0,
    exercisesCorrect: 0,
    lastPracticedAt: null,
  };
}
