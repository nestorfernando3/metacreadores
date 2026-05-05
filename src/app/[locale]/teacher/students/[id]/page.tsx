import { createClient } from "@/lib/auth/server";
import { redirect } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { profiles, figures } from "@/db/schema";
import { getStudentDetail } from "@/lib/teacher/get-class-data";
import { StudentDetailClient } from "./student-detail-client";
import type { FigureOption } from "@/components/teacher/assignment-form";

// ---------------------------------------------------------------------------
// StudentDetailPage — server component for individual student drill-down
// ---------------------------------------------------------------------------

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id: studentId } = await params;
  const t = await getTranslations("teacher");

  // Auth guard
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect({ href: "/login", locale });
    return;
  }

  // Role guard
  const [currentProfile] = await db
    .select({ role: profiles.role })
    .from(profiles)
    .where(eq(profiles.id, user.id))
    .limit(1);

  if (!currentProfile || currentProfile.role !== "teacher") {
    redirect({ href: "/teacher", locale });
    return;
  }

  // Fetch student detail
  let studentDetail;
  try {
    studentDetail = await getStudentDetail(studentId);
  } catch {
    notFound();
    return;
  }

  // Fetch all figures for the assignment dropdown
  const allFigures = await db
    .select({
      id: figures.id,
      name: figures.name,
      category: figures.category,
    })
    .from(figures)
    .orderBy(figures.name);

  const figureOptions: FigureOption[] = allFigures;

  return (
    <StudentDetailClient
      studentDetail={studentDetail}
      figureOptions={figureOptions}
      locale={locale as "es" | "en"}
    />
  );
}
