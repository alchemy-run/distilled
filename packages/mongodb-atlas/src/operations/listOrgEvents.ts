import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrgEventsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  orgId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  includeCount: Schema.optional(Schema.Boolean),
  itemsPerPage: Schema.optional(Schema.Number),
  pageNum: Schema.optional(Schema.Number),
  pretty: Schema.optional(Schema.Boolean),
  eventType: Schema.optional(Schema.String),
  includeRaw: Schema.optional(Schema.Boolean),
  maxDate: Schema.optional(Schema.String),
  minDate: Schema.optional(Schema.String),
}).pipe(T.Http({ method: "GET", path: "/api/atlas/v2/orgs/{orgId}/events" }));
export type ListOrgEventsInput = typeof ListOrgEventsInput.Type;

// Output Schema
export const ListOrgEventsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListOrgEventsOutput = typeof ListOrgEventsOutput.Type;

// The operation
/**
 * Return Events from One Organization
 *
 * Returns events for the specified organization. Events identify significant database, billing, or security activities or status changes. To use this resource, the requesting Service Account or API Key must have the Organization Member role.
 * This resource remains under revision and may change.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param eventType - Category of incident recorded at this moment in time.

**IMPORTANT**: The complete list of event type values changes frequently.
 * @param includeRaw - Flag that indicates whether to include the raw document in the output. The raw document contains additional meta information about the event.
 * @param maxDate - Date and time from when MongoDB Cloud stops returning events. This parameter uses the ISO 8601 timestamp format in UTC.
 * @param minDate - Date and time from when MongoDB Cloud starts returning events. This parameter uses the ISO 8601 timestamp format in UTC.
 */
export const listOrgEvents = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListOrgEventsInput,
  outputSchema: ListOrgEventsOutput,
}));
