import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const ListDatabaseInstancesInput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    organizationSlug: Schema.String.pipe(T.PathParam()),
    databaseName: Schema.String.pipe(T.PathParam()),
  }).pipe(
    T.Http({
      method: "GET",
      path: "/v1/organizations/{organizationSlug}/databases/{databaseName}/instances",
    }),
  );
export type ListDatabaseInstancesInput = typeof ListDatabaseInstancesInput.Type;

// Output Schema
export const ListDatabaseInstancesOutput =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    instances: Schema.optional(
      Schema.Array(
        Schema.Struct({
          uuid: Schema.optional(Schema.String),
          name: Schema.optional(Schema.String),
          type: Schema.optional(Schema.Literals(["primary", "replica"])),
          region: Schema.optional(Schema.String),
          hostname: Schema.optional(Schema.String),
        }),
      ),
    ),
  });
export type ListDatabaseInstancesOutput =
  typeof ListDatabaseInstancesOutput.Type;

// The operation
/**
 * List Database Instances
 *
 * Returns a list of instances of a database. Instances are the individual primary or replica databases in each region defined by the group.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param databaseName - The name of the database.
 */
export const listDatabaseInstances = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: ListDatabaseInstancesInput,
    outputSchema: ListDatabaseInstancesOutput,
  }),
);
