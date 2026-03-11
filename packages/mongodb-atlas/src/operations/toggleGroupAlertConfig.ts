import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ToggleGroupAlertConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    alertConfigId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/api/atlas/v2/groups/{groupId}/alertConfigs/{alertConfigId}",
    }),
  );
export type ToggleGroupAlertConfigInput =
  typeof ToggleGroupAlertConfigInput.Type;

// Output Schema
export const ToggleGroupAlertConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ToggleGroupAlertConfigOutput =
  typeof ToggleGroupAlertConfigOutput.Type;

// The operation
/**
 * Toggle State of One Alert Configuration in One Project
 *
 * Enables or disables the specified alert configuration in the specified project. The resource enables the specified alert configuration if currently enabled. The resource disables the specified alert configuration if currently disabled. To use this resource, the requesting Service Account or API Key must have the Project Alerts Manager, Project Monitoring Admin, Organization Owner, or Project Owner role.
 * **NOTE**: This endpoint updates only the enabled/disabled state for the alert configuration. To update more than just this configuration, see Update One Alert Configuration.
 * This resource remains under revision and may change.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param alertConfigId - Unique 24-hexadecimal digit string that identifies the alert configuration that triggered this alert.
 */
export const toggleGroupAlertConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ToggleGroupAlertConfigInput,
    outputSchema: ToggleGroupAlertConfigOutput,
  }),
);
