import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteDatabaseInput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  organizationSlug: Schema.String.pipe(T.PathParam()),
  databaseName: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/v1/organizations/{organizationSlug}/databases/{databaseName}",
  }),
);
export type DeleteDatabaseInput = typeof DeleteDatabaseInput.Type;

// Output Schema
export const DeleteDatabaseOutput = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  database: Schema.optional(Schema.String),
});
export type DeleteDatabaseOutput = typeof DeleteDatabaseOutput.Type;

// The operation
/**
 * Delete Database
 *
 * Delete a database belonging to the organization or user.
 *
 * @param organizationSlug - The slug of the organization or user account.
 * @param databaseName - The name of the database.
 */
export const deleteDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteDatabaseInput,
  outputSchema: DeleteDatabaseOutput,
}));
