import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupProcessDatabaseInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    processId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/processes/{processId}/databases/{databaseName}",
    }),
  );
export type GetGroupProcessDatabaseInput =
  typeof GetGroupProcessDatabaseInput.Type;

// Output Schema
export const GetGroupProcessDatabaseOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupProcessDatabaseOutput =
  typeof GetGroupProcessDatabaseOutput.Type;

// The operation
/**
 * Return One Database for One MongoDB Process
 *
 * Returns one database running on the specified host for the specified project. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param databaseName - Human-readable label that identifies the database that the specified MongoDB process serves.
 * @param processId - Combination of hostname and Internet Assigned Numbers Authority (IANA) port that serves the MongoDB process. The host must be the hostname, fully qualified domain name (FQDN), or Internet Protocol address (IPv4 or IPv6) of the host that runs the MongoDB process (`mongod` or `mongos`). The port must be the IANA port on which the MongoDB process listens for requests.
 */
export const getGroupProcessDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupProcessDatabaseInput,
    outputSchema: GetGroupProcessDatabaseOutput,
  }),
);
