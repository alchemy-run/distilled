import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DisableGroupUserSecurityCustomerX509Input =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/groups/{groupId}/userSecurity/customerX509",
    }),
  );
export type DisableGroupUserSecurityCustomerX509Input =
  typeof DisableGroupUserSecurityCustomerX509Input.Type;

// Output Schema
export const DisableGroupUserSecurityCustomerX509Output =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DisableGroupUserSecurityCustomerX509Output =
  typeof DisableGroupUserSecurityCustomerX509Output.Type;

// The operation
/**
 * Disable Customer-Managed X.509
 *
 * Clears the customer-managed X.509 settings on a project, including the uploaded Certificate Authority, which disables self-managed X.509.
 * Updating this configuration triggers a rolling restart of the database. You must have the Project Owner role to use this endpoint.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 */
export const disableGroupUserSecurityCustomerX509 =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DisableGroupUserSecurityCustomerX509Input,
    outputSchema: DisableGroupUserSecurityCustomerX509Output,
  }));
