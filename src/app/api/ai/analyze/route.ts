import { NextRequest, NextResponse } from "next/server";
import { AnalyzeRequestSchema } from "@/lib/ai/schemas";
import { analyzeText } from "@/lib/ai/analyze-text";
import { createClient } from "@/lib/auth/server";

// ---------------------------------------------------------------------------
// POST /api/ai/analyze
//
// Accepts student text and optional figure candidates, runs the two-pass
// analysis pipeline, and returns structured figure annotations + tutor
// feedback. Never scores or grades the student.
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const parsed = AnalyzeRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: parsed.error.flatten(),
          matches: [],
          feedback: {
            summary:
              "No se pudo analizar el texto. Por favor, verifica que el texto sea válido.",
            strengths: [],
            suggestions: [],
          },
          locale: "es",
          model: "none",
          confidence: 0,
        },
        { status: 400 },
      );
    }

    const { text, locale, figureCandidates } = parsed.data;

    // Try to get the authenticated user for cache scoping (optional — analysis
    // still works for anonymous users, it just bypasses the cache).
    let userId: string | undefined;
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      userId = user?.id;
    } catch {
      // Auth is optional for analysis
    }

    // Run the two-pass analysis (with optional cache lookup when userId is set)
    const result = await analyzeText({
      text,
      locale: locale as "es" | "en",
      figureCandidates: figureCandidates as any,
      userId,
    });

    // Return the structured result
    return NextResponse.json(result);
  } catch (error) {
    // Catch unexpected errors and return a safe fallback
    console.error("[api/ai/analyze] Unexpected error:", error);

    return NextResponse.json(
      {
        error: "Analysis failed",
        matches: [],
        feedback: {
          summary:
            "Gracias por compartir tu texto. No pude completar el análisis en este momento, pero cada texto es una oportunidad para descubrir algo nuevo. ¡Sigue escribiendo!",
          strengths: [
            "Tu texto tiene un estilo interesante de explorar",
          ],
          suggestions: [],
        },
        locale: "es",
        model: "none",
        confidence: 0,
      },
      { status: 500 },
    );
  }
}
