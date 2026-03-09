import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteV1DatabasesByDatabaseIdInput = Schema.Struct({
  databaseId: Schema.String.pipe(T.PathParam()),
}).pipe(T.Http({ method: "DELETE", path: "/v1/databases/{databaseId}" }));
export type DeleteV1DatabasesByDatabaseIdInput =
  typeof DeleteV1DatabasesByDatabaseIdInput.Type;

// Output Schema
export const DeleteV1DatabasesByDatabaseIdOutput = Schema.Void;
export type DeleteV1DatabasesByDatabaseIdOutput =
  typeof DeleteV1DatabasesByDatabaseIdOutput.Type;

// The operation
/**
 * Delete database
 *
 * Deletes the database with the given ID.
 */
export const deleteV1DatabasesByDatabaseId =
  /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
    inputSchema: DeleteV1DatabasesByDatabaseIdInput,
    outputSchema: DeleteV1DatabasesByDatabaseIdOutput,
  }));
