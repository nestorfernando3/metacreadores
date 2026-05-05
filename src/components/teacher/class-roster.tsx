"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { ClassStudentData } from "@/lib/teacher/get-class-data";

// ---------------------------------------------------------------------------
// ClassRoster — table of students with aggregated progress summary
// ---------------------------------------------------------------------------

export interface ClassRosterProps {
  students: ClassStudentData[];
  locale?: "es" | "en";
  onStudentClick?: (studentId: string) => void;
  className?: string;
}

export function ClassRoster({
  students,
  locale = "es",
  onStudentClick,
  className,
}: ClassRosterProps) {
  const t =
    locale === "es"
      ? {
          name: "Nombre",
          email: "Correo",
          exercises: "Ejercicios",
          accuracy: "Precisión",
          figures: "Figuras",
          lastActive: "Última actividad",
          empty: "No hay estudiantes en esta clase.",
          never: "Nunca",
        }
      : {
          name: "Name",
          email: "Email",
          exercises: "Exercises",
          accuracy: "Accuracy",
          figures: "Figures",
          lastActive: "Last active",
          empty: "No students in this class.",
          never: "Never",
        };

  if (students.length === 0) {
    return (
      <div
        className={cn(
          "rounded-lg border border-dashed border-gray-200 bg-white/50 p-8 text-center text-sm text-gray-400",
          className,
        )}
      >
        {t.empty}
      </div>
    );
  }

  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr className="text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
            <th className="px-4 py-3">{t.name}</th>
            <th className="px-4 py-3">{t.exercises}</th>
            <th className="px-4 py-3">{t.accuracy}</th>
            <th className="px-4 py-3">{t.figures}</th>
            <th className="px-4 py-3">{t.lastActive}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {students.map((s) => (
            <tr
              key={s.id}
              onClick={() => onStudentClick?.(s.id)}
              className={cn(
                "transition-colors",
                onStudentClick
                  ? "cursor-pointer hover:bg-gray-50"
                  : undefined,
              )}
            >
              <td className="whitespace-nowrap px-4 py-3">
                <p className="text-sm font-medium text-gray-900">
                  {s.displayName || s.email}
                </p>
                {s.displayName && (
                  <p className="text-xs text-gray-400">{s.email}</p>
                )}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                {s.totalExercises}
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                <span
                  className={cn(
                    "text-sm font-medium",
                    accuracyColorClass(s.accuracy),
                  )}
                >
                  {s.accuracy}%
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
                {s.figuresPracticed}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-400">
                {s.lastActive ? formatDate(s.lastActive, locale) : t.never}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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
