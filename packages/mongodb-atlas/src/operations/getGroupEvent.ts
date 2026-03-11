import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupEventInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  groupId: Schema.String.pipe(T.PathParam()),
  eventId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
  includeRaw: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "GET",
    path: "/api/atlas/v2/groups/{groupId}/events/{eventId}",
  }),
);
export type GetGroupEventInput = typeof GetGroupEventInput.Type;

// Output Schema
export const GetGroupEventOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupEventOutput = typeof GetGroupEventOutput.Type;

// The operation
/**
 * Return One Event from One Project
 *
 * Returns one event for the specified project. Events identify significant database, billing, or security activities or status changes. To use this resource, the requesting Service Account or API Key must have the Project Read Only role. Use the Return Events from One Project endpoint to retrieve all events to which the authenticated user has access.
 * This resource remains under revision and may change.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param eventId - Unique 24-hexadecimal digit string that identifies the event that you want to return.
 * @param includeRaw - Flag that indicates whether to include the raw document in the output. The raw document contains additional meta information about the event.
 */
export const getGroupEvent = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetGroupEventInput,
  outputSchema: GetGroupEventOutput,
}));
