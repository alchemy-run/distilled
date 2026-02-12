import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListBouncersInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/bouncers",
  }),
);
export type ListBouncersInput = typeof ListBouncersInput.Type;

// Output Schema
export const ListBouncersOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
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
    }),
  ),
});
export type ListBouncersOutput = typeof ListBouncersOutput.Type;

// The operation
/**
 * List bouncers
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listBouncers = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListBouncersInput,
  outputSchema: ListBouncersOutput,
  errors: [Forbidden, NotFound] as const,
}));
