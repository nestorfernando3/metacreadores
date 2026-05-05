import { generateText, Output } from "ai";
import { z } from "zod";
import {
  getDetectionConfig,
} from "@/lib/ai/providers";

// ---------------------------------------------------------------------------
// Zod schema for structured AI output
// ---------------------------------------------------------------------------

export const GeneratedExerciseSchema = z.object({
  text: z.string().min(1, "text is required"),
  answer: z.string().min(1, "answer is required"),
});

export type GeneratedExercise = z.infer<typeof GeneratedExerciseSchema>;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface FigureInfo {
  slug: string;
  name: string;
  nameEn?: string;
  definition: string;
  definitionEn?: string;
}

// ---------------------------------------------------------------------------
// Prompt builder
// ---------------------------------------------------------------------------

export function generateExercisePrompt(
  figure: FigureInfo,
  difficulty: number,
  type: "identification" | "completion",
  locale: "es" | "en" = "es",
): { system: string; user: string } {
  const isEs = locale === "es";

  const difficultyLabels: Record<number, string> = isEs
    ? { 1: "principiante", 2: "intermedio", 3: "avanzado" }
    : { 1: "beginner", 2: "intermediate", 3: "advanced" };

  const clampedDifficulty = Math.min(3, Math.max(1, difficulty)) as 1 | 2 | 3;

  const figureDescription = isEs
    ? `Figura: "${figure.name}" — ${figure.definition}`
    : `Figure: "${figure.nameEn ?? figure.name}" — ${figure.definitionEn ?? figure.definition}`;

  const vocabGuidance = isEs
    ? {
        1: "Usa vocabulario sencillo y frases cortas, apropiado para estudiantes que comienzan.",
        2: "Usa vocabulario variado de nivel intermedio, con oraciones de complejidad media.",
        3: "Usa vocabulario rico y estructuras complejas, para estudiantes avanzados.",
      }
    : {
        1: "Use simple vocabulary and short sentences, suitable for beginners.",
        2: "Use intermediate vocabulary with moderate sentence complexity.",
        3: "Use rich vocabulary and complex structures for advanced students.",
      };

  const system =
    isEs
      ? `Eres un tutor de literatura que genera textos de práctica para estudiantes.
Tu tarea es crear un texto original que demuestre una figura retórica específica.

## Reglas:
1. Genera SIEMPRE un texto original. No copies textos existentes de autores conocidos.
2. El texto debe demostrar CLARAMENTE la figura retórica solicitada.
3. Usa vocabulario y complejidad apropiados para el nivel indicado.
4. No califiques ni evalúes el texto en la salida.
5. Responde SOLO con el objeto JSON solicitado, sin explicaciones adicionales.`
      : `You are a literary tutor generating practice texts for students.
Your task is to create an original text that demonstrates a specific rhetorical figure.

## Rules:
1. ALWAYS generate an original text. Do not copy existing texts from known authors.
2. The text must CLEARLY demonstrate the requested rhetorical figure.
3. Use vocabulary and complexity appropriate for the indicated level.
4. Do not grade or evaluate the text in the output.
5. Respond ONLY with the requested JSON object, no additional explanations.`;

  const lang = isEs ? "Español" : "English";

  if (type === "identification") {
    const user = isEs
      ? `Genera un texto original de 3-5 oraciones en ${lang} que demuestre CLARAMENTE la siguiente figura retórica:

${figureDescription}

Nivel de dificultad: ${difficultyLabels[clampedDifficulty] ?? difficulty}
${vocabGuidance[clampedDifficulty] ?? vocabGuidance[1]}

El estudiante debe poder IDENTIFICAR qué figura retórica se está usando.
Responde con un objeto JSON con los campos:
- "text": el texto generado (3-5 oraciones)
- "answer": el slug de la figura ("${figure.slug}")`
      : `Generate an original text of 3-5 sentences in ${lang} that CLEARLY demonstrates the following rhetorical figure:

${figureDescription}

Difficulty level: ${difficultyLabels[clampedDifficulty] ?? difficulty}
${vocabGuidance[clampedDifficulty] ?? vocabGuidance[1]}

The student should be able to IDENTIFY which rhetorical figure is being used.
Respond with a JSON object with fields:
- "text": the generated text (3-5 sentences)
- "answer": the figure slug ("${figure.slug}")`;

    return { system, user };
  }

  // completion type
  const user = isEs
    ? `Genera un texto original de 3-5 oraciones en ${lang} que demuestre CLARAMENTE la siguiente figura retórica:

${figureDescription}

Nivel de dificultad: ${difficultyLabels[clampedDifficulty] ?? difficulty}
${vocabGuidance[clampedDifficulty] ?? vocabGuidance[1]}

IMPORTANTE: Reemplaza la palabra o frase clave que hace que el texto demuestre la figura con "___" (tres guiones bajos).
El estudiante debe COMPLETAR el espacio en blanco con la palabra o frase faltante.

Responde con un objeto JSON con los campos:
- "text": el texto generado con "___" en lugar de la palabra/frase clave
- "answer": la palabra o frase exacta que falta (sin los guiones bajos)`
    : `Generate an original text of 3-5 sentences in ${lang} that CLEARLY demonstrates the following rhetorical figure:

${figureDescription}

Difficulty level: ${difficultyLabels[clampedDifficulty] ?? difficulty}
${vocabGuidance[clampedDifficulty] ?? vocabGuidance[1]}

IMPORTANT: Replace the key word or phrase that makes the text demonstrate the figure with "___" (three underscores).
The student must COMPLETE the blank with the missing word or phrase.

Respond with a JSON object with fields:
- "text": the generated text with "___" replacing the key word/phrase
- "answer": the exact missing word or phrase (without underscores)`;

  return { system, user };
}

// ---------------------------------------------------------------------------
// AI call: generate an exercise text
// ---------------------------------------------------------------------------

export interface GenerateExerciseOptions {
  figure: FigureInfo;
  type: "identification" | "completion";
  difficulty: number;
  locale?: "es" | "en";
}

/**
 * Generate a short original text that demonstrates a given rhetorical figure.
 *
 * - For identification exercises: the answer is the figure slug.
 * - For completion exercises: the text contains a "___" blank; answer is the
 *   missing word/phrase.
 *
 * Returns null on failure (both primary and fallback exhausted).
 */
export async function generateExercise(
  options: GenerateExerciseOptions,
): Promise<GeneratedExercise | null> {
  const { figure, type, difficulty, locale = "es" } = options;

  const { system, user } = generateExercisePrompt(
    figure,
    difficulty,
    type,
    locale,
  );

  try {
    const config = getDetectionConfig();

    const result = await generateText({
      model: config.model,
      system,
      prompt: user,
      temperature: 0.3,
      maxOutputTokens: 1024,
      output: Output.object({ schema: GeneratedExerciseSchema }),
    });

    const parsed = GeneratedExerciseSchema.safeParse(result.output);
    if (parsed.success) return parsed.data;

    console.warn(
      "[generate-exercise] Model returned invalid shape:",
      result.output,
    );
  } catch (error) {
    console.warn("[generate-exercise] AI call failed:", error);
  }

  return null;
}
