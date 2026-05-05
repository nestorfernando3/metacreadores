"use client";

import React, { useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// CompletionExercise
// Shows a text with a blank and renders a text input
// ---------------------------------------------------------------------------

export interface CompletionExerciseProps {
  value: string;
  answered: boolean;
  correctAnswer: string;
  onChange: (value: string) => void;
}

export function CompletionExercise({
  value,
  answered,
  correctAnswer,
  onChange,
}: CompletionExerciseProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!answered && inputRef.current) {
      inputRef.current.focus();
    }
  }, [answered]);

  const isCorrect =
    answered &&
    value.trim().toLowerCase() === correctAnswer.trim().toLowerCase();

  return (
    <div className="space-y-3">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={answered}
        placeholder="Escribe tu respuesta..."
        className={cn(
          "w-full rounded-lg border px-4 py-3 text-sm transition-all",
          "placeholder:text-gray-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
          !answered && "border-gray-300 bg-white",
          answered && isCorrect && "border-emerald-400 bg-emerald-50 text-emerald-800",
          answered && !isCorrect && "border-rose-300 bg-rose-50 text-rose-700",
          answered && "cursor-default",
        )}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            // The parent handles submission via the submit button
          }
        }}
      />

      {/* Show correct answer when answered incorrectly */}
      {answered && !isCorrect && (
        <p className="text-xs text-gray-500">
          Una posibilidad: <span className="font-medium text-gray-700">{correctAnswer}</span>
        </p>
      )}
    </div>
  );
}
