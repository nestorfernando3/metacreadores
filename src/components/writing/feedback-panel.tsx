"use client";

import React from "react";
import type { TutorFeedback } from "@/lib/ai/schemas";
import { useTranslations } from "next-intl";

// ---------------------------------------------------------------------------
// FeedbackPanel
// ---------------------------------------------------------------------------

export interface FeedbackPanelProps {
  feedback: TutorFeedback | null;
}

export function FeedbackPanel({ feedback }: FeedbackPanelProps) {
  const t = useTranslations("writing.analysis");

  if (!feedback) return null;

  return (
    <div className="space-y-5">
      {/* Summary */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900">
          {t("summary")}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-gray-600">
          {feedback.summary}
        </p>
      </section>

      {/* Strengths */}
      {feedback.strengths.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-900">
            {t("strengths")}
          </h3>
          <ul className="mt-1.5 space-y-2">
            {feedback.strengths.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="mt-0.5 shrink-0 text-emerald-500">✦</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Suggestions */}
      {feedback.suggestions.length > 0 && (
        <section>
          <h3 className="text-sm font-semibold text-gray-900">
            {t("suggestions")}
          </h3>
          <ul className="mt-1.5 space-y-2">
            {feedback.suggestions.map((s, i) => (
              <li key={i} className="flex gap-2 text-sm text-gray-600">
                <span className="mt-0.5 shrink-0 text-amber-500">→</span>
                <span>{s}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Caution */}
      {feedback.caution && (
        <section className="rounded-lg border border-amber-200 bg-amber-50/50 p-3">
          <p className="text-sm leading-relaxed text-amber-800">
            {feedback.caution}
          </p>
        </section>
      )}
    </div>
  );
}
