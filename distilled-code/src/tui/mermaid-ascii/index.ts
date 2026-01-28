/**
 * Mermaid ASCII - Main Entry Point
 *
 * Renders mermaid diagrams to ASCII text.
 * Ported from the mermaid-ascii Go library.
 *
 * @example
 * ```ts
 * import { render } from "./mermaid-ascii";
 *
 * const ascii = render(`graph LR
 *   A --> B
 *   B --> C`);
 *
 * console.log(ascii);
 * // ┌───┐     ┌───┐     ┌───┐
 * // │   │     │   │     │   │
 * // │ A ├────►│ B ├────►│ C │
 * // │   │     │   │     │   │
 * // └───┘     └───┘     └───┘
 * ```
 */

import { renderGraph } from "./graph.ts";
import { detectDiagramType } from "./parser.ts";
import { renderSequenceDiagram } from "./sequence.ts";
import type { RenderConfig } from "./types.ts";

// Re-export types
export type { RenderConfig } from "./types.ts";

// Re-export split utilities
export {
  extractMermaidSource,
  hasMermaidBlocks,
  splitMarkdownContent,
  type ContentSegment,
} from "./split.ts";

/**
 * Render a mermaid diagram to ASCII text.
 *
 * Automatically detects the diagram type (graph/flowchart or sequence)
 * and renders it appropriately.
 *
 * @param source - The mermaid diagram source code
 * @param config - Optional render configuration
 * @returns ASCII representation of the diagram
 *
 * @example
 * ```ts
 * // Graph/Flowchart
 * render("graph LR\nA --> B");
 *
 * // Sequence diagram
 * render("sequenceDiagram\nAlice->>Bob: Hello");
 *
 * // With ASCII-only output
 * render("graph LR\nA --> B", { ascii: true });
 * ```
 */
export function render(source: string, config: RenderConfig = {}): string {
  const type = detectDiagramType(source);

  if (type === "sequence") {
    return renderSequenceDiagram(source, config);
  }

  return renderGraph(source, config);
}

/**
 * Render a graph/flowchart diagram to ASCII.
 *
 * @param source - The mermaid graph source code
 * @param config - Optional render configuration
 * @returns ASCII representation of the graph
 */
export { renderGraph } from "./graph.ts";

/**
 * Render a sequence diagram to ASCII.
 *
 * @param source - The mermaid sequence diagram source code
 * @param config - Optional render configuration
 * @returns ASCII representation of the sequence diagram
 */
export { renderSequenceDiagram } from "./sequence.ts";

/**
 * Detect the type of a mermaid diagram.
 *
 * @param source - The mermaid source code
 * @returns "sequence" or "graph"
 */
export { detectDiagramType } from "./parser.ts";
