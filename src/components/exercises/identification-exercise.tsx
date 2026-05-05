"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// IdentificationExercise
// Shows a text and renders 4 multiple-choice options
// ---------------------------------------------------------------------------

export interface IdentificationExerciseProps {
  options: string[];
  selectedOption: string | null;
  answered: boolean;
  correctAnswer: string;
  onSelect: (option: string) => void;
}

export function IdentificationExercise({
  options,
  selectedOption,
  answered,
  correctAnswer,
  onSelect,
}: IdentificationExerciseProps) {
  return (
    <div className="space-y-2" role="radiogroup" aria-label="Opciones de respuesta">
      {options.map((option) => {
        const isSelected = selectedOption === option;
        const isCorrect = option === correctAnswer;
        const showCorrect = answered && isCorrect;
        const showIncorrect = answered && isSelected && !isCorrect;

        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={isSelected}
            disabled={answered}
            onClick={() => onSelect(option)}
            className={cn(
              "flex w-full items-center rounded-lg border px-4 py-3 text-left text-sm transition-all",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2",
              // Default state
              "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50",
              // Selected (before answering)
              !answered &&
                isSelected &&
                "border-emerald-400 bg-emerald-50",
              // Correct answer revealed
              showCorrect &&
                "border-emerald-400 bg-emerald-50 font-medium text-emerald-800",
              // Wrong selection
              showIncorrect && "border-rose-300 bg-rose-50 text-rose-700",
              // Disabled after answering
              answered && "cursor-default opacity-90",
            )}
          >
            <span
              className={cn(
                "mr-3 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs",
                !answered && !isSelected && "border-gray-300",
                !answered && isSelected && "border-emerald-500 bg-emerald-500 text-white",
                showCorrect && "border-emerald-500 bg-emerald-500 text-white",
                showIncorrect && "border-rose-400 bg-rose-400 text-white",
              )}
            >
              {isSelected || showCorrect ? "✓" : ""}
            </span>
            <span className="flex-1">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
