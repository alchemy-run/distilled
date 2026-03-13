import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const V1CreateProjectApiKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    reveal: Schema.optional(Schema.Boolean),
    type: Schema.Literals(["publishable", "secret"]),
    name: Schema.String,
    description: Schema.optional(Schema.NullOr(Schema.String)),
    secret_jwt_template: Schema.optional(
      Schema.NullOr(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }).pipe(T.Http({ method: "POST", path: "/v1/projects/{ref}/api-keys" }));
export type V1CreateProjectApiKeyInput = typeof V1CreateProjectApiKeyInput.Type;

// Output Schema
export const V1CreateProjectApiKeyOutput =
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
export type V1CreateProjectApiKeyOutput =
  typeof V1CreateProjectApiKeyOutput.Type;

// The operation
/**
 * Creates a new API key for the project
 *
 * @param ref - Project ref
 * @param reveal - Boolean string, true or false
 */
export const v1CreateProjectApiKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1CreateProjectApiKeyInput,
    outputSchema: V1CreateProjectApiKeyOutput,
  }),
);
