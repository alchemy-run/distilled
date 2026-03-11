import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteGroupPeerInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  groupId: Schema.String.pipe(T.PathParam()),
  peerId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/api/atlas/v2/groups/{groupId}/peers/{peerId}",
  }),
);
export type DeleteGroupPeerInput = typeof DeleteGroupPeerInput.Type;

// Output Schema
export const DeleteGroupPeerOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteGroupPeerOutput = typeof DeleteGroupPeerOutput.Type;

// The operation
/**
 * Remove One Network Peering Connection
 *
 * Removes one network peering connection in the specified project. If you remove the last network peering connection associated with a project, MongoDB Cloud also removes any AWS security groups from the project IP access list. To use this resource, the requesting Service Account or API Key must have the Project Owner role or Project Network Access Manager role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param peerId - Unique 24-hexadecimal digit string that identifies the network peering connection that you want to delete.
 */
export const deleteGroupPeer = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteGroupPeerInput,
  outputSchema: DeleteGroupPeerOutput,
}));
