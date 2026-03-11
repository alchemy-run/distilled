import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1UpdatePoolerConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    default_pool_size: Schema.optional(Schema.NullOr(Schema.Number)),
    pool_mode: Schema.optional(Schema.Literals(["transaction", "session"])),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/v1/projects/{ref}/config/database/pooler",
    }),
  );
export type V1UpdatePoolerConfigInput = typeof V1UpdatePoolerConfigInput.Type;

// Output Schema
export const V1UpdatePoolerConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    default_pool_size: Schema.NullOr(Schema.Number),
    pool_mode: Schema.String,
  });
export type V1UpdatePoolerConfigOutput = typeof V1UpdatePoolerConfigOutput.Type;

// The operation
/**
 * Updates project's supavisor config
 *
 * @param ref - Project ref
 */
export const v1UpdatePoolerConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1UpdatePoolerConfigInput,
    outputSchema: V1UpdatePoolerConfigOutput,
  }),
);
