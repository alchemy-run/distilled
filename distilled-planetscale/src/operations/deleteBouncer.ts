import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import { Forbidden, NotFound } from "../errors";

// Input Schema
export const DeleteBouncerInput = Schema.Struct({
  organization: Schema.String.pipe(T.PathParam()),
  database: Schema.String.pipe(T.PathParam()),
  branch: Schema.String.pipe(T.PathParam()),
  bouncer: Schema.String.pipe(T.PathParam()),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/organizations/{organization}/databases/{database}/branches/{branch}/bouncers/{bouncer}",
  }),
);
export type DeleteBouncerInput = typeof DeleteBouncerInput.Type;

// Output Schema
export const DeleteBouncerOutput = Schema.Void;
export type DeleteBouncerOutput = typeof DeleteBouncerOutput.Type;

// The operation
/**
 * Delete a bouncer
 *
 * @param organization - The name of the organization that owns this resource
 * @param database - The name of the database that owns this resource
 * @param branch - The name of the branch that owns this resource
 * @param bouncer - The name of the bouncer
 */
export const deleteBouncer = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DeleteBouncerInput,
  outputSchema: DeleteBouncerOutput,
  errors: [Forbidden, NotFound] as const,
}));
