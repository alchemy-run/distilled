/**
 * Mermaid ASCII - Character Sets
 *
 * Unicode and ASCII character definitions for box drawing, arrows, and lines.
 * Ported from the Go implementation.
 */

/**
 * Box drawing characters for graphs/flowcharts
 */
export interface BoxChars {
  horizontal: string;
  vertical: string;
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  teeRight: string;
  teeLeft: string;
  teeDown: string;
  teeUp: string;
  cross: string;
  arrowUp: string;
  arrowDown: string;
  arrowLeft: string;
  arrowRight: string;
  arrowUpperLeft: string;
  arrowUpperRight: string;
  arrowLowerLeft: string;
  arrowLowerRight: string;
  diagonalDown: string;
  diagonalUp: string;
}

/**
 * Sequence diagram characters
 */
export interface SequenceChars {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
  horizontal: string;
  vertical: string;
  teeDown: string;
  teeRight: string;
  teeLeft: string;
  cross: string;
  arrowRight: string;
  arrowLeft: string;
  solidLine: string;
  dottedLine: string;
  selfTopRight: string;
  selfBottom: string;
}

/**
 * Unicode box drawing characters for graphs
 */
export const UnicodeBoxChars: BoxChars = {
  horizontal: "─",
  vertical: "│",
  topLeft: "┌",
  topRight: "┐",
  bottomLeft: "└",
  bottomRight: "┘",
  teeRight: "├",
  teeLeft: "┤",
  teeDown: "┬",
  teeUp: "┴",
  cross: "┼",
  arrowUp: "▲",
  arrowDown: "▼",
  arrowLeft: "◄",
  arrowRight: "►",
  arrowUpperLeft: "◤",
  arrowUpperRight: "◥",
  arrowLowerLeft: "◣",
  arrowLowerRight: "◢",
  diagonalDown: "╲",
  diagonalUp: "╱",
};

/**
 * ASCII-only box drawing characters for graphs
 */
export const AsciiBoxChars: BoxChars = {
  horizontal: "-",
  vertical: "|",
  topLeft: "+",
  topRight: "+",
  bottomLeft: "+",
  bottomRight: "+",
  teeRight: "+",
  teeLeft: "+",
  teeDown: "+",
  teeUp: "+",
  cross: "+",
  arrowUp: "^",
  arrowDown: "v",
  arrowLeft: "<",
  arrowRight: ">",
  arrowUpperLeft: "\\",
  arrowUpperRight: "/",
  arrowLowerLeft: "/",
  arrowLowerRight: "\\",
  diagonalDown: "\\",
  diagonalUp: "/",
};

/**
 * Unicode characters for sequence diagrams
 */
export const UnicodeSequenceChars: SequenceChars = {
  topLeft: "┌",
  topRight: "┐",
  bottomLeft: "└",
  bottomRight: "┘",
  horizontal: "─",
  vertical: "│",
  teeDown: "┬",
  teeRight: "├",
  teeLeft: "┤",
  cross: "┼",
  arrowRight: "►",
  arrowLeft: "◄",
  solidLine: "─",
  dottedLine: "┈",
  selfTopRight: "┐",
  selfBottom: "┘",
};

/**
 * ASCII characters for sequence diagrams
 */
export const AsciiSequenceChars: SequenceChars = {
  topLeft: "+",
  topRight: "+",
  bottomLeft: "+",
  bottomRight: "+",
  horizontal: "-",
  vertical: "|",
  teeDown: "+",
  teeRight: "+",
  teeLeft: "+",
  cross: "+",
  arrowRight: ">",
  arrowLeft: "<",
  solidLine: "-",
  dottedLine: ".",
  selfTopRight: "+",
  selfBottom: "+",
};

/**
 * Junction characters that can be merged
 */
export const junctionChars = [
  "─",
  "│",
  "┌",
  "┐",
  "└",
  "┘",
  "├",
  "┤",
  "┬",
  "┴",
  "┼",
  "╴",
  "╵",
  "╶",
  "╷",
];

/**
 * Check if a character is a junction character
 */
export function isJunctionChar(c: string): boolean {
  return junctionChars.includes(c);
}

/**
 * Merge two junction characters into the appropriate combined junction
 */
export function mergeJunctions(c1: string, c2: string): string {
  const junctionMap: Record<string, Record<string, string>> = {
    "─": {
      "│": "┼",
      "┌": "┬",
      "┐": "┬",
      "└": "┴",
      "┘": "┴",
      "├": "┼",
      "┤": "┼",
      "┬": "┬",
      "┴": "┴",
    },
    "│": {
      "─": "┼",
      "┌": "├",
      "┐": "┤",
      "└": "├",
      "┘": "┤",
      "├": "├",
      "┤": "┤",
      "┬": "┼",
      "┴": "┼",
    },
    "┌": {
      "─": "┬",
      "│": "├",
      "┐": "┬",
      "└": "├",
      "┘": "┼",
      "├": "├",
      "┤": "┼",
      "┬": "┬",
      "┴": "┼",
    },
    "┐": {
      "─": "┬",
      "│": "┤",
      "┌": "┬",
      "└": "┼",
      "┘": "┤",
      "├": "┼",
      "┤": "┤",
      "┬": "┬",
      "┴": "┼",
    },
    "└": {
      "─": "┴",
      "│": "├",
      "┌": "├",
      "┐": "┼",
      "┘": "┴",
      "├": "├",
      "┤": "┼",
      "┬": "┼",
      "┴": "┴",
    },
    "┘": {
      "─": "┴",
      "│": "┤",
      "┌": "┼",
      "┐": "┤",
      "└": "┴",
      "├": "┼",
      "┤": "┤",
      "┬": "┼",
      "┴": "┴",
    },
    "├": {
      "─": "┼",
      "│": "├",
      "┌": "├",
      "┐": "┼",
      "└": "├",
      "┘": "┼",
      "┤": "┼",
      "┬": "┼",
      "┴": "┼",
    },
    "┤": {
      "─": "┼",
      "│": "┤",
      "┌": "┼",
      "┐": "┤",
      "└": "┼",
      "┘": "┤",
      "├": "┼",
      "┬": "┼",
      "┴": "┼",
    },
    "┬": {
      "─": "┬",
      "│": "┼",
      "┌": "┬",
      "┐": "┬",
      "└": "┼",
      "┘": "┼",
      "├": "┼",
      "┤": "┼",
      "┴": "┼",
    },
    "┴": {
      "─": "┴",
      "│": "┼",
      "┌": "┼",
      "┐": "┼",
      "└": "┴",
      "┘": "┴",
      "├": "┼",
      "┤": "┼",
      "┬": "┼",
    },
  };

  const merged = junctionMap[c1]?.[c2];
  return merged ?? c1;
}

/**
 * Get the character set based on ascii flag
 */
export function getBoxChars(ascii: boolean): BoxChars {
  return ascii ? AsciiBoxChars : UnicodeBoxChars;
}

/**
 * Get the sequence character set based on ascii flag
 */
export function getSequenceChars(ascii: boolean): SequenceChars {
  return ascii ? AsciiSequenceChars : UnicodeSequenceChars;
}
