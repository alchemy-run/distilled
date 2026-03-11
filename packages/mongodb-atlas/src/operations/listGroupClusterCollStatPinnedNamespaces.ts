import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupClusterCollStatPinnedNamespacesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/collStats/pinned",
    }),
  );
export type ListGroupClusterCollStatPinnedNamespacesInput =
  typeof ListGroupClusterCollStatPinnedNamespacesInput.Type;

// Output Schema
export const ListGroupClusterCollStatPinnedNamespacesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupClusterCollStatPinnedNamespacesOutput =
  typeof ListGroupClusterCollStatPinnedNamespacesOutput.Type;

// The operation
/**
 * Return Pinned Namespaces
 *
 * Returns a list of given cluster's pinned namespaces, a set of namespaces manually selected by users to collect query latency metrics on.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param clusterName - Human-readable label that identifies the cluster to retrieve pinned namespaces for.
 */
export const listGroupClusterCollStatPinnedNamespaces =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListGroupClusterCollStatPinnedNamespacesInput,
    outputSchema: ListGroupClusterCollStatPinnedNamespacesOutput,
  }));
