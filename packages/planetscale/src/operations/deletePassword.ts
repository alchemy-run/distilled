import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const DeletePasswordInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  id: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/passwords/{id}",
  }),
);
export type DeletePasswordInput = typeof DeletePasswordInput.Type;

// Output Schema
export const DeletePasswordOutput = Schema.Void;
export type DeletePasswordOutput = typeof DeletePasswordOutput.Type;

// The operation
/**
 * Delete a password
 *
 * @param organization - The name of the organization the password belongs to
 * @param database - The name of the database the password belongs to
 * @param branch - The name of the branch the password belongs to
 * @param id - The ID of the password
 */
export const deletePassword = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeletePasswordInput,
  outputSchema: DeletePasswordOutput,
  errors: [Forbidden, NotFound] as const,
}));
