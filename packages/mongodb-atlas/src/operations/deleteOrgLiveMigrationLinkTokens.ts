import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteOrgLiveMigrationLinkTokensInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orgId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/orgs/{orgId}/liveMigrations/linkTokens",
    }),
  );
export type DeleteOrgLiveMigrationLinkTokensInput =
  typeof DeleteOrgLiveMigrationLinkTokensInput.Type;

// Output Schema
export const DeleteOrgLiveMigrationLinkTokensOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteOrgLiveMigrationLinkTokensOutput =
  typeof DeleteOrgLiveMigrationLinkTokensOutput.Type;

// The operation
/**
 * Remove One Link-Token
 *
 * Remove one organization link and its associated public API key. MongoDB Atlas uses the link-token for push live migrations only. Live migrations (push) let you securely push data from Cloud Manager or Ops Manager into MongoDB Atlas. Your API Key must have the Organization Owner role to successfully call this resource.
 *
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 */
export const deleteOrgLiveMigrationLinkTokens =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteOrgLiveMigrationLinkTokensInput,
    outputSchema: DeleteOrgLiveMigrationLinkTokensOutput,
  }));
