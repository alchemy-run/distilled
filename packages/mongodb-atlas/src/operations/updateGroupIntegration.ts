import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateGroupIntegrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    integrationType: Schema.Literals([
      "PAGER_DUTY",
      "SLACK",
      "DATADOG",
      "NEW_RELIC",
      "OPS_GENIE",
      "VICTOR_OPS",
      "WEBHOOK",
      "HIP_CHAT",
      "PROMETHEUS",
      "MICROSOFT_TEAMS",
    ]).pipe(T.PathParam()),
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    includeCount: Schema.optional(Schema.Boolean),
    itemsPerPage: Schema.optional(Schema.Number),
    pageNum: Schema.optional(Schema.Number),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/api/atlas/v2/groups/{groupId}/integrations/{integrationType}",
    }),
  );
export type UpdateGroupIntegrationInput =
  typeof UpdateGroupIntegrationInput.Type;

// Output Schema
export const UpdateGroupIntegrationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateGroupIntegrationOutput =
  typeof UpdateGroupIntegrationOutput.Type;

// The operation
/**
 * Update One Third-Party Service Integration
 *
 * Updates the settings for configuring integration with one third-party service. These settings apply to all databases managed in one MongoDB Cloud project. To use this resource, the requesting Service Account or API Key must have the Organization Owner or Project Owner role.
 *
 * @param integrationType - Human-readable label that identifies the service which you want to integrate with MongoDB Cloud.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const updateGroupIntegration = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateGroupIntegrationInput,
    outputSchema: UpdateGroupIntegrationOutput,
  }),
);
