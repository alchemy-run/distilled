import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupLiveMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    liveMigrationId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/liveMigrations/{liveMigrationId}",
    }),
  );
export type GetGroupLiveMigrationInput = typeof GetGroupLiveMigrationInput.Type;

// Output Schema
export const GetGroupLiveMigrationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupLiveMigrationOutput =
  typeof GetGroupLiveMigrationOutput.Type;

// The operation
/**
 * Return One Migration Job
 *
 * Return details of one cluster migration job. Each push live migration job uses one migration host. Your API Key must have the Organization Member role to successfully call this resource.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param liveMigrationId - Unique 24-hexadecimal digit string that identifies the migration.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const getGroupLiveMigration = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupLiveMigrationInput,
    outputSchema: GetGroupLiveMigrationOutput,
  }),
);
