import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const V1ListAllSnippetsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    project_ref: Schema.optional(Schema.String),
    cursor: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.String),
    sort_by: Schema.optional(Schema.Literals(["name", "inserted_at"])),
    sort_order: Schema.optional(Schema.Literals(["asc", "desc"])),
  },
).pipe(T.Http({ method: "GET", path: "/v1/snippets" }));
export type V1ListAllSnippetsInput = typeof V1ListAllSnippetsInput.Type;

// Output Schema
export const V1ListAllSnippetsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    data: Schema.Array(
      Schema.Struct({
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
      }),
    ),
    cursor: Schema.optional(Schema.String),
  });
export type V1ListAllSnippetsOutput = typeof V1ListAllSnippetsOutput.Type;

// The operation
/**
 * Lists SQL snippets for the logged in user
 *
 * @param project_ref - Project ref
 */
export const v1ListAllSnippets = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: V1ListAllSnippetsInput,
  outputSchema: V1ListAllSnippetsOutput,
}));
