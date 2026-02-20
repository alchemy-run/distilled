import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const UpdateBouncerResizeRequestInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  bouncer: Schema.String.pipe(T.PathParam()),
  bouncer_size: Schema.optional(Schema.String),
  replicas_per_cell: Schema.optional(Schema.Number),
  parameters: Schema.optional(Schema.Unknown),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/bouncers/{bouncer}/resizes",
  }),
);
export type UpdateBouncerResizeRequestInput =
  typeof UpdateBouncerResizeRequestInput.Type;

// Output Schema
export const UpdateBouncerResizeRequestOutput = Schema.Struct({
  id: Schema.String,
  state: Schema.Literals(["pending", "resizing", "canceled", "completed"]),
  replicas_per_cell: Schema.Number,
  parameters: Schema.Unknown,
  previous_replicas_per_cell: Schema.Number,
  previous_parameters: Schema.Unknown,
  started_at: Schema.String,
  completed_at: Schema.String,
  created_at: Schema.String,
  updated_at: Schema.String,
  actor: Schema.Struct({
    id: Schema.String,
    display_name: Schema.String,
    avatar_url: Schema.String,
  }),
  bouncer: Schema.Struct({
    id: Schema.String,
    name: Schema.String,
    created_at: Schema.String,
    updated_at: Schema.String,
    deleted_at: Schema.String,
  }),
  sku: Schema.Struct({
    name: Schema.String,
    display_name: Schema.String,
    cpu: Schema.String,
    ram: Schema.Number,
    sort_order: Schema.Number,
  }),
  previous_sku: Schema.Struct({
    name: Schema.String,
    display_name: Schema.String,
    cpu: Schema.String,
    ram: Schema.Number,
    sort_order: Schema.Number,
  }),
});
export type UpdateBouncerResizeRequestOutput =
  typeof UpdateBouncerResizeRequestOutput.Type;

// The operation
/**
 * Upsert a bouncer resize request
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 * @param bouncer - The name of the bouncer
 * @param bouncer_size - The bouncer size SKU name (e.g., 'PGB_5', 'PGB_10', 'PGB_20', 'PGB_40', 'PGB_80', 'PGB_160'). Defaults to 'PGB_5'.
 * @param replicas_per_cell - The number of PgBouncers per availability zone. Defaults to 1.
 * @param parameters - Bouncer configuration parameters nested by namespace (e.g., {"pgbouncer": {"default_pool_size": "100"}}). Use the 'List cluster parameters' endpoint to retrieve available parameters. Only parameters with namespace 'pgbouncer' can be updated.
 */
export const updateBouncerResizeRequest = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateBouncerResizeRequestInput,
    outputSchema: UpdateBouncerResizeRequestOutput,
    errors: [Forbidden, NotFound] as const,
  }),
);
