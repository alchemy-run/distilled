import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupLiveMigrationValidateStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    validationId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/liveMigrations/validate/{validationId}",
    }),
  );
export type GetGroupLiveMigrationValidateStatusInput =
  typeof GetGroupLiveMigrationValidateStatusInput.Type;

// Output Schema
export const GetGroupLiveMigrationValidateStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupLiveMigrationValidateStatusOutput =
  typeof GetGroupLiveMigrationValidateStatusOutput.Type;

// The operation
/**
 * Return One Migration Validation Job
 *
 * Return the status of one migration validation job. Your API Key must have the Organization Owner role to successfully call this resource.
 *
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param validationId - Unique 24-hexadecimal digit string that identifies the validation job.
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 */
export const getGroupLiveMigrationValidateStatus =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: GetGroupLiveMigrationValidateStatusInput,
    outputSchema: GetGroupLiveMigrationValidateStatusOutput,
  }));
