import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupClusterSearchIndexInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    clusterName: Schema.String.pipe(T.PathParam()),
    indexId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/search/indexes/{indexId}",
    }),
  );
export type GetGroupClusterSearchIndexInput =
  typeof GetGroupClusterSearchIndexInput.Type;

// Output Schema
export const GetGroupClusterSearchIndexOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupClusterSearchIndexOutput =
  typeof GetGroupClusterSearchIndexOutput.Type;

// The operation
/**
 * Return One Atlas Search Index by ID
 *
 * Returns one Atlas Search index in the specified project. You identify this index using its unique ID. Atlas Search index contains the indexed fields and the analyzers used to create the index. To use this resource, the requesting Service Account or API Key must have the Project Data Access Read Write role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param clusterName - Name of the cluster that contains the collection with one or more Atlas Search indexes.
 * @param indexId - Unique 24-hexadecimal digit string that identifies the Application Search [index](https://dochub.mongodb.org/core/index-definitions-fts). Use the [Get All Application Search Indexes for a Collection API](https://docs.atlas.mongodb.com/reference/api/fts-indexes-get-all/) endpoint to find the IDs of all Application Search indexes.
 */
export const getGroupClusterSearchIndex = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupClusterSearchIndexInput,
    outputSchema: GetGroupClusterSearchIndexOutput,
  }),
);
