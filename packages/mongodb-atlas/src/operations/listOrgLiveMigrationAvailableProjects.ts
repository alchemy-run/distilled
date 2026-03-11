import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListOrgLiveMigrationAvailableProjectsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    orgId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/orgs/{orgId}/liveMigrations/availableProjects",
    }),
  );
export type ListOrgLiveMigrationAvailableProjectsInput =
  typeof ListOrgLiveMigrationAvailableProjectsInput.Type;

// Output Schema
export const ListOrgLiveMigrationAvailableProjectsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type ListOrgLiveMigrationAvailableProjectsOutput =
  typeof ListOrgLiveMigrationAvailableProjectsOutput.Type;

// The operation
/**
 * Return All Projects Available for Migration
 *
 * Return all projects that you can migrate to the specified organization.
 *
 * @param orgId - Unique 24-hexadecimal digit string that identifies the organization that contains your projects. Use the [`/orgs`](#tag/Organizations/operation/listOrganizations) endpoint to retrieve all organizations to which the authenticated user has access.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const listOrgLiveMigrationAvailableProjects =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: ListOrgLiveMigrationAvailableProjectsInput,
    outputSchema: ListOrgLiveMigrationAvailableProjectsOutput,
  }));
