import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetPostgrestServiceConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
  }).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/postgrest" }));
export type V1GetPostgrestServiceConfigInput =
  typeof V1GetPostgrestServiceConfigInput.Type;

// Output Schema
export const V1GetPostgrestServiceConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    db_schema: Schema.String,
    max_rows: Schema.Number,
    db_extra_search_path: Schema.String,
    db_pool: Schema.NullOr(Schema.Number),
    jwt_secret: Schema.optional(Schema.String),
  });
export type V1GetPostgrestServiceConfigOutput =
  typeof V1GetPostgrestServiceConfigOutput.Type;

// The operation
/**
 * Gets project's postgrest config
 *
 * @param ref - Project ref
 */
export const v1GetPostgrestServiceConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1GetPostgrestServiceConfigInput,
    outputSchema: V1GetPostgrestServiceConfigOutput,
  }),
);
