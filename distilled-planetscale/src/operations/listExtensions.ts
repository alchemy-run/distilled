import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListExtensionsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/extensions",
  }),
);
export type ListExtensionsInput = typeof ListExtensionsInput.Type;

// Output Schema
export const ListExtensionsOutput = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    description: Schema.String,
    internal: Schema.Boolean,
    url: Schema.String,
    parameters: Schema.Array(
      Schema.Struct({
        id: Schema.String,
        name: Schema.String,
        display_name: Schema.String,
        namespace: Schema.Literals(["patroni", "pgconf", "pgbouncer"]),
        category: Schema.String,
        description: Schema.String,
        extension: Schema.Boolean,
        internal: Schema.Boolean,
        parameter_type: Schema.Literals([
          "array",
          "boolean",
          "bytes",
          "float",
          "integer",
          "internal",
          "seconds",
          "select",
          "string",
          "time",
        ]),
        default_value: Schema.String,
        value: Schema.String,
        required: Schema.Boolean,
        created_at: Schema.String,
        updated_at: Schema.String,
        restart: Schema.Boolean,
        max: Schema.Number,
        min: Schema.Number,
        step: Schema.Number,
        url: Schema.String,
        options: Schema.Array(Schema.String),
        actor: Schema.Struct({
          id: Schema.String,
          display_name: Schema.String,
          avatar_url: Schema.String,
        }),
      }),
    ),
  }),
);
export type ListExtensionsOutput = typeof ListExtensionsOutput.Type;

// The operation
/**
 * List cluster extensions
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 */
export const listExtensions = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListExtensionsInput,
  outputSchema: ListExtensionsOutput,
  errors: [Forbidden, NotFound] as const,
}));
