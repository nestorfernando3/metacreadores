"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// AssignmentForm — figure dropdown selector + student/class selector +
// optional due date + submit button
// ---------------------------------------------------------------------------

export interface FigureOption {
  id: number;
  name: string;
  category: string;
}

export interface StudentOption {
  id: string;
  displayName: string | null;
  email: string;
}

export interface AssignmentFormProps {
  figures: FigureOption[];
  /** When empty, the form assumes class-level assignment */
  students?: StudentOption[];
  /** When > 0, the form uses this class for the assignment */
  classId: number;
  locale?: "es" | "en";
  onSubmit: (data: {
    figureId: number;
    studentId?: string;
    dueDate?: string;
  }) => Promise<void>;
  className?: string;
}

export function AssignmentForm({
  figures,
  students,
  classId,
  locale = "es",
  onSubmit,
  className,
}: AssignmentFormProps) {
  const t =
    locale === "es"
      ? {
          title: "Asignar figura",
          figureLabel: "Figura retórica",
          figurePlaceholder: "Seleccionar figura...",
          studentLabel: "Estudiante",
          studentAll: "Toda la clase",
          dueDateLabel: "Fecha de entrega (opcional)",
          submit: "Asignar",
          submitting: "Asignando...",
          success: "Figura asignada correctamente.",
          error: "Error al asignar. Intenta de nuevo.",
          required: "Selecciona una figura.",
        }
      : {
          title: "Assign figure",
          figureLabel: "Rhetorical figure",
          figurePlaceholder: "Select figure...",
          studentLabel: "Student",
          studentAll: "Entire class",
          dueDateLabel: "Due date (optional)",
          submit: "Assign",
          submitting: "Assigning...",
          success: "Figure assigned successfully.",
          error: "Error assigning figure. Please try again.",
          required: "Please select a figure.",
        };

  const [figureId, setFigureId] = useState<number | "">("");
  const [studentId, setStudentId] = useState<string>("__all__");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (figureId === "") {
      setMessage(t.required);
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setMessage("");
    try {
      await onSubmit({
        figureId: figureId as number,
        studentId: studentId === "__all__" ? undefined : studentId,
        dueDate: dueDate || undefined,
      });
      setStatus("success");
      setMessage(t.success);
      setFigureId("");
      setStudentId("__all__");
      setDueDate("");
    } catch {
      setStatus("error");
      setMessage(t.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm", className)}
    >
      <h3 className="text-sm font-semibold text-gray-900">{t.title}</h3>

      {/* Figure selector */}
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
          {t.figureLabel}
        </label>
        <select
          value={figureId}
          onChange={(e) =>
            setFigureId(e.target.value ? Number(e.target.value) : "")
          }
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          required
        >
          <option value="" disabled>
            {t.figurePlaceholder}
          </option>
          {figures.map((f) => (
            <option key={f.id} value={f.id}>
              {f.name} — {f.category}
            </option>
          ))}
        </select>
      </div>

      {/* Student selector (only if students are provided) */}
      {students && students.length > 1 && (
        <div>
          <label className="mb-1 block text-xs font-medium text-gray-600">
            {t.studentLabel}
          </label>
          <select
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
          >
            <option value="__all__">{t.studentAll}</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.displayName || s.email}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Due date (optional) */}
      <div>
        <label className="mb-1 block text-xs font-medium text-gray-600">
          {t.dueDateLabel}
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-1 focus:ring-emerald-400"
        />
      </div>

      {/* Status message */}
      {message && (
        <p
          className={cn(
            "text-xs",
            status === "success" ? "text-emerald-600" : "text-rose-600",
          )}
        >
          {message}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className={cn(
          "inline-flex w-full items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors",
          status === "submitting"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2",
        )}
      >
        {status === "submitting" ? t.submitting : t.submit}
      </button>
    </form>
  );
}
