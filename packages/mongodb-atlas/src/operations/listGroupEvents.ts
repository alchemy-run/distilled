import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupEventsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  groupId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  includeCount: Schema.optional(Schema.Boolean),
  itemsPerPage: Schema.optional(Schema.Number),
  pageNum: Schema.optional(Schema.Number),
  pretty: Schema.optional(Schema.Boolean),
  clusterNames: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
  excludedEventType: Schema.optional(Schema.String),
  includeRaw: Schema.optional(Schema.Boolean),
  maxDate: Schema.optional(Schema.String),
  minDate: Schema.optional(Schema.String),
}).pipe(
  T.Http({ method: "GET", path: "/api/atlas/v2/groups/{groupId}/events" }),
);
export type ListGroupEventsInput = typeof ListGroupEventsInput.Type;

// Output Schema
export const ListGroupEventsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupEventsOutput = typeof ListGroupEventsOutput.Type;

// The operation
/**
 * Return Events from One Project
 *
 * Returns events for the specified project. Events identify significant database, billing, or security activities or status changes. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 * This resource remains under revision and may change.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param clusterNames - Human-readable label that identifies the cluster.
 * @param eventType - Category of incident recorded at this moment in time.

**IMPORTANT**: The complete list of event type values changes frequently.
 * @param excludedEventType - Category of event that you would like to exclude from query results, such as `CLUSTER_CREATED`.

**IMPORTANT**: Event type names change frequently. Verify that you specify the event type correctly by checking the complete list of event types.
 * @param includeRaw - Flag that indicates whether to include the raw document in the output. The raw document contains additional meta information about the event.
 * @param maxDate - Date and time from when MongoDB Cloud stops returning events. This parameter uses the ISO 8601 timestamp format in UTC.
 * @param minDate - Date and time from when MongoDB Cloud starts returning events. This parameter uses the ISO 8601 timestamp format in UTC.
 */
export const listGroupEvents = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListGroupEventsInput,
  outputSchema: ListGroupEventsOutput,
}));
