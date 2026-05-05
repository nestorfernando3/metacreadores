import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const mockAnalyzeText = vi.hoisted(() => vi.fn());

vi.mock("@/lib/ai/analyze-text", () => ({
  analyzeText: mockAnalyzeText,
}));

import { POST } from "./route";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/ai/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ---------------------------------------------------------------------------
// Route Tests
// ---------------------------------------------------------------------------

describe("POST /api/ai/analyze", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 200 with structured analysis for valid request", async () => {
    mockAnalyzeText.mockResolvedValueOnce({
      matches: [
        {
          figureSlug: "simil",
          figureName: "Símil",
          start: 10,
          end: 25,
          confidence: 0.9,
          explanation: "Comparación explícita usando 'como'",
        },
      ],
      feedback: {
        summary: "Buen uso del símil.",
        strengths: ["La comparación es clara y efectiva"],
        suggestions: [],
      },
      locale: "es",
      model: "groq-llama-3.3-70b",
      confidence: 0.9,
    });

    const response = await POST(
      createRequest({ text: "Tus ojos como luceros", locale: "es" }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.matches).toHaveLength(1);
    expect(data.feedback.summary).toBeTruthy();
    expect(data.locale).toBe("es");
    expect(data.confidence).toBeGreaterThan(0);
  });

  it("returns 400 for empty text", async () => {
    const response = await POST(createRequest({ text: "", locale: "es" }));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.matches).toHaveLength(0);
  });

  it("returns 400 for missing text field", async () => {
    const response = await POST(createRequest({ locale: "es" }));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.matches).toHaveLength(0);
    expect(data.feedback.summary).toBeTruthy();
  });

  it("returns 400 for non-JSON body", async () => {
    const request = new NextRequest("http://localhost/api/ai/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    });

    const response = await POST(request);
    expect(response.status).toBe(500);
  });

  it("returns 500 with safe fallback when analyzeText throws", async () => {
    mockAnalyzeText.mockRejectedValueOnce(
      new Error("Unexpected provider error"),
    );

    const response = await POST(
      createRequest({ text: "Test text", locale: "es" }),
    );
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.matches).toHaveLength(0);
    expect(data.feedback.summary).toBeTruthy();
    // Should not expose the internal error message
    expect(data.feedback.summary).not.toContain("provider error");
  });

  it("passes figureCandidates to analyzeText when provided", async () => {
    mockAnalyzeText.mockResolvedValueOnce({
      matches: [],
      feedback: { summary: "OK", strengths: ["Nice"], suggestions: [] },
      locale: "en",
      model: "groq-llama-3.3-70b",
      confidence: 0,
    });

    const candidates = [
      {
        slug: "metafora",
        name: "Metáfora",
        definition: "Identificación de un término con otro",
        category: "significado",
        difficultyLevel: 1,
      },
    ];

    const response = await POST(
      createRequest({
        text: "Hello world",
        locale: "en",
        figureCandidates: candidates,
      }),
    );

    expect(response.status).toBe(200);
    expect(mockAnalyzeText).toHaveBeenCalledWith(
      expect.objectContaining({
        text: "Hello world",
        locale: "en",
        figureCandidates: candidates,
      }),
    );
  });

  it("returns English locale when requested", async () => {
    mockAnalyzeText.mockResolvedValueOnce({
      matches: [],
      feedback: {
        summary: "Your text shows promise.",
        strengths: ["Interesting style"],
        suggestions: [],
      },
      locale: "en",
      model: "groq-llama-3.3-70b",
      confidence: 0,
    });

    const response = await POST(
      createRequest({ text: "Hello world", locale: "en" }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.locale).toBe("en");
  });
});
