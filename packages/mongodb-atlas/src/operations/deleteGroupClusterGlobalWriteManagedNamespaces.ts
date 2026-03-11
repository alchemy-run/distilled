import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteGroupClusterGlobalWriteManagedNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    clusterName: Schema.String.pipe(T.PathParam()),
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
    db: Schema.optional(Schema.String),
    collection: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/globalWrites/managedNamespaces",
    }),
  );
export type DeleteGroupClusterGlobalWriteManagedNamespacesInput =
  typeof DeleteGroupClusterGlobalWriteManagedNamespacesInput.Type;

// Output Schema
export const DeleteGroupClusterGlobalWriteManagedNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteGroupClusterGlobalWriteManagedNamespacesOutput =
  typeof DeleteGroupClusterGlobalWriteManagedNamespacesOutput.Type;

// The operation
/**
 * Remove One Managed Namespace from One Global Cluster
 *
 * Removes one managed namespace within the specified global cluster. A managed namespace identifies a collection using the database name, the dot separator, and the collection name. Deleting a managed namespace does not remove the associated collection or data. To use this resource, the requesting Service Account or API Key must have the Project Data Access Admin role. Deprecated versions: v2-{2023-02-01}, v2-{2023-01-01}
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param clusterName - Human-readable label that identifies this cluster.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param db - Human-readable label that identifies the database that contains the collection.
 * @param collection - Human-readable label that identifies the collection associated with the managed namespace.
 */
export const deleteGroupClusterGlobalWriteManagedNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteGroupClusterGlobalWriteManagedNamespacesInput,
    outputSchema: DeleteGroupClusterGlobalWriteManagedNamespacesOutput,
  }));
