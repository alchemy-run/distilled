import * as Effect from "effect/Effect";
import * as FileSystem from "effect/FileSystem";
import * as Path from "effect/Path";
import * as S from "effect/Schema";
import * as C from "../category.ts";

/**
 * Schema for service error patches discovered by the AI agent.
 * These are stored in spec/{service}.json and applied during client generation.
 */

/**
 * Schema for error category strings.
 * Uses the existing Category constants from src/category.ts.
 */
export const CategorySchema = /*@__PURE__*/ S.Literals([
  C.ThrottlingError,
  C.RetryableError,
  C.ServerError,
  C.AuthError,
  C.BadRequestError,
  C.TimeoutError,
  C.ConflictError,
  C.QuotaError,
  C.NetworkError,
  C.AbortedError,
]);
export type CategorySchema = typeof CategorySchema.Type;

/**
 * Error alias - maps an error tag to an alternative name
 */
export const ErrorAlias = /*@__PURE__*/ S.Struct({
  /**
   * The original error tag (e.g., "NotFound")
   */
  from: S.String,
  /**
   * The canonical error tag it should be aliased to (e.g., "NoSuchBucket")
   */
  to: S.String,
});
export type ErrorAlias = typeof ErrorAlias.Type;

/**
 * Patches for a single operation
 */
export const OperationPatch = /*@__PURE__*/ S.Struct({
  /**
   * Additional error types that should be included in this operation's error union.
   * These are error shape names (not full shape IDs).
   */
  errors: /*@__PURE__*/ S.optional(/*@__PURE__*/ S.Array(S.String)),
  /**
   * Error aliases - when AWS returns an error with one name that should be treated as another.
   * Useful for deduplicating errors like "Error" vs "ErrorException".
   */
  aliases: /*@__PURE__*/ S.optional(/*@__PURE__*/ S.Array(ErrorAlias)),
});
export type OperationPatch = typeof OperationPatch.Type;

/**
 * Member override - specifies that a structure member should be treated differently
 * than what the Smithy model says (e.g., making a required field optional)
 */
export const MemberOverride = /*@__PURE__*/ S.Struct({
  /**
   * Whether the field should be optional (true) or required (false).
   * If specified, overrides the Smithy model's required trait.
   */
  optional: /*@__PURE__*/ S.optional(S.Boolean),
});
export type MemberOverride = typeof MemberOverride.Type;

/**
 * Enum override - specifies additional or replacement values for an enum.
 * Use this when AWS returns values not in the Smithy model, or with different casing.
 */
export const EnumOverride = /*@__PURE__*/ S.Struct({
  /**
   * Additional values to add to the enum (merged with existing values).
   * Use this when AWS returns values not documented in the Smithy model.
   */
  add: /*@__PURE__*/ S.optional(/*@__PURE__*/ S.Array(S.String)),
  /**
   * Completely replace the enum values with these.
   * Use this when the Smithy model is wrong and you need full control.
   */
  replace: /*@__PURE__*/ S.optional(/*@__PURE__*/ S.Array(S.String)),
});
export type EnumOverride = typeof EnumOverride.Type;

/**
 * Structure override - specifies member overrides for a specific structure
 */
export const StructureOverride = /*@__PURE__*/ S.Struct({
  /**
   * Map of member names to their overrides
   */
  members: /*@__PURE__*/ S.Record(S.String, MemberOverride),
});
export type StructureOverride = typeof StructureOverride.Type;

/**
 * Error member patch - adds a member to an error schema.
 * Use this for errors not fully documented in Smithy (e.g., PermanentRedirect).
 */
export const ErrorMemberPatch = /*@__PURE__*/ S.Struct({
  /**
   * The type of the member (e.g., "string", "boolean", "number")
   */
  type: S.String,
  /**
   * Whether the field is optional (default: true)
   */
  optional: /*@__PURE__*/ S.optional(S.Boolean),
  /**
   * HTTP header to extract this value from (e.g., "x-amz-bucket-region")
   */
  httpHeader: /*@__PURE__*/ S.optional(S.String),
});
export type ErrorMemberPatch = typeof ErrorMemberPatch.Type;

/**
 * Error override - specifies members to add to an error schema
 */
export const ErrorOverride = /*@__PURE__*/ S.Record(S.String, ErrorMemberPatch);
export type ErrorOverride = typeof ErrorOverride.Type;

/**
 * All patches for a service
 */
export const ServiceSpec = /*@__PURE__*/ S.Struct({
  /**
   * Map of operation names to their patches
   */
  operations: /*@__PURE__*/ S.Record(S.String, OperationPatch),
  /**
   * Map of structure names to their member overrides.
   */
  structures: /*@__PURE__*/ S.optional(/*@__PURE__*/ S.Record(S.String, StructureOverride)),
  /**
   * Map of enum names to their value overrides.
   */
  enums: /*@__PURE__*/ S.optional(/*@__PURE__*/ S.Record(S.String, EnumOverride)),
  /**
   * Map of error names to their member patches.
   */
  errors: /*@__PURE__*/ S.optional(/*@__PURE__*/ S.Record(S.String, ErrorOverride)),
  /**
   * Map of error names to their categories.
   */
  errorCategories: /*@__PURE__*/ S.optional(
    /*@__PURE__*/ S.Record(S.String, /*@__PURE__*/ S.Array(CategorySchema)),
  ),
});
export type ServiceSpec = typeof ServiceSpec.Type;

/**
 * Load spec patches for a service from spec/{service}.json
 */
export const loadServiceSpecPatch = /*@__PURE__*/ Effect.fn(function* (serviceSdkId: string) {
  const fs = yield* FileSystem.FileSystem;
  const p = yield* Path.Path;
  const specPath = p.join("spec", `${serviceSdkId.toLowerCase().replaceAll(" ", "-")}.json`);
  return yield* fs.readFileString(specPath).pipe(
    Effect.flatMap(S.decodeUnknownEffect(S.fromJsonString(ServiceSpec))),
    Effect.catch(() => Effect.succeed({ operations: {} } as ServiceSpec)),
  );
});
