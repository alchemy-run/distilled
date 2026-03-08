/**
 * GCP traits - re-exports shared traits and adds GCP-specific ones.
 */
export * from "@distilled.cloud/sdk-core/traits";

import {
  makeAnnotation,
  type Annotation,
} from "@distilled.cloud/sdk-core/traits";

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
 * Apply error matchers to a schema or error class.
 */
export const applyErrorMatchers = (matchers: ErrorMatcher[]) =>
  makeAnnotation(errorMatchersSymbol, matchers);
