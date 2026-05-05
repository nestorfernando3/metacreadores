import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/auth/server";
import { saveSubmission, saveAnalysisRun } from "@/lib/writing/submissions";
import { computeContentHash } from "@/lib/ai/cache";
import { trace } from "@/lib/ai/trace";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Request schema
// ---------------------------------------------------------------------------

const SaveRequestSchema = z.object({
  rawText: z.string().min(1, "rawText is required").max(10000),
  locale: z.string().default("es"),
  title: z.string().max(255).optional(),
  analysis: z
    .object({
      model: z.string(),
      confidence: z.number().min(0).max(100).default(0),
      matches: z.array(z.any()).default([]),
      feedback: z.object({
        summary: z.string(),
        strengths: z.array(z.string()),
        suggestions: z.array(z.string()),
        caution: z.string().optional(),
      }),
    })
    .optional(),
});

// ---------------------------------------------------------------------------
// POST /api/ai/save
//
// Explicitly saves the current writing sample for the authenticated user.
// Optionally includes the latest analysis result so it is cached.
//
// Returns 401 when the user is not authenticated.
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // 1. Authenticate
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 },
      );
    }

    // 2. Parse and validate body
    const body = await request.json();
    const parsed = SaveRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { rawText, locale, title, analysis } = parsed.data;

    // 3. Persist the submission
    const submission = await saveSubmission({
      userId: user.id,
      rawText,
      locale,
      title,
    });

    // 4. Persist the analysis run if provided
    if (analysis) {
      const hash = computeContentHash(rawText, locale);

      await saveAnalysisRun({
        submissionId: submission.id,
        model: analysis.model,
        locale,
        contentHash: hash,
        confidence: analysis.confidence,
        analysisJson: { matches: analysis.matches },
        feedbackJson: analysis.feedback,
      });
    }

    trace({
      type: "save",
      payload: { submissionId: submission.id, locale, hasAnalysis: !!analysis },
    });

    return NextResponse.json({
      success: true,
      submission: {
        id: submission.id,
        savedAt: submission.savedAt,
      },
    });
  } catch (error) {
    console.error("[api/ai/save] Unexpected error:", error);
    return NextResponse.json(
      { error: "Save failed" },
      { status: 500 },
    );
  }
}
