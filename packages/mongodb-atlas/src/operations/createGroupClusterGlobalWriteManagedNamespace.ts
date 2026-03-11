import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateGroupClusterGlobalWriteManagedNamespaceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/globalWrites/managedNamespaces",
    }),
  );
export type CreateGroupClusterGlobalWriteManagedNamespaceInput =
  typeof CreateGroupClusterGlobalWriteManagedNamespaceInput.Type;

// Output Schema
export const CreateGroupClusterGlobalWriteManagedNamespaceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateGroupClusterGlobalWriteManagedNamespaceOutput =
  typeof CreateGroupClusterGlobalWriteManagedNamespaceOutput.Type;

// The operation
/**
 * Create One Managed Namespace in One Global Cluster
 *
 * Creates one managed namespace within the specified global cluster. A managed namespace identifies a collection using the database name, the dot separator, and the collection name. To use this resource, the requesting Service Account or API Key must have the Project Data Access Admin role. Deprecated versions: v2-{2023-02-01}, v2-{2023-01-01}
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param clusterName - Human-readable label that identifies this cluster.
 */
export const createGroupClusterGlobalWriteManagedNamespace =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: CreateGroupClusterGlobalWriteManagedNamespaceInput,
    outputSchema: CreateGroupClusterGlobalWriteManagedNamespaceOutput,
  }));
