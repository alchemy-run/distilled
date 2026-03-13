import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetGroupConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/organizations/{organizationSlug}/groups/{groupName}/configuration",
    }),
  );
export type GetGroupConfigurationInput = typeof GetGroupConfigurationInput.Type;

// Output Schema
export const GetGroupConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    delete_protection: Schema.optional(Schema.Boolean),
  });
export type GetGroupConfigurationOutput =
  typeof GetGroupConfigurationOutput.Type;

// The operation
/**
 * Retrieve Group Configuration
 *
 * Retrieve an individual group configuration belonging to the organization or user.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param groupName - The name of the group.
 */
export const getGroupConfiguration = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetGroupConfigurationInput,
    outputSchema: GetGroupConfigurationOutput,
  }),
);
