import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the db module before importing the module under test
vi.mock("@/db", () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
  },
}));

// Mock the progress helpers
vi.mock("@/lib/exercises/get-progress", () => ({
  getUserProgress: vi.fn(),
  getSavedWritings: vi.fn(),
  computeProgressSummary: vi.fn(),
}));

import { db } from "@/db";
import {
  getTeacherClasses,
  getClassStudents,
  getStudentDetail,
} from "./get-class-data";
import {
  getUserProgress,
  getSavedWritings,
  computeProgressSummary,
} from "@/lib/exercises/get-progress";

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// getTeacherClasses
// ---------------------------------------------------------------------------

describe("getTeacherClasses", () => {
  it("returns classes with student counts", async () => {
    const mockRows = [
      { id: 1, name: "1° A", studentCount: 25, createdAt: new Date("2025-01-15") },
      { id: 2, name: "2° B", studentCount: 30, createdAt: new Date("2025-02-01") },
    ];

    const selectChain = {
      from: vi.fn().mockReturnThis(),
      leftJoin: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      groupBy: vi.fn().mockReturnThis(),
      orderBy: vi.fn().mockResolvedValue(mockRows),
    };
    (db.select as ReturnType<typeof vi.fn>).mockReturnValue(selectChain);

    const result = await getTeacherClasses("teacher-uuid-1");

    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 1,
      name: "1° A",
      studentCount: 25,
      createdAt: "2025-01-15T00:00:00.000Z",
    });
    expect(result[1]).toEqual({
      id: 2,
      name: "2° B",
      studentCount: 30,
      createdAt: "2025-02-01T00:00:00.000Z",
    });
  });

  it("returns empty array when teacher has no classes", async () => {
    const selectChain = {
      from: vi.fn().mockReturnThis(),
      leftJoin: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      groupBy: vi.fn().mockReturnThis(),
      orderBy: vi.fn().mockResolvedValue([]),
    };
    (db.select as ReturnType<typeof vi.fn>).mockReturnValue(selectChain);

    const result = await getTeacherClasses("teacher-without-classes");
    expect(result).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// getClassStudents
// ---------------------------------------------------------------------------

describe("getClassStudents", () => {
  it("returns empty array when class has no students", async () => {
    const selectChain = {
      from: vi.fn().mockReturnThis(),
      innerJoin: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      orderBy: vi.fn().mockResolvedValue([]),
    };
    (db.select as ReturnType<typeof vi.fn>).mockReturnValue(selectChain);

    const result = await getClassStudents(999);
    expect(result).toEqual([]);
  });

  it("returns student data with aggregated progress", async () => {
    // Mock profile fetch
    const selectChain = {
      from: vi.fn().mockReturnThis(),
      innerJoin: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      orderBy: vi.fn().mockResolvedValue([
        { id: "student-1", displayName: "Ana García", email: "ana@test.com" },
        { id: "student-2", displayName: "Luis Pérez", email: "luis@test.com" },
      ]),
    };
    (db.select as ReturnType<typeof vi.fn>).mockReturnValue(selectChain);

    // Mock progress helpers
    vi.mocked(getUserProgress).mockResolvedValue([]);
    vi.mocked(getSavedWritings).mockResolvedValue([]);
    vi.mocked(computeProgressSummary).mockReturnValue({
      totalExercises: 10,
      totalCorrect: 8,
      accuracy: 80,
      figuresPracticed: 3,
      savedTexts: 2,
    });

    const result = await getClassStudents(1);

    expect(result).toHaveLength(2);
    expect(result[0]).toMatchObject({
      id: "student-1",
      displayName: "Ana García",
      email: "ana@test.com",
    });
    expect(result[0].accuracy).toBe(80);
    expect(result[0].totalExercises).toBe(10);
  });
});

// ---------------------------------------------------------------------------
// getStudentDetail
// ---------------------------------------------------------------------------

describe("getStudentDetail", () => {
  it("fetches student profile, progress, and saved writings", async () => {
    // Mock profile query
    const profileChain = {
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue([
        { id: "student-1", displayName: "Ana García", email: "ana@test.com" },
      ]),
    };
    (db.select as ReturnType<typeof vi.fn>).mockReturnValue(profileChain);

    vi.mocked(getUserProgress).mockResolvedValue([
      {
        figureId: 1,
        figureSlug: "metafora",
        figureName: "Metáfora",
        category: "tropo",
        difficultyLevel: 1,
        status: "completed",
        exercisesCompleted: 10,
        exercisesCorrect: 8,
        lastPracticedAt: "2025-03-15T10:00:00.000Z",
        accuracy: 80,
      },
    ]);
    vi.mocked(getSavedWritings).mockResolvedValue([
      { id: 1, title: "Mi texto", wordCount: 120, savedAt: "2025-03-20T10:00:00.000Z" },
    ]);
    vi.mocked(computeProgressSummary).mockReturnValue({
      totalExercises: 10,
      totalCorrect: 8,
      accuracy: 80,
      figuresPracticed: 1,
      savedTexts: 1,
    });

    const result = await getStudentDetail("student-1");

    expect(result.profile).toMatchObject({
      id: "student-1",
      displayName: "Ana García",
    });
    expect(result.summary.totalExercises).toBe(10);
    expect(result.figureProgress).toHaveLength(1);
    expect(result.savedWritings).toHaveLength(1);
  });

  it("throws when student is not found", async () => {
    const profileChain = {
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue([]),
    };
    (db.select as ReturnType<typeof vi.fn>).mockReturnValue(profileChain);

    await expect(getStudentDetail("nonexistent-id")).rejects.toThrow(
      "Student not found: nonexistent-id",
    );
  });
});
