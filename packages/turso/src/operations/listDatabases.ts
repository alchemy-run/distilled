import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListDatabasesInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  organizationSlug: Schema.String.pipe(T.PathParam()),
  group: Schema.optional(Schema.String),
  schema: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
}).pipe(
  T.Http({
    method: "GET",
    path: "/v1/organizations/{organizationSlug}/databases",
  }),
);
export type ListDatabasesInput = typeof ListDatabasesInput.Type;

// Output Schema
export const ListDatabasesOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  databases: Schema.optional(
    Schema.Array(
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
  ),
});
export type ListDatabasesOutput = typeof ListDatabasesOutput.Type;

// The operation
/**
 * List Databases
 *
 * Returns a list of databases belonging to the organization or user.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param group - Filter databases by group name.
 * @param schema - The schema database name that can be used to get databases that belong to that parent schema.
 * @param parent - Filter database branches by using their parent database ID.
 */
export const listDatabases = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: ListDatabasesInput,
  outputSchema: ListDatabasesOutput,
}));
