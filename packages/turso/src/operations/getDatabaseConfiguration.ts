import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetDatabaseConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/organizations/{organizationSlug}/databases/{databaseName}/configuration",
    }),
  );
export type GetDatabaseConfigurationInput =
  typeof GetDatabaseConfigurationInput.Type;

// Output Schema
export const GetDatabaseConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    size_limit: Schema.optional(Schema.String),
    allow_attach: Schema.optional(Schema.Boolean),
    block_reads: Schema.optional(Schema.Boolean),
    block_writes: Schema.optional(Schema.Boolean),
    delete_protection: Schema.optional(Schema.Boolean),
  });
export type GetDatabaseConfigurationOutput =
  typeof GetDatabaseConfigurationOutput.Type;

// The operation
/**
 * Retrieve Database Configuration
 *
 * Retrieve an individual database configuration belonging to the organization or user.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param databaseName - The name of the database.
 */
export const getDatabaseConfiguration = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: GetDatabaseConfigurationInput,
    outputSchema: GetDatabaseConfigurationOutput,
  }),
);
