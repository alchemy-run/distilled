import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";

// Input Schema
export const DisableNeonAuthInput = Schema.Struct({
  project_id: Schema.String.pipe(T.PathParam()),
  branch_id: Schema.String.pipe(T.PathParam()),
  delete_data: Schema.optional(Schema.Boolean),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "/projects/{project_id}/branches/{branch_id}/auth",
  }),
);
export type DisableNeonAuthInput = typeof DisableNeonAuthInput.Type;

// Output Schema
export const DisableNeonAuthOutput = Schema.Void;
export type DisableNeonAuthOutput = typeof DisableNeonAuthOutput.Type;

// The operation
/**
 * Disables Neon Auth for the branch
 *
 * @param project_id - The Neon project ID
 * @param branch_id - The Neon branch ID
 */
export const disableNeonAuth = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  inputSchema: DisableNeonAuthInput,
  outputSchema: DisableNeonAuthOutput,
}));
