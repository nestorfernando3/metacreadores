"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { WritingEditor } from "@/components/writing/writing-editor";
import { FeedbackPanel } from "@/components/writing/feedback-panel";
import { AnalysisResultCard } from "@/components/writing/analysis-result-card";
import type { AnalysisResult } from "@/lib/ai/schemas";

// ---------------------------------------------------------------------------
// Sample text with common rhetorical figures for immediate visual feedback
// ---------------------------------------------------------------------------

const SAMPLE_TEXT = `El sol reía sobre el mar tranquilo,
sus rayos como dedos de oro tocaban las olas.
El viento susurraba secretos antiguos,
y el agua, espejo del cielo,
reflejaba un mundo de sueños.

Las gaviotas danzaban en el aire,
trazando caminos invisibles con sus alas.
Cada momento era una burbuja de cristal
que el tiempo, ese ladrón silencioso,
rompía sin piedad.`;

// ---------------------------------------------------------------------------
// WritePage
// ---------------------------------------------------------------------------

export default function WritePage() {
  const t = useTranslations("writing");
  const [text, setText] = useState(SAMPLE_TEXT);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const handleAnalyze = useCallback(async () => {
    const currentText = text.trim();
    if (!currentText) {
      setError(t("emptyText"));
      return;
    }

    setError("");
    setIsAnalyzing(true);

    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: currentText, locale: "es" }),
      });

      const data = (await res.json()) as AnalysisResult;
      setAnalysis(data);
      setSaved(false);
    } catch {
      setError(t("error"));
    } finally {
      setIsAnalyzing(false);
    }
  }, [text, t]);

  const handleSave = useCallback(async () => {
    const currentText = text.trim();
    if (!currentText) return;

    setError("");
    setIsSaving(true);

    try {
      const res = await fetch("/api/ai/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawText: currentText,
          locale: "es",
          title: null,
          analysis: analysis
            ? {
                model: analysis.model,
                confidence: Math.round(analysis.confidence * 100),
                matches: analysis.matches,
                feedback: analysis.feedback,
              }
            : undefined,
        }),
      });

      if (res.status === 401) {
        setError(t("saveNotAuthenticated"));
        return;
      }

      if (!res.ok) {
        setError(t("error"));
        return;
      }

      setSaved(true);
    } catch {
      setError(t("error"));
    } finally {
      setIsSaving(false);
    }
  }, [text, analysis, t]);

  return (
    <div className="min-h-screen bg-gray-50/60">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {t("title")}
          </h1>
          <p className="mt-1 text-sm text-gray-500">{t("description")}</p>
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Editor column */}
          <div className="lg:col-span-3">
            <WritingEditor
              value={text}
              onChange={setText}
              onAnalyze={handleAnalyze}
              onSave={handleSave}
              highlights={analysis?.matches ?? []}
              isAnalyzing={isAnalyzing}
              isSaving={isSaving}
              canSave={text.trim().length > 0}
              placeholder={t("editor.placeholder")}
            />
            {error && (
              <p className="mt-2 text-sm text-red-500" role="alert">
                {error}
              </p>
            )}
            {saved && (
              <p className="mt-2 text-sm text-emerald-600" role="status">
                {t("saved")}
              </p>
            )}
          </div>

          {/* Feedback column */}
          <div className="lg:col-span-2">
            {analysis ? (
              <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <FeedbackPanel feedback={analysis.feedback} />

                {analysis.matches.length > 0 && (
                  <>
                    <hr className="my-5 border-gray-100" />
                    <section>
                      <h3 className="mb-3 text-sm font-semibold text-gray-900">
                        {t("analysis.figures")}
                      </h3>
                      <div className="space-y-2">
                        {analysis.matches.map((match, i) => (
                          <AnalysisResultCard
                            key={`${match.figureSlug}-${i}`}
                            match={match}
                          />
                        ))}
                      </div>
                    </section>
                  </>
                )}
              </div>
            ) : (
              <div className="flex min-h-[200px] items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white/50 p-8">
                <p className="text-center text-sm text-gray-400">
                  {t("analysis.prompt")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
