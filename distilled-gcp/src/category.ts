/**
 * Error categories for GCP API errors.
 *
 * Maps to gRPC status codes and common GCP error patterns.
 * Categories enable pattern-based error handling (e.g., retry all throttling errors).
 */

// Re-export core categories
export {
  // Core category constants
  AuthError,
  BadRequestError,
  ConflictError,
  NotFoundError,
  QuotaError,
  ServerError,
  ThrottlingError,
  TimeoutError,
  NetworkError,
  RetryableError,
  // Category storage keys
  categoriesKey,
  retryableKey,
  // Category decorators
  withCategory,
  withRetryable,
  withAuthError,
  withBadRequestError,
  withConflictError,
  withNotFoundError,
  withQuotaError,
  withServerError,
  withThrottlingError,
  withTimeoutError,
  withNetworkError,
  withRetryableError,
  // Category predicates
  hasCategory,
  isAuthError,
  isBadRequestError,
  isConflictError,
  isNotFoundError,
  isQuotaError,
  isServerError,
  isThrottlingError,
  isNetworkError,
  isRetryable,
  isRetryableError,
  // Transient error detection
  getRetryableInfo,
  isThrottling,
  isTransientError,
  isHttpClientTransportError,
  // Category catchers
  makeCatcher,
  catchAuthError,
  catchBadRequestError,
  catchConflictError,
  catchNotFoundError,
  catchQuotaError,
  catchThrottlingError,
  catchTimeoutError,
  catchServerError,
  catchNetworkError,
  catchRetryableError,
  catchErrors,
  catchErrors as catch,
  catchCategory,
} from "distilled-core/Category";

export type {
  CoreCategory,
  RetryableInfo,
  AllKeys,
  ExtractAll,
} from "distilled-core/Category";

// =============================================================================
// GCP-Specific Category Extensions
// =============================================================================

import {
  withCategory,
  makeCatcher,
} from "distilled-core/Category";
import type { CoreCategory } from "distilled-core/Category";

/** Precondition failures (FAILED_PRECONDITION) */
export const PreconditionError = "PreconditionError" as const;
export type PreconditionError = typeof PreconditionError;

/** Service unavailable (UNAVAILABLE) - should be tagged with withRetryable() */
export const UnavailableError = "UnavailableError" as const;
export type UnavailableError = typeof UnavailableError;

/** Unknown error type */
export const UnknownError = "UnknownError" as const;
export type UnknownError = typeof UnknownError;

export type Category =
  | CoreCategory
  | PreconditionError
  | UnavailableError
  | UnknownError;

// GCP-specific decorators
export const withPreconditionError = withCategory(PreconditionError);
export const withUnavailableError = withCategory(UnavailableError);

// GCP-specific catchers
export const catchPreconditionError = makeCatcher(PreconditionError);
export const catchUnavailableError = makeCatcher(UnavailableError);
