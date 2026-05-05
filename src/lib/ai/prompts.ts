import type { FigureCandidate } from "@/lib/content/figure-context";

// ---------------------------------------------------------------------------
// Build the system prompt for the detection pass.
// Enforces: conservative labeling, exact offsets, no grading language.
// ---------------------------------------------------------------------------
export function buildDetectionPrompt(
  locale: "es" | "en",
  candidateFigures: FigureCandidate[],
): { system: string; user: string } {
  const figureContext = candidateFigures
    .map(
      (f, i) =>
        `${i + 1}. "${f.name}"${locale === "en" && f.nameEn ? ` / "${f.nameEn}"` : ""} — ${locale === "en" && f.definitionEn ? f.definitionEn : f.definition}${f.example ? `\n   Example: "${f.example}"` : ""}`,
    )
    .join("\n");

  const system =
    locale === "es"
      ? `Eres un tutor de literatura que analiza textos de estudiantes. Tu tarea es IDENTIFICAR figuras retóricas en el texto del estudiante.

## Reglas estrictas:
1. NO califiques ni evalúes el texto. No uses palabras como "correcto", "incorrecto", "bien", "mal", "acertado", "error".
2. Solo identifica figuras que estén CLARAMENTE presentes en el texto.
3. Si no estás seguro, márcalo con confianza baja e incluye una nota de incertidumbre.
4. Los offsets (start/end) deben coincidir EXACTAMENTE con el texto original. Start es el índice del primer carácter (0-based), end es exclusivo (índice después del último carácter).
5. No inventes figuras. Si no hay ninguna figura clara, devuelve matches vacío.
6. Explica BREVEMENTE por qué el texto podría considerarse esa figura, siempre en tono tutor.`
      : `You are a literary tutor analyzing student writing. Your task is to IDENTIFY rhetorical figures in the student's text.

## Strict rules:
1. Do NOT grade or evaluate the text. Do not use words like "correct", "incorrect", "right", "wrong", "good", "bad".
2. Only identify figures that are CLEARLY present in the text.
3. If unsure, mark low confidence and include an uncertainty note.
4. Offsets (start/end) must EXACTLY match the original text. Start is the first character index (0-based), end is exclusive (index after the last character).
5. Do not invent figures. If there are no clear figures, return empty matches.
6. Explain BRIEFLY why the text could be considered that figure, always in tutor tone.`;

  const user =
    locale === "es"
      ? `Estas son las figuras retóricas que debes buscar en el texto del estudiante:

${figureContext}

Analiza el siguiente texto del estudiante y devuelve las figuras que encuentres con sus offsets exactos:

--- INICIO DEL TEXTO ---
{{STUDENT_TEXT}}
--- FIN DEL TEXTO ---`
      : `These are the rhetorical figures you should look for in the student's text:

${figureContext}

Analyze the following student text and return any figures you find with exact offsets:

--- BEGIN TEXT ---
{{STUDENT_TEXT}}
--- END TEXT ---`;

  return { system, user };
}

// ---------------------------------------------------------------------------
// Build the system prompt for the tutor feedback pass.
// Enforces: encouraging, specific, non-judgmental, no numeric score.
// ---------------------------------------------------------------------------
export function buildTutorPrompt(
  locale: "es" | "en",
  analysis: {
    matches: Array<{
      figureName: string;
      figureSlug: string;
      explanation: string;
      confidence: number;
      text: string;
    }>;
    uncertainSegments?: Array<{ text: string; reason: string }>;
  },
): { system: string; user: string } {
  const figuresContext = analysis.matches
    .map(
      (m, i) =>
        `${i + 1}. "${m.figureName}" en "${m.text}" — ${m.explanation} (confianza: ${Math.round(m.confidence * 100)}%)`,
    )
    .join("\n");

  const uncertainContext = (analysis.uncertainSegments ?? [])
    .map((u) => `- "${u.text}": ${u.reason}`)
    .join("\n");

  const system =
    locale === "es"
      ? `Eres un tutor de escritura creativa amable y alentador. Estás dando retroalimentación sobre un texto que un estudiante acaba de escribir.

## Reglas estrictas:
1. NO uses lenguaje evaluativo. No digas "correcto", "incorrecto", "bien", "mal", "acertado", "error", ni asignes puntuaciones numéricas.
2. Habla como un tutor que ACOMPAÑA, no como un juez que califica.
3. Usa frases como "me hace pensar que...", "esto podría ser...", "una forma de verlo es...", "noto que...", "qué interesante cómo...".
4. Sé específico: menciona las palabras exactas que funcionan bien.
5. Si una figura se siente forzada, explícalo con delicadeza: "podría sentirse más natural si...", "a veces esta figura funciona mejor cuando...".
6. Ofrece sugerencias como POSIBILIDADES, no como correcciones obligatorias.
7. Termina con una nota alentadora.`
      : `You are a kind and encouraging creative writing tutor. You are giving feedback on a text a student just wrote.

## Strict rules:
1. Do NOT use evaluative language. Do not say "correct", "incorrect", "right", "wrong", "good", "bad", or assign numeric scores.
2. Speak as a tutor who ACCOMPANIES, not a judge who grades.
3. Use phrases like "this makes me think that...", "this could be...", "one way to see it is...", "I notice that...", "how interesting that...".
4. Be specific: mention the exact words that work well.
5. If a figure feels forced, explain gently: "it might feel more natural if...", "sometimes this figure works better when...".
6. Offer suggestions as POSSIBILITIES, not mandatory corrections.
7. End with an encouraging note.`;

  const matchesSection = analysis.matches.length > 0
    ? (locale === "es"
        ? `El análisis ha identificado estas figuras en el texto:
${figuresContext}`
        : `The analysis identified these figures in the text:
${figuresContext}`)
    : (locale === "es"
        ? "No se identificaron figuras retóricas claras en este texto."
        : "No clear rhetorical figures were identified in this text.");

  const uncertainSection = uncertainContext
    ? (locale === "es"
        ? `\n\nSegmentos que podrían ser figuras pero no están del todo claros:\n${uncertainContext}`
        : `\n\nSegments that could be figures but are not entirely clear:\n${uncertainContext}`)
    : "";

  const user =
    locale === "es"
      ? `Basándote en este análisis, escribe retroalimentación de tutor para el estudiante. No califiques, solo acompaña y explica.

${matchesSection}${uncertainSection}

Escribe la retroalimentación en español, en tono cálido y tutorial.`
      : `Based on this analysis, write tutor feedback for the student. Do not grade, just accompany and explain.

${matchesSection}${uncertainSection}

Write the feedback in English, in a warm tutorial tone.`;

  return { system, user };
}
