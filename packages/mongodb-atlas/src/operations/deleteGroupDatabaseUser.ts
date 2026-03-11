import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteGroupDatabaseUserInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    username: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/groups/{groupId}/databaseUsers/{databaseName}/{username}",
    }),
  );
export type DeleteGroupDatabaseUserInput =
  typeof DeleteGroupDatabaseUserInput.Type;

// Output Schema
export const DeleteGroupDatabaseUserOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteGroupDatabaseUserOutput =
  typeof DeleteGroupDatabaseUserOutput.Type;

// The operation
/**
 * Remove One Database User from One Project
 *
 * Removes one database user from the specified project. To use this resource, the requesting Service Account or API Key must have the Project Owner role, the Project Stream Processing Owner role, or the Project Database Access Admin role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param databaseName - The database against which the database user authenticates. Database users must provide both a username and authentication database to log into MongoDB. If the user authenticates with AWS IAM, x.509, LDAP, or OIDC Workload this value should be `$external`. If the user authenticates with SCRAM-SHA or OIDC Workforce, this value should be `admin`.
 * @param username - Human-readable label that represents the user that authenticates to MongoDB. The format of this label depends on the method of authentication:

| Authentication Method | Parameter Needed | Parameter Value | username Format |
|---|---|---|---|
| AWS IAM | `awsIAMType` | `ROLE` | <abbr title="Amazon Resource Name">ARN</abbr> |
| AWS IAM | `awsIAMType` | `USER` | <abbr title="Amazon Resource Name">ARN</abbr> |
| x.509 | `x509Type` | `CUSTOMER` | [RFC 2253](https://tools.ietf.org/html/2253) Distinguished Name |
| x.509 | `x509Type` | `MANAGED` | [RFC 2253](https://tools.ietf.org/html/2253) Distinguished Name |
| LDAP | `ldapAuthType` | `USER` | [RFC 2253](https://tools.ietf.org/html/2253) Distinguished Name |
| LDAP | `ldapAuthType` | `GROUP` | [RFC 2253](https://tools.ietf.org/html/2253) Distinguished Name |
| OIDC Workforce | `oidcAuthType` | `IDP_GROUP` | Atlas OIDC IdP ID (found in federation settings), followed by a '/', followed by the IdP group name |
| OIDC Workload | `oidcAuthType` | `USER` | Atlas OIDC IdP ID (found in federation settings), followed by a '/', followed by the IdP user name |
| SCRAM-SHA | `awsIAMType`, `x509Type`, `ldapAuthType`, `oidcAuthType` | `NONE` | Alphanumeric string |

 */
export const deleteGroupDatabaseUser = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteGroupDatabaseUserInput,
    outputSchema: DeleteGroupDatabaseUserOutput,
  }),
);
