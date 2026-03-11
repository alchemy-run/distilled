import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CutoverGroupLiveMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    liveMigrationId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "/api/atlas/v2/groups/{groupId}/liveMigrations/{liveMigrationId}/cutover",
    }),
  );
export type CutoverGroupLiveMigrationInput =
  typeof CutoverGroupLiveMigrationInput.Type;

// Output Schema
export const CutoverGroupLiveMigrationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CutoverGroupLiveMigrationOutput =
  typeof CutoverGroupLiveMigrationOutput.Type;

// The operation
/**
 * Cut Over One Migrated Cluster
 *
 * Cut over the migrated cluster to MongoDB Atlas. Confirm when the cut over completes. When the cut over completes, MongoDB Atlas completes the live migration process and stops synchronizing with the source cluster. Your API Key must have the Organization Owner role to successfully call this resource.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param liveMigrationId - Unique 24-hexadecimal digit string that identifies the migration.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const cutoverGroupLiveMigration = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CutoverGroupLiveMigrationInput,
    outputSchema: CutoverGroupLiveMigrationOutput,
  }),
);
