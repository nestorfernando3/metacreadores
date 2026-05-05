// ---------------------------------------------------------------------------
// Figure assignment helpers — assign figures to students or entire classes
// ---------------------------------------------------------------------------

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { assignments, classStudents } from "@/db/schema";
import type { Assignment, NewAssignment } from "@/db/schema";

// ---------------------------------------------------------------------------
// assignFigureToStudent — insert a single assignment row within a class
// ---------------------------------------------------------------------------

export async function assignFigureToStudent(
  figureId: number,
  classId: number,
  studentId: string,
  assignedBy: string,
  dueDate?: string | null,
): Promise<Assignment> {
  const [row] = await db
    .insert(assignments)
    .values({
      classId,
      figureId,
      studentId,
      assignedBy,
      dueDate: dueDate ? new Date(dueDate) : null,
    })
    .returning();

  return row;
}

// ---------------------------------------------------------------------------
// assignFigureToClass — insert assignments for all students in a class
// ---------------------------------------------------------------------------

export async function assignFigureToClass(
  figureId: number,
  classId: number,
  assignedBy: string,
  dueDate?: string | null,
): Promise<Assignment[]> {
  const students = await db
    .select({ id: classStudents.studentId })
    .from(classStudents)
    .where(eq(classStudents.classId, classId));

  if (students.length === 0) return [];

  const values: NewAssignment[] = students.map((s) => ({
    classId,
    figureId,
    studentId: s.id,
    assignedBy,
    dueDate: dueDate ? new Date(dueDate) : null,
  }));

  const rows = await db.insert(assignments).values(values).returning();
  return rows;
}
