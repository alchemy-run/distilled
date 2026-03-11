import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupAlertsInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  groupId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
  includeCount: Schema.optional(Schema.Boolean),
  itemsPerPage: Schema.optional(Schema.Number),
  pageNum: Schema.optional(Schema.Number),
  pretty: Schema.optional(Schema.Boolean),
  status: Schema.optional(Schema.Literals(["OPEN", "TRACKING", "CLOSED"])),
}).pipe(
  T.Http({ method: "GET", path: "/api/atlas/v2/groups/{groupId}/alerts" }),
);
export type ListGroupAlertsInput = typeof ListGroupAlertsInput.Type;

// Output Schema
export const ListGroupAlertsOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupAlertsOutput = typeof ListGroupAlertsOutput.Type;

// The operation
/**
 * Return All Alerts from One Project
 *
 * Returns all alerts. These alerts apply to all components in one project. You receive an alert when a monitored component meets or exceeds a value you set. To use this resource, the requesting Service Account or API Key must have the Project Read Only role.
 * This resource remains under revision and may change.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param status - Status of the alerts to return. Omit this parameter to return all alerts in all statuses. TRACKING indicates the alert condition exists but has not persisted for the minimum notification delay. OPEN indicates the alert condition currently exists. CLOSED indicates the alert condition has been resolved.
 */
export const listGroupAlerts = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListGroupAlertsInput,
  outputSchema: ListGroupAlertsOutput,
}));
