"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useEffect, useRef } from "react";
import { createFigureHighlightExtension } from "./analysis-highlights";
import type { FigureMatch } from "./analysis-highlights";
import { WritingToolbar } from "./writing-toolbar";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// WritingEditor
// ---------------------------------------------------------------------------

export interface WritingEditorProps {
  /** Initial editor content (plain text). */
  value?: string;
  /** Called whenever the document text changes. */
  onChange?: (text: string) => void;
  /** User clicked the analyze button. */
  onAnalyze?: () => void;
  /** User clicked the save button. */
  onSave?: () => void;
  /** Figure matches to render as inline highlights. */
  highlights?: FigureMatch[];
  /** Whether an analysis is in flight. */
  isAnalyzing?: boolean;
  /** Whether a save is in flight. */
  isSaving?: boolean;
  /** Whether the save button should be enabled. */
  canSave?: boolean;
  /** Placeholder shown when the editor is empty. */
  placeholder?: string;
  className?: string;
}

export function WritingEditor({
  value = "",
  onChange,
  onAnalyze,
  onSave,
  highlights = [],
  isAnalyzing = false,
  isSaving = false,
  canSave = false,
  placeholder = "",
  className,
}: WritingEditorProps) {
  // Ref-based highlights so the decoration plugin always reads fresh data
  // without needing to re-create the plugin on every render.
  const highlightsRef = useRef<FigureMatch[]>([]);
  highlightsRef.current = highlights;

  const getHighlights = useCallback(() => highlightsRef.current, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder }),
      createFigureHighlightExtension(getHighlights),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getText());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none focus:outline-none min-h-[220px] px-4 py-3",
      },
    },
  });

  // Force a transaction when highlights change so the plugin rebuilds
  // decorations for the new match data.
  useEffect(() => {
    if (editor && highlights.length > 0) {
      editor.view.dispatch(editor.state.tr);
    }
  }, [highlights, editor]);

  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white shadow-sm",
        className,
      )}
    >
      <WritingToolbar
        editor={editor}
        onAnalyze={onAnalyze}
        onSave={onSave}
        isAnalyzing={isAnalyzing}
        isSaving={isSaving}
        canSave={canSave}
      />
      <EditorContent editor={editor} />
    </div>
  );
}
