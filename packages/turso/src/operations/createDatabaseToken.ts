import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const CreateDatabaseTokenInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    expiration: Schema.optional(Schema.String),
    authorization: Schema.optional(
      Schema.Literals(["full-access", "read-only"]),
    ),
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
      path: "/v1/organizations/{organizationSlug}/databases/{databaseName}/auth/tokens",
    }),
  );
export type CreateDatabaseTokenInput = typeof CreateDatabaseTokenInput.Type;

// Output Schema
export const CreateDatabaseTokenOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    jwt: Schema.optional(Schema.String),
  });
export type CreateDatabaseTokenOutput = typeof CreateDatabaseTokenOutput.Type;

// The operation
/**
 * Generate Database Auth Token
 *
 * Generates an authorization token for the specified database.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param databaseName - The name of the database.
 * @param expiration - Expiration time for the token (e.g., 2w1d30m).
 * @param authorization - Authorization level for the token (full-access or read-only).
 */
export const createDatabaseToken = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: CreateDatabaseTokenInput,
  outputSchema: CreateDatabaseTokenOutput,
}));
