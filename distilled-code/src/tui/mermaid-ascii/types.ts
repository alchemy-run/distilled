/**
 * Mermaid ASCII - Type Definitions
 *
 * Shared types for the mermaid-ascii renderer, ported from the Go implementation.
 */

/**
 * Generic coordinate type
 */
export interface Coord {
  x: number;
  y: number;
}

/**
 * Grid coordinate - used for layout (4 units per node)
 */
export type GridCoord = Coord;

/**
 * Drawing coordinate - used for character-level positioning
 */
export type DrawingCoord = Coord;

/**
 * Direction constants for edge routing
 * Each direction is represented as a grid offset
 */
export const Direction = {
  Up: { x: 1, y: 0 } as const,
  Down: { x: 1, y: 2 } as const,
  Left: { x: 0, y: 1 } as const,
  Right: { x: 2, y: 1 } as const,
  UpperRight: { x: 2, y: 0 } as const,
  UpperLeft: { x: 0, y: 0 } as const,
  LowerRight: { x: 2, y: 2 } as const,
  LowerLeft: { x: 0, y: 2 } as const,
  Middle: { x: 1, y: 1 } as const,
} as const;

export type DirectionType = (typeof Direction)[keyof typeof Direction];

/**
 * Get the opposite direction
 */
export function getOppositeDirection(d: DirectionType): DirectionType {
  if (d === Direction.Up) return Direction.Down;
  if (d === Direction.Down) return Direction.Up;
  if (d === Direction.Left) return Direction.Right;
  if (d === Direction.Right) return Direction.Left;
  if (d === Direction.UpperRight) return Direction.LowerLeft;
  if (d === Direction.UpperLeft) return Direction.LowerRight;
  if (d === Direction.LowerRight) return Direction.UpperLeft;
  if (d === Direction.LowerLeft) return Direction.UpperRight;
  return Direction.Middle;
}

/**
 * Apply a direction offset to a coordinate
 */
export function applyDirection(coord: Coord, dir: DirectionType): Coord {
  return { x: coord.x + dir.x, y: coord.y + dir.y };
}

/**
 * Check if two coordinates are equal
 */
export function coordEquals(a: Coord, b: Coord): boolean {
  return a.x === b.x && a.y === b.y;
}

/**
 * 2D character canvas
 */
export type Drawing = string[][];

/**
 * Style class for colored output
 */
export interface StyleClass {
  name: string;
  styles: Record<string, string>;
}

/**
 * Text node parsed from mermaid syntax
 */
export interface TextNode {
  name: string;
  styleClass: string;
}

/**
 * Text edge parsed from mermaid syntax
 */
export interface TextEdge {
  parent: TextNode;
  child: TextNode;
  label: string;
}

/**
 * Subgraph structure
 */
export interface TextSubgraph {
  name: string;
  nodes: string[];
  parent: TextSubgraph | null;
  children: TextSubgraph[];
}

/**
 * Graph node with position and drawing
 */
export interface Node {
  name: string;
  index: number;
  gridCoord: GridCoord | null;
  drawingCoord: DrawingCoord | null;
  drawing: Drawing | null;
  drawn: boolean;
  styleClassName: string;
  styleClass: StyleClass | null;
}

/**
 * Graph edge with path
 */
export interface Edge {
  from: Node;
  to: Node;
  text: string;
  path: GridCoord[];
  labelLine: GridCoord[];
  startDir: DirectionType;
  endDir: DirectionType;
}

/**
 * Subgraph with bounding box
 */
export interface Subgraph {
  name: string;
  nodes: Node[];
  parent: Subgraph | null;
  children: Subgraph[];
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/**
 * Graph properties parsed from mermaid
 */
export interface GraphProperties {
  data: Map<string, TextEdge[]>;
  styleClasses: Map<string, StyleClass>;
  graphDirection: "LR" | "TD";
  styleType: string;
  paddingX: number;
  paddingY: number;
  subgraphs: TextSubgraph[];
  useAscii: boolean;
}

/**
 * Render configuration
 */
export interface RenderConfig {
  /**
   * Use ASCII characters only (no Unicode box-drawing)
   * @default false
   */
  ascii?: boolean;

  /**
   * Horizontal padding between nodes
   * @default 5
   */
  paddingX?: number;

  /**
   * Vertical padding between nodes
   * @default 5
   */
  paddingY?: number;
}

/**
 * Sequence diagram participant
 */
export interface Participant {
  id: string;
  label: string;
  index: number;
}

/**
 * Arrow type for sequence diagrams
 */
export type ArrowType = "solid" | "dotted";

/**
 * Sequence diagram message
 */
export interface Message {
  from: Participant;
  to: Participant;
  label: string;
  arrowType: ArrowType;
  number: number;
}

/**
 * Parsed sequence diagram
 */
export interface SequenceDiagram {
  participants: Participant[];
  messages: Message[];
  autonumber: boolean;
}
