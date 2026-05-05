"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// ExerciseFeedback
// Calm tutor-tone feedback — never "correcto/incorrecto"
// ---------------------------------------------------------------------------

export interface ExerciseFeedbackProps {
  /** Whether the student's answer was correct */
  isCorrect: boolean;
  /** The figure name being practiced */
  figureName: string;
  /** Optional custom message (overrides defaults) */
  message?: string;
  className?: string;
}

const correctMessages: Record<string, string> = {
  default:
    "¡Observa cómo funciona esta figura! Has identificado bien el recurso literario.",
  metafora:
    "¡Observa cómo la metáfora transforma el significado! Has identificado bien esta transferencia de sentido.",
  simil:
    "¡Nota cómo el símil crea una comparación directa! Reconoces bien el nexo entre los términos.",
  hiperbole:
    "¡Qué bien captas la exageración expresiva! La hipérbole intensifica el mensaje.",
  personificacion:
    "¡Observa cómo lo inanimado cobra vida! La personificación humaniza el mundo que nos rodea.",
  aliteracion:
    "¡Nota el efecto sonoro! La repetición de sonidos crea una atmósfera musical.",
  onomatopeya:
    "¡El sonido se hace palabra! Reconoces bien la imitación sonora.",
  ironia:
    "¡Captas el doble sentido! La ironía invita a leer entre líneas.",
};

const incorrectMessages: Record<string, string> = {
  default:
    "Explora esta posibilidad: observa con atención qué recurso se está usando en el texto. Cada figura tiene una característica distintiva.",
  metafora:
    "Explora esta posibilidad: la metáfora identifica dos términos sin usar 'como'. Pregúntate si hay una transferencia de significado.",
  simil:
    "Explora esta posibilidad: busca palabras como 'como', 'cual' o 'tal como' que establecen una comparación explícita.",
  hiperbole:
    "Explora esta posibilidad: fíjate si hay una exageración evidente de la realidad, ya sea aumentándola o disminuyéndola.",
  personificacion:
    "Explora esta posibilidad: pregúntate si algún objeto o concepto está actuando como si fuera una persona.",
  aliteracion:
    "Explora esta posibilidad: lee en voz alta y escucha si hay repetición de sonidos consonánticos.",
  onomatopeya:
    "Explora esta posibilidad: busca palabras que imiten sonidos reales de la naturaleza o de objetos.",
  ironia:
    "Explora esta posibilidad: pregúntate si el autor quiere decir lo contrario de lo que está escribiendo.",
};

export function ExerciseFeedback({
  isCorrect,
  figureName,
  message,
  className,
}: ExerciseFeedbackProps) {
  const figureSlug = figureName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const defaultCorrect =
    correctMessages[figureSlug] ?? correctMessages.default;
  const defaultIncorrect =
    incorrectMessages[figureSlug] ?? incorrectMessages.default;

  const displayMessage =
    message ?? (isCorrect ? defaultCorrect : defaultIncorrect);

  return (
    <div
      className={cn(
        "rounded-lg border p-4 text-sm leading-relaxed transition-all",
        isCorrect
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-amber-200 bg-amber-50 text-amber-800",
        className,
      )}
      role="status"
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <span
          className={cn(
            "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold",
            isCorrect ? "bg-emerald-200 text-emerald-700" : "bg-amber-200 text-amber-700",
          )}
        >
          {isCorrect ? "!" : "?"}
        </span>
        {/* Message */}
        <div className="flex-1">
          <p className="font-medium">
            {isCorrect ? "¡Así es!" : "Otra mirada"}
          </p>
          <p className="mt-1 text-gray-600">{displayMessage}</p>
        </div>
      </div>
    </div>
  );
}
