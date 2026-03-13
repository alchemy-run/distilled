import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const UpdateDatabaseConfigurationInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
    size_limit: Schema.optional(Schema.String),
    allow_attach: Schema.optional(Schema.Boolean),
    block_reads: Schema.optional(Schema.Boolean),
    block_writes: Schema.optional(Schema.Boolean),
    delete_protection: Schema.optional(Schema.Boolean),
  }).pipe(
    T.Http({
      method: "PATCH",
      path: "/v1/organizations/{organizationSlug}/databases/{databaseName}/configuration",
    }),
  );
export type UpdateDatabaseConfigurationInput =
  typeof UpdateDatabaseConfigurationInput.Type;

// Output Schema
export const UpdateDatabaseConfigurationOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    size_limit: Schema.optional(Schema.String),
    allow_attach: Schema.optional(Schema.Boolean),
    block_reads: Schema.optional(Schema.Boolean),
    block_writes: Schema.optional(Schema.Boolean),
    delete_protection: Schema.optional(Schema.Boolean),
  });
export type UpdateDatabaseConfigurationOutput =
  typeof UpdateDatabaseConfigurationOutput.Type;

// The operation
/**
 * Update Database Configuration
 *
 * Update a database configuration belonging to the organization or user.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param databaseName - The name of the database.
 */
export const updateDatabaseConfiguration = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: UpdateDatabaseConfigurationInput,
    outputSchema: UpdateDatabaseConfigurationOutput,
  }),
);
