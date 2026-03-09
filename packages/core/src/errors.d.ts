/**
 * Common error types shared across SDKs.
 *
 * Each SDK defines its own provider-specific errors (e.g., Unauthorized, NotFound)
 * using the category system. This module provides base error types and utilities
 * that are used across all SDKs.
 */
import * as Schema from "effect/Schema";
import * as Category from "./category.ts";
declare const Unauthorized_base: Schema.ErrorClass<Unauthorized, Schema.TaggedStruct<"Unauthorized", {
    readonly message: Schema.String;
}>, import("effect/Cause").YieldableError> & (new (...args: any[]) => {
    "@distilled.cloud/error/categories": {
        AuthError: true;
    };
});
/**
 * Unauthorized - Authentication failure (401).
 */
export declare class Unauthorized extends Unauthorized_base {
}
declare const Forbidden_base: Schema.ErrorClass<Forbidden, Schema.TaggedStruct<"Forbidden", {
    readonly message: Schema.String;
}>, import("effect/Cause").YieldableError> & (new (...args: any[]) => {
    "@distilled.cloud/error/categories": {
        AuthError: true;
    };
});
/**
 * Forbidden - Access denied (403).
 */
export declare class Forbidden extends Forbidden_base {
}
declare const NotFound_base: Schema.ErrorClass<NotFound, Schema.TaggedStruct<"NotFound", {
    readonly message: Schema.String;
}>, import("effect/Cause").YieldableError> & (new (...args: any[]) => {
    "@distilled.cloud/error/categories": {
        NotFoundError: true;
    };
});
/**
 * NotFound - Resource not found (404).
 */
export declare class NotFound extends NotFound_base {
}
declare const BadRequest_base: Schema.ErrorClass<BadRequest, Schema.TaggedStruct<"BadRequest", {
    readonly message: Schema.String;
}>, import("effect/Cause").YieldableError> & (new (...args: any[]) => {
    "@distilled.cloud/error/categories": {
        BadRequestError: true;
    };
});
/**
 * BadRequest - Invalid request (400).
 */
export declare class BadRequest extends BadRequest_base {
}
declare const Conflict_base: Schema.ErrorClass<Conflict, Schema.TaggedStruct<"Conflict", {
    readonly message: Schema.String;
}>, import("effect/Cause").YieldableError> & (new (...args: any[]) => {
    "@distilled.cloud/error/categories": {
        ConflictError: true;
    };
});
/**
 * Conflict - Resource conflict (409).
 */
export declare class Conflict extends Conflict_base {
}
declare const UnprocessableEntity_base: Schema.ErrorClass<UnprocessableEntity, Schema.TaggedStruct<"UnprocessableEntity", {
    readonly message: Schema.String;
}>, import("effect/Cause").YieldableError> & (new (...args: any[]) => {
    "@distilled.cloud/error/categories": {
        BadRequestError: true;
    };
});
/**
 * UnprocessableEntity - Validation error (422).
 */
export declare class UnprocessableEntity extends UnprocessableEntity_base {
}
declare const TooManyRequests_base: Schema.ErrorClass<TooManyRequests, Schema.TaggedStruct<"TooManyRequests", {
    readonly message: Schema.String;
}>, import("effect/Cause").YieldableError> & (new (...args: any[]) => {
    "@distilled.cloud/error/categories": {
        ThrottlingError: true;
    };
}) & (new (...args: any[]) => {
    "@distilled.cloud/error/retryable": Category.RetryableInfo;
});
/**
 * TooManyRequests - Rate limited (429).
 */
export declare class TooManyRequests extends TooManyRequests_base {
}
declare const Locked_base: Schema.ErrorClass<Locked, Schema.TaggedStruct<"Locked", {
    readonly message: Schema.String;
}>, import("effect/Cause").YieldableError> & (new (...args: any[]) => {
    "@distilled.cloud/error/categories": {
        LockedError: true;
    };
}) & (new (...args: any[]) => {
    "@distilled.cloud/error/retryable": Category.RetryableInfo;
});
/**
 * Locked - Resource locked (423).
 */
export declare class Locked extends Locked_base {
}
declare const InternalServerError_base: Schema.ErrorClass<InternalServerError, Schema.TaggedStruct<"InternalServerError", {
    readonly message: Schema.String;
}>, import("effect/Cause").YieldableError> & (new (...args: any[]) => {
    "@distilled.cloud/error/categories": {
        ServerError: true;
    };
}) & (new (...args: any[]) => {
    "@distilled.cloud/error/retryable": Category.RetryableInfo;
});
/**
 * InternalServerError - Server error (500).
 */
export declare class InternalServerError extends InternalServerError_base {
}
declare const ServiceUnavailable_base: Schema.ErrorClass<ServiceUnavailable, Schema.TaggedStruct<"ServiceUnavailable", {
    readonly message: Schema.String;
}>, import("effect/Cause").YieldableError> & (new (...args: any[]) => {
    "@distilled.cloud/error/categories": {
        ServerError: true;
    };
}) & (new (...args: any[]) => {
    "@distilled.cloud/error/retryable": Category.RetryableInfo;
});
/**
 * ServiceUnavailable - Service unavailable (503).
 */
export declare class ServiceUnavailable extends ServiceUnavailable_base {
}
declare const ConfigError_base: Schema.ErrorClass<ConfigError, Schema.TaggedStruct<"ConfigError", {
    readonly message: Schema.String;
}>, import("effect/Cause").YieldableError> & (new (...args: any[]) => {
    "@distilled.cloud/error/categories": {
        ConfigurationError: true;
    };
});
/**
 * Configuration error - missing or invalid configuration.
 */
export declare class ConfigError extends ConfigError_base {
}
/**
 * Mapping from HTTP status codes to common error classes.
 */
export declare const HTTP_STATUS_MAP: {
    readonly 400: typeof BadRequest;
    readonly 401: typeof Unauthorized;
    readonly 403: typeof Forbidden;
    readonly 404: typeof NotFound;
    readonly 409: typeof Conflict;
    readonly 422: typeof UnprocessableEntity;
    readonly 423: typeof Locked;
    readonly 429: typeof TooManyRequests;
    readonly 500: typeof InternalServerError;
    readonly 503: typeof ServiceUnavailable;
};
/**
 * HTTP status codes that are considered "default" errors (always present).
 * These are excluded from per-operation error types since they're handled globally.
 */
export declare const DEFAULT_ERROR_STATUSES: Set<number>;
/**
 * All common API error classes.
 */
export declare const API_ERRORS: readonly [typeof Unauthorized, typeof Forbidden, typeof NotFound, typeof BadRequest, typeof Conflict, typeof UnprocessableEntity, typeof TooManyRequests, typeof Locked, typeof InternalServerError, typeof ServiceUnavailable];
/**
 * Default errors that apply to ALL operations.
 * These are infrastructure-level errors that can occur regardless of the operation.
 */
export declare const DEFAULT_ERRORS: readonly [typeof Unauthorized, typeof TooManyRequests, typeof InternalServerError, typeof ServiceUnavailable];
export type DefaultErrors = InstanceType<(typeof DEFAULT_ERRORS)[number]>;
export {};
//# sourceMappingURL=errors.d.ts.map