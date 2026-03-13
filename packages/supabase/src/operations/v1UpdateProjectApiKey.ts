import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { SensitiveNullableString } from "../sensitive";

// Input Schema
export const V1UpdateProjectApiKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
    reveal: Schema.optional(Schema.Boolean),
    name: Schema.optional(Schema.String),
    description: Schema.optional(Schema.NullOr(Schema.String)),
    secret_jwt_template: Schema.optional(
      Schema.NullOr(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }).pipe(
    T.Http({ method: "PATCH", path: "/v1/projects/{ref}/api-keys/{id}" }),
  );
export type V1UpdateProjectApiKeyInput = typeof V1UpdateProjectApiKeyInput.Type;

// Output Schema
export const V1UpdateProjectApiKeyOutput =
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
export type V1UpdateProjectApiKeyOutput =
  typeof V1UpdateProjectApiKeyOutput.Type;

// The operation
/**
 * Updates an API key for the project
 *
 * @param ref - Project ref
 * @param reveal - Boolean string, true or false
 */
export const v1UpdateProjectApiKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1UpdateProjectApiKeyInput,
    outputSchema: V1UpdateProjectApiKeyOutput,
  }),
);
