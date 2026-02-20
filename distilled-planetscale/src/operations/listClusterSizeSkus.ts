import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const ListClusterSizeSkusInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  engine: Schema.optional(Schema.Literals(["mysql", "postgresql"])),
  rates: Schema.optional(Schema.Boolean),
  region: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/organizations/{organization}/cluster-size-skus",
  }),
);
export type ListClusterSizeSkusInput = typeof ListClusterSizeSkusInput.Type;

// Output Schema
export const ListClusterSizeSkusOutput = Schema.Array(
  Schema.Struct({
    name: Schema.String,
    display_name: Schema.String,
    cpu: Schema.String,
    storage: Schema.optional(Schema.NullOr(Schema.Number)),
    ram: Schema.Number,
    metal: Schema.Boolean,
    enabled: Schema.Boolean,
    provider: Schema.optional(Schema.NullOr(Schema.String)),
    default_vtgate: Schema.String,
    default_vtgate_rate: Schema.optional(Schema.NullOr(Schema.Number)),
    replica_rate: Schema.optional(Schema.NullOr(Schema.Number)),
    rate: Schema.optional(Schema.NullOr(Schema.Number)),
    sort_order: Schema.Number,
    architecture: Schema.optional(Schema.NullOr(Schema.String)),
    development: Schema.Boolean,
    production: Schema.Boolean,
  }),
);
export type ListClusterSizeSkusOutput = typeof ListClusterSizeSkusOutput.Type;

// The operation
/**
 * List available cluster sizes
 *
 * List available cluster sizes for an organization
 *
 * @param organization - The name of the organization
 * @param engine - The database engine to filter by. Defaults to 'mysql'.
 * @param rates - Whether to include pricing rates in the response. Defaults to false.
 * @param region - The region slug to get rates for. If not specified, uses the organization's default region.
 */
export const listClusterSizeSkus = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListClusterSizeSkusInput,
  outputSchema: ListClusterSizeSkusOutput,
  errors: [Forbidden, NotFound] as const,
}));
