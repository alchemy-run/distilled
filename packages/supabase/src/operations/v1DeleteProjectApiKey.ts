import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1DeleteProjectApiKeyInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    ref: Schema.String.pipe(T.PathParam()),
    id: Schema.String.pipe(T.PathParam()),
    reveal: Schema.optional(Schema.Boolean),
    was_compromised: Schema.optional(Schema.Boolean),
    reason: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "DELETE", path: "/v1/projects/{ref}/api-keys/{id}" }),
  );
export type V1DeleteProjectApiKeyInput = typeof V1DeleteProjectApiKeyInput.Type;

// Output Schema
export const V1DeleteProjectApiKeyOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    api_key: Schema.optional(Schema.NullOr(Schema.String)),
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
export type V1DeleteProjectApiKeyOutput =
  typeof V1DeleteProjectApiKeyOutput.Type;

// The operation
/**
 * Deletes an API key for the project
 *
 * @param ref - Project ref
 * @param reveal - Boolean string, true or false
 * @param was_compromised - Boolean string, true or false
 */
export const v1DeleteProjectApiKey = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: V1DeleteProjectApiKeyInput,
    outputSchema: V1DeleteProjectApiKeyOutput,
  }),
);
