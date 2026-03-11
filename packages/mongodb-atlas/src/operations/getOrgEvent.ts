import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetOrgEventInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  orgId: Schema.String.pipe(T.PathParam()),
  eventId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
  includeRaw: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "GET",
    path: "/api/atlas/v2/orgs/{orgId}/events/{eventId}",
  }),
);
export type GetOrgEventInput = typeof GetOrgEventInput.Type;

// Output Schema
export const GetOrgEventOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetOrgEventOutput = typeof GetOrgEventOutput.Type;

// The operation
/**
 * Return One Event from One Organization
 *
 * Returns one event for the specified organization. Events identify significant database, billing, or security activities or status changes. To use this resource, the requesting Service Account or API Key must have the Organization Member role. Use the Return Events from One Organization endpoint to retrieve all events to which the authenticated user has access.
 * This resource remains under revision and may change.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param eventId - Unique 24-hexadecimal digit string that identifies the event that you want to return.
 * @param includeRaw - Flag that indicates whether to include the raw document in the output. The raw document contains additional meta information about the event.
 */
export const getOrgEvent = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetOrgEventInput,
  outputSchema: GetOrgEventOutput,
}));
