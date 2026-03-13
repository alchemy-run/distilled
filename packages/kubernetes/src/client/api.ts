/**
 * Kubernetes API operations factory.
 *
 * This module is imported as `import * as API from "../client/api.ts"` by
 * generated service files so that `API.make()`, `API.OperationMethod`, etc.
 * are all accessible as namespace members.
 */
import * as Effect from "effect/Effect";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import {
  makeAPI,
  type OperationMethod,
  type PaginatedOperationMethod,
} from "@distilled.cloud/core/client";
import {
  HTTP_STATUS_MAP,
  UnknownKubernetesError,
  KubernetesParseError,
} from "../errors.ts";
import { Credentials } from "../credentials.ts";

export type { OperationMethod, PaginatedOperationMethod };

// Re-export for backwards compatibility
export { UnknownKubernetesError } from "../errors.ts";

/**
 * Kubernetes API error response follows the `v1.Status` schema:
 *
 * ```json
 * {
 *   "kind": "Status",
 *   "apiVersion": "v1",
 *   "status": "Failure",
 *   "message": "pods \"nonexistent\" not found",
 *   "reason": "NotFound",
 *   "details": { "name": "nonexistent", "kind": "pods" },
 *   "code": 404
 * }
 * ```
 */
const ApiErrorResponse = Schema.Struct({
  kind: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  status: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  code: Schema.optional(Schema.Number),
  details: Schema.optional(Schema.Unknown),
});

/**
 * Match a Kubernetes API error response to the appropriate error class
 * based on the HTTP status code.
 *
 * The `reason` field (e.g. "NotFound", "Forbidden", "AlreadyExists",
 * "Conflict") provides additional context but the status code is the
 * canonical discriminator used to select the error class.
 */
const matchError = (
  status: number,
  errorBody: unknown,
): Effect.Effect<never, unknown> => {
  try {
    const parsed = Schema.decodeUnknownSync(ApiErrorResponse)(errorBody);
    const ErrorClass = (HTTP_STATUS_MAP as any)[status];
    if (ErrorClass) {
      return Effect.fail(new ErrorClass({ message: parsed.message ?? "" }));
    }
    return Effect.fail(
      new UnknownKubernetesError({
        reason: parsed.reason,
        message: parsed.message,
        body: errorBody,
      }),
    );
  } catch {
    return Effect.fail(new UnknownKubernetesError({ body: errorBody }));
  }
};

/**
 * Kubernetes API client.
 *
 * Uses bearer token authentication against the cluster API server.
 */
const _API = makeAPI({
  credentials: Credentials as any,
  getBaseUrl: (creds: any) => creds.apiBaseUrl,
  getAuthHeaders: (creds: any) => ({
    Authorization: `Bearer ${Redacted.value(creds.token)}`,
  }),
  matchError,
  ParseError: KubernetesParseError as any,
});

export const make = _API.make;
export const makePaginated = _API.makePaginated;

/**
 * Backwards-compatible named export for existing operation files
 * that use `import { API } from "../client"`.
 */
export const API = _API;
