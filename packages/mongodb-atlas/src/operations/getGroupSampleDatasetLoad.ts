import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupSampleDatasetLoadInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    sampleDatasetId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/sampleDatasetLoad/{sampleDatasetId}",
    }),
  );
export type GetGroupSampleDatasetLoadInput =
  typeof GetGroupSampleDatasetLoadInput.Type;

// Output Schema
export const GetGroupSampleDatasetLoadOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupSampleDatasetLoadOutput =
  typeof GetGroupSampleDatasetLoadOutput.Type;

// The operation
/**
 * Return Status of Sample Dataset Load for One Cluster
 *
 * Checks the progress of loading the sample dataset into one cluster. To use this resource, the requesting Service Account or API Key must have the Project Owner role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param sampleDatasetId - Unique 24-hexadecimal digit string that identifies the loaded sample dataset.
 */
export const getGroupSampleDatasetLoad = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupSampleDatasetLoadInput,
    outputSchema: GetGroupSampleDatasetLoadOutput,
  }),
);
