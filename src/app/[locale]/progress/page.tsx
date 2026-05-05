import { createClient } from "@/lib/auth/server";
import { redirect } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import {
  getUserProgress,
  getSavedWritings,
  computeProgressSummary,
} from "@/lib/exercises/get-progress";
import { ExerciseProgress } from "@/components/exercises/exercise-progress";
import type { ExtendedFigureProgress, SavedWritingEntry, ProgressStats } from "@/components/exercises/exercise-progress";

// ---------------------------------------------------------------------------
// ProgressPage
//
// Server-rendered dashboard with auth guard. Fetches progress data and saved
// writings from the database, then renders the enhanced ExerciseProgress
// client component.
// ---------------------------------------------------------------------------

export default async function ProgressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("progress");

  // Auth guard — redirect to login if not authenticated
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect({ href: "/login", locale });
    return; // unreachable — keeps TypeScript happy
  }

  // Fetch data in parallel
  const [figureProgress, savedWritings] = await Promise.all([
    getUserProgress(user.id),
    getSavedWritings(user.id),
  ]);

  const stats = computeProgressSummary(figureProgress, savedWritings.length);

  // Prepare props for the client component
  const extendedProgress: ExtendedFigureProgress[] = figureProgress;
  const writings: SavedWritingEntry[] = savedWritings;
  const progressStats: ProgressStats = stats;

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {t("title")}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{t("description")}</p>
        </div>

        {/* Responsive layout: stacked on mobile, side-by-side on desktop */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main content — stats + per-figure grid */}
          <div className="lg:col-span-2">
            <ExerciseProgress
              progress={[]}
              extendedProgress={extendedProgress}
              stats={progressStats}
              savedWritings={writings}
              locale={locale as "es" | "en"}
            />
          </div>

          {/* Sidebar — saved writings */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h2 className="mb-3 text-sm font-semibold text-gray-900">
                {t("savedWritings.title")}
              </h2>
              {writings.length > 0 ? (
                <div className="space-y-2">
                  {writings.map((w) => (
                    <div
                      key={w.id}
                      className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm"
                    >
                      <p className="truncate text-sm font-medium text-gray-900">
                        {w.title || `#${w.id}`}
                      </p>
                      <p className="text-xs text-gray-400">
                        {w.wordCount} {t("savedWritings.words")}
                      </p>
                      <p className="text-[11px] text-gray-400">
                        {t("savedWritings.savedAt")}:{" "}
                        {formatDate(w.savedAt, locale)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  {t("savedWritings.empty")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

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
