import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const GetDatabaseInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  organizationSlug: Schema.String.pipe(T.PathParam()),
  databaseName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/organizations/{organizationSlug}/databases/{databaseName}",
  }),
);
export type GetDatabaseInput = typeof GetDatabaseInput.Type;

// Output Schema
export const GetDatabaseOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  database: Schema.optional(
    Schema.Struct({
      Name: Schema.optional(Schema.String),
      DbId: Schema.optional(Schema.String),
      Hostname: Schema.optional(Schema.String),
      block_reads: Schema.optional(Schema.Boolean),
      block_writes: Schema.optional(Schema.Boolean),
      regions: Schema.optional(Schema.Array(Schema.String)),
      primaryRegion: Schema.optional(Schema.String),
      group: Schema.optional(Schema.String),
      delete_protection: Schema.optional(Schema.Boolean),
      parent: Schema.optional(
        Schema.NullOr(
          Schema.Struct({
            id: Schema.optional(Schema.String),
            name: Schema.optional(Schema.String),
            branched_at: Schema.optional(Schema.String),
          }),
        ),
      ),
    }),
  ),
});
export type GetDatabaseOutput = typeof GetDatabaseOutput.Type;

// The operation
/**
 * Retrieve Database
 *
 * Returns a database belonging to the organization or user.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param databaseName - The name of the database.
 */
export const getDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: GetDatabaseInput,
  outputSchema: GetDatabaseOutput,
}));
