// Re-export everything from distilled-core
export {
  // Core category constants
  AuthError,
  BadRequestError,
  ConflictError,
  NotFoundError,
  QuotaError,
  ServerError,
  ThrottlingError,
  NetworkError,
  ParseError,
  ConfigurationError,
  TimeoutError,
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
  withNetworkError,
  withParseError,
  withConfigurationError,
  withTimeoutError,
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
  isParseError,
  isConfigurationError,
  isTimeoutError,
  isRetryableError,
  // Transient error detection
  isRetryable,
  getRetryableInfo,
  isThrottling,
  isTransientError,
  isHttpClientTransportError,
  // Category catchers
  makeCatcher,
  catchErrors,
  catchErrors as catch,
  catchAuthError,
  catchBadRequestError,
  catchConflictError,
  catchNotFoundError,
  catchQuotaError,
  catchServerError,
  catchThrottlingError,
  catchNetworkError,
  catchParseError,
  catchConfigurationError,
  catchTimeoutError,
  catchRetryableError,
  catchCategory,
} from "distilled-core/Category";

export type {
  CoreCategory,
  RetryableInfo,
  AllKeys,
  ExtractAll,
} from "distilled-core/Category";

// ============================================================================
// Neon-Specific Category Extensions
// ============================================================================

import {
  withCategory,
  makeCatcher,
  hasCategory,
} from "distilled-core/Category";
import type { CoreCategory } from "distilled-core/Category";

export const LockedError = "LockedError";

export type Category = CoreCategory | typeof LockedError;

export const withLockedError = withCategory(LockedError);

export const isLockedError = (error: unknown): boolean =>
  hasCategory(error, LockedError);

export const catchLockedError = makeCatcher(LockedError);
