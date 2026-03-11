import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupManagedSlowMsInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/managedSlowMs",
    }),
  );
export type GetGroupManagedSlowMsInput = typeof GetGroupManagedSlowMsInput.Type;

// Output Schema
export const GetGroupManagedSlowMsOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupManagedSlowMsOutput =
  typeof GetGroupManagedSlowMsOutput.Type;

// The operation
/**
 * Return Managed Slow Operation Threshold Status
 *
 * Get whether the Managed Slow MS feature is enabled.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 */
export const getGroupManagedSlowMs = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupManagedSlowMsInput,
    outputSchema: GetGroupManagedSlowMsOutput,
  }),
);
