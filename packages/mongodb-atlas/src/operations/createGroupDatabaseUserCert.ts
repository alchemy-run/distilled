import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateGroupDatabaseUserCertInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    username: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/groups/{groupId}/databaseUsers/{username}/certs",
    }),
  );
export type CreateGroupDatabaseUserCertInput =
  typeof CreateGroupDatabaseUserCertInput.Type;

// Output Schema
export const CreateGroupDatabaseUserCertOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateGroupDatabaseUserCertOutput =
  typeof CreateGroupDatabaseUserCertOutput.Type;

// The operation
/**
 * Create One X.509 Certificate for One Database User
 *
 * Generates one X.509 certificate for the specified MongoDB user. Atlas manages the certificate and MongoDB user that belong to one project. To use this resource, the requesting Service Account or API Key must have the Project Owner role.
 * To get MongoDB Cloud to generate a managed certificate for a database user, set `"x509Type" : "MANAGED"` on the desired MongoDB Database User.
 * If you are managing your own Certificate Authority (CA) in Self-Managed X.509 mode, you must generate certificates for database users using your own CA.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param username - Human-readable label that represents the MongoDB database user account for whom to create a certificate.
 */
export const createGroupDatabaseUserCert = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreateGroupDatabaseUserCertInput,
    outputSchema: CreateGroupDatabaseUserCertOutput,
  }),
);
