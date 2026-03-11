import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupProcessDiskInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    partitionName: Schema.String.pipe(T.PathParam()),
    groupId: Schema.String.pipe(T.PathParam()),
    processId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/processes/{processId}/disks/{partitionName}",
    }),
  );
export type GetGroupProcessDiskInput = typeof GetGroupProcessDiskInput.Type;

// Output Schema
export const GetGroupProcessDiskOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupProcessDiskOutput = typeof GetGroupProcessDiskOutput.Type;

// The operation
/**
 * Return Measurements for One Disk
 *
 * Returns measurement details for one disk or partition for the specified host for the specified project. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param partitionName - Human-readable label of the disk or partition to which the measurements apply.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param processId - Combination of hostname and Internet Assigned Numbers Authority (IANA) port that serves the MongoDB process. The host must be the hostname, fully qualified domain name (FQDN), or Internet Protocol address (IPv4 or IPv6) of the host that runs the MongoDB process (`mongod` or `mongos`). The port must be the IANA port on which the MongoDB process listens for requests.
 */
export const getGroupProcessDisk = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetGroupProcessDiskInput,
  outputSchema: GetGroupProcessDiskOutput,
}));
