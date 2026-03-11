import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupClusterSearchIndexInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    collectionName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{databaseName}/{collectionName}",
    }),
  );
export type ListGroupClusterSearchIndexInput =
  typeof ListGroupClusterSearchIndexInput.Type;

// Output Schema
export const ListGroupClusterSearchIndexOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupClusterSearchIndexOutput =
  typeof ListGroupClusterSearchIndexOutput.Type;

// The operation
/**
 * Return All Atlas Search Indexes for One Collection
 *
 * Returns all Atlas Search indexes on the specified collection. Atlas Search indexes contain the indexed fields and the analyzers used to create the indexes. To use this resource, the requesting Service Account or API Key must have the Project Data Access Read Write role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param clusterName - Name of the cluster that contains the collection with one or more Atlas Search indexes.
 * @param collectionName - Name of the collection that contains one or more Atlas Search indexes.
 * @param databaseName - Label that identifies the database that contains the collection with one or more Atlas Search indexes.
 */
export const listGroupClusterSearchIndex = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListGroupClusterSearchIndexInput,
    outputSchema: ListGroupClusterSearchIndexOutput,
  }),
);
