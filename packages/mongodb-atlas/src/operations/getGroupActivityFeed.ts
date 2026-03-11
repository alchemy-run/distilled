import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupActivityFeedInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    pretty: Schema.optional(Schema.Boolean),
    eventType: Schema.optional(Schema.String),
    maxDate: Schema.optional(Schema.String),
    minDate: Schema.optional(Schema.String),
    clusterName: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/activityFeed",
    }),
  );
export type GetGroupActivityFeedInput = typeof GetGroupActivityFeedInput.Type;

// Output Schema
export const GetGroupActivityFeedOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupActivityFeedOutput = typeof GetGroupActivityFeedOutput.Type;

// The operation
/**
 * Return Pre-Filtered Activity Feed Link for One Project
 *
 * Returns a pre-filtered activity feed link for the specified project based on the provided date range and event types. The returned link can be shared and opened to view the activity feed with the same filters applied. To use this resource, the requesting Service Account or API Key must have the Project Read Only role or higher.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param eventType - Category of incident recorded at this moment in time.

**IMPORTANT**: The complete list of event type values changes frequently.
 * @param maxDate - End date and time for events to include in the activity feed link. ISO 8601 timestamp format in UTC.
 * @param minDate - Start date and time for events to include in the activity feed link. ISO 8601 timestamp format in UTC.
 * @param clusterName - Human-readable label that identifies the cluster.
 */
export const getGroupActivityFeed = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupActivityFeedInput,
    outputSchema: GetGroupActivityFeedOutput,
  }),
);
