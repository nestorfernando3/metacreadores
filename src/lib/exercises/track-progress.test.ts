import { describe, it, expect, beforeEach, vi } from "vitest";
import { trackProgress, createInitialProgress } from "./track-progress";

// ---------------------------------------------------------------------------
// createInitialProgress
// ---------------------------------------------------------------------------

describe("createInitialProgress", () => {
  it("returns zero counters and null date", () => {
    const progress = createInitialProgress();
    expect(progress.exercisesCompleted).toBe(0);
    expect(progress.exercisesCorrect).toBe(0);
    expect(progress.lastPracticedAt).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// trackProgress
// ---------------------------------------------------------------------------

describe("trackProgress", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2025-06-01T12:00:00Z"));
  });

  it("increments exercisesCompleted on correct answer", () => {
    const current = createInitialProgress();
    const result = trackProgress(current, true);

    expect(result.exercisesCompleted).toBe(1);
    expect(result.exercisesCorrect).toBe(1);
    expect(result.lastPracticedAt).toBe("2025-06-01T12:00:00.000Z");
  });

  it("increments exercisesCompleted but not exercisesCorrect on incorrect answer", () => {
    const current = createInitialProgress();
    const result = trackProgress(current, false);

    expect(result.exercisesCompleted).toBe(1);
    expect(result.exercisesCorrect).toBe(0);
  });

  it("accumulates multiple attempts", () => {
    const initial = createInitialProgress();

    const afterFirst = trackProgress(initial, true);
    const afterSecond = trackProgress(afterFirst, false);
    const afterThird = trackProgress(afterSecond, true);

    expect(afterThird.exercisesCompleted).toBe(3);
    expect(afterThird.exercisesCorrect).toBe(2);
  });

  it("updates lastPracticedAt each time", () => {
    vi.setSystemTime(new Date("2025-06-01T12:00:00Z"));
    const first = trackProgress(createInitialProgress(), true);
    expect(first.lastPracticedAt).toBe("2025-06-01T12:00:00.000Z");

    vi.setSystemTime(new Date("2025-06-02T08:00:00Z"));
    const second = trackProgress(first, false);
    expect(second.lastPracticedAt).toBe("2025-06-02T08:00:00.000Z");
  });

  it("preserves correct count across multiple updates", () => {
    const initial = createInitialProgress();
    const r1 = trackProgress(initial, true);
    const r2 = trackProgress(r1, true);
    const r3 = trackProgress(r2, false);

    expect(r3.exercisesCompleted).toBe(3);
    expect(r3.exercisesCorrect).toBe(2); // Two correct out of three
  });
});
