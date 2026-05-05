import { describe, it, expect, vi, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Mock the AI SDK modules
// ---------------------------------------------------------------------------
vi.mock("ai", () => ({
  generateText: vi.fn(),
  Output: {
    object: ({ schema }: { schema: any }) => ({ schema, type: "object" }),
  },
}));

vi.mock("@/lib/ai/providers", () => ({
  getDetectionConfig: vi.fn(() => ({
    model: "mock-groq-model",
    temperature: 0.2,
    maxOutputTokens: 2048,
  })),
  getFallbackConfig: vi.fn(() => ({
    model: "mock-gemini-model",
    temperature: 0.3,
    maxOutputTokens: 2048,
  })),
  isGroqAvailable: vi.fn(() => true),
  isGeminiAvailable: vi.fn(() => true),
}));

import { generateText } from "ai";
import {
  generateExercise,
  generateExercisePrompt,
  GeneratedExerciseSchema,
  type FigureInfo,
} from "./generate-exercise";

// ---------------------------------------------------------------------------
// Test data
// ---------------------------------------------------------------------------

const MOCK_FIGURE: FigureInfo = {
  slug: "metafora",
  name: "Metáfora",
  definition: "Identificación de un término real con otro imaginario",
};

const MOCK_FIGURE_EN: FigureInfo = {
  slug: "simil",
  name: "Símil",
  nameEn: "Simile",
  definition: "Comparación explícita usando 'como'",
  definitionEn: "Explicit comparison using 'like' or 'as'",
};

// ---------------------------------------------------------------------------
// GeneratedExerciseSchema Validation Tests
// ---------------------------------------------------------------------------

describe("GeneratedExerciseSchema", () => {
  it("accepts valid generated exercise", () => {
    const result = GeneratedExerciseSchema.safeParse({
      text: "El sol es un oro vivo que calienta el día.",
      answer: "metafora",
    });
    expect(result.success).toBe(true);
  });

  it("rejects empty text", () => {
    const result = GeneratedExerciseSchema.safeParse({
      text: "",
      answer: "metafora",
    });
    expect(result.success).toBe(false);
  });

  it("rejects empty answer", () => {
    const result = GeneratedExerciseSchema.safeParse({
      text: "Un texto de ejemplo.",
      answer: "",
    });
    expect(result.success).toBe(false);
  });

  it("rejects missing fields", () => {
    const result = GeneratedExerciseSchema.safeParse({
      text: "Solo texto sin respuesta",
    });
    expect(result.success).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// generateExercisePrompt Tests
// ---------------------------------------------------------------------------

describe("generateExercisePrompt", () => {
  it("builds an identification prompt in Spanish", () => {
    const { system, user } = generateExercisePrompt(
      MOCK_FIGURE,
      1,
      "identification",
      "es",
    );

    expect(system).toContain("genera textos de práctica");
    expect(system).toContain("tutor");
    expect(user).toContain("Metáfora");
    expect(user).toContain("Identificación de un término real con otro imaginario");
    expect(user).toContain("principiante");
    expect(user).toContain("Español");
    expect(user).toContain("IDENTIFICAR");
    expect(user).toContain("metafora");
  });

  it("builds an identification prompt in English", () => {
    const { system, user } = generateExercisePrompt(
      MOCK_FIGURE_EN,
      2,
      "identification",
      "en",
    );

    expect(system).toContain("practice texts");
    expect(system).toContain("tutor");
    expect(user).toContain("Simile");
    expect(user).toContain("Explicit comparison");
    expect(user).toContain("intermediate");
    expect(user).toContain("IDENTIFY");
    expect(user).toContain("simil");
  });

  it("builds a completion prompt in Spanish", () => {
    const { system, user } = generateExercisePrompt(
      MOCK_FIGURE,
      3,
      "completion",
      "es",
    );

    expect(user).toContain("___");
    expect(user).toContain("COMPLETAR");
    expect(user).toContain("avanzado");
    expect(user).toContain("Español");
  });

  it("builds a completion prompt in English", () => {
    const { system, user } = generateExercisePrompt(
      MOCK_FIGURE_EN,
      1,
      "completion",
      "en",
    );

    expect(user).toContain("___");
    expect(user).toContain("COMPLETE");
    expect(user).toContain("beginner");
    expect(user).toContain("English");
  });

  it("adapts vocabulary guidance to difficulty level", () => {
    const { user: beginner } = generateExercisePrompt(
      MOCK_FIGURE,
      1,
      "identification",
      "es",
    );
    const { user: advanced } = generateExercisePrompt(
      MOCK_FIGURE,
      3,
      "identification",
      "es",
    );

    expect(beginner).toContain("vocabulario sencillo");
    expect(advanced).toContain("vocabulario rico");
  });

  it("clamps difficulty to valid range", () => {
    const { user: tooLow } = generateExercisePrompt(
      MOCK_FIGURE,
      0,
      "identification",
      "es",
    );
    const { user: tooHigh } = generateExercisePrompt(
      MOCK_FIGURE,
      99,
      "identification",
      "es",
    );

    // Both should clamp and use beginner vocab guidance
    expect(tooLow).toContain("vocabulario sencillo");
    expect(tooHigh).toContain("vocabulario rico");
  });
});

// ---------------------------------------------------------------------------
// generateExercise (AI call) Tests
// ---------------------------------------------------------------------------

describe("generateExercise", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns generated exercise when primary model succeeds", async () => {
    vi.mocked(generateText).mockResolvedValueOnce({
      output: {
        text: "El sol es un oro vivo que calienta el día. Sus rayos son monedas de luz que caen sobre la tierra.",
        answer: "metafora",
      },
    } as any);

    const result = await generateExercise({
      figure: MOCK_FIGURE,
      type: "identification",
      difficulty: 1,
      locale: "es",
    });

    expect(result).not.toBeNull();
    expect(result!.text).toContain("oro vivo");
    expect(result!.answer).toBe("metafora");
  });

  it("returns generated exercise for completion type", async () => {
    vi.mocked(generateText).mockResolvedValueOnce({
      output: {
        text: "El sol es un ___ vivo que calienta el día.",
        answer: "oro",
      },
    } as any);

    const result = await generateExercise({
      figure: MOCK_FIGURE,
      type: "completion",
      difficulty: 1,
      locale: "es",
    });

    expect(result).not.toBeNull();
    expect(result!.text).toContain("___");
    expect(result!.answer).toBe("oro");
  });

  it("falls back to Gemini when primary model fails", async () => {
    // Primary fails
    vi.mocked(generateText).mockRejectedValueOnce(
      new Error("Primary unavailable"),
    );

    // Fallback succeeds
    vi.mocked(generateText).mockResolvedValueOnce({
      output: {
        text: "El viento gemía en la noche oscura y las nubes lloraban su tristeza.",
        answer: "personificacion",
      },
    } as any);

    const result = await generateExercise({
      figure: {
        slug: "personificacion",
        name: "Personificación",
        definition: "Atribuir cualidades humanas a objetos inanimados",
      },
      type: "identification",
      difficulty: 2,
      locale: "es",
    });

    expect(result).not.toBeNull();
    expect(result!.text).toContain("gemía");
    expect(result!.answer).toBe("personificacion");
  });

  it("returns null when both models fail", async () => {
    vi.mocked(generateText).mockRejectedValueOnce(
      new Error("Primary timeout"),
    );
    vi.mocked(generateText).mockRejectedValueOnce(
      new Error("Fallback timeout"),
    );

    const result = await generateExercise({
      figure: MOCK_FIGURE,
      type: "identification",
      difficulty: 1,
      locale: "es",
    });

    expect(result).toBeNull();
  });

  it("returns null when AI returns invalid shape", async () => {
    vi.mocked(generateText).mockResolvedValueOnce({
      output: {
        // Missing 'answer'
        text: "Some text",
      },
    } as any);
    // Fallback also returns invalid shape
    vi.mocked(generateText).mockResolvedValueOnce({
      output: {
        text: "More text",
      },
    } as any);

    const result = await generateExercise({
      figure: MOCK_FIGURE,
      type: "identification",
      difficulty: 1,
      locale: "es",
    });

    expect(result).toBeNull();
  });
});
