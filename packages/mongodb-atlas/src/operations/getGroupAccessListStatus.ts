import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupAccessListStatusInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    groupId: Schema.String.pipe(T.PathParam()),
    entryValue: Schema.String.pipe(T.PathParam()),
    envelope: Schema.optional(Schema.Boolean),
    pretty: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/api/atlas/v2/groups/{groupId}/accessList/{entryValue}/status",
    }),
  );
export type GetGroupAccessListStatusInput =
  typeof GetGroupAccessListStatusInput.Type;

// Output Schema
export const GetGroupAccessListStatusOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type GetGroupAccessListStatusOutput =
  typeof GetGroupAccessListStatusOutput.Type;

// The operation
/**
 * Return Status of One Project IP Access List Entry
 *
 * Returns the status of one project IP access list entry. This resource checks if the provided project IP access list entry applies to all cloud providers serving clusters from the specified project.
 *
 * @param envelope - Flag that indicates whether Application wraps the response in an `envelope` JSON object. Some API clients cannot access the HTTP response headers or status code. To remediate this, set envelope=true in the query. Endpoints that return a list of results use the results object as an envelope. Application adds the status parameter to the response body.
 * @param groupId - Unique 24-hexadecimal digit string that identifies your project. Use the [/groups](#tag/Projects/operation/listProjects) endpoint to retrieve all projects to which the authenticated user has access.

**NOTE**: Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.
 * @param pretty - Flag that indicates whether the response body should be in the prettyprint format.
 * @param entryValue - Network address or cloud provider security construct that identifies which project access list entry to be verified.
 */
export const getGroupAccessListStatus = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupAccessListStatusInput,
    outputSchema: GetGroupAccessListStatusOutput,
  }),
);
