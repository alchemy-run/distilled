import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListGroupLogIntegrationsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    includeCount: Schema.optional(Schema.Boolean),
    itemsPerPage: Schema.optional(Schema.Number),
    pageNum: Schema.optional(Schema.Number),
    pretty: Schema.optional(Schema.Boolean),
    integrationType: Schema.optional(Schema.String),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/logIntegrations",
    }),
  );
export type ListGroupLogIntegrationsInput =
  typeof ListGroupLogIntegrationsInput.Type;

// Output Schema
export const ListGroupLogIntegrationsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListGroupLogIntegrationsOutput =
  typeof ListGroupLogIntegrationsOutput.Type;

// The operation
/**
 * Return All Active Log Integrations
 *
 * Returns all log integration configurations for the project. Optionally filter by integration type. To use this resource, the requesting Service Account or API Key must have the Organization Owner or Project Owner role.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param includeCount - Flag that indicates whether the response returns the total number of items (`totalCount`) in the response.
 * @param itemsPerPage - Number of items that the response returns per page.
 * @param pageNum - Number of the page that displays the current set of the total objects that the response returns.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param integrationType - Optional filter by integration type (e.g., `S3_LOG_EXPORT`).
 */
export const listGroupLogIntegrations = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListGroupLogIntegrationsInput,
    outputSchema: ListGroupLogIntegrationsOutput,
  }),
);
