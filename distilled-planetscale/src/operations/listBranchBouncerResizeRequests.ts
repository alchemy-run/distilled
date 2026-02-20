import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListBranchBouncerResizeRequestsInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/bouncer-resizes",
  }),
);
export type ListBranchBouncerResizeRequestsInput =
  typeof ListBranchBouncerResizeRequestsInput.Type;

// Output Schema
export const ListBranchBouncerResizeRequestsOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
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
    }),
  ),
});
export type ListBranchBouncerResizeRequestsOutput =
  typeof ListBranchBouncerResizeRequestsOutput.Type;

// The operation
/**
 * Get bouncer resize requests
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listBranchBouncerResizeRequests =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListBranchBouncerResizeRequestsInput,
    outputSchema: ListBranchBouncerResizeRequestsOutput,
    errors: [Forbidden, NotFound] as const,
  }));
