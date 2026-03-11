import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const MigrateGroupInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  groupId: Schema.String.pipe(T.PathParam()),
  envelope: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({ method: "POST", path: "/api/atlas/v2/groups/{groupId}:migrate" }),
);
export type MigrateGroupInput = typeof MigrateGroupInput.Type;

// Output Schema
export const MigrateGroupOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type MigrateGroupOutput = typeof MigrateGroupOutput.Type;

// The operation
/**
 * Migrate One Project to Another Organization
 *
 * Migrates a project from its current organization to another organization. All project users and their roles will be copied to the same project in the destination organization. You must include an organization API key with the Organization Owner role for the destination organization to verify access to the destination organization when you authenticate with Programmatic API Keys. Otherwise, the requesting user must have the Organization Owner role in both organizations. To use this resource, the requesting Service Account or API Key must have the Organization Owner role.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 */
export const migrateGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: MigrateGroupInput,
  outputSchema: MigrateGroupOutput,
}));
