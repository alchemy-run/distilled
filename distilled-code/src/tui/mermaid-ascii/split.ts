/**
 * Markdown Content Splitter
 *
 * Splits markdown content into segments, extracting mermaid code blocks
 * for special rendering. Handles streaming content where blocks may be incomplete.
 */

/**
 * A segment of markdown content
 */
export interface ContentSegment {
  /**
   * Type of content
   * - 'text': Regular markdown text
   * - 'mermaid': Mermaid diagram code block
   */
  type: "text" | "mermaid";

  /**
   * The actual content (for mermaid, this is the diagram code without fences)
   */
  content: string;

  /**
   * Whether this segment is complete
   * - For text: always true
   * - For mermaid: true only if closing ``` fence is present
   */
  isComplete: boolean;
}

/**
 * Regex to match mermaid code blocks
 * Captures:
 * - Group 1: Content before the mermaid block
 * - Group 2: The mermaid code (without fences)
 * - Group 3: Content after the closing fence (if present)
 */
const MERMAID_BLOCK_REGEX = /```mermaid\s*\n([\s\S]*?)```/g;

/**
 * Regex to detect an incomplete mermaid block at the end of content
 * (opening fence without closing fence)
 */
const INCOMPLETE_MERMAID_REGEX = /```mermaid\s*\n([\s\S]*)$/;

/**
 * Split markdown content into segments, separating mermaid blocks from regular text.
 *
 * @param content - The markdown content to split
 * @returns Array of content segments
 *
 * @example
 * ```ts
 * const segments = splitMarkdownContent("Hello\n```mermaid\nflowchart\n```\nWorld");
 * // Returns:
 * // [
 * //   { type: 'text', content: 'Hello\n', isComplete: true },
 * //   { type: 'mermaid', content: 'flowchart\n', isComplete: true },
 * //   { type: 'text', content: '\nWorld', isComplete: true }
 * // ]
 * ```
 */
export function splitMarkdownContent(content: string): ContentSegment[] {
  const segments: ContentSegment[] = [];

  // Find all complete mermaid blocks
  const completeBlocks: Array<{
    start: number;
    end: number;
    code: string;
  }> = [];

  let match: RegExpExecArray | null;
  const regex = new RegExp(MERMAID_BLOCK_REGEX);

  while ((match = regex.exec(content)) !== null) {
    completeBlocks.push({
      start: match.index,
      end: match.index + match[0].length,
      code: match[1],
    });
  }

  // Build segments from the content
  let lastEnd = 0;

  for (const block of completeBlocks) {
    // Add text before this block (if any)
    if (block.start > lastEnd) {
      const textContent = content.slice(lastEnd, block.start);
      if (textContent) {
        segments.push({
          type: "text",
          content: textContent,
          isComplete: true,
        });
      }
    }

    // Add the mermaid block
    segments.push({
      type: "mermaid",
      content: block.code,
      isComplete: true,
    });

    lastEnd = block.end;
  }

  // Handle remaining content after last complete block
  const remaining = content.slice(lastEnd);

  if (remaining) {
    // Check if there's an incomplete mermaid block at the end
    const incompleteMatch = INCOMPLETE_MERMAID_REGEX.exec(remaining);

    if (incompleteMatch) {
      // Text before the incomplete mermaid block
      const textBefore = remaining.slice(0, incompleteMatch.index);
      if (textBefore) {
        segments.push({
          type: "text",
          content: textBefore,
          isComplete: true,
        });
      }

      // The incomplete mermaid block
      segments.push({
        type: "mermaid",
        content: incompleteMatch[1],
        isComplete: false,
      });
    } else {
      // Just regular text
      segments.push({
        type: "text",
        content: remaining,
        isComplete: true,
      });
    }
  }

  // Filter out empty segments
  return segments.filter((s) => s.content.length > 0);
}

/**
 * Check if content contains any mermaid blocks (complete or incomplete)
 */
export function hasMermaidBlocks(content: string): boolean {
  return content.includes("```mermaid");
}

/**
 * Extract just the mermaid diagram source from a complete block
 * (utility for when you just need the diagram code)
 */
export function extractMermaidSource(block: string): string | null {
  const match = /```mermaid\s*\n([\s\S]*?)```/.exec(block);
  return match ? match[1] : null;
}
