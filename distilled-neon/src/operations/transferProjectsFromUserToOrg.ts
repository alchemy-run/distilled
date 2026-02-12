import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const TransferProjectsFromUserToOrgInput = Schema.Struct({
  destination_org_id: Schema.String,
  project_ids: Schema.Array(Schema.String),
}).pipe(T.Http({ method: "POST", path: "/users/me/projects/transfer" }));
export type TransferProjectsFromUserToOrgInput = typeof TransferProjectsFromUserToOrgInput.Type;

// Output Schema
export const TransferProjectsFromUserToOrgOutput = Schema.Struct({

});
export type TransferProjectsFromUserToOrgOutput = typeof TransferProjectsFromUserToOrgOutput.Type;

// The operation
/**
 * Transfer projects from personal account to organization
 *
 * Transfers selected projects, identified by their IDs, from your personal account to a specified organization.
 */
export const transferProjectsFromUserToOrg = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TransferProjectsFromUserToOrgInput,
  outputSchema: TransferProjectsFromUserToOrgOutput,
}));
