/**
 * Azure API Client.
 *
 * Wraps the shared REST client from sdk-core with Azure-specific
 * error matching and credential handling.
 *
 * Azure Resource Manager (ARM) returns errors wrapped in an envelope:
 * ```json
 * { "error": { "code": "ResourceNotFound", "message": "...", "target": "..." } }
 * ```
 *
 * Error matching dispatches by:
 * 1. The `error.code` field (ResourceNotFound, AuthorizationFailed, etc.)
 * 2. HTTP status code (400, 401, 403, 404, 409, 429, 500+)
 *
 * The client automatically injects the `subscriptionId` path parameter from
 * credentials when a `{subscriptionId}` placeholder exists in the path but
 * was not explicitly provided in the input. This means users only need to
 * set `AZURE_SUBSCRIPTION_ID` once in credentials — individual operations
 * will pick it up automatically.
 */
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import { makeAPI } from "@distilled.cloud/core/client";
import {
  HTTP_STATUS_MAP,
  AZURE_ERROR_CODE_MAP,
  UnknownAzureError,
  AzureParseError,
} from "./errors.ts";
import { Credentials } from "./credentials.ts";

// Re-export for backwards compatibility
export { UnknownAzureError } from "./errors.ts";

// ---------------------------------------------------------------------------
// Error response schemas
// ---------------------------------------------------------------------------

// ARM wraps errors in { error: { code, message, target?, details? } }
const AzureErrorInner = Schema.Struct({
  code: Schema.String,
  message: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
});

const AzureErrorResponse = Schema.Struct({
  error: AzureErrorInner,
});

// Some Azure APIs return { code, message } without the envelope
const FlatErrorResponse = Schema.Struct({
  code: Schema.optional(Schema.String),
  message: Schema.String,
});

// ---------------------------------------------------------------------------
// Error matching
// ---------------------------------------------------------------------------

/**
 * Match an Azure API error response to the appropriate error class.
 *
 * Azure dispatches errors by:
 * 1. The error.code field (ResourceNotFound, AuthorizationFailed, etc.)
 * 2. HTTP status code (400, 401, 403, 404, 409, 429, 500+)
 */
const matchError = (
  status: number,
  errorBody: unknown,
): Effect.Effect<never, unknown> => {
  // Try the ARM envelope format first: { error: { code, message } }
  try {
    const parsed = Schema.decodeUnknownSync(AzureErrorResponse)(errorBody);
    const err = parsed.error;

    // Match by Azure error code first for richer typed errors
    const AzureErrorClass = AZURE_ERROR_CODE_MAP[err.code];
    if (AzureErrorClass) {
      return Effect.fail(
        new AzureErrorClass({
          message: err.message,
          code: err.code,
          target: err.target,
        }),
      );
    }

    // Fall back to standard HTTP status errors
    const CoreErrorClass = (HTTP_STATUS_MAP as any)[status];
    if (CoreErrorClass) {
      return Effect.fail(new CoreErrorClass({ message: err.message ?? "" }));
    }

    return Effect.fail(
      new UnknownAzureError({
        code: err.code,
        message: err.message,
        target: err.target,
        body: errorBody,
      }),
    );
  } catch {
    // Try flat format: { code, message }
    try {
      const parsed = Schema.decodeUnknownSync(FlatErrorResponse)(errorBody);
      const ErrorClass = (HTTP_STATUS_MAP as any)[status];
      if (ErrorClass) {
        return Effect.fail(new ErrorClass({ message: parsed.message ?? "" }));
      }
      return Effect.fail(
        new UnknownAzureError({
          code: parsed.code,
          message: parsed.message,
          body: errorBody,
        }),
      );
    } catch {
      return Effect.fail(new UnknownAzureError({ body: errorBody }));
    }
  }
};

// ---------------------------------------------------------------------------
// Credential-backed subscriptionId injection
// ---------------------------------------------------------------------------

/**
 * We stash the subscriptionId from credentials into a module-level variable
 * that the `transformRequestParts` hook can use to inject `{subscriptionId}`
 * into paths when the caller didn't provide it explicitly.
 *
 * This is set in `getAuthHeaders` (called once per request after credential
 * resolution) so the transform always has the latest value.
 */
let _currentSubscriptionId: string | undefined;

// ---------------------------------------------------------------------------
// API client
// ---------------------------------------------------------------------------

/**
 * Azure API client.
 *
 * Automatically injects `subscriptionId` into ARM path templates from
 * credentials when not provided in the operation input.
 */
export const API = makeAPI({
  credentials: Credentials as any,
  getBaseUrl: (creds: any) => creds.apiBaseUrl,
  getAuthHeaders: (creds: any) => {
    // Stash subscriptionId for transformRequestParts
    _currentSubscriptionId = creds.subscriptionId;
    return {
      Authorization: `Bearer ${Redacted.value(creds.bearerToken)}`,
    };
  },
  matchError,
  ParseError: AzureParseError as any,

  /**
   * Inject `subscriptionId` from credentials into the path when the generated
   * operation schema didn't fill it (i.e. the placeholder is still present).
   *
   * Also injects a default `api-version` query parameter if it's present in
   * the path template metadata but not provided by the caller.
   */
  transformRequestParts: ({ parts }) => {
    // Inject subscriptionId from credentials if not already in the path
    if (_currentSubscriptionId && parts.path.includes("{subscriptionId}")) {
      parts = {
        ...parts,
        path: parts.path.replace(
          "{subscriptionId}",
          encodeURIComponent(_currentSubscriptionId),
        ),
      };
    }
    return parts;
  },
});
