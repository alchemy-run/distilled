import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateOrgLiveMigrationLinkTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orgId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/orgs/{orgId}/liveMigrations/linkTokens",
    }),
  );
export type CreateOrgLiveMigrationLinkTokenInput =
  typeof CreateOrgLiveMigrationLinkTokenInput.Type;

// Output Schema
export const CreateOrgLiveMigrationLinkTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateOrgLiveMigrationLinkTokenOutput =
  typeof CreateOrgLiveMigrationLinkTokenOutput.Type;

// The operation
/**
 * Create One Link-Token
 *
 * Create one link-token that contains all the information required to complete the link. MongoDB Atlas uses the link-token for push live migrations only. Live migration (push) allows you to securely push data from Cloud Manager or Ops Manager into MongoDB Atlas. Your API Key must have the Organization Owner role to successfully call this resource.
 *
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const createOrgLiveMigrationLinkToken =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateOrgLiveMigrationLinkTokenInput,
    outputSchema: CreateOrgLiveMigrationLinkTokenOutput,
  }));
