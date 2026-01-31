import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListParametersInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/parameters",
  }),
);
export type ListParametersInput = typeof ListParametersInput.Type;

// Output Schema
export const ListParametersOutput = Schema.Array(
  Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    display_name: Schema.String,
    namespace: Schema.Literal("patroni", "pgconf", "pgbouncer"),
    category: Schema.String,
    description: Schema.String,
    extension: Schema.Boolean,
    internal: Schema.Boolean,
    parameter_type: Schema.Literal(
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
    ),
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
);
export type ListParametersOutput = typeof ListParametersOutput.Type;

// The operation
/**
 * List cluster parameters
 *
 * Returns the parameters for a branch. To update the parameters, use the "Upsert a change request" endpoint.
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 */
export const listParameters = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListParametersInput,
  outputSchema: ListParametersOutput,
}));
