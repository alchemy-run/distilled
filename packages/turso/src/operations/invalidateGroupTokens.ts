import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const InvalidateGroupTokensInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    groupName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/organizations/{organizationSlug}/groups/{groupName}/auth/rotate",
    }),
  );
export type InvalidateGroupTokensInput = typeof InvalidateGroupTokensInput.Type;

// Output Schema
export const InvalidateGroupTokensOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type InvalidateGroupTokensOutput =
  typeof InvalidateGroupTokensOutput.Type;

// The operation
/**
 * Invalidate All Group Auth Tokens
 *
 * Invalidates all authorization tokens for the specified group.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param groupName - The name of the group.
 */
export const invalidateGroupTokens = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InvalidateGroupTokensInput,
    outputSchema: InvalidateGroupTokensOutput,
  }),
);
