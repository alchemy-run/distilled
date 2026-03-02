/**
 * Schema for patch files that fix/extend GCP discovery documents.
 *
 * Patches are stored at patch/{service}/{operation}.json
 * and loaded during code generation to add missing errors,
 * fix response schemas, etc.
 */

/**
 * Error matcher expression for GCP errors.
 */
export interface ErrorMatcher {
  /** HTTP status code (e.g., 404, 403, 409) */
  httpStatus?: number;
  /** gRPC status name (e.g., "NOT_FOUND", "PERMISSION_DENIED") */
  status?: string;
  /** Error reason from detailed errors */
  reason?: string;
  /** Error domain */
  domain?: string;
  /** Message matcher */
  message?: { includes?: string; matches?: string };
}

/**
 * Property patch for fixing response/request schemas.
 */
export interface PropertyPatch {
  /** Add null to the field's type union */
  nullable?: boolean;
  /** Make a required field optional */
  optional?: boolean;
  /** Replace type entirely */
  type?: "string" | "number" | "boolean" | "unknown";
  /** Add literal values to an existing enum */
  addValues?: string[];
}

/**
 * Response/request schema patch.
 */
export interface SchemaPatch {
  /** Dot-notation paths to property patches */
  properties: Record<string, PropertyPatch>;
}

/**
 * Error category assignment.
 */
export type ErrorCategory =
  | "AuthError"
  | "BadRequestError"
  | "ConflictError"
  | "NotFoundError"
  | "QuotaError"
  | "ThrottlingError"
  | "TimeoutError"
  | "ServerError"
  | "PreconditionError"
  | "UnavailableError"
  | "RetryableError";

/**
 * Per-operation patch file structure.
 *
 * @example
 * ```json
 * {
 *   "errors": {
 *     "BucketNotFound": [
 *       { "httpStatus": 404, "reason": "notFound" }
 *     ],
 *     "BucketAlreadyExists": [
 *       { "httpStatus": 409, "status": "ALREADY_EXISTS" }
 *     ]
 *   },
 *   "errorCategories": {
 *     "BucketNotFound": ["NotFoundError"]
 *   },
 *   "response": {
 *     "properties": {
 *       "location": { "addValues": ["US-CENTRAL1"] }
 *     }
 *   }
 * }
 * ```
 */
export interface OperationPatch {
  /** Error tag -> array of matchers */
  errors?: Record<string, ErrorMatcher[]>;
  /** Error tag -> array of categories */
  errorCategories?: Record<string, ErrorCategory[]>;
  /** Response schema patches */
  response?: SchemaPatch;
  /** Request schema patches */
  request?: SchemaPatch;
}

/**
 * Per-service patch file (alternative to per-operation).
 * Stored at patch/{service}.json
 */
export interface ServicePatch {
  /** Operation name -> patch */
  operations?: Record<string, OperationPatch>;
  /** Service-wide errors added to all operations */
  errors?: Record<string, ErrorMatcher[]>;
  /** Service-wide error categories */
  errorCategories?: Record<string, ErrorCategory[]>;
}
