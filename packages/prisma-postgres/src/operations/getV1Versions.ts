import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetV1VersionsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  cursor: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Number),
  computeServiceId: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/v1/versions" }));
export type GetV1VersionsInput = typeof GetV1VersionsInput.Type;

// Output Schema
export const GetV1VersionsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      type: Schema.String,
      url: Schema.String,
      foundryVersionId: Schema.String,
      createdAt: Schema.String,
    }),
  ),
  pagination: Schema.Struct({
    nextCursor: Schema.NullOr(Schema.String),
    hasMore: Schema.Boolean,
  }),
});
export type GetV1VersionsOutput = typeof GetV1VersionsOutput.Type;

// The operation
/**
 * List compute versions
 *
 * ⚠️ Experimental endpoint: this API is in active development and may change at any time without notice. ⚠️
 * Returns all compute versions the token has access to, ordered by creation time (newest first). Optionally filter by compute service ID. Supports cursor-based pagination.
 */
export const getV1Versions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetV1VersionsInput,
  outputSchema: GetV1VersionsOutput,
}));
