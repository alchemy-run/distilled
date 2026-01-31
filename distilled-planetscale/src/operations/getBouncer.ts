import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetBouncerInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  bouncer: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/bouncers/{bouncer}",
  }),
);
export type GetBouncerInput = typeof GetBouncerInput.Type;

// Output Schema
export const GetBouncerOutput = Schema.Struct({
  id: Schema.String,
  name: Schema.String,
  sku: Schema.Struct({
    name: Schema.String,
    display_name: Schema.String,
    cpu: Schema.String,
    ram: Schema.Number,
    sort_order: Schema.Number,
  }),
  target: Schema.Literal("primary", "replica", "replica_az_affinity"),
  replicas_per_cell: Schema.Number,
  created_at: Schema.String,
  updated_at: Schema.String,
  deleted_at: Schema.String,
  actor: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  branch: Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
    deleted_at: Schema.String,
  }),
  parameters: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      namespace: Schema.Literal("pgbouncer"),
      name: Schema.String,
      display_name: Schema.String,
      category: Schema.String,
      description: Schema.String,
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
  ),
});
export type GetBouncerOutput = typeof GetBouncerOutput.Type;

// The operation
/**
 * Get a bouncer
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 * @param bouncer - The name of the bouncer
 */
export const getBouncer = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetBouncerInput,
  outputSchema: GetBouncerOutput,
}));
