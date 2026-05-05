import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ---------------------------------------------------------------------------
// Hoisted mocks — must be defined before any imports
// ---------------------------------------------------------------------------

const mockGetUser = vi.hoisted(() => vi.fn());
const mockSaveSubmission = vi.hoisted(() => vi.fn());
const mockSaveAnalysisRun = vi.hoisted(() => vi.fn());

vi.mock("@/lib/auth/server", () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: mockGetUser,
    },
  })),
}));

vi.mock("@/lib/writing/submissions", () => ({
  saveSubmission: mockSaveSubmission,
  saveAnalysisRun: mockSaveAnalysisRun,
}));

vi.mock("@/lib/ai/cache", () => ({
  computeContentHash: vi.fn((text: string, locale: string) => `hash-${text}-${locale}`),
}));

import { POST } from "./route";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function createRequest(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/ai/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("POST /api/ai/save", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns 401 when user is not authenticated", async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: null }, error: null });

    const response = await POST(
      createRequest({ rawText: "Test text", locale: "es" }),
    );
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data.error).toBe("Authentication required");
  });

  it("returns 400 for missing rawText", async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: "user-1" } },
      error: null,
    });

    const response = await POST(createRequest({ locale: "es" }));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Invalid request body");
  });

  it("returns 400 for empty rawText", async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: "user-1" } },
      error: null,
    });

    const response = await POST(createRequest({ rawText: "", locale: "es" }));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("Invalid request body");
  });

  it("saves submission and returns success for authenticated user", async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: "user-1" } },
      error: null,
    });
    mockSaveSubmission.mockResolvedValueOnce({
      id: 42,
      savedAt: new Date("2025-05-04T12:00:00Z"),
    });

    const response = await POST(
      createRequest({ rawText: "Test text", locale: "es" }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.submission.id).toBe(42);
    expect(mockSaveSubmission).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: "user-1",
        rawText: "Test text",
        locale: "es",
      }),
    );
  });

  it("persists analysis run when analysis data is provided", async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: "user-1" } },
      error: null,
    });
    mockSaveSubmission.mockResolvedValueOnce({
      id: 42,
      savedAt: new Date("2025-05-04T12:00:00Z"),
    });
    mockSaveAnalysisRun.mockResolvedValueOnce({ id: 99 });

    const response = await POST(
      createRequest({
        rawText: "Test text",
        locale: "es",
        analysis: {
          model: "groq-llama-3.3-70b",
          confidence: 85,
          matches: [
            {
              figureSlug: "simil",
              figureName: "Símil",
              start: 0,
              end: 9,
              confidence: 0.85,
              explanation: "Comparación explícita",
            },
          ],
          feedback: {
            summary: "Great text",
            strengths: ["Nice simile"],
            suggestions: [],
          },
        },
      }),
    );

    expect(response.status).toBe(200);
    expect(mockSaveAnalysisRun).toHaveBeenCalledWith(
      expect.objectContaining({
        submissionId: 42,
        model: "groq-llama-3.3-70b",
        confidence: 85,
        contentHash: "hash-Test text-es",
      }),
    );
  });

  it("saves submission without analysis when analysis is omitted", async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: "user-1" } },
      error: null,
    });
    mockSaveSubmission.mockResolvedValueOnce({
      id: 43,
      savedAt: new Date("2025-05-04T12:00:00Z"),
    });

    const response = await POST(
      createRequest({ rawText: "Just text", locale: "en", title: "My Title" }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.submission.id).toBe(43);
    expect(mockSaveAnalysisRun).not.toHaveBeenCalled();
    expect(mockSaveSubmission).toHaveBeenCalledWith(
      expect.objectContaining({ title: "My Title", locale: "en" }),
    );
  });

  it("returns 500 when saveSubmission throws", async () => {
    mockGetUser.mockResolvedValueOnce({
      data: { user: { id: "user-1" } },
      error: null,
    });
    mockSaveSubmission.mockRejectedValueOnce(new Error("DB error"));

    const response = await POST(
      createRequest({ rawText: "Test" }),
    );

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toBe("Save failed");
  });
});
