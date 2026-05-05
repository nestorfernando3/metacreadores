import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FeedbackPanel } from "@/components/writing/feedback-panel";
import type { TutorFeedback } from "@/lib/ai/schemas";
import { NextIntlClientProvider } from "next-intl";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const messages = {
  writing: {
    analysis: {
      summary: "Summary",
      strengths: "Strengths",
      suggestions: "Suggestions",
      caution: "Note",
      figures: "Figures detected",
      prompt: "Prompt",
    },
  },
};

function renderWithMessages(ui: React.ReactElement) {
  return render(
    <NextIntlClientProvider locale="es" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
}

function makeFeedback(overrides: Partial<TutorFeedback> = {}): TutorFeedback {
  return {
    summary: "Good use of similes.",
    strengths: ["Clear comparisons"],
    suggestions: [],
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("FeedbackPanel", () => {
  it("renders nothing when feedback is null", () => {
    const { container } = renderWithMessages(<FeedbackPanel feedback={null} />);
    expect(container.innerHTML).toBe("");
  });

  it("renders summary text", () => {
    renderWithMessages(
      <FeedbackPanel feedback={makeFeedback({ summary: "Nice text." })} />,
    );
    expect(screen.getByText("Nice text.")).toBeInTheDocument();
  });

  it("renders strengths list", () => {
    renderWithMessages(
      <FeedbackPanel
        feedback={makeFeedback({
          strengths: ["Good metaphor", "Nice rhythm"],
        })}
      />,
    );
    expect(screen.getByText("Good metaphor")).toBeInTheDocument();
    expect(screen.getByText("Nice rhythm")).toBeInTheDocument();
  });

  it("renders suggestions when present", () => {
    renderWithMessages(
      <FeedbackPanel
        feedback={makeFeedback({
          strengths: ["Good start"],
          suggestions: ["Try a metaphor here"],
        })}
      />,
    );
    expect(screen.getByText("Try a metaphor here")).toBeInTheDocument();
  });

  it("renders caution when present", () => {
    renderWithMessages(
      <FeedbackPanel
        feedback={makeFeedback({
          strengths: ["Good start"],
          caution: "The simile feels slightly forced.",
        })}
      />,
    );
    expect(
      screen.getByText("The simile feels slightly forced."),
    ).toBeInTheDocument();
  });

  it("does not render suggestions section when empty", () => {
    const { container } = renderWithMessages(
      <FeedbackPanel
        feedback={makeFeedback({
          strengths: ["Good start"],
          suggestions: [],
        })}
      />,
    );
    // "Suggestions" text is the label for the section heading
    const suggestionHeadings = container.querySelectorAll("h3");
    const hasSuggestionsHeading = Array.from(suggestionHeadings).some(
      (h) => h.textContent === "Suggestions",
    );
    expect(hasSuggestionsHeading).toBe(false);
  });
});
