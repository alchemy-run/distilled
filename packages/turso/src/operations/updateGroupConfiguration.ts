import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateGroupConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    delete_protection: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/v1/organizations/{organizationSlug}/groups/{groupName}/configuration",
    }),
  );
export type UpdateGroupConfigurationInput =
  typeof UpdateGroupConfigurationInput.Type;

// Output Schema
export const UpdateGroupConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    delete_protection: Schema.optional(Schema.Boolean),
  });
export type UpdateGroupConfigurationOutput =
  typeof UpdateGroupConfigurationOutput.Type;

// The operation
/**
 * Update Group Configuration
 *
 * Update a group configuration belonging to the organization or user.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param groupName - The name of the group.
 */
export const updateGroupConfiguration = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateGroupConfigurationInput,
    outputSchema: UpdateGroupConfigurationOutput,
  }),
);
