import { groq } from "@ai-sdk/groq";
import { google } from "@ai-sdk/google";

// ---------------------------------------------------------------------------
// Environment variable validation
// ---------------------------------------------------------------------------
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. ` +
        `Set it in .env.local or your deployment environment.`,
    );
  }
  return value;
}

// ---------------------------------------------------------------------------
// Groq model adapter (primary provider)
// ---------------------------------------------------------------------------
export function createGroqModel() {
  requireEnv("GROQ_API_KEY");
  return groq("llama-3.3-70b-versatile");
}

// ---------------------------------------------------------------------------
// Google / Gemini model adapter (fallback provider)
// ---------------------------------------------------------------------------
export function createGoogleModel() {
  requireEnv("GOOGLE_GENERATIVE_AI_API_KEY");
  return google("gemini-2.0-flash-001");
}

// ---------------------------------------------------------------------------
// Detection model — low temperature for deterministic structured output
// ---------------------------------------------------------------------------
export interface ModelConfig {
  model: ReturnType<typeof createGroqModel> | ReturnType<typeof createGoogleModel>;
  temperature: number;
  maxOutputTokens: number;
}

export function getDetectionConfig(): ModelConfig {
  return {
    model: createGroqModel(),
    temperature: 0.2,
    maxOutputTokens: 2048,
  };
}

// ---------------------------------------------------------------------------
// Feedback model — slightly warmer for natural tutor language
// ---------------------------------------------------------------------------
export function getFeedbackConfig(): ModelConfig {
  return {
    model: createGroqModel(),
    temperature: 0.35,
    maxOutputTokens: 1024,
  };
}

// ---------------------------------------------------------------------------
// Fallback: get Gemini model config for when Groq is unavailable
// ---------------------------------------------------------------------------
export function getFallbackConfig(): ModelConfig {
  return {
    model: createGoogleModel(),
    temperature: 0.3,
    maxOutputTokens: 2048,
  };
}

// ---------------------------------------------------------------------------
// Check if a provider is available (for graceful fallback)
// ---------------------------------------------------------------------------
export function isGroqAvailable(): boolean {
  return !!process.env["GROQ_API_KEY"];
}

export function isGeminiAvailable(): boolean {
  return !!process.env["GOOGLE_GENERATIVE_AI_API_KEY"];
}
