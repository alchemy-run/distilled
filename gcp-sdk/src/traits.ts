/**
 * GCP traits - re-exports shared traits and adds GCP-specific ones.
 */
export * from "@distilled.cloud/sdk-core/traits";

import { makeAnnotation } from "@distilled.cloud/sdk-core/traits";

// =============================================================================
// GCP-specific Error Matcher Traits
// =============================================================================

/** Symbol for error matcher annotations */
export const errorMatchersSymbol = Symbol.for(
  "@distilled.cloud/gcp/error-matchers",
);

export interface ErrorMatcher {
  httpStatus?: number;
  status?: string;
  reason?: string;
  domain?: string;
  message?: string;
}

/**
 * Apply error matchers to an error class.
 * Mutates the class's schema AST to annotate it with error matchers.
 */
export const applyErrorMatchers = (
  cls: any,
  matchers: ErrorMatcher[],
): void => {
  const annotation = makeAnnotation(errorMatchersSymbol, matchers);
  // Apply annotation to the class's AST if possible
  if (cls && typeof cls === "function" && cls.ast) {
    annotation(cls.ast);
  }
};
