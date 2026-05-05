import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the db module
vi.mock("@/db", () => ({
  db: {
    insert: vi.fn(),
    select: vi.fn(),
  },
}));

import { db } from "@/db";
import { assignFigureToStudent, assignFigureToClass } from "./assign-figure";

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

beforeEach(() => {
  vi.clearAllMocks();
});

// ---------------------------------------------------------------------------
// assignFigureToStudent
// ---------------------------------------------------------------------------

describe("assignFigureToStudent", () => {
  it("inserts a single assignment and returns it", async () => {
    const mockReturned = [
      {
        id: 1,
        classId: 5,
        figureId: 3,
        studentId: "student-uuid",
        assignedBy: "teacher-uuid",
        dueDate: null,
        createdAt: new Date("2025-04-01"),
      },
    ];

    const insertChain = {
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue(mockReturned),
    };
    (db.insert as ReturnType<typeof vi.fn>).mockReturnValue(insertChain);

    const result = await assignFigureToStudent(
      3,
      5,
      "student-uuid",
      "teacher-uuid",
    );

    expect(result).toMatchObject({
      id: 1,
      classId: 5,
      figureId: 3,
      studentId: "student-uuid",
      assignedBy: "teacher-uuid",
    });
  });

  it("accepts optional dueDate", async () => {
    const mockReturned = [
      {
        id: 2,
        classId: 5,
        figureId: 3,
        studentId: "student-uuid",
        assignedBy: "teacher-uuid",
        dueDate: new Date("2025-05-01"),
        createdAt: new Date("2025-04-01"),
      },
    ];

    const insertChain = {
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue(mockReturned),
    };
    (db.insert as ReturnType<typeof vi.fn>).mockReturnValue(insertChain);

    const result = await assignFigureToStudent(
      3,
      5,
      "student-uuid",
      "teacher-uuid",
      "2025-05-01",
    );

    // dueDate is a Date object internally — check that values was called
    expect(insertChain.values).toHaveBeenCalledWith(
      expect.objectContaining({
        dueDate: expect.any(Date),
      }),
    );
    expect(result.dueDate).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// assignFigureToClass
// ---------------------------------------------------------------------------

describe("assignFigureToClass", () => {
  it("fetches class students and inserts assignments for each", async () => {
    const selectChain = {
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockResolvedValue([
        { id: "student-1" },
        { id: "student-2" },
        { id: "student-3" },
      ]),
    };
    (db.select as ReturnType<typeof vi.fn>).mockReturnValue(selectChain);

    const mockReturned = [
      { id: 1, classId: 5, figureId: 3, studentId: "student-1", assignedBy: "teacher-uuid", dueDate: null, createdAt: new Date() },
      { id: 2, classId: 5, figureId: 3, studentId: "student-2", assignedBy: "teacher-uuid", dueDate: null, createdAt: new Date() },
      { id: 3, classId: 5, figureId: 3, studentId: "student-3", assignedBy: "teacher-uuid", dueDate: null, createdAt: new Date() },
    ];

    const insertChain = {
      values: vi.fn().mockReturnThis(),
      returning: vi.fn().mockResolvedValue(mockReturned),
    };
    (db.insert as ReturnType<typeof vi.fn>).mockReturnValue(insertChain);

    const results = await assignFigureToClass(3, 5, "teacher-uuid");

    expect(results).toHaveLength(3);
    expect(results[0].studentId).toBe("student-1");
    expect(results[2].studentId).toBe("student-3");
  });

  it("returns empty array when class has no students", async () => {
    const selectChain = {
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockResolvedValue([]),
    };
    (db.select as ReturnType<typeof vi.fn>).mockReturnValue(selectChain);

    const results = await assignFigureToClass(3, 999, "teacher-uuid");
    expect(results).toEqual([]);
    // Ensure no insert was called
    expect(db.insert).not.toHaveBeenCalled();
  });
});
