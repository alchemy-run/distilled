import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const V1GetProjectApiKeysInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    reveal: Schema.optional(Schema.Boolean),
  }).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/api-keys" }));
export type V1GetProjectApiKeysInput = typeof V1GetProjectApiKeysInput.Type;

// Output Schema
export const V1GetProjectApiKeysOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Array(
    Schema.Struct({
      api_key: Schema.optional(SensitiveNullableString),
      id: Schema.optional(Schema.NullOr(Schema.String)),
      type: Schema.optional(
        Schema.NullOr(Schema.Literals(["legacy", "publishable", "secret"])),
      ),
      prefix: Schema.optional(Schema.NullOr(Schema.String)),
      name: Schema.String,
      description: Schema.optional(Schema.NullOr(Schema.String)),
      hash: Schema.optional(Schema.NullOr(Schema.String)),
      secret_jwt_template: Schema.optional(
        Schema.NullOr(Schema.Record(Schema.String, Schema.Unknown)),
      ),
      inserted_at: Schema.optional(Schema.NullOr(Schema.String)),
      updated_at: Schema.optional(Schema.NullOr(Schema.String)),
    }),
  );
export type V1GetProjectApiKeysOutput = typeof V1GetProjectApiKeysOutput.Type;

// The operation
/**
 * Get project api keys
 *
 * @param ref - Project ref
 * @param reveal - Boolean string, true or false
 */
export const v1GetProjectApiKeys = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetProjectApiKeysInput,
  outputSchema: V1GetProjectApiKeysOutput,
}));
