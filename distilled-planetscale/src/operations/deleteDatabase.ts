import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const DeleteDatabaseInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{organization}/databases/{database}",
  }),
);
export type DeleteDatabaseInput = typeof DeleteDatabaseInput.Type;

// Output Schema
export const DeleteDatabaseOutput = Schema.Void;
export type DeleteDatabaseOutput = typeof DeleteDatabaseOutput.Type;

// The operation
/**
 * Delete a database
 *
 * @param organization - The name of the organization the database belongs to
 * @param database - The name of the database
 */
export const deleteDatabase = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteDatabaseInput,
  outputSchema: DeleteDatabaseOutput,
  errors: [Forbidden, NotFound] as const,
}));
