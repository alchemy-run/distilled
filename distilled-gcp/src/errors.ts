/**
 * Base error types for GCP API errors.
 *
 * GCP APIs return errors in this format:
 * {
 *   error: {
 *     code: number;       // HTTP status code
 *     message: string;    // Human-readable error message
 *     status: string;     // gRPC status code name (e.g., "NOT_FOUND")
 *     errors: Array<{     // Optional detailed errors
 *       message: string;
 *       domain: string;
 *       reason: string;
 *     }>;
 *     details: Array<{    // Optional structured details
 *       "@type": string;
 *       ...
 *     }>;
 *   }
 * }
 */

import * as Schema from "effect/Schema";

/**
 * Unknown GCP error - returned when an error status/reason is not recognized.
 * Contains the raw error information for later cataloging via the TDD loop.
 *
 * This is the discovery signal: when tests encounter this, developers create
 * a patch file to map the error to a typed error class.
 */
export class UnknownGCPError extends Schema.TaggedErrorClass<UnknownGCPError>()(
  "UnknownGCPError",
  {
    /** HTTP status code (e.g., 404, 403, 409) */
    code: Schema.optional(Schema.Number),
    /** Human-readable error message */
    message: Schema.String,
    /** gRPC status code name (e.g., "NOT_FOUND", "PERMISSION_DENIED") */
    status: Schema.optional(Schema.String),
    /** Error reason from detailed errors (e.g., "notFound", "forbidden") */
    reason: Schema.optional(Schema.String),
    /** Error domain (e.g., "global", "storage") */
    domain: Schema.optional(Schema.String),
    /** Raw error data for debugging */
    errorData: Schema.optional(Schema.Unknown),
  },
) {}

/**
 * Network error - HTTP request failed at the transport level.
 */
export class GCPNetworkError extends Schema.TaggedErrorClass<GCPNetworkError>()(
  "GCPNetworkError",
  {
    message: Schema.String,
    cause: Schema.optional(Schema.Unknown),
  },
) {}

/**
 * HTTP error - non-2xx response without a parseable GCP error body.
 */
export class GCPHttpError extends Schema.TaggedErrorClass<GCPHttpError>()(
  "GCPHttpError",
  {
    status: Schema.Number,
    statusText: Schema.String,
    body: Schema.optional(Schema.String),
  },
) {}

/**
 * Common errors that can occur on any GCP API operation.
 * AuthError is included because GCP operations require OAuth2 token exchange.
 */
export type CommonErrors = import("./auth.ts").AuthError | UnknownGCPError | GCPNetworkError | GCPHttpError;
