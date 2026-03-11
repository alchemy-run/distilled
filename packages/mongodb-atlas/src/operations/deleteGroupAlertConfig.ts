import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteGroupAlertConfigInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    alertConfigId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/api/atlas/v2/groups/{groupId}/alertConfigs/{alertConfigId}",
    }),
  );
export type DeleteGroupAlertConfigInput =
  typeof DeleteGroupAlertConfigInput.Type;

// Output Schema
export const DeleteGroupAlertConfigOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type DeleteGroupAlertConfigOutput =
  typeof DeleteGroupAlertConfigOutput.Type;

// The operation
/**
 * Remove One Alert Configuration from One Project
 *
 * Removes one alert configuration from the specified project. To use this resource, the requesting Service Account or API Key must have the Project Alerts Manager, Project Monitoring Admin, Organization Owner, or Project Owner role. Use the Return All Alert Configurations for One Project endpoint to retrieve all alert configurations to which the authenticated user has access.
 * This resource remains under revision and may change.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param alertConfigId - Unique 24-hexadecimal digit string that identifies the alert configuration.
 */
export const deleteGroupAlertConfig = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteGroupAlertConfigInput,
    outputSchema: DeleteGroupAlertConfigOutput,
  }),
);
