import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdatePostgrestServiceConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    db_extra_search_path: Schema.optional(Schema.String),
    db_schema: Schema.optional(Schema.String),
    max_rows: Schema.optional(Schema.Number),
    db_pool: Schema.optional(Schema.Number),
  }).pipe(T.Http({ method: "PATCH", path: "/v1/projects/{ref}/postgrest" }));
export type V1UpdatePostgrestServiceConfigInput =
  typeof V1UpdatePostgrestServiceConfigInput.Type;

// Output Schema
export const V1UpdatePostgrestServiceConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    db_schema: Schema.String,
    max_rows: Schema.Number,
    db_extra_search_path: Schema.String,
    db_pool: Schema.NullOr(Schema.Number),
  });
export type V1UpdatePostgrestServiceConfigOutput =
  typeof V1UpdatePostgrestServiceConfigOutput.Type;

// The operation
/**
 * Updates project's postgrest config
 *
 * @param ref - Project ref
 */
export const v1UpdatePostgrestServiceConfig =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: V1UpdatePostgrestServiceConfigInput,
    outputSchema: V1UpdatePostgrestServiceConfigOutput,
  }));
