/**
 * AWS Authentication service for loading AWS profiles and credentials.
 *
 * @since 0.0.0
 */
export * as Auth from "./auth.ts";

/**
 * AWS Credentials providers for obtaining temporary or long-lived credentials.
 *
 * @since 0.0.0
 */
export * as Credentials from "./credentials.ts";

/**
 * AWS Endpoint configuration for custom or local endpoints.
 *
 * @since 0.0.0
 */
export * as Endpoint from "./endpoint.ts";

/**
 * Common AWS error types shared across all services.
 *
 * @since 0.0.0
 */
export * as Errors from "./errors.ts";

/**
 * SigV4 query-string presigning for AWS URLs (e.g. S3 presigned URLs).
 *
 * @since 0.0.0
 */
export * as Presign from "./presign.ts";

/**
 * AWS Region configuration.
 *
 * @since 0.0.0
 */
export * as Region from "./region.ts";

/**
 * Retry policy configuration for AWS API calls.
 *
 * @since 0.0.0
 */
export * as Retry from "./retry.ts";

/** SigV4 signing options, results, and errors. */
export * as SigV4 from "./sigv4.ts";
