import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupAlertInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  groupId: Schema.String.pipe(T.PathParam()),
  alertId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  pretty: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "GET",
    path: "/api/atlas/v2/groups/{groupId}/alerts/{alertId}",
  }),
);
export type GetGroupAlertInput = typeof GetGroupAlertInput.Type;

// Output Schema
export const GetGroupAlertOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupAlertOutput = typeof GetGroupAlertOutput.Type;

// The operation
/**
 * Return One Alert from One Project
 *
 * Returns one alert. This alert applies to any component in one project. You receive an alert when a monitored component meets or exceeds a value you set. To use this resource, the requesting Service Account or API Key must have the Project Read Only role. Use the Return All Alerts from One Project endpoint to retrieve all alerts to which the authenticated user has access.
 * This resource remains under revision and may change.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param alertId - Unique 24-hexadecimal digit string that identifies the alert.
 */
export const getGroupAlert = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetGroupAlertInput,
  outputSchema: GetGroupAlertOutput,
}));
