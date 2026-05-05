// ---------------------------------------------------------------------------
// Teacher data fetching — classes, students, and aggregated progress
// ---------------------------------------------------------------------------

import { eq, desc, sql, and } from "drizzle-orm";
import { db } from "@/db";
import {
  classes,
  classStudents,
  assignments,
  profiles,
  figures,
  userProgress,
  writingSubmissions,
} from "@/db/schema";
import {
  getUserProgress,
  getSavedWritings,
  computeProgressSummary,
  type FigureProgressData,
  type SavedWritingData,
  type ProgressSummary,
} from "@/lib/exercises/get-progress";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface TeacherClassData {
  id: number;
  name: string;
  studentCount: number;
  createdAt: string;
}

export interface ClassStudentData {
  id: string; // profile UUID
  displayName: string | null;
  email: string;
  totalExercises: number;
  totalCorrect: number;
  accuracy: number;
  figuresPracticed: number;
  lastActive: string | null;
}

// ---------------------------------------------------------------------------
// getTeacherClasses — fetch all classes for a teacher with student counts
// ---------------------------------------------------------------------------

export async function getTeacherClasses(
  teacherId: string,
): Promise<TeacherClassData[]> {
  const rows = await db
    .select({
      id: classes.id,
      name: classes.name,
      studentCount: sql<number>`count(${classStudents.id})::int`,
      createdAt: classes.createdAt,
    })
    .from(classes)
    .leftJoin(classStudents, eq(classes.id, classStudents.classId))
    .where(eq(classes.teacherId, teacherId))
    .groupBy(classes.id)
    .orderBy(classes.name);

  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    studentCount: r.studentCount ?? 0,
    createdAt: r.createdAt
      ? r.createdAt.toISOString()
      : new Date().toISOString(),
  }));
}

// ---------------------------------------------------------------------------
// getOnlyClassStudents — fetch students in a class with aggregated progress
// ---------------------------------------------------------------------------

export async function getOnlyClassStudents(
  classId: number,
): Promise<
  { id: string; displayName: string | null; email: string }[]
> {
  const rows = await db
    .select({
      id: profiles.id,
      displayName: profiles.displayName,
      email: profiles.email,
    })
    .from(classStudents)
    .innerJoin(profiles, eq(classStudents.studentId, profiles.id))
    .where(eq(classStudents.classId, classId))
    .orderBy(profiles.displayName);

  return rows;
}

// ---------------------------------------------------------------------------
// getClassStudents — fetch students with aggregated progress
// ---------------------------------------------------------------------------

export async function getClassStudents(
  classId: number,
): Promise<ClassStudentData[]> {
  const studentProfiles = await getOnlyClassStudents(classId);

  if (studentProfiles.length === 0) return [];

  const results: ClassStudentData[] = [];

  for (const sp of studentProfiles) {
    const progress = await getUserProgress(sp.id);
    const writings = await getSavedWritings(sp.id);
    const summary = computeProgressSummary(progress, writings.length);

    const lastActive =
      progress.length > 0
        ? progress
            .filter((p) => p.lastPracticedAt !== null)
            .sort(
              (a, b) =>
                new Date(b.lastPracticedAt!).getTime() -
                new Date(a.lastPracticedAt!).getTime(),
            )[0]?.lastPracticedAt ?? null
        : null;

    results.push({
      id: sp.id,
      displayName: sp.displayName,
      email: sp.email,
      totalExercises: summary.totalExercises,
      totalCorrect: summary.totalCorrect,
      accuracy: summary.accuracy,
      figuresPracticed: summary.figuresPracticed,
      lastActive,
    });
  }

  return results;
}

// ---------------------------------------------------------------------------
// getStudentDetail — fetch all user_progress + writing_submissions for a
// student
// ---------------------------------------------------------------------------

export interface StudentDetail {
  profile: { id: string; displayName: string | null; email: string };
  figureProgress: FigureProgressData[];
  savedWritings: SavedWritingData[];
  summary: ProgressSummary;
}

export async function getStudentDetail(
  studentId: string,
): Promise<StudentDetail> {
  const [profile] = await db
    .select({
      id: profiles.id,
      displayName: profiles.displayName,
      email: profiles.email,
    })
    .from(profiles)
    .where(eq(profiles.id, studentId))
    .limit(1);

  if (!profile) {
    throw new Error(`Student not found: ${studentId}`);
  }

  const [figureProgress, savedWritings] = await Promise.all([
    getUserProgress(studentId),
    getSavedWritings(studentId),
  ]);

  const summary = computeProgressSummary(
    figureProgress,
    savedWritings.length,
  );

  return {
    profile,
    figureProgress,
    savedWritings,
    summary,
  };
}
