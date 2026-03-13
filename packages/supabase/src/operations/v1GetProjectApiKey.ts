import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const V1GetProjectApiKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
    reveal: Schema.optional(Schema.Boolean),
  }).pipe(T.Http({ method: "GET", path: "/v1/projects/{ref}/api-keys/{id}" }));
export type V1GetProjectApiKeyInput = typeof V1GetProjectApiKeyInput.Type;

// Output Schema
export const V1GetProjectApiKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
  });
export type V1GetProjectApiKeyOutput = typeof V1GetProjectApiKeyOutput.Type;

// The operation
/**
 * Get API key
 *
 * @param ref - Project ref
 * @param reveal - Boolean string, true or false
 */
export const v1GetProjectApiKey = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetProjectApiKeyInput,
  outputSchema: V1GetProjectApiKeyOutput,
}));
