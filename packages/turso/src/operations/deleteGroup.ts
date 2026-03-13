import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteGroupInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  organizationSlug: Schema.String.pipe(T.PathParam()),
  groupName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/v1/organizations/{organizationSlug}/groups/{groupName}",
  }),
);
export type DeleteGroupInput = typeof DeleteGroupInput.Type;

// Output Schema
export const DeleteGroupOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type DeleteGroupOutput = typeof DeleteGroupOutput.Type;

// The operation
/**
 * Delete Group
 *
 * Delete a group belonging to the organization or user.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param groupName - The name of the group.
 */
export const deleteGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteGroupInput,
  outputSchema: DeleteGroupOutput,
}));
