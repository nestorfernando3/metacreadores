"use client";

import React from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Exercise types
// ---------------------------------------------------------------------------

export interface ExerciseData {
  id: number;
  figureId: number;
  figureName: string;
  figureSlug: string;
  type: "identification" | "completion";
  prompt: string;
  options: string[] | null;
  correctAnswer: string;
  difficultyLevel: number;
}

export interface ExerciseCardProps {
  exercise: ExerciseData;
  /** Children render the answer area (identification or completion) */
  children: React.ReactNode;
  /** Whether the exercise has been answered */
  answered?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// ExerciseCard
// ---------------------------------------------------------------------------

export function ExerciseCard({
  exercise,
  children,
  answered = false,
  className,
}: ExerciseCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border bg-white shadow-sm transition-all",
        answered ? "border-emerald-200 bg-emerald-50/30" : "border-gray-200",
        className,
      )}
    >
      {/* Header */}
      <div className="border-b border-gray-100 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            {/* Figure context hint */}
            <span
              className={cn(
                "mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
                exercise.difficultyLevel === 1 &&
                  "bg-emerald-100 text-emerald-700",
                exercise.difficultyLevel === 2 &&
                  "bg-amber-100 text-amber-700",
                exercise.difficultyLevel === 3 &&
                  "bg-rose-100 text-rose-700",
              )}
            >
              {exercise.figureName}
            </span>
            {/* Question */}
            <p className="text-sm leading-relaxed text-gray-800">
              {exercise.prompt}
            </p>
          </div>
          {/* Badge */}
          <span
            className={cn(
              "shrink-0 rounded-md px-2 py-1 text-xs font-medium",
              exercise.type === "identification" &&
                "bg-blue-50 text-blue-600",
              exercise.type === "completion" && "bg-purple-50 text-purple-600",
            )}
          >
            {exercise.type === "identification" ? "Identificar" : "Completar"}
          </span>
        </div>
      </div>

      {/* Answer area */}
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}
