import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateExercise } from "@/lib/ai/generate-exercise";
import { getFigureBySlug } from "@/lib/content/figures";

// ---------------------------------------------------------------------------
// Request schema
// ---------------------------------------------------------------------------

const GenerateExerciseRequestSchema = z.object({
  figureSlug: z.string().min(1, "figureSlug is required"),
  type: z.enum(["identification", "completion"]),
  difficulty: z.number().int().min(1).max(3).default(1),
  locale: z.enum(["es", "en"]).default("es"),
});

// ---------------------------------------------------------------------------
// POST /api/ai/generate-exercise
//
// Generates an AI-powered exercise text for a given rhetorical figure.
// Returns the generated text and correct answer.
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse and validate the request body
    const body = await request.json();
    const parsed = GenerateExerciseRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: parsed.error.flatten(),
          text: null,
          answer: null,
        },
        { status: 400 },
      );
    }

    const { figureSlug, type, difficulty, locale } = parsed.data;

    // Look up the figure from the DB
    const figure = await getFigureBySlug(figureSlug);

    if (!figure) {
      return NextResponse.json(
        {
          error: `Figure not found: ${figureSlug}`,
          text: null,
          answer: null,
        },
        { status: 404 },
      );
    }

    // Generate the exercise text
    const result = await generateExercise({
      figure: {
        slug: figure.slug,
        name: figure.name,
        nameEn: figure.nameEn ?? undefined,
        definition: figure.definition,
        definitionEn: figure.definitionEn ?? undefined,
      },
      type,
      difficulty,
      locale,
    });

    if (!result) {
      return NextResponse.json(
        {
          error:
            locale === "es"
              ? "No se pudo generar el ejercicio. Intenta de nuevo."
              : "Could not generate exercise. Please try again.",
          text: null,
          answer: null,
        },
        { status: 500 },
      );
    }

    // Return the structured result
    return NextResponse.json({
      text: result.text,
      answer: result.answer,
      figureSlug: figure.slug,
      figureName: figure.name,
      type,
    });
  } catch (error) {
    console.error("[api/ai/generate-exercise] Unexpected error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate exercise. Please try again.",
        text: null,
        answer: null,
      },
      { status: 500 },
    );
  }
}
