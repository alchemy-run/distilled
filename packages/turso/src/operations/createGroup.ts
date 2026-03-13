import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateGroupInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  organizationSlug: Schema.String.pipe(T.PathParam()),
  name: Schema.String,
  location: Schema.String,
  extensions: Schema.optional(Schema.Unknown),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/organizations/{organizationSlug}/groups",
  }),
);
export type CreateGroupInput = typeof CreateGroupInput.Type;

// Output Schema
export const CreateGroupOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
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
export type CreateGroupOutput = typeof CreateGroupOutput.Type;

// The operation
/**
 * Create Group
 *
 * Creates a new group for the organization or user.
 *
 * @param organizationSlug - The slug of the organization or user account.
 */
export const createGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateGroupInput,
  outputSchema: CreateGroupOutput,
}));
