import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const SecretsUpdateInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  app_name: Schema.String.pipe(T.PathParam()),
  values: Schema.optional(Schema.Record(Schema.String, Schema.String)),
}).pipe(T.Http({ method: "POST", path: "/apps/{app_name}/secrets" }));
export type SecretsUpdateInput = typeof SecretsUpdateInput.Type;

// Output Schema
export const SecretsUpdateOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  Version: Schema.optional(Schema.Number),
  secrets: Schema.optional(
    Schema.Array(
      Schema.Struct({
        created_at: Schema.optional(Schema.String),
        digest: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        updated_at: Schema.optional(Schema.String),
        value: Schema.optional(Schema.String),
      }),
    ),
  ),
  version: Schema.optional(Schema.Number),
});
export type SecretsUpdateOutput = typeof SecretsUpdateOutput.Type;

// The operation
/**
 * Update app secrets belonging to an app
 *
 * @param app_name - Fly App Name
 */
export const SecretsUpdate = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: SecretsUpdateInput,
  outputSchema: SecretsUpdateOutput,
}));
