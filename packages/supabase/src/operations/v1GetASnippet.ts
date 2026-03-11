import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1GetASnippetInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "GET", path: "/v1/snippets/{id}" }));
export type V1GetASnippetInput = typeof V1GetASnippetInput.Type;

// Output Schema
export const V1GetASnippetOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  id: Schema.String,
  inserted_at: Schema.String,
  updated_at: Schema.String,
  type: Schema.Literals(["sql"]),
  visibility: Schema.Literals(["user", "project", "org", "public"]),
  name: Schema.String,
  description: Schema.NullOr(Schema.String),
  project: Schema.Struct({
    id: Schema.Number,
    name: Schema.String,
  }),
  owner: Schema.Struct({
    id: Schema.Number,
    username: Schema.String,
  }),
  updated_by: Schema.Struct({
    id: Schema.Number,
    username: Schema.String,
  }),
  favorite: Schema.Boolean,
  content: Schema.Struct({
    favorite: Schema.optional(Schema.Boolean),
    schema_version: Schema.String,
    sql: Schema.String,
  }),
});
export type V1GetASnippetOutput = typeof V1GetASnippetOutput.Type;

// The operation
/**
 * Gets a specific SQL snippet
 */
export const v1GetASnippet = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1GetASnippetInput,
  outputSchema: V1GetASnippetOutput,
}));
