/**
 * Utility for recursively collecting references from template references.
 *
 * Used by Toolkit to collect tools and by context.ts to collect toolkits.
 */

import { resolveThunk } from "./render-template.ts";

/**
 * Options for collecting references.
 */
export interface CollectOptions<T> {
  /**
   * Predicate to determine if a value should be collected.
   */
  matches: (value: unknown) => value is T;

  /**
   * Optional predicate to determine if we should recurse into a value's references.
   * If not provided, recursion stops after matching items.
   */
  shouldRecurse?: (value: unknown) => boolean;

  /**
   * Optional function to get references from a value for recursion.
   * Defaults to checking for a `references` property.
   */
  getReferences?: (value: unknown) => unknown[] | undefined;
}

/**
 * Recursively collects items from references that match a predicate.
 *
 * Handles:
 * - Arrays (flattens and recurses into each element)
 * - Plain objects (recurses into values)
 * - Thunks (resolves before checking)
 * - Items with `references` property (recurses into references)
 *
 * @param refs - The references to collect from
 * @param options - Collection options including the match predicate
 * @returns Array of collected items
 */
export const collectReferences = <T>(
  refs: unknown[],
  options: CollectOptions<T>,
): T[] => {
  const { matches, shouldRecurse, getReferences } = options;
  const collected: T[] = [];
  const visited = new Set<unknown>();

  const collect = (rawValue: unknown): void => {
    // Resolve thunks first
    const value = resolveThunk(rawValue);

    if (value === null || value === undefined) return;

    // Avoid infinite loops with circular references
    if (typeof value === "object" || typeof value === "function") {
      if (visited.has(value)) return;
      visited.add(value);
    }

    // Check if this value matches
    if (matches(value)) {
      collected.push(value);
      // Optionally recurse into matched item's references
      if (shouldRecurse?.(value)) {
        const refs = getReferences?.(value) ?? (value as any).references;
        if (Array.isArray(refs)) {
          refs.forEach(collect);
        }
      }
      return;
    }

    // Handle arrays - recurse into each element
    if (Array.isArray(value)) {
      value.forEach(collect);
      return;
    }

    // Handle plain objects - recurse into values
    if (typeof value === "object") {
      const proto = Object.getPrototypeOf(value);
      if (proto === null || proto === Object.prototype) {
        Object.values(value).forEach(collect);
        return;
      }
    }

    // For non-matching objects/functions with references, optionally recurse
    if (
      (typeof value === "object" || typeof value === "function") &&
      shouldRecurse?.(value)
    ) {
      const refs = getReferences?.(value) ?? (value as any).references;
      if (Array.isArray(refs)) {
        refs.forEach(collect);
      }
    }
  };

  refs.forEach(collect);
  return collected;
};

/**
 * Simple version that just collects items matching a predicate.
 * Handles arrays and plain objects recursively.
 */
export const collectFlat = <T>(
  refs: unknown[],
  matches: (value: unknown) => value is T,
): T[] => collectReferences(refs, { matches });
