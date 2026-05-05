import { describe, it, expect } from "vitest";
import {
  normalizeText,
  computeContentHash,
  buildCacheKey,
  CATALOG_VERSION,
} from "./cache";

// ---------------------------------------------------------------------------
// normalizeText
// ---------------------------------------------------------------------------

describe("normalizeText", () => {
  it("trims leading and trailing whitespace", () => {
    expect(normalizeText("  hola mundo  ")).toBe("hola mundo");
  });

  it("collapses multiple spaces into one", () => {
    expect(normalizeText("hola    mundo")).toBe("hola mundo");
  });

  it("collapses newlines and tabs", () => {
    expect(normalizeText("hola\n\tmundo\n\r")).toBe("hola mundo");
  });

  it("lowercases the text", () => {
    expect(normalizeText("Hola Mundo")).toBe("hola mundo");
  });

  it("handles empty string", () => {
    expect(normalizeText("")).toBe("");
  });

  it("handles only-whitespace string", () => {
    expect(normalizeText("   ")).toBe("");
  });
});

// ---------------------------------------------------------------------------
// computeContentHash
// ---------------------------------------------------------------------------

describe("computeContentHash", () => {
  it("returns a deterministic 16-char hex string", () => {
    const hash = computeContentHash("Tus ojos como luceros", "es");
    expect(hash).toMatch(/^[0-9a-f]{16}$/);
  });

  it("returns the same hash for normalized-equivalent inputs", () => {
    const hash1 = computeContentHash("Tus ojos  como luceros", "es");
    const hash2 = computeContentHash("tus ojos como luceros", "es");
    expect(hash1).toBe(hash2);
  });

  it("returns different hashes for different locales", () => {
    const hashEs = computeContentHash("Hello world", "es");
    const hashEn = computeContentHash("Hello world", "en");
    expect(hashEs).not.toBe(hashEn);
  });

  it("returns different hashes for different texts", () => {
    const hash1 = computeContentHash("Un texto de prueba", "es");
    const hash2 = computeContentHash("Otro texto completamente diferente", "es");
    expect(hash1).not.toBe(hash2);
  });

  it("is stable across repeated calls", () => {
    const text = "El sol reía sobre el mar tranquilo";
    const hash1 = computeContentHash(text, "es");
    const hash2 = computeContentHash(text, "es");
    expect(hash1).toBe(hash2);
  });
});

// ---------------------------------------------------------------------------
// buildCacheKey
// ---------------------------------------------------------------------------

describe("buildCacheKey", () => {
  it("returns the same value as computeContentHash", () => {
    const key = buildCacheKey("Test text", "en");
    const hash = computeContentHash("Test text", "en");
    expect(key).toBe(hash);
  });
});

// ---------------------------------------------------------------------------
// CATALOG_VERSION
// ---------------------------------------------------------------------------

describe("CATALOG_VERSION", () => {
  it("is a non-empty string", () => {
    expect(CATALOG_VERSION).toBeTruthy();
    expect(typeof CATALOG_VERSION).toBe("string");
  });
});
