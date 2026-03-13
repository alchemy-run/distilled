import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UnarchiveGroupInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  organizationSlug: Schema.String.pipe(T.PathParam()),
  groupName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/organizations/{organizationSlug}/groups/{groupName}/unarchive",
  }),
);
export type UnarchiveGroupInput = typeof UnarchiveGroupInput.Type;

// Output Schema
export const UnarchiveGroupOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  group: Schema.optional(
    Schema.Struct({
      name: Schema.optional(Schema.String),
      version: Schema.optional(Schema.String),
      uuid: Schema.optional(Schema.String),
      locations: Schema.optional(Schema.Array(Schema.String)),
      primary: Schema.optional(Schema.String),
      delete_protection: Schema.optional(Schema.Boolean),
    }),
  ),
});
export type UnarchiveGroupOutput = typeof UnarchiveGroupOutput.Type;

// The operation
/**
 * Unarchive Group
 *
 * Unarchive a group that has been archived due to inactivity.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param groupName - The name of the group.
 */
export const unarchiveGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: UnarchiveGroupInput,
  outputSchema: UnarchiveGroupOutput,
}));
