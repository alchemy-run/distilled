import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrgActivityFeedInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orgId: Schema.String.pipe(T.PathParam()),
    pretty: Schema.optional(Schema.Boolean),
    eventType: Schema.optional(Schema.String),
    maxDate: Schema.optional(Schema.String),
    minDate: Schema.optional(Schema.String),
  }).pipe(
    T.Http({ method: "GET", path: "/api/atlas/v2/orgs/{orgId}/activityFeed" }),
  );
export type GetOrgActivityFeedInput = typeof GetOrgActivityFeedInput.Type;

// Output Schema
export const GetOrgActivityFeedOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetOrgActivityFeedOutput = typeof GetOrgActivityFeedOutput.Type;

// The operation
/**
 * Return Pre-Filtered Activity Feed Link for One Organization
 *
 * Returns a pre-filtered activity feed link for the specified organization based on the provided date range and event types. The returned link can be shared and opened to view the activity feed with the same filters applied. To use this resource, the requesting Service Account or API Key must have the Organization Member role.
 *
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param eventType - Category of incident recorded at this moment in time.

**IMPORTANT**: The complete list of event type values changes frequently.
 * @param maxDate - End date and time for events to include in the activity feed link. ISO 8601 timestamp format in UTC.
 * @param minDate - Start date and time for events to include in the activity feed link. ISO 8601 timestamp format in UTC.
 */
export const getOrgActivityFeed = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOrgActivityFeedInput,
  outputSchema: GetOrgActivityFeedOutput,
}));
