import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteGroupClusterSearchIndexByNameInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    collectionName: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    indexName: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{databaseName}/{collectionName}/{indexName}",
    }),
  );
export type DeleteGroupClusterSearchIndexByNameInput =
  typeof DeleteGroupClusterSearchIndexByNameInput.Type;

// Output Schema
export const DeleteGroupClusterSearchIndexByNameOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteGroupClusterSearchIndexByNameOutput =
  typeof DeleteGroupClusterSearchIndexByNameOutput.Type;

// The operation
/**
 * Remove One Atlas Search Index by Name
 *
 * Removes one Atlas Search index that you identified with its database, collection, and name. To use this resource, the requesting Service Account or API Key must have the Project Data Access Admin role. This deletion is eventually consistent.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param clusterName - Name of the cluster that contains the database and collection with one or more Application Search indexes.
 * @param collectionName - Name of the collection that contains one or more Atlas Search indexes.
 * @param databaseName - Label that identifies the database that contains the collection with one or more Atlas Search indexes.
 * @param indexName - Name of the Atlas Search index to delete.
 */
export const deleteGroupClusterSearchIndexByName =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteGroupClusterSearchIndexByNameInput,
    outputSchema: DeleteGroupClusterSearchIndexByNameOutput,
  }));
