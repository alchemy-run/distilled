import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateGroupTokenInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  organizationSlug: Schema.String.pipe(T.PathParam()),
  groupName: Schema.String.pipe(T.PathParam()),
  expiration: Schema.optional(Schema.String),
  authorization: Schema.optional(Schema.Literals(["full-access", "read-only"])),
  permissions: Schema.optional(
    Schema.Struct({
      read_attach: Schema.optional(
        Schema.Struct({
          databases: Schema.optional(Schema.Array(Schema.String)),
        }),
      ),
    }),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "/v1/organizations/{organizationSlug}/groups/{groupName}/auth/tokens",
  }),
);
export type CreateGroupTokenInput = typeof CreateGroupTokenInput.Type;

// Output Schema
export const CreateGroupTokenOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct(
  {
    jwt: Schema.optional(Schema.String),
  },
);
export type CreateGroupTokenOutput = typeof CreateGroupTokenOutput.Type;

// The operation
/**
 * Create Group Auth Token
 *
 * Generates an authorization token for the specified group.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param groupName - The name of the group.
 * @param expiration - Expiration time for the token (e.g., 2w1d30m).
 * @param authorization - Authorization level for the token (full-access or read-only).
 */
export const createGroupToken = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateGroupTokenInput,
  outputSchema: CreateGroupTokenOutput,
}));
