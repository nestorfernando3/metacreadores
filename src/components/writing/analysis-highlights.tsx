import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";
import type { Node } from "@tiptap/pm/model";
import type { EditorState, Transaction } from "@tiptap/pm/state";
import type { FigureMatch } from "@/lib/ai/schemas";

export type { FigureMatch };

// ---------------------------------------------------------------------------
// Offset validation
// ---------------------------------------------------------------------------

/**
 * Validate highlight offsets against the given text content.
 * Filters out matches with invalid or out-of-bounds offsets safely.
 */
export function validateHighlights(
  matches: FigureMatch[],
  text: string,
): FigureMatch[] {
  return matches.filter((m) => {
    return (
      Number.isFinite(m.start) &&
      Number.isFinite(m.end) &&
      m.start >= 0 &&
      m.end <= text.length &&
      m.start < m.end
    );
  });
}

// ---------------------------------------------------------------------------
// ProseMirror position mapping
// ---------------------------------------------------------------------------

/**
 * Map a textContent offset to a ProseMirror document position.
 *
 * ProseMirror positions differ from string offsets because each block node
 * (paragraph, list item, etc.) adds 1 to the position indexing. For a
 * document with simple paragraph nodes the formula is:
 *   pos = offset + 1 + newlines_before(offset)
 *
 * Returns `null` when the offset falls outside valid boundaries.
 */
function offsetToDocPos(doc: Node, offset: number): number | null {
  const text = doc.textContent;
  if (offset < 0 || offset > text.length) return null;

  const before = text.slice(0, offset);
  const newlines = before.split("\n").length - 1;
  const pos = offset + 1 + newlines;

  if (pos < 1 || pos > doc.content.size) return null;
  return pos;
}

// ---------------------------------------------------------------------------
// Decoration builder
// ---------------------------------------------------------------------------

/**
 * Build a ProseMirror DecorationSet from figure match data.
 * Invalid spans are silently ignored.
 */
export function buildHighlightDecorations(
  doc: Node,
  matches: FigureMatch[],
): DecorationSet {
  const text = doc.textContent;
  const valid = validateHighlights(matches, text);
  if (valid.length === 0) return DecorationSet.empty;

  const decorations: Decoration[] = [];

  for (const match of valid) {
    const from = offsetToDocPos(doc, match.start);
    const to = offsetToDocPos(doc, match.end);

    if (from !== null && to !== null && from < to) {
      decorations.push(
        Decoration.inline(from, to, {
          class: `highlight-figure highlight--${match.figureSlug}`,
          "data-figure-slug": match.figureSlug,
          "data-figure-name": match.figureName,
          "data-confidence": String(match.confidence),
        }),
      );
    }
  }

  return DecorationSet.create(doc, decorations);
}

// ---------------------------------------------------------------------------
// TipTap plugin factory
// ---------------------------------------------------------------------------

/**
 * Create a ProseMirror plugin that renders figure highlights as inline
 * decorations. Accepts a getter function that returns the latest matches
 * so the plugin can stay reactive without being re-created on every render.
 */
function createHighlightPlugin(
  getHighlights: () => FigureMatch[],
): Plugin {
  return new Plugin<DecorationSet>({
    key: new PluginKey("figureHighlight"),
    state: {
      init() {
        return DecorationSet.empty;
      },
      apply(
        _tr: Transaction,
        _set: DecorationSet,
        _oldState: EditorState,
        newState: EditorState,
      ) {
        return buildHighlightDecorations(newState.doc, getHighlights());
      },
    },
    props: {
      decorations(this: Plugin<DecorationSet>, state: EditorState) {
        return this.getState(state);
      },
    },
  });
}

/**
 * Create a TipTap Extension that renders figure highlights as inline
 * decorations. Accepts a getter function so the extension stays reactive
 * without being re-created on every render.
 */
export function createFigureHighlightExtension(
  getHighlights: () => FigureMatch[],
) {
  return Extension.create({
    name: "figureHighlight",
    addProseMirrorPlugins() {
      return [createHighlightPlugin(getHighlights)];
    },
  });
}
