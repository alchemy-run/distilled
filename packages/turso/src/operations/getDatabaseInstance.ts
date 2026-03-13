import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetDatabaseInstanceInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    instanceName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/organizations/{organizationSlug}/databases/{databaseName}/instances/{instanceName}",
    }),
  );
export type GetDatabaseInstanceInput = typeof GetDatabaseInstanceInput.Type;

// Output Schema
export const GetDatabaseInstanceOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    instance: Schema.optional(
      Schema.Struct({
        uuid: Schema.optional(Schema.String),
        name: Schema.optional(Schema.String),
        type: Schema.optional(Schema.Literals(["primary", "replica"])),
        region: Schema.optional(Schema.String),
        hostname: Schema.optional(Schema.String),
      }),
    ),
  });
export type GetDatabaseInstanceOutput = typeof GetDatabaseInstanceOutput.Type;

// The operation
/**
 * Retrieve Database Instance
 *
 * Return the individual database instance by name.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param databaseName - The name of the database.
 * @param instanceName - The name of the instance (location code).
 */
export const getDatabaseInstance = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetDatabaseInstanceInput,
  outputSchema: GetDatabaseInstanceOutput,
}));
