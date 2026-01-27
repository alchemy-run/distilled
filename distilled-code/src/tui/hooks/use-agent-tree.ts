/**
 * useAgentTree Hook
 *
 * Builds a tree structure from agent paths for hierarchical display.
 */

import { Fzf, byLengthAsc, byStartAsc, extendedMatch } from "fzf";
import { createMemo } from "solid-js";

/**
 * Tree node representing a path segment
 */
export interface TreeNode {
  name: string;
  fullPath: string;
  isAgent: boolean;
  children: TreeNode[];
}

/**
 * Flattened row for display
 */
export interface DisplayRow {
  key: string;
  indent: number;
  label: string;
  hasChildren: boolean;
  isAgent: boolean;
  agentId?: string;
}

/**
 * Build a tree from agent paths
 */
export function buildTree(agentPaths: string[]): TreeNode {
  const root: TreeNode = {
    name: "",
    fullPath: "",
    isAgent: false,
    children: [],
  };

  const agentSet = new Set(agentPaths);

  for (const path of agentPaths) {
    const segments = path.split("/");
    let current = root;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const fullPath = segments.slice(0, i + 1).join("/");

      // Find or create child node
      let child = current.children.find((c) => c.name === segment);
      if (!child) {
        child = {
          name: segment,
          fullPath: fullPath,
          isAgent: agentSet.has(fullPath),
          children: [],
        };
        current.children.push(child);
      }

      current = child;
    }
  }

  return root;
}

/**
 * Flatten tree to display rows (depth-first)
 */
export function flattenTree(node: TreeNode, indent: number = 0): DisplayRow[] {
  const rows: DisplayRow[] = [];

  // Sort children alphabetically
  const sortedChildren = [...node.children].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  for (const child of sortedChildren) {
    rows.push({
      key: child.fullPath,
      indent,
      label: child.name,
      hasChildren: child.children.length > 0,
      isAgent: child.isAgent,
      agentId: child.isAgent ? child.fullPath : undefined,
    });

    // Recurse into children
    rows.push(...flattenTree(child, indent + 1));
  }

  return rows;
}

/**
 * Filter agent paths using fuzzy search (FZF algorithm like Telescope)
 */
export function filterAgentPaths(paths: string[], needle: string): string[] {
  if (!needle) return paths;

  const fzf = new Fzf(paths, {
    match: extendedMatch, // Allows space-separated terms as AND conditions
    tiebreakers: [byStartAsc, byLengthAsc], // Prefer earlier matches, then shorter
  });

  const results = fzf.find(needle.trim());
  return results.map((r) => r.item);
}

/**
 * Hook to build and manage agent tree display
 */
export function useAgentTree(allPaths: () => string[], filter: () => string) {
  // Filtered agent paths using fuzzy search (ordered by score when filtered)
  const filteredPaths = createMemo(() =>
    filterAgentPaths(allPaths(), filter()),
  );

  // Build tree from filtered paths
  const tree = createMemo(() => buildTree(filteredPaths()));

  // Flatten tree for display (alphabetical order)
  const treeRows = createMemo(() => flattenTree(tree()));

  return {
    tree,
    treeRows,
    filteredPaths,
  };
}
