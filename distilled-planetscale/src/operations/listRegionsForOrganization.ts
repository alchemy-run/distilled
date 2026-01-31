import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListRegionsForOrganizationInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  page: Schema.optional(Schema.Number),
  per_page: Schema.optional(Schema.Number),
}).pipe(
  T.Http({ method: "GET", path: "/organizations/{organization}/regions" }),
);
export type ListRegionsForOrganizationInput =
  typeof ListRegionsForOrganizationInput.Type;

// Output Schema
export const ListRegionsForOrganizationOutput = Schema.Struct({
  current_page: Schema.Number,
  next_page: Schema.NullOr(Schema.Number),
  next_page_url: Schema.NullOr(Schema.String),
  prev_page: Schema.NullOr(Schema.Number),
  prev_page_url: Schema.NullOr(Schema.String),
  data: Schema.Array(
    Schema.Struct({
      id: Schema.String,
      provider: Schema.String,
      enabled: Schema.Boolean,
      public_ip_addresses: Schema.Array(Schema.String),
      display_name: Schema.String,
      location: Schema.String,
      slug: Schema.String,
      current_default: Schema.Boolean,
    }),
  ),
});
export type ListRegionsForOrganizationOutput =
  typeof ListRegionsForOrganizationOutput.Type;

// The operation
/**
 * List regions for an organization
 *
 * @param organization - The name of the organization
 * @param page - If provided, specifies the page offset of returned results
 * @param per_page - If provided, specifies the number of returned results
 */
export const listRegionsForOrganization = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListRegionsForOrganizationInput,
    outputSchema: ListRegionsForOrganizationOutput,
  }),
);
