"use client";

import React from "react";
import { useRouter } from "@/i18n/routing";
import { ClassRoster } from "@/components/teacher/class-roster";
import type { TeacherClassData, ClassStudentData } from "@/lib/teacher/get-class-data";

// ---------------------------------------------------------------------------
// TeacherDashboardClient — client component that renders the teacher dashboard
// with class list, rosters, and navigation to student detail pages.
// ---------------------------------------------------------------------------

export interface TeacherDashboardClientProps {
  classes: TeacherClassData[];
  classStudentsMap: Record<number, ClassStudentData[]>;
  locale: "es" | "en";
}

export function TeacherDashboardClient({
  classes,
  classStudentsMap,
  locale,
}: TeacherDashboardClientProps) {
  const router = useRouter();
  const t =
    locale === "es"
      ? {
          title: "Panel docente",
          description: "Gestiona tus clases y sigue el progreso de tus estudiantes.",
          myClasses: "Mis clases",
          noClasses: "Aún no tienes clases creadas.",
          students: "estudiantes",
          studentProgress: "Progreso de estudiantes",
          assign: "Asignar figura",
        }
      : {
          title: "Teacher dashboard",
          description: "Manage your classes and track student progress.",
          myClasses: "My classes",
          noClasses: "You don't have any classes yet.",
          students: "students",
          studentProgress: "Student progress",
          assign: "Assign figure",
        };

  const handleStudentClick = (studentId: string) => {
    router.push(`/teacher/students/${studentId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {t.title}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{t.description}</p>
        </div>

        {classes.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 bg-white/50 p-12 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            </div>
            <p className="text-sm text-gray-500">{t.noClasses}</p>
          </div>
        ) : (
          <div className="space-y-8">
            {classes.map((cls) => {
              const students = classStudentsMap[cls.id] ?? [];
              return (
                <section
                  key={cls.id}
                  className="rounded-xl border border-gray-200 bg-white shadow-sm"
                >
                  {/* Class header */}
                  <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
                    <div>
                      <h2 className="text-base font-semibold text-gray-900">
                        {cls.name}
                      </h2>
                      <p className="text-xs text-gray-400">
                        {students.length} {t.students}
                      </p>
                    </div>
                  </div>

                  {/* Class roster */}
                  {students.length > 0 ? (
                    <div className="px-2 pb-2 pt-2">
                      <ClassRoster
                        students={students}
                        locale={locale}
                        onStudentClick={handleStudentClick}
                      />
                    </div>
                  ) : (
                    <div className="px-6 py-6 text-center text-sm text-gray-400">
                      <p>{t.noClasses}</p>
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
