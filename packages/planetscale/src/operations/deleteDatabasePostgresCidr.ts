import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound, UnprocessableEntity } from "../errors";

// Input Schema
export const DeleteDatabasePostgresCidrInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{organization}/databases/{database}/cidrs/{id}",
  }),
);
export type DeleteDatabasePostgresCidrInput =
  typeof DeleteDatabasePostgresCidrInput.Type;

// Output Schema
export const DeleteDatabasePostgresCidrOutput = Schema.Void;
export type DeleteDatabasePostgresCidrOutput =
  typeof DeleteDatabasePostgresCidrOutput.Type;

// The operation
/**
 * Delete an IP restriction entry
 *
 * @param organization - The name of the organization the database belongs to
 * @param database - The name of the database
 * @param id - The ID of the IP restriction entry
 */
export const deleteDatabasePostgresCidr = /*@__PURE__*/ /*#__PURE__*/ API.make(
  () => ({
    inputSchema: DeleteDatabasePostgresCidrInput,
    outputSchema: DeleteDatabasePostgresCidrOutput,
    errors: [Forbidden, NotFound, UnprocessableEntity] as const,
  }),
);
