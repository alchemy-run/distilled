/**
 * Global error types for Coinbase Developer Platform API operations.
 *
 * These errors are shared across all operations and categorized for
 * semantic error handling using the Category system.
 *
 * Coinbase API error responses use an `errorType` field (string enum)
 * to identify the error type.
 */
import * as Schema from "effect/Schema";
import * as Category from "./category";

// ============================================================================
// Base Errors
// ============================================================================

/**
 * Base error for general Coinbase errors.
 */
export class CoinbaseError extends Schema.TaggedErrorClass<CoinbaseError>()(
  "CoinbaseError",
  {
    message: Schema.String,
    status: Schema.optional(Schema.Number),
  },
).pipe(Category.withServerError) {}

/**
 * Configuration error - missing or invalid configuration.
 */
export class ConfigError extends Schema.TaggedErrorClass<ConfigError>()(
  "ConfigError",
  {
    message: Schema.String,
  },
).pipe(Category.withConfigurationError) {}

// ============================================================================
// API Errors - mapped from Coinbase API errorType codes
// ============================================================================

/**
 * Unauthorized - Authentication failure (401).
 */
export class Unauthorized extends Schema.TaggedErrorClass<Unauthorized>()(
  "Unauthorized",
  {
    message: Schema.String,
  },
).pipe(Category.withAuthError) {}

/**
 * Forbidden - Access denied (403).
 */
export class Forbidden extends Schema.TaggedErrorClass<Forbidden>()(
  "Forbidden",
  {
    message: Schema.String,
  },
).pipe(Category.withAuthError) {}

/**
 * NotFound - Resource not found (404).
 */
export class NotFound extends Schema.TaggedErrorClass<NotFound>()("NotFound", {
  message: Schema.String,
}).pipe(Category.withNotFoundError) {}

/**
 * AlreadyExists - Resource conflict (409).
 */
export class AlreadyExists extends Schema.TaggedErrorClass<AlreadyExists>()(
  "AlreadyExists",
  {
    message: Schema.String,
  },
).pipe(Category.withConflictError) {}

/**
 * InvalidRequest - Bad request (400).
 */
export class InvalidRequest extends Schema.TaggedErrorClass<InvalidRequest>()(
  "InvalidRequest",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * InvalidSignature - Invalid cryptographic signature.
 */
export class InvalidSignature extends Schema.TaggedErrorClass<InvalidSignature>()(
  "InvalidSignature",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * MalformedTransaction - Transaction is malformed.
 */
export class MalformedTransaction extends Schema.TaggedErrorClass<MalformedTransaction>()(
  "MalformedTransaction",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * InvalidSqlQuery - SQL query is invalid.
 */
export class InvalidSqlQuery extends Schema.TaggedErrorClass<InvalidSqlQuery>()(
  "InvalidSqlQuery",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * IdempotencyError - Idempotency key conflict (422).
 */
export class IdempotencyError extends Schema.TaggedErrorClass<IdempotencyError>()(
  "IdempotencyError",
  {
    message: Schema.String,
  },
).pipe(Category.withConflictError) {}

/**
 * PaymentMethodRequired - Payment method needed (402).
 */
export class PaymentMethodRequired extends Schema.TaggedErrorClass<PaymentMethodRequired>()(
  "PaymentMethodRequired",
  {
    message: Schema.String,
  },
).pipe(Category.withPaymentRequiredError) {}

/**
 * RateLimitExceeded - Rate limited (429).
 * Marked as retryable with throttling backoff.
 */
export class RateLimitExceeded extends Schema.TaggedErrorClass<RateLimitExceeded>()(
  "RateLimitExceeded",
  {
    message: Schema.String,
  },
).pipe(
  Category.withThrottlingError,
  Category.withRetryable({ throttling: true }),
) {}

/**
 * FaucetLimitExceeded - Faucet rate limit exceeded.
 */
export class FaucetLimitExceeded extends Schema.TaggedErrorClass<FaucetLimitExceeded>()(
  "FaucetLimitExceeded",
  {
    message: Schema.String,
  },
).pipe(Category.withThrottlingError) {}

/**
 * AccountLimitExceeded - Account limit exceeded.
 */
export class AccountLimitExceeded extends Schema.TaggedErrorClass<AccountLimitExceeded>()(
  "AccountLimitExceeded",
  {
    message: Schema.String,
  },
).pipe(Category.withQuotaError) {}

/**
 * InternalServerError - Server error (500).
 * Marked as retryable.
 */
export class InternalServerError extends Schema.TaggedErrorClass<InternalServerError>()(
  "InternalServerError",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError, Category.withRetryable()) {}

/**
 * BadGateway - Bad gateway (502).
 * Marked as retryable.
 */
export class BadGateway extends Schema.TaggedErrorClass<BadGateway>()(
  "BadGateway",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError, Category.withRetryable()) {}

/**
 * ServiceUnavailable - Service unavailable (503).
 * Marked as retryable.
 */
export class ServiceUnavailable extends Schema.TaggedErrorClass<ServiceUnavailable>()(
  "ServiceUnavailable",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError, Category.withRetryable()) {}

/**
 * TimedOut - Request timed out.
 * Marked as retryable.
 */
export class TimedOut extends Schema.TaggedErrorClass<TimedOut>()("TimedOut", {
  message: Schema.String,
}).pipe(Category.withTimeoutError, Category.withRetryable()) {}

/**
 * RequestCanceled - Request was canceled.
 */
export class RequestCanceled extends Schema.TaggedErrorClass<RequestCanceled>()(
  "RequestCanceled",
  {
    message: Schema.String,
  },
).pipe(Category.withServerError) {}

/**
 * PolicyViolation - Policy engine violation.
 */
export class PolicyViolation extends Schema.TaggedErrorClass<PolicyViolation>()(
  "PolicyViolation",
  {
    message: Schema.String,
  },
).pipe(Category.withPolicyError) {}

/**
 * PolicyInUse - Policy is currently in use and cannot be modified/deleted.
 */
export class PolicyInUse extends Schema.TaggedErrorClass<PolicyInUse>()(
  "PolicyInUse",
  {
    message: Schema.String,
  },
).pipe(Category.withConflictError) {}

/**
 * NetworkNotTradable - The network is not available for trading.
 */
export class NetworkNotTradable extends Schema.TaggedErrorClass<NetworkNotTradable>()(
  "NetworkNotTradable",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * GuestPermissionDenied - Guest user permission denied.
 */
export class GuestPermissionDenied extends Schema.TaggedErrorClass<GuestPermissionDenied>()(
  "GuestPermissionDenied",
  {
    message: Schema.String,
  },
).pipe(Category.withAuthError) {}

/**
 * GuestRegionForbidden - Guest user region is forbidden.
 */
export class GuestRegionForbidden extends Schema.TaggedErrorClass<GuestRegionForbidden>()(
  "GuestRegionForbidden",
  {
    message: Schema.String,
  },
).pipe(Category.withAuthError) {}

/**
 * GuestTransactionLimit - Guest transaction limit exceeded.
 */
export class GuestTransactionLimit extends Schema.TaggedErrorClass<GuestTransactionLimit>()(
  "GuestTransactionLimit",
  {
    message: Schema.String,
  },
).pipe(Category.withThrottlingError) {}

/**
 * GuestTransactionCount - Guest transaction count exceeded.
 */
export class GuestTransactionCount extends Schema.TaggedErrorClass<GuestTransactionCount>()(
  "GuestTransactionCount",
  {
    message: Schema.String,
  },
).pipe(Category.withThrottlingError) {}

/**
 * PhoneNumberVerificationExpired - Phone verification has expired.
 */
export class PhoneNumberVerificationExpired extends Schema.TaggedErrorClass<PhoneNumberVerificationExpired>()(
  "PhoneNumberVerificationExpired",
  {
    message: Schema.String,
  },
).pipe(Category.withAuthError) {}

/**
 * DocumentVerificationFailed - Document verification failed.
 */
export class DocumentVerificationFailed extends Schema.TaggedErrorClass<DocumentVerificationFailed>()(
  "DocumentVerificationFailed",
  {
    message: Schema.String,
  },
).pipe(Category.withAuthError) {}

/**
 * RecipientAllowlistViolation - Recipient is not on the allowlist.
 */
export class RecipientAllowlistViolation extends Schema.TaggedErrorClass<RecipientAllowlistViolation>()(
  "RecipientAllowlistViolation",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * RecipientAllowlistPending - Recipient allowlist entry is pending.
 */
export class RecipientAllowlistPending extends Schema.TaggedErrorClass<RecipientAllowlistPending>()(
  "RecipientAllowlistPending",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * TravelRulesRecipientViolation - Travel rules recipient violation.
 */
export class TravelRulesRecipientViolation extends Schema.TaggedErrorClass<TravelRulesRecipientViolation>()(
  "TravelRulesRecipientViolation",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * TransferAmountOutOfBounds - Transfer amount is out of allowed bounds.
 */
export class TransferAmountOutOfBounds extends Schema.TaggedErrorClass<TransferAmountOutOfBounds>()(
  "TransferAmountOutOfBounds",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * TransferRecipientAddressInvalid - Transfer recipient address is invalid.
 */
export class TransferRecipientAddressInvalid extends Schema.TaggedErrorClass<TransferRecipientAddressInvalid>()(
  "TransferRecipientAddressInvalid",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * TransferQuoteExpired - Transfer quote has expired.
 */
export class TransferQuoteExpired extends Schema.TaggedErrorClass<TransferQuoteExpired>()(
  "TransferQuoteExpired",
  {
    message: Schema.String,
  },
).pipe(Category.withBadRequestError) {}

/**
 * MfaAlreadyEnrolled - MFA is already enrolled.
 */
export class MfaAlreadyEnrolled extends Schema.TaggedErrorClass<MfaAlreadyEnrolled>()(
  "MfaAlreadyEnrolled",
  {
    message: Schema.String,
  },
).pipe(Category.withMfaError) {}

/**
 * MfaInvalidCode - MFA code is invalid.
 */
export class MfaInvalidCode extends Schema.TaggedErrorClass<MfaInvalidCode>()(
  "MfaInvalidCode",
  {
    message: Schema.String,
  },
).pipe(Category.withMfaError) {}

/**
 * MfaFlowExpired - MFA flow has expired.
 */
export class MfaFlowExpired extends Schema.TaggedErrorClass<MfaFlowExpired>()(
  "MfaFlowExpired",
  {
    message: Schema.String,
  },
).pipe(Category.withMfaError) {}

/**
 * MfaRequired - MFA is required for this operation.
 */
export class MfaRequired extends Schema.TaggedErrorClass<MfaRequired>()(
  "MfaRequired",
  {
    message: Schema.String,
  },
).pipe(Category.withMfaError) {}

/**
 * MfaNotEnrolled - MFA is not enrolled.
 */
export class MfaNotEnrolled extends Schema.TaggedErrorClass<MfaNotEnrolled>()(
  "MfaNotEnrolled",
  {
    message: Schema.String,
  },
).pipe(Category.withMfaError) {}

// ============================================================================
// Error Code Map - maps API errorType strings to error classes
// ============================================================================

export const ERROR_CODE_MAP = {
  unauthorized: Unauthorized,
  forbidden: Forbidden,
  not_found: NotFound,
  already_exists: AlreadyExists,
  invalid_request: InvalidRequest,
  invalid_signature: InvalidSignature,
  malformed_transaction: MalformedTransaction,
  invalid_sql_query: InvalidSqlQuery,
  idempotency_error: IdempotencyError,
  payment_method_required: PaymentMethodRequired,
  rate_limit_exceeded: RateLimitExceeded,
  faucet_limit_exceeded: FaucetLimitExceeded,
  account_limit_exceeded: AccountLimitExceeded,
  internal_server_error: InternalServerError,
  bad_gateway: BadGateway,
  service_unavailable: ServiceUnavailable,
  timed_out: TimedOut,
  request_canceled: RequestCanceled,
  policy_violation: PolicyViolation,
  policy_in_use: PolicyInUse,
  network_not_tradable: NetworkNotTradable,
  guest_permission_denied: GuestPermissionDenied,
  guest_region_forbidden: GuestRegionForbidden,
  guest_transaction_limit: GuestTransactionLimit,
  guest_transaction_count: GuestTransactionCount,
  phone_number_verification_expired: PhoneNumberVerificationExpired,
  document_verification_failed: DocumentVerificationFailed,
  recipient_allowlist_violation: RecipientAllowlistViolation,
  recipient_allowlist_pending: RecipientAllowlistPending,
  travel_rules_recipient_violation: TravelRulesRecipientViolation,
  transfer_amount_out_of_bounds: TransferAmountOutOfBounds,
  transfer_recipient_address_invalid: TransferRecipientAddressInvalid,
  transfer_quote_expired: TransferQuoteExpired,
  mfa_already_enrolled: MfaAlreadyEnrolled,
  mfa_invalid_code: MfaInvalidCode,
  mfa_flow_expired: MfaFlowExpired,
  mfa_required: MfaRequired,
  mfa_not_enrolled: MfaNotEnrolled,
} as const;
