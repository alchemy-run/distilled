import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const AcknowledgeGroupAlertInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    alertId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/api/atlas/v2/groups/{groupId}/alerts/{alertId}",
    }),
  );
export type AcknowledgeGroupAlertInput = typeof AcknowledgeGroupAlertInput.Type;

// Output Schema
export const AcknowledgeGroupAlertOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type AcknowledgeGroupAlertOutput =
  typeof AcknowledgeGroupAlertOutput.Type;

// The operation
/**
 * Acknowledge One Alert from One Project
 *
 * Confirms receipt of one existing alert. This alert applies to any component in one project. Acknowledging an alert prevents successive notifications. You receive an alert when a monitored component meets or exceeds a value you set until you acknowledge the alert. To use this resource, the requesting Service Account or API Key must have the Project Alerts Manager, Project Monitoring Admin, Organization Owner, or Project Owner role. Use the Return All Alerts from One Project endpoint to retrieve all alerts to which the authenticated user has access.
 * This resource remains under revision and may change. Deprecated versions: v2-{2023-01-01}
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param alertId - Unique 24-hexadecimal digit string that identifies the alert.
 */
export const acknowledgeGroupAlert = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: AcknowledgeGroupAlertInput,
    outputSchema: AcknowledgeGroupAlertOutput,
  }),
);
