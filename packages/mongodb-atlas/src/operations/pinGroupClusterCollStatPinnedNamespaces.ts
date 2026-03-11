import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const PinGroupClusterCollStatPinnedNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/collStats/pinned",
    }),
  );
export type PinGroupClusterCollStatPinnedNamespacesInput =
  typeof PinGroupClusterCollStatPinnedNamespacesInput.Type;

// Output Schema
export const PinGroupClusterCollStatPinnedNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type PinGroupClusterCollStatPinnedNamespacesOutput =
  typeof PinGroupClusterCollStatPinnedNamespacesOutput.Type;

// The operation
/**
 * Pin Namespaces
 *
 * Pin provided list of namespaces for collection-level latency metrics collection for the given Group and Cluster. This initializes a pinned namespaces list or replaces any existing pinned namespaces list for the Group and Cluster.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param clusterName - Human-readable label that identifies the cluster to pin namespaces to.
 */
export const pinGroupClusterCollStatPinnedNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: PinGroupClusterCollStatPinnedNamespacesInput,
    outputSchema: PinGroupClusterCollStatPinnedNamespacesOutput,
  }));
