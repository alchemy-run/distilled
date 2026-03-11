import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupMongoDbVersionsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
    cloudProvider: Schema.optional(
      Schema.Literals(["AWS", "AZURE", "GCP", "TENANT"]),
    ),
    instanceSize: Schema.optional(Schema.String),
    defaultStatus: Schema.optional(Schema.Literals(["DEFAULT"])),
    itemsPerPage: Schema.optional(Schema.Number),
    pageNum: Schema.optional(Schema.Number),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/mongoDBVersions",
    }),
  );
export type GetGroupMongoDbVersionsInput =
  typeof GetGroupMongoDbVersionsInput.Type;

// Output Schema
export const GetGroupMongoDbVersionsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupMongoDbVersionsOutput =
  typeof GetGroupMongoDbVersionsOutput.Type;

// The operation
/**
 * Return All Available MongoDB LTS Versions for Clusters in One Project
 *
 * Returns the MongoDB Long Term Support Major Versions available to new clusters in this project.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param cloudProvider - Filter results to only one cloud provider.
 * @param instanceSize - Filter results to only one instance size.
 * @param defaultStatus - Filter results to only the default values per tier. This value must be DEFAULT.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 */
export const getGroupMongoDbVersions = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupMongoDbVersionsInput,
    outputSchema: GetGroupMongoDbVersionsOutput,
  }),
);
