import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const RemoveLocationFromGroupInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
    location: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "/v1/organizations/{organizationSlug}/groups/{groupName}/locations/{location}",
    }),
  );
export type RemoveLocationFromGroupInput =
  typeof RemoveLocationFromGroupInput.Type;

// Output Schema
export const RemoveLocationFromGroupOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type RemoveLocationFromGroupOutput =
  typeof RemoveLocationFromGroupOutput.Type;

// The operation
/**
 * Remove Location from Group
 *
 * Removes a location from the specified group.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param groupName - The name of the group.
 * @param location - The location code to remove from the group.
 */
export const removeLocationFromGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: RemoveLocationFromGroupInput,
    outputSchema: RemoveLocationFromGroupOutput,
  }),
);
