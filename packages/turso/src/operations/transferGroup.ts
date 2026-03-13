import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const TransferGroupInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  organizationSlug: Schema.String.pipe(T.PathParam()),
  groupName: Schema.String.pipe(T.PathParam()),
  organization: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/organizations/{organizationSlug}/groups/{groupName}/transfer",
  }),
);
export type TransferGroupInput = typeof TransferGroupInput.Type;

// Output Schema
export const TransferGroupOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  name: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  uuid: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(Schema.String)),
  primary: Schema.optional(Schema.String),
  delete_protection: Schema.optional(Schema.Boolean),
});
export type TransferGroupOutput = typeof TransferGroupOutput.Type;

// The operation
/**
 * Transfer Group
 *
 * Transfer a group to another organization that you own or a member of.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param groupName - The name of the group.
 */
export const transferGroup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: TransferGroupInput,
  outputSchema: TransferGroupOutput,
}));
