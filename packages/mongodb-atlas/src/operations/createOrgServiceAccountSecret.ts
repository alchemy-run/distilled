import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateOrgServiceAccountSecretInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orgId: Schema.String.pipe(T.PathParam()),
    clientId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/orgs/{orgId}/serviceAccounts/{clientId}/secrets",
    }),
  );
export type CreateOrgServiceAccountSecretInput =
  typeof CreateOrgServiceAccountSecretInput.Type;

// Output Schema
export const CreateOrgServiceAccountSecretOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateOrgServiceAccountSecretOutput =
  typeof CreateOrgServiceAccountSecretOutput.Type;

// The operation
/**
 * Create One Organization Service Account Secret
 *
 * Create a secret for the specified Service Account.
 *
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param clientId - The Client ID of the Service Account.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const createOrgServiceAccountSecret =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateOrgServiceAccountSecretInput,
    outputSchema: CreateOrgServiceAccountSecretOutput,
  }));
