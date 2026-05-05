import { createClient } from "@/lib/auth/server";
import { redirect } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { profiles } from "@/db/schema";
import { getTeacherClasses, getClassStudents } from "@/lib/teacher/get-class-data";
import { TeacherDashboardClient } from "./teacher-dashboard-client";
import type { ClassStudentData } from "@/lib/teacher/get-class-data";

// ---------------------------------------------------------------------------
// TeacherDashboardPage — role-gated server component
// ---------------------------------------------------------------------------

export default async function TeacherDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
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
  const [profile] = await db
    .select({ role: profiles.role })
    .from(profiles)
    .where(eq(profiles.id, user.id))
    .limit(1);

  if (!profile || profile.role !== "teacher") {
    return (
      <div className="min-h-screen bg-gray-50/60">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 shadow-sm">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <svg
                className="h-6 w-6 text-amber-600"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
            <h1 className="text-lg font-semibold text-gray-900">
              {t("notTeacher")}
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              {t("notTeacherDescription")}
            </p>
            <a
              href={`/${locale}/progress`}
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-500"
            >
              {t("goToProgress")}
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Fetch teacher data
  const teacherClasses = await getTeacherClasses(user.id);

  // Fetch student data for each class
  const classStudentsMap: Record<number, ClassStudentData[]> = {};
  for (const cls of teacherClasses) {
    classStudentsMap[cls.id] = await getClassStudents(cls.id);
  }

  return (
    <TeacherDashboardClient
      classes={teacherClasses}
      classStudentsMap={classStudentsMap}
      locale={locale as "es" | "en"}
    />
  );
}
