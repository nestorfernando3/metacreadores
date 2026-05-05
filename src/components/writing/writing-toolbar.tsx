"use client";

import React from "react";
import type { Editor } from "@tiptap/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Minimal SVG icons
// ---------------------------------------------------------------------------

function BoldIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 2.5C4 2.22386 4.22386 2 4.5 2H7.5C8.88071 2 10 3.11929 10 4.5C10 5.88071 8.88071 7 7.5 7H4V2.5ZM4 7H8C9.38071 7 10.5 8.11929 10.5 9.5C10.5 10.8807 9.38071 12 8 12H4.5C4.22386 12 4 11.7761 4 11.5V7Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

function ItalicIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M6 2.5C6 2.22386 6.22386 2 6.5 2H9.5C9.77614 2 10 2.22386 10 2.5C10 2.77614 9.77614 3 9.5 3H6.5C6.22386 3 6 2.77614 6 2.5Z"
        fill="currentColor"
      />
      <path
        d="M5 12.5C5 12.2239 5.22386 12 5.5 12H8.5C8.77614 12 9 12.2239 9 12.5C9 12.7761 8.77614 13 8.5 13H5.5C5.22386 13 5 12.7761 5 12.5Z"
        fill="currentColor"
      />
      <path
        d="M8.5 2.5L6.5 12.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M2.5 4.5C2.5 3.94772 2.94772 3.5 3.5 3.5C4.05228 3.5 4.5 3.94772 4.5 4.5C4.5 5.05228 4.05228 5.5 3.5 5.5C2.94772 5.5 2.5 5.05228 2.5 4.5Z"
        fill="currentColor"
      />
      <path
        d="M6 4C5.72386 4 5.5 4.22386 5.5 4.5C5.5 4.77614 5.72386 5 6 5H12C12.2761 5 12.5 4.77614 12.5 4.5C12.5 4.22386 12.2761 4 12 4H6Z"
        fill="currentColor"
      />
      <path
        d="M6 7C5.72386 7 5.5 7.22386 5.5 7.5C5.5 7.77614 5.72386 8 6 8H12C12.2761 8 12.5 7.77614 12.5 7.5C12.5 7.22386 12.2761 7 12 7H6Z"
        fill="currentColor"
      />
      <path
        d="M6 10C5.72386 10 5.5 10.2239 5.5 10.5C5.5 10.7761 5.72386 11 6 11H12C12.2761 11 12.5 10.7761 12.5 10.5C12.5 10.2239 12.2761 10 12 10H6Z"
        fill="currentColor"
      />
      <path
        d="M3.5 7.5C3.5 7.94772 3.94772 8.5 3.5 8.5C3.05228 8.5 2.5 7.94772 2.5 7.5C2.5 7.05228 3.05228 6.5 3.5 6.5C3.94772 6.5 3.5 7.05228 3.5 7.5Z"
        fill="currentColor"
      />
      <path
        d="M3.5 10.5C3.5 10.9477 3.94772 11.5 3.5 11.5C3.05228 11.5 2.5 10.9477 2.5 10.5C2.5 10.0523 3.05228 9.5 3.5 9.5C3.94772 9.5 3.5 10.0523 3.5 10.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Toolbar button
// ---------------------------------------------------------------------------

interface ToolbarBtnProps {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}

function ToolbarBtn({ active, onClick, title, children }: ToolbarBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={cn(
        "rounded p-1.5 text-sm font-medium transition-colors hover:bg-gray-100",
        active && "bg-gray-100 text-gray-900",
        !active && "text-gray-500",
      )}
    >
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// WritingToolbar
// ---------------------------------------------------------------------------

export interface WritingToolbarProps {
  editor: Editor | null;
  onAnalyze?: () => void;
  onSave?: () => void;
  isAnalyzing?: boolean;
  isSaving?: boolean;
  canSave?: boolean;
}

export function WritingToolbar({
  editor,
  onAnalyze,
  onSave,
  isAnalyzing,
  isSaving,
  canSave,
}: WritingToolbarProps) {
  const t = useTranslations("writing.toolbar");

  if (!editor) return null;

  return (
    <div className="flex items-center gap-1 border-b border-gray-200 px-3 py-2">
      <ToolbarBtn
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
        title={t("bold")}
      >
        <BoldIcon />
      </ToolbarBtn>

      <ToolbarBtn
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        title={t("italic")}
      >
        <ItalicIcon />
      </ToolbarBtn>

      <ToolbarBtn
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        title={t("bulletList")}
      >
        <ListIcon />
      </ToolbarBtn>

      <div className="ml-auto flex items-center gap-2">
        {onSave && (
          <Button
            size="sm"
            variant="outline"
            onClick={onSave}
            disabled={isSaving || !canSave}
          >
            {isSaving ? t("saving") : t("save")}
          </Button>
        )}
        <Button size="sm" onClick={onAnalyze} disabled={isAnalyzing}>
          {isAnalyzing ? t("analyzing") : t("analyze")}
        </Button>
      </div>
    </div>
  );
}
