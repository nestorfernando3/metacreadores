"use client";

import React, { useCallback } from "react";
import { useRouter } from "@/i18n/routing";
import { StudentProgressCard } from "@/components/teacher/student-progress-card";
import { AssignmentForm } from "@/components/teacher/assignment-form";
import type { StudentDetail } from "@/lib/teacher/get-class-data";
import type { FigureOption } from "@/components/teacher/assignment-form";

// ---------------------------------------------------------------------------
// StudentDetailClient — client component for individual student drill-down
// ---------------------------------------------------------------------------

export interface StudentDetailClientProps {
  studentDetail: StudentDetail;
  figureOptions: FigureOption[];
  locale: "es" | "en";
}

export function StudentDetailClient({
  studentDetail,
  figureOptions,
  locale,
}: StudentDetailClientProps) {
  const router = useRouter();
  const { profile, figureProgress, savedWritings, summary } = studentDetail;

  const t =
    locale === "es"
      ? {
          back: "Volver al panel",
          studentTitle: "Estudiante",
          overview: "Resumen general",
          exercises: "Ejercicios",
          accuracy: "Precisión",
          figuresPracticed: "Figuras practicadas",
          savedTexts: "Textos guardados",
          savedWritingsTitle: "Textos guardados",
          noWritings: "Este estudiante aún no ha guardado ningún texto.",
          words: "palabras",
          savedOn: "Guardado",
          assignSection: "Asignar figura",
          lastActive: "Última actividad",
          never: "Nunca",
        }
      : {
          back: "Back to dashboard",
          studentTitle: "Student",
          overview: "Overall summary",
          exercises: "Exercises",
          accuracy: "Accuracy",
          figuresPracticed: "Figures practiced",
          savedTexts: "Saved texts",
          savedWritingsTitle: "Saved texts",
          noWritings: "This student hasn't saved any texts yet.",
          words: "words",
          savedOn: "Saved",
          assignSection: "Assign figure",
          lastActive: "Last active",
          never: "Never",
        };

  const lastActive =
    figureProgress.length > 0
      ? figureProgress
          .filter((p) => p.lastPracticedAt !== null)
          .sort(
            (a, b) =>
              new Date(b.lastPracticedAt!).getTime() -
              new Date(a.lastPracticedAt!).getTime(),
          )[0]?.lastPracticedAt ?? null
      : null;

  const handleAssign = useCallback(
    async (data: { figureId: number; studentId?: string; dueDate?: string }) => {
      const res = await fetch("/api/teacher/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          figureId: data.figureId,
          classId: 0, // resolved from context in production
          studentId: data.studentId || profile.id,
          dueDate: data.dueDate,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to assign figure");
      }
    },
    [profile.id],
  );

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header with back link */}
        <div className="mb-6">
          <button
            onClick={() => router.push("/teacher")}
            className="inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-500"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            {t.back}
          </button>
        </div>

        {/* Student info */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {t.studentTitle}: {profile.displayName || profile.email}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{profile.email}</p>
          {lastActive && (
            <p className="mt-1 text-xs text-gray-400">
              {t.lastActive}: {formatDate(lastActive, locale)}
            </p>
          )}
        </div>

        {/* Overview stats */}
        <section className="mb-8">
          <h2 className="mb-3 text-sm font-semibold text-gray-900">
            {t.overview}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard label={t.exercises} value={String(summary.totalExercises)} />
            <StatCard
              label={t.accuracy}
              value={`${summary.accuracy}%`}
              valueClass={accuracyColorClass(summary.accuracy)}
            />
            <StatCard
              label={t.figuresPracticed}
              value={String(summary.figuresPracticed)}
            />
            <StatCard label={t.savedTexts} value={String(summary.savedTexts)} />
          </div>
        </section>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main: figure progress grid */}
          <div className="lg:col-span-2 space-y-8">
            <StudentProgressCard
              figureProgress={figureProgress}
              locale={locale}
            />

            {/* Saved writings */}
            <section>
              <h2 className="mb-3 text-sm font-semibold text-gray-900">
                {t.savedWritingsTitle}
              </h2>
              {savedWritings.length > 0 ? (
                <div className="space-y-2">
                  {savedWritings.map((w) => (
                    <div
                      key={w.id}
                      className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {w.title || `#${w.id}`}
                        </p>
                        <p className="text-xs text-gray-400">
                          {w.wordCount} {t.words} &middot; {t.savedOn}{" "}
                          {formatDate(w.savedAt, locale)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">{t.noWritings}</p>
              )}
            </section>
          </div>

          {/* Sidebar: assignment form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="mb-3 text-sm font-semibold text-gray-900">
                {t.assignSection}
              </h2>
              <AssignmentForm
                figures={figureOptions}
                classId={0}
                locale={locale}
                onSubmit={handleAssign}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components & helpers
// ---------------------------------------------------------------------------

function StatCard({
  label,
  value,
  valueClass,
}: {
  label: string;
  value: string;
  valueClass?: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <p className={`mt-1 text-2xl font-bold tracking-tight ${valueClass ?? "text-gray-900"}`}>
        {value}
      </p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function accuracyColorClass(accuracy: number): string {
  if (accuracy >= 80) return "text-emerald-600";
  if (accuracy >= 50) return "text-amber-600";
  return "text-rose-600";
}

function formatDate(iso: string, locale: string): string {
  try {
    return new Date(iso).toLocaleDateString(
      locale === "es" ? "es-ES" : "en-US",
      { year: "numeric", month: "short", day: "numeric" },
    );
  } catch {
    return iso;
  }
}
