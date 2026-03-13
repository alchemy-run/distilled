import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateGroupDatabasesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/organizations/{organizationSlug}/groups/{groupName}/update",
    }),
  );
export type UpdateGroupDatabasesInput = typeof UpdateGroupDatabasesInput.Type;

// Output Schema
export const UpdateGroupDatabasesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type UpdateGroupDatabasesOutput = typeof UpdateGroupDatabasesOutput.Type;

// The operation
/**
 * Update Databases in a Group
 *
 * Updates all databases in the group to the latest libSQL version.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param groupName - The name of the group.
 */
export const updateGroupDatabases = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateGroupDatabasesInput,
    outputSchema: UpdateGroupDatabasesOutput,
  }),
);
