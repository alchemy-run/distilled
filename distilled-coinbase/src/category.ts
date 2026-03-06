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
// Coinbase-Specific Category Extensions
// ============================================================================

import {
  withCategory,
  makeCatcher,
  hasCategory,
} from "distilled-core/Category";
import type { CoreCategory } from "distilled-core/Category";

export const PaymentRequiredError = "PaymentRequiredError";
export const PolicyError = "PolicyError";
export const MfaError = "MfaError";

export type Category =
  | CoreCategory
  | typeof PaymentRequiredError
  | typeof PolicyError
  | typeof MfaError;

export const withPaymentRequiredError = withCategory(PaymentRequiredError);
export const withPolicyError = withCategory(PolicyError);
export const withMfaError = withCategory(MfaError);

export const isPaymentRequiredError = (error: unknown): boolean =>
  hasCategory(error, PaymentRequiredError);

export const isPolicyError = (error: unknown): boolean =>
  hasCategory(error, PolicyError);

export const isMfaError = (error: unknown): boolean =>
  hasCategory(error, MfaError);

export const catchPaymentRequiredError = makeCatcher(PaymentRequiredError);
export const catchPolicyError = makeCatcher(PolicyError);
export const catchMfaError = makeCatcher(MfaError);
