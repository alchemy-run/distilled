import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DeleteBackupInput = Schema.Struct({
  id: Schema.String.pipe(T.PathParam()),
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/backups/{id}",
  }),
);
export type DeleteBackupInput = typeof DeleteBackupInput.Type;

// Output Schema
export const DeleteBackupOutput = Schema.Void;
export type DeleteBackupOutput = typeof DeleteBackupOutput.Type;

// The operation
/**
 * Delete a backup
 *
 * @param id - The ID of the backup
 * @param organization - The name of the organization the branch belongs to
 * @param database - The name of the database the branch belongs to
 * @param branch - The name of the branch
 */
export const deleteBackup = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteBackupInput,
  outputSchema: DeleteBackupOutput,
}));
