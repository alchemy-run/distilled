/**
 * Mermaid ASCII - Parser
 *
 * Parse mermaid syntax into graph properties.
 * Ported from the Go implementation (cmd/parse.go).
 */

import type {
  GraphProperties,
  StyleClass,
  TextEdge,
  TextNode,
  TextSubgraph,
} from "./types.ts";

/**
 * Default padding values
 */
const DEFAULT_PADDING_X = 5;
const DEFAULT_PADDING_Y = 5;

/**
 * Remove comments from mermaid lines
 */
export function removeComments(lines: string[]): string[] {
  const cleaned: string[] = [];

  for (let line of lines) {
    // Skip lines that start with %%
    if (line.trim().startsWith("%%")) {
      continue;
    }

    // Remove inline comments
    const commentIdx = line.indexOf("%%");
    if (commentIdx !== -1) {
      line = line.slice(0, commentIdx).trimEnd();
    }

    // Only keep non-empty lines
    if (line.trim().length > 0) {
      cleaned.push(line);
    }
  }

  return cleaned;
}

/**
 * Split input on newlines (handles both \n and escaped \\n)
 */
export function splitLines(input: string): string[] {
  return input.split(/\n|\\n/);
}

/**
 * Parse a node from a line, extracting style class if present
 */
export function parseNode(line: string): TextNode {
  const trimmed = line.trim();

  // Check for node with style class: nodeName:::className
  const match = trimmed.match(/^(.+):::(.+)$/);
  if (match) {
    return { name: match[1].trim(), styleClass: match[2].trim() };
  }

  return { name: trimmed, styleClass: "" };
}

/**
 * Parse a style class definition
 */
export function parseStyleClass(className: string, styles: string): StyleClass {
  const styleMap: Record<string, string> = {};

  // Styles are comma-separated, key:value pairs
  for (const style of styles.split(",")) {
    const [key, value] = style.split(":");
    if (key && value) {
      styleMap[key.trim()] = value.trim();
    }
  }

  return { name: className, styles: styleMap };
}

/**
 * Set an edge in the data map
 */
function setEdge(
  parent: TextNode,
  edge: TextEdge,
  data: Map<string, TextEdge[]>,
): void {
  // Add parent if not exists
  if (!data.has(parent.name)) {
    data.set(parent.name, []);
  }
  data.get(parent.name)!.push(edge);

  // Ensure child is in the map
  if (!data.has(edge.child.name)) {
    data.set(edge.child.name, []);
  }
}

/**
 * Add a node without edges
 */
function addNode(node: TextNode, data: Map<string, TextEdge[]>): void {
  if (!data.has(node.name)) {
    data.set(node.name, []);
  }
}

/**
 * Parse a line of mermaid syntax
 */
function parseLine(
  line: string,
  data: Map<string, TextEdge[]>,
  styleClasses: Map<string, StyleClass>,
): TextNode[] {
  // Empty line
  if (line.trim() === "") {
    return [];
  }

  // Arrow with label: A -->|label| B
  const arrowWithLabelMatch = line.match(/^(.+)\s+-->\|(.+)\|\s+(.+)$/);
  if (arrowWithLabelMatch) {
    const lhsNodes = parseLine(arrowWithLabelMatch[1], data, styleClasses);
    const lhs = lhsNodes.length > 0 ? lhsNodes : [parseNode(arrowWithLabelMatch[1])];
    const label = arrowWithLabelMatch[2];
    const rhsNodes = parseLine(arrowWithLabelMatch[3], data, styleClasses);
    const rhs = rhsNodes.length > 0 ? rhsNodes : [parseNode(arrowWithLabelMatch[3])];

    for (const l of lhs) {
      for (const r of rhs) {
        setEdge(l, { parent: l, child: r, label }, data);
      }
    }
    return rhs;
  }

  // Simple arrow: A --> B
  const arrowMatch = line.match(/^(.+)\s+-->\s+(.+)$/);
  if (arrowMatch) {
    const lhsNodes = parseLine(arrowMatch[1], data, styleClasses);
    const lhs = lhsNodes.length > 0 ? lhsNodes : [parseNode(arrowMatch[1])];
    const rhsNodes = parseLine(arrowMatch[2], data, styleClasses);
    const rhs = rhsNodes.length > 0 ? rhsNodes : [parseNode(arrowMatch[2])];

    for (const l of lhs) {
      for (const r of rhs) {
        setEdge(l, { parent: l, child: r, label: "" }, data);
      }
    }
    return rhs;
  }

  // Style class definition: classDef name styles
  const classDefMatch = line.match(/^classDef\s+(\S+)\s+(.+)$/);
  if (classDefMatch) {
    const sc = parseStyleClass(classDefMatch[1], classDefMatch[2]);
    styleClasses.set(sc.name, sc);
    return [];
  }

  // Ampersand grouping: A & B
  const ampMatch = line.match(/^(.+)\s+&\s+(.+)$/);
  if (ampMatch) {
    const lhsNodes = parseLine(ampMatch[1], data, styleClasses);
    const lhs = lhsNodes.length > 0 ? lhsNodes : [parseNode(ampMatch[1])];
    const rhsNodes = parseLine(ampMatch[2], data, styleClasses);
    const rhs = rhsNodes.length > 0 ? rhsNodes : [parseNode(ampMatch[2])];
    return [...lhs, ...rhs];
  }

  return [];
}

/**
 * Parse mermaid graph/flowchart syntax into properties
 */
export function parseGraph(input: string): GraphProperties {
  const rawLines = splitLines(input);

  // Remove comments and empty lines
  let lines = removeComments(rawLines);

  // Stop at --- separator (used in test files)
  const sepIdx = lines.findIndex((l) => l.trim() === "---");
  if (sepIdx !== -1) {
    lines = lines.slice(0, sepIdx);
  }

  const data = new Map<string, TextEdge[]>();
  const styleClasses = new Map<string, StyleClass>();
  let graphDirection: "LR" | "TD" = "LR";
  let paddingX = DEFAULT_PADDING_X;
  let paddingY = DEFAULT_PADDING_Y;
  const subgraphs: TextSubgraph[] = [];

  // Parse optional padding directives
  while (lines.length > 0) {
    const trimmed = lines[0].trim();
    if (trimmed === "") {
      lines.shift();
      continue;
    }

    const paddingMatch = trimmed.match(/^padding([xy])\s*=\s*(\d+)$/i);
    if (paddingMatch) {
      const value = parseInt(paddingMatch[2], 10);
      if (paddingMatch[1].toLowerCase() === "x") {
        paddingX = value;
      } else {
        paddingY = value;
      }
      lines.shift();
      continue;
    }
    break;
  }

  if (lines.length === 0) {
    return {
      data,
      styleClasses,
      graphDirection,
      styleType: "cli",
      paddingX,
      paddingY,
      subgraphs,
      useAscii: false,
    };
  }

  // Parse graph direction
  const firstLine = lines[0].trim();
  if (
    firstLine === "graph LR" ||
    firstLine === "flowchart LR"
  ) {
    graphDirection = "LR";
    lines.shift();
  } else if (
    firstLine === "graph TD" ||
    firstLine === "flowchart TD" ||
    firstLine === "graph TB" ||
    firstLine === "flowchart TB"
  ) {
    graphDirection = "TD";
    lines.shift();
  }

  // Track subgraph context
  const subgraphStack: TextSubgraph[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Subgraph start
    const subgraphMatch = trimmed.match(/^subgraph\s+(.+)$/);
    if (subgraphMatch) {
      const newSubgraph: TextSubgraph = {
        name: subgraphMatch[1].trim(),
        nodes: [],
        parent: subgraphStack.length > 0 ? subgraphStack[subgraphStack.length - 1] : null,
        children: [],
      };

      if (newSubgraph.parent) {
        newSubgraph.parent.children.push(newSubgraph);
      }

      subgraphStack.push(newSubgraph);
      subgraphs.push(newSubgraph);
      continue;
    }

    // Subgraph end
    if (trimmed.match(/^end$/i)) {
      subgraphStack.pop();
      continue;
    }

    // Track existing nodes before parsing
    const existingNodes = new Set(data.keys());

    // Parse the line
    const nodes = parseLine(line, data, styleClasses);

    // If no nodes returned, try parsing as a single node
    if (nodes.length === 0 && trimmed.length > 0) {
      const node = parseNode(trimmed);
      addNode(node, data);
    } else {
      for (const node of nodes) {
        addNode(node, data);
      }
    }

    // Add new nodes to current subgraphs
    if (subgraphStack.length > 0) {
      for (const nodeName of data.keys()) {
        if (!existingNodes.has(nodeName)) {
          for (const sg of subgraphStack) {
            if (!sg.nodes.includes(nodeName)) {
              sg.nodes.push(nodeName);
            }
          }
        }
      }
    }
  }

  return {
    data,
    styleClasses,
    graphDirection,
    styleType: "cli",
    paddingX,
    paddingY,
    subgraphs,
    useAscii: false,
  };
}

/**
 * Check if input is a sequence diagram
 */
export function isSequenceDiagram(input: string): boolean {
  const lines = splitLines(input);
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("%%")) {
      continue;
    }
    return trimmed.startsWith("sequenceDiagram");
  }
  return false;
}

/**
 * Detect diagram type
 */
export function detectDiagramType(input: string): "sequence" | "graph" {
  return isSequenceDiagram(input) ? "sequence" : "graph";
}
