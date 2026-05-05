"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// StudentProgressCard — per-student figure progress grid (reuses patterns
// from ExerciseProgress but designed for teacher view)
// ---------------------------------------------------------------------------

export interface FigureProgressEntry {
  figureSlug: string;
  figureName: string;
  category: string;
  difficultyLevel: number;
  status: "not_started" | "in_progress" | "completed";
  exercisesCompleted: number;
  exercisesCorrect: number;
  accuracy: number;
  lastPracticedAt: string | null;
}

export interface StudentProgressCardProps {
  figureProgress: FigureProgressEntry[];
  locale?: "es" | "en";
  className?: string;
}

export function StudentProgressCard({
  figureProgress,
  locale = "es",
  className,
}: StudentProgressCardProps) {
  const t =
    locale === "es"
      ? {
          title: "Progreso por figura",
          exercises: "ejercicios",
          lastPracticed: "Última práctica",
          completed: "Completado",
          inProgress: "En progreso",
          notStarted: "Sin empezar",
          empty: "Este estudiante aún no ha practicado ninguna figura.",
        }
      : {
          title: "Progress per figure",
          exercises: "exercises",
          lastPracticed: "Last practiced",
          completed: "Completed",
          inProgress: "In progress",
          notStarted: "Not started",
          empty: "This student has not practiced any figures yet.",
        };

  if (figureProgress.length === 0) {
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
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-semibold text-gray-900">{t.title}</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {figureProgress.map((fig) => (
          <div
            key={fig.figureSlug}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
          >
            {/* Header: name + status badge */}
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {fig.figureName}
                </h4>
                <p className="text-xs text-gray-400 capitalize">
                  {fig.category}
                </p>
              </div>
              <span
                className={cn(
                  "inline-flex shrink-0 items-center rounded-full border px-2 py-0.5 text-[10px] font-medium",
                  statusColorClass(fig.status),
                )}
              >
                {statusLabel(fig.status, locale === "es" ? "es" : "en")}
              </span>
            </div>

            {/* Completion bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>
                  {fig.exercisesCompleted} {t.exercises}
                </span>
                <span className={accuracyColorClass(fig.accuracy)}>
                  {fig.accuracy}%
                </span>
              </div>
              <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    accuracyBgClass(fig.accuracy),
                  )}
                  style={{ width: `${fig.accuracy}%` }}
                />
              </div>
            </div>

            {/* Last practiced */}
            {fig.lastPracticedAt && (
              <p className="mt-2 text-[11px] text-gray-400">
                {t.lastPracticed}: {formatDate(fig.lastPracticedAt, locale)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers (mirroring exercise-progress.tsx patterns)
// ---------------------------------------------------------------------------

function statusColorClass(
  status: "not_started" | "in_progress" | "completed",
): string {
  switch (status) {
    case "completed":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "in_progress":
      return "bg-amber-100 text-amber-700 border-amber-200";
    default:
      return "bg-gray-100 text-gray-500 border-gray-200";
  }
}

function statusLabel(
  status: "not_started" | "in_progress" | "completed",
  locale: string,
): string {
  if (locale === "es") {
    switch (status) {
      case "completed":
        return "Completado";
      case "in_progress":
        return "En progreso";
      default:
        return "Sin empezar";
    }
  }
  switch (status) {
    case "completed":
      return "Completed";
    case "in_progress":
      return "In progress";
    default:
      return "Not started";
  }
}

function accuracyColorClass(accuracy: number): string {
  if (accuracy >= 80) return "text-emerald-600";
  if (accuracy >= 50) return "text-amber-600";
  return "text-rose-600";
}

function accuracyBgClass(accuracy: number): string {
  if (accuracy >= 80) return "bg-emerald-500";
  if (accuracy >= 50) return "bg-amber-500";
  return "bg-rose-500";
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
