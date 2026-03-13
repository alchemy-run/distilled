import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const InvalidateDatabaseTokensInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "/v1/organizations/{organizationSlug}/databases/{databaseName}/auth/rotate",
    }),
  );
export type InvalidateDatabaseTokensInput =
  typeof InvalidateDatabaseTokensInput.Type;

// Output Schema
export const InvalidateDatabaseTokensOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Void;
export type InvalidateDatabaseTokensOutput =
  typeof InvalidateDatabaseTokensOutput.Type;

// The operation
/**
 * Invalidate All Database Auth Tokens
 *
 * Invalidates all authorization tokens for the specified database.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param databaseName - The name of the database.
 */
export const invalidateDatabaseTokens = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: InvalidateDatabaseTokensInput,
    outputSchema: InvalidateDatabaseTokensOutput,
  }),
);
