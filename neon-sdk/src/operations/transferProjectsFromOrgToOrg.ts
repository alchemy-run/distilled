import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const TransferProjectsFromOrgToOrgInput = Schema.Struct({
  source_org_id: Schema.String.pipe(T.PathParam()),
  destination_org_id: Schema.String,
  project_ids: Schema.Array(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/organizations/{source_org_id}/projects/transfer",
  }),
);
export type TransferProjectsFromOrgToOrgInput =
  typeof TransferProjectsFromOrgToOrgInput.Type;

// Output Schema
export const TransferProjectsFromOrgToOrgOutput = Schema.Struct({});
export type TransferProjectsFromOrgToOrgOutput =
  typeof TransferProjectsFromOrgToOrgOutput.Type;

// The operation
/**
 * Transfer projects between organizations
 *
 * Transfers selected projects, identified by their IDs, from your organization to another specified organization.
 *
 * @param source_org_id - The Neon organization ID (source org, which currently owns the project)
 */
export const transferProjectsFromOrgToOrg =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: TransferProjectsFromOrgToOrgInput,
    outputSchema: TransferProjectsFromOrgToOrgOutput,
  }));
