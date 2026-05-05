import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/auth/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { profiles } from "@/db/schema";
import {
  assignFigureToStudent,
  assignFigureToClass,
} from "@/lib/teacher/assign-figure";

// ---------------------------------------------------------------------------
// POST /api/teacher/assign
// Body: { figureId, classId, studentId?, dueDate? }
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  try {
    // Auth guard
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Role guard
    const [profile] = await db
      .select({ role: profiles.role })
      .from(profiles)
      .where(eq(profiles.id, user.id))
      .limit(1);

    if (!profile || profile.role !== "teacher") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { figureId, classId, studentId, dueDate } = body;

    if (!figureId || !classId) {
      return NextResponse.json(
        { error: "figureId and classId are required" },
        { status: 400 },
      );
    }

    if (studentId) {
      const assignment = await assignFigureToStudent(
        figureId,
        classId,
        studentId,
        user.id,
        dueDate,
      );
      return NextResponse.json({ assignment });
    }

    const assignments = await assignFigureToClass(
      figureId,
      classId,
      user.id,
      dueDate,
    );
    return NextResponse.json({ assignments });
  } catch (error) {
    console.error("[api/teacher/assign]", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
