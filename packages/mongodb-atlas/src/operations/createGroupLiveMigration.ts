import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateGroupLiveMigrationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/api/atlas/v2/groups/{groupId}/liveMigrations",
    }),
  );
export type CreateGroupLiveMigrationInput =
  typeof CreateGroupLiveMigrationInput.Type;

// Output Schema
export const CreateGroupLiveMigrationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type CreateGroupLiveMigrationOutput =
  typeof CreateGroupLiveMigrationOutput.Type;

// The operation
/**
 * Create One Migration for One Local Managed Cluster to MongoDB Atlas
 *
 * Migrate one cluster that Cloud or Ops Manager manages to MongoDB Atlas.
 * Please make sure to validate your migration before initiating it.
 * You can use this API endpoint for push live migrations only. Your API Key must have the Organization Owner role to successfully call this resource.
 * **NOTE**: Migrating time-series collections is not yet supported on MongoDB 6.0 or higher. Migrations on MongoDB 6.0 or higher will skip any time-series collections on the source cluster. Deprecated versions: v2-{2023-01-01}
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const createGroupLiveMigration = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: CreateGroupLiveMigrationInput,
    outputSchema: CreateGroupLiveMigrationOutput,
  }),
);
