import React from "react";
import type { FigureMatch } from "@/lib/ai/schemas";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// AnalysisResultCard
// ---------------------------------------------------------------------------

export interface AnalysisResultCardProps {
  match: FigureMatch;
}

export function AnalysisResultCard({ match }: AnalysisResultCardProps) {
  const confidenceLabel =
    match.confidence >= 0.7
      ? "alta"
      : match.confidence >= 0.4
        ? "media"
        : "baja";

  return (
    <article className="rounded-lg border border-gray-100 bg-white p-4 shadow-xs transition-shadow hover:shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-gray-900">
            {match.figureName}
          </h4>
          <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
            {match.explanation}
          </p>
        </div>

        <span
          className={cn(
            "inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-xs font-medium",
            match.confidence >= 0.7 && "bg-emerald-50 text-emerald-700",
            match.confidence >= 0.4 &&
              match.confidence < 0.7 &&
              "bg-amber-50 text-amber-700",
            match.confidence < 0.4 && "bg-gray-50 text-gray-500",
          )}
          title={`Confianza ${confidenceLabel} (${Math.round(match.confidence * 100)}%)`}
        >
          {Math.round(match.confidence * 100)}%
        </span>
      </div>

      {match.alternative && (
        <p className="mt-2 border-t border-gray-50 pt-2 text-xs italic text-gray-400">
          {match.alternative}
        </p>
      )}
    </article>
  );
}
