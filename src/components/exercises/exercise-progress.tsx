"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// ExerciseProgress — enhanced progress dashboard
//
// Backward compatible: when only `progress` is passed, renders the original
// per-figure completion bars. When extended props are included, renders the
// full dashboard with summary stats, per-figure grid, and saved writings.
// ---------------------------------------------------------------------------

export interface FigureProgress {
  figureSlug: string;
  figureName: string;
  completed: number;
  total: number;
}

export interface ExtendedFigureProgress {
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

export interface SavedWritingEntry {
  id: number;
  title: string | null;
  wordCount: number;
  savedAt: string;
}

export interface ProgressStats {
  totalExercises: number;
  accuracy: number;
  figuresPracticed: number;
  savedTexts: number;
}

export interface ExerciseProgressProps {
  /** Backward-compatible per-figure completion data */
  progress: FigureProgress[];
  className?: string;
  /** Optional dashboard data — when present, renders the full dashboard */
  extendedProgress?: ExtendedFigureProgress[];
  stats?: ProgressStats;
  savedWritings?: SavedWritingEntry[];
  locale?: "es" | "en";
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatDate(iso: string, locale: string): string {
  try {
    return new Date(iso).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso;
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

function statusLabel(
  status: "not_started" | "in_progress" | "completed",
  locale: string,
): string {
  if (locale === "es") {
    switch (status) {
      case "completed": return "Completado";
      case "in_progress": return "En progreso";
      default: return "Sin empezar";
    }
  }
  switch (status) {
    case "completed": return "Completed";
    case "in_progress": return "In progress";
    default: return "Not started";
  }
}

function statusColorClass(status: "not_started" | "in_progress" | "completed"): string {
  switch (status) {
    case "completed": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "in_progress": return "bg-amber-100 text-amber-700 border-amber-200";
    default: return "bg-gray-100 text-gray-500 border-gray-200";
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ExerciseProgress({
  progress,
  className,
  extendedProgress,
  stats,
  savedWritings,
  locale = "es",
}: ExerciseProgressProps) {
  // Backward-compatible rendering — just the per-figure list
  if (!extendedProgress || !stats) {
    return <LegacyProgress progress={progress} className={className} />;
  }

  const t = locale === "es"
    ? {
        overallTitle: "Resumen general",
        totalExercises: "Ejercicios",
        accuracy: "Precisión",
        figuresPracticed: "Figuras",
        savedTexts: "Textos guardados",
        perFigureTitle: "Figuras retóricas",
        exercises: "ejercicios",
        lastPracticed: "Última práctica",
        savedWritingsTitle: "Tus textos guardados",
        savedWritingsEmpty: "Aún no has guardado ningún texto.",
        words: "palabras",
        savedOn: "Guardado",
        emptyTitle: "Comienza a practicar",
        emptyDescription:
          "Aún no has completado ejercicios ni guardado textos. ¡Explora las figuras retóricas y empieza tu aprendizaje!",
        emptyLink: "Ir a ejercicios",
      }
    : {
        overallTitle: "Overall summary",
        totalExercises: "Exercises",
        accuracy: "Accuracy",
        figuresPracticed: "Figures",
        savedTexts: "Saved texts",
        perFigureTitle: "Rhetorical figures",
        exercises: "exercises",
        lastPracticed: "Last practiced",
        savedWritingsTitle: "Your saved texts",
        savedWritingsEmpty: "You haven't saved any texts yet.",
        words: "words",
        savedOn: "Saved",
        emptyTitle: "Start practicing",
        emptyDescription:
          "You haven't completed any exercises or saved any texts yet. Explore rhetorical figures and start learning!",
        emptyLink: "Go to exercises",
      };

  const hasData =
    extendedProgress.length > 0 || (savedWritings && savedWritings.length > 0);

  if (!hasData) {
    return (
      <div className={cn("rounded-xl border border-dashed border-gray-200 bg-white/50 p-12 text-center", className)}>
        <div className="mx-auto max-w-sm">
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-gray-100 p-3">
              <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
            </div>
          </div>
          <h3 className="text-base font-semibold text-gray-900">{t.emptyTitle}</h3>
          <p className="mt-2 text-sm text-gray-500">{t.emptyDescription}</p>
          <a
            href={`/${locale}/exercises`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 hover:text-emerald-500"
          >
            {t.emptyLink}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-8", className)}>
      {/* ----------------------------------------------------------------- */}
      {/* Overall stats bar                                               */}
      {/* ----------------------------------------------------------------- */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-gray-900">{t.overallTitle}</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard
            label={t.totalExercises}
            value={String(stats.totalExercises)}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342" />
              </svg>
            }
          />
          <StatCard
            label={t.accuracy}
            value={`${stats.accuracy}%`}
            valueClass={accuracyColorClass(stats.accuracy)}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
            }
          />
          <StatCard
            label={t.figuresPracticed}
            value={String(stats.figuresPracticed)}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
              </svg>
            }
          />
          <StatCard
            label={t.savedTexts}
            value={String(stats.savedTexts)}
            icon={
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            }
          />
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Per-figure grid                                                  */}
      {/* ----------------------------------------------------------------- */}
      {extendedProgress.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold text-gray-900">{t.perFigureTitle}</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {extendedProgress.map((fig) => (
              <div
                key={fig.figureSlug}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
              >
                {/* Header: name + status badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {fig.figureName}
                    </h3>
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
                    {statusLabel(fig.status, locale)}
                  </span>
                </div>

                {/* Completion bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{fig.exercisesCompleted} {t.exercises}</span>
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
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Saved writings                                                   */}
      {/* ----------------------------------------------------------------- */}
      {savedWritings && savedWritings.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold text-gray-900">{t.savedWritingsTitle}</h2>
          <div className="space-y-2">
            {savedWritings.map((w) => (
              <div
                key={w.id}
                className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900">
                    {w.title || `Texto #${w.id}`}
                  </p>
                  <p className="text-xs text-gray-400">
                    {w.wordCount} {t.words} &middot; {t.savedOn}{" "}
                    {formatDate(w.savedAt, locale)}
                  </p>
                </div>
                <svg
                  className="ml-2 h-4 w-4 shrink-0 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                  />
                </svg>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatCard({
  label,
  value,
  valueClass,
  icon,
}: {
  label: string;
  value: string;
  valueClass?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center gap-2 text-gray-400">{icon}</div>
      <p className={cn("mt-2 text-2xl font-bold tracking-tight", valueClass ?? "text-gray-900")}>
        {value}
      </p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Legacy mode — original rendering for backward compatibility
// ---------------------------------------------------------------------------

function LegacyProgress({
  progress,
  className,
}: {
  progress: FigureProgress[];
  className?: string;
}) {
  const totalCompleted = progress.reduce((sum, p) => sum + p.completed, 0);
  const totalExercises = progress.reduce((sum, p) => sum + p.total, 0);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Overall summary */}
      <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Progreso general</span>
          <span className="text-sm font-medium text-gray-900">
            {totalCompleted} / {totalExercises}
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className="h-full rounded-full bg-emerald-400 transition-all duration-500"
            style={{
              width:
                totalExercises > 0
                  ? `${Math.round((totalCompleted / totalExercises) * 100)}%`
                  : "0%",
            }}
          />
        </div>
      </div>

      {/* Per-figure list */}
      <div className="space-y-1">
        {progress.map((p) => (
          <div
            key={p.figureSlug}
            className="flex items-center justify-between rounded-md px-3 py-2 text-sm hover:bg-gray-50"
          >
            <span className="text-gray-700">{p.figureName}</span>
            <span
              className={cn(
                "text-xs font-medium",
                p.completed === p.total && p.total > 0
                  ? "text-emerald-600"
                  : "text-gray-400",
              )}
            >
              {p.completed}/{p.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
